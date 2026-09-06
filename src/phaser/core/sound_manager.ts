import type { Game } from './game.js';
import { ArraySet } from './array_set.js';
import { AUDIO_DISABLED, AUDIO_STANDARD, AUDIO_WEBKIT } from './const.js';
import { ENGINE_ERROR_CREATING_AUDIO_CONTEXT } from './error_code.js';
import { Signal } from './signal.js';
import { Sound } from './sound.js';
import { SoundSprite } from './sound_sprite.js';
import type { Callback } from './callback.js';
import { onPageStateChange, oncePageActive } from './page_lifecycle.js';

export class SoundManager {
  public game!: Game;
  public onChange!: Signal;
  public context!: AudioContext | null;
  public baseLatency!: number;
  public noAudio!: boolean;
  public type!: number;
  public connectToMaster!: boolean;
  public isLocked!: boolean;
  public _codeMuted!: boolean;
  public _muted!: boolean;
  public _unlockSource!: AudioBufferSourceNode | null;
  public _volume!: number;
  public _sounds!: Sound[];
  public _watchList!: ArraySet<string>;
  public _watching!: boolean;
  public _watchCallback!: Callback | null;
  public _watchContext!: unknown;
  public masterGain!: GainNode;
  public _muteVolume!: number;
  /**
   * Creates a new SoundManager instance.
   * @param {Game} game - Reference to the Phaser Game instance.
   */
  public constructor(game: Game) {
    this.game = game;
    this.onChange = new Signal();
    /** @type {AudioContext} */
    this.context = null;
    this.baseLatency = 0; // https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/baseLatency
    this.noAudio = false;
    this.type = AUDIO_DISABLED;
    this.connectToMaster = true;
    this.isLocked = false;
    // this.muteOnPause = true;
    this._codeMuted = false;
    this._muted = false;
    this._unlockSource = null;
    this._volume = 1;
    /** @type {Sound[]} */
    this._sounds = [];
    this._watchList = new ArraySet<string>();
    this._watching = false;
    this._watchCallback = null;
    this._watchContext = null;
  }

  /**
   * Initializes the sound manager and sets up audio context.
   */
  public boot(): void {
    const setAudioDisabledState = (): void => {
      this.type = AUDIO_DISABLED;
      this.noAudio = true;
      this.isLocked = false;
    };
    if (this.game.config.isForceDisabledAudio) {
      setAudioDisabledState();
      return;
    }
    if (globalThis.AudioContext as typeof AudioContext | undefined) {
      try {
        this.game.logger.info('initAudioContext');
        this.context = new globalThis.AudioContext();
        this.type = AUDIO_STANDARD;
      } catch (error) {
        this.context = null;
        setAudioDisabledState();
        const typedError = error instanceof Error ? error : new Error(String(error));
        this.game.logger.fatal('SoundManager', { error: typedError });
      }
    } else if (globalThis.webkitAudioContext) {
      try {
        this.game.logger.info('initWebkitAudioContext');
        const WebkitAudioContext = globalThis.webkitAudioContext;
        this.context = new WebkitAudioContext();
        this.type = AUDIO_WEBKIT;
      } catch (error) {
        this.context = null;
        setAudioDisabledState();
        const typedError = error instanceof Error ? error : new Error(String(error));
        this.game.logger.fatal('SoundManager', { error: typedError });
      }
    }
    if (!this.context) {
      this.game.logger.fatal('SoundManager', { error: new Error(ENGINE_ERROR_CREATING_AUDIO_CONTEXT) });
      setAudioDisabledState();
      return;
    }
    this.baseLatency = this.context.baseLatency ?? 256 / (this.context.sampleRate ?? 44_100);
    this.masterGain =
      this.context.createGain === undefined
        ? (this.context as unknown as { createGainNode: () => GainNode }).createGainNode()
        : this.context.createGain();
    this.masterGain.gain.value = 1;
    this.masterGain.connect(this.context.destination);
    // handle audio state unlock
    // possible states: interrupted, suspended, running, closed
    if (this.context.state === 'suspended' || this.context.state === 'interrupted') {
      this.addUnlockHandlers();
    }
    this.context.addEventListener('statechange', this.onContextStateChange, false);
    onPageStateChange(this.onPageLifecycleChange);
  }

  /**
   * Handles page lifecycle changes for audio management.
   */
  public onPageLifecycleChange = (): void => {
    if (!document.hidden) {
      this.checkUnlockHandlers();
    }
  };

  /**
   * Handles audio context state changes.
   */
  public onContextStateChange = (): void => {
    this.game.logger.info('onContextStateChange', {
      state: this.context!.state,
      isLocked: this.isLocked,
    });
    this.checkUnlockHandlers();
  };

  /**
   * Checks if audio unlock handlers need to be added or removed.
   */
  public checkUnlockHandlers = (): void => {
    this.game.logger.info('checkUnlockHandlers', {
      state: this.context!.state,
      isLocked: this.isLocked,
    });
    if (!this.isLocked && (this.context!.state === 'suspended' || this.context!.state === 'interrupted')) {
      this.addUnlockHandlers();
    } else if (this.isLocked && this.context!.state === 'running') {
      this.removeUnlockHandlers();
    }
  };

  /**
   * Adds event listeners to unlock audio context.
   */
  public addUnlockHandlers = (): void => {
    this.isLocked = true;
    this.game.logger.info('addUnlockHandlers', {
      state: this.context!.state,
      isLocked: this.isLocked,
    });
    for (const eventType of ['touchend', 'click', 'keydown']) {
      document.body.addEventListener(eventType, this.onUnlockEvent, false);
    }
  };

  /**
   * Removes event listeners that unlock audio context.
   */
  public removeUnlockHandlers = (): void => {
    this.isLocked = false;
    this.game.logger.info('removeUnlockHandlers', {
      state: this.context!.state,
      isLocked: this.isLocked,
    });
    for (const eventType of ['touchend', 'click', 'keydown']) {
      document.body.removeEventListener(eventType, this.onUnlockEvent, false);
    }
  };

  /**
   * Handles unlock events to resume audio context.
   * @param {Event} event - The DOM event that triggered the unlock.
   */
  public onUnlockEvent = (event: Event): void => {
    void this.resumeContext(event);
  };

  /**
   * Resumes the audio context a user gesture has just unlocked.
   * @param {Event} event - The DOM event that triggered the unlock.
   */
  public async resumeContext(event: Event): Promise<void> {
    const initialState = this.context!.state;
    if (initialState !== 'suspended' && initialState !== 'interrupted') {
      this.game.logger.info('onUnlockResumeDenied', {
        state: initialState,
        isLocked: this.isLocked,
        event,
      });
      this.removeUnlockHandlers();
      return;
    }
    this.game.logger.info('onContextResumeStart', {
      state: initialState,
      isLocked: this.isLocked,
      event,
    });
    try {
      await this.context!.resume();
      this.game.logger.info('onContextResumeResult', {
        initialState,
        state: this.context!.state,
        isLocked: this.isLocked,
      });
      this.removeUnlockHandlers();
    } catch (error: unknown) {
      this.game.logger.info('onContextResumeReject', {
        initialState,
        state: this.context!.state,
        isLocked: this.isLocked,
        error,
      });
      this.removeUnlockHandlers();
      this.game.logger.fatal('SoundManager', {
        error,
        tags: { 'audio.initialState': initialState, 'audio.state': this.context!.state },
      });
    }
  }

  /**
   * Stops all sounds in the manager.
   */
  public stopAll(): void {
    if (this.noAudio) {
      return;
    }
    for (const sound of this._sounds) {
      if (sound !== null) {
        sound.stop();
      }
    }
  }

  /**
   * Pauses all sounds in the manager.
   */
  public pauseAll(): void {
    if (this.noAudio) {
      return;
    }
    for (const sound of this._sounds) {
      if (sound !== null) {
        sound.pause();
      }
    }
  }

  /**
   * Resumes all sounds in the manager.
   */
  public resumeAll(): void {
    if (this.noAudio) {
      return;
    }
    for (const sound of this._sounds) {
      if (sound !== null) {
        sound.resume();
      }
    }
  }

  /**
   * Decodes an audio file for playback.
   * @param {string} key - The key of the sound to decode.
   */
  public async decode(key: string): Promise<void> {
    const soundData = this.game.cache.getSoundData(key);
    if (!(soundData instanceof ArrayBuffer)) {
      return;
    }
    if (this.game.cache.isSoundDecoded(key) === true) {
      return;
    }
    this.game.cache.updateSound(key, 'isDecoding', true);
    try {
      this.game.cache.decodedSound(key, await this.context!.decodeAudioData(soundData));
    } catch (error: unknown) {
      const typedError = error instanceof Error ? error : new Error(String(error));
      this.game.logger.fatal('SoundManager', { error: typedError, tags: { 'asset.key': key } });
      if (typedError.name === 'InvalidStateError') {
        oncePageActive((): void => {
          void this.decode(key);
        });
      } else if (typedError.name === 'EncodingError') {
        this._watchList.remove(key);
      }
    }
  }

  /**
   * Sets up a callback to be called when audio files are decoded.
   * @param {Sound[]|string[]} files - The sound files or keys to wait for.
   * @param {Function} callback - The callback function to call when all files are decoded.
   * @param {object} callbackContext - The context in which to call the callback.
   */
  public setDecodedCallback(
    files: string | string[] | Sound | Sound[],
    callback: Callback,
    callbackContext: unknown
  ): void {
    const candidates: (string | Sound)[] = typeof files === 'string' ? [files] : Array.isArray(files) ? files : [files];
    this._watchList.reset();
    for (const file of candidates) {
      const key = file instanceof Sound ? file.key : file;
      if (this.game.cache.isSoundDecoded(key) !== true) {
        this._watchList.add(key);
      }
    }
    //  All decoded already?
    if (this._watchList.total === 0) {
      this._watching = false;
      callback.call(callbackContext);
    } else {
      this._watching = true;
      this._watchCallback = callback;
      this._watchContext = callbackContext;
    }
  }

  /**
   * Updates the sound manager state.
   */
  public update(): void {
    if (this.noAudio) {
      return;
    }
    for (const sound of this._sounds) {
      sound.update();
    }
    if (this._watching) {
      let key = this._watchList.first;
      while (key !== null) {
        if (this.game.cache.isSoundDecoded(key) === true) {
          this._watchList.remove(key);
        }
        key = this._watchList.next;
      }
      if (this._watchList.total === 0) {
        this.game.logger.info('All sounds decoded');
        this._watching = false;
        this._watchCallback?.call(this._watchContext);
      }
    }
  }

  /**
   * Adds a new sound to the manager.
   * @param {string} key - The key of the sound to add.
   * @param {number} volume - The initial volume level (0.0 to 1.0).
   * @param {boolean} loop - Whether the sound should loop.
   * @param {boolean} connect - Whether to connect to the master gain node.
   * @returns {Sound} The created Sound object.
   */
  public add(key: string, volume = 1, loop = false, connect: boolean = this.connectToMaster): Sound {
    const sound = new Sound(this.game, key, volume, loop, connect);
    this._sounds.push(sound);
    return sound;
  }

  /**
   * Adds a new sound sprite to the manager.
   * @param {string} key - The key of the sound sprite to add.
   * @returns {SoundSprite} The created SoundSprite object.
   */
  public addSprite(key: string): SoundSprite {
    return new SoundSprite(this.game, key);
  }

  /**
   * Removes a sound from the manager.
   * @param {Sound | null | undefined} sound - The sound object to remove.
   * @returns {boolean} True if the sound was removed, false otherwise.
   */
  public remove(sound: Sound | null | undefined): boolean {
    let i = this._sounds.length;
    while (i) {
      i -= 1;
      if (this._sounds[i] === sound) {
        this._sounds[i]!.destroy(false);
        this._sounds.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  /**
   * Removes all sounds with a specific key from the manager.
   * @param {string} key - The key of sounds to remove.
   * @returns {number} The number of sounds removed.
   */
  public removeByKey(key: string): number {
    let i = this._sounds.length;
    let removed = 0;
    while (i) {
      i -= 1;
      if (this._sounds[i]!.key === key) {
        this._sounds[i]!.destroy(false);
        this._sounds.splice(i, 1);
        removed += 1;
      }
    }
    return removed;
  }

  /**
   * Plays a sound by key.
   * @param {string} key - The key of the sound to play.
   * @param {number} volume - The volume level (0.0 to 1.0).
   * @param {boolean} loop - Whether the sound should loop.
   * @returns {Sound} The created Sound object, or null if audio is disabled.
   */
  public play(key: string, volume = 1, loop = false): Sound | null {
    if (this.noAudio) {
      return null;
    }
    const sound = this.add(key, volume, loop);
    sound.play();
    return sound;
  }

  /**
   * Mutes all sounds in the manager.
   */
  public setMute(): void {
    if (this._muted) {
      return;
    }
    this._muted = true;
    if (!this.noAudio) {
      this._muteVolume = this.masterGain.gain.value;
      this.masterGain.gain.value = 0;
    }
    this.onChange.dispatch('muted');
  }

  /**
   * Unmutes all sounds in the manager.
   */
  public unsetMute(): void {
    if (!this._muted || this._codeMuted) {
      return;
    }
    this._muted = false;
    if (!this.noAudio) {
      this.masterGain.gain.value = this._muteVolume;
    }
    this.onChange.dispatch('unmuted');
  }

  /**
   * Destroys the sound manager and cleans up resources.
   */
  public destroy(): void {
    this.stopAll();
    for (const sound of this._sounds) {
      if (sound !== null) {
        sound.destroy();
      }
    }
    this._sounds = [];
    this.onChange.dispose();
    if (this.context?.close) {
      void this.context.close();
    }
  }

  /**
   * Gets the muted state of the sound manager.
   * @returns {boolean} True if the manager is muted, false otherwise.
   */
  public get mute(): boolean {
    return this._muted;
  }

  /**
   * Sets the muted state of the sound manager.
   */
  public set mute(value: boolean) {
    if (value || false) {
      if (this._muted) {
        return;
      }
      this._codeMuted = true;
      this.setMute();
    } else {
      if (!this._muted) {
        return;
      }
      this._codeMuted = false;
      this.unsetMute();
    }
  }

  /**
   * Gets the volume level of the sound manager.
   * @returns {number} The volume level (0.0 to 1.0).
   */
  public get volume(): number {
    return this._volume;
  }

  /**
   * Sets the volume level of the sound manager.
   */
  public set volume(value: number) {
    const level = Math.min(1, Math.max(0, value));
    if (this._volume !== level) {
      this._volume = level;
      if (!this.noAudio) {
        this.masterGain.gain.value = level;
      }
    }
  }
}
