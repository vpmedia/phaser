import {
  addPageLifecycleCallback,
  getPageLifecycleEventEmitter,
  PAGE_LIFECYCLE_STATE_ACTIVE,
  PAGE_LIFECYCLE_STATE_CHANGE_EVENT,
} from '@vpmedia/simplify';
import { ArraySet } from './array_set.js';
import { AUDIO_DISABLED, AUDIO_STANDARD, AUDIO_WEBKIT } from './const.js';
import { ENGINE_ERROR_CREATING_AUDIO_CONTEXT } from './error_code.js';
import { Signal } from './signal.js';
import { Sound } from './sound.js';
import { SoundSprite } from './sound_sprite.js';

export class SoundManager {
  /**
   * Creates a new SoundManager instance.
   * @param {import('./game.js').Game} game - Reference to the Phaser Game instance.
   */
  constructor(game) {
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
    this._watchList = new ArraySet();
    this._watching = false;
    this._watchCallback = null;
    this._watchContext = null;
  }

  /**
   * Initializes the sound manager and sets up audio context.
   */
  boot() {
    const setAudioDisabledState = () => {
      this.type = AUDIO_DISABLED;
      this.noAudio = true;
      this.isLocked = false;
    };
    if (this.game.config.isForceDisabledAudio) {
      setAudioDisabledState();
      return;
    }
    if (window.AudioContext) {
      try {
        this.game.logger.info('initAudioContext');
        this.context = new window.AudioContext();
        this.type = AUDIO_STANDARD;
      } catch (error) {
        this.context = null;
        setAudioDisabledState();
        const typedError = error instanceof Error ? error : new Error(String(error));
        this.game.logger.exception('SoundManager', typedError);
      }
    } else if (window.webkitAudioContext) {
      try {
        this.game.logger.info('initWebkitAudioContext');
        this.context = new window.webkitAudioContext();
        this.type = AUDIO_WEBKIT;
      } catch (error) {
        this.context = null;
        setAudioDisabledState();
        const typedError = error instanceof Error ? error : new Error(String(error));
        this.game.logger.exception('SoundManager', typedError);
      }
    }
    if (!this.context) {
      this.game.logger.exception('SoundManager', new Error(ENGINE_ERROR_CREATING_AUDIO_CONTEXT));
      setAudioDisabledState();
      return;
    }
    this.baseLatency = this.context.baseLatency || 256 / (this.context.sampleRate || 44100);
    if (this.context.createGain === undefined) {
      this.masterGain = this.context.createGainNode();
    } else {
      this.masterGain = this.context.createGain();
    }
    this.masterGain.gain.value = 1;
    this.masterGain.connect(this.context.destination);
    // handle audio state unlock
    // possible states: interrupted, suspended, running, closed
    if (this.context.state === 'suspended' || this.context.state === 'interrupted') {
      this.addUnlockHandlers();
    }
    this.context.addEventListener('statechange', this.onContextStateChange, false);
    getPageLifecycleEventEmitter().on(PAGE_LIFECYCLE_STATE_CHANGE_EVENT, this.onPageLifecycleChange);
  }

  /**
   * Handles page lifecycle changes for audio management.
   */
  onPageLifecycleChange = () => {
    if (!document.hidden) {
      this.checkUnlockHandlers();
    }
  };

  /**
   * Handles audio context state changes.
   */
  onContextStateChange = () => {
    this.game.logger.info('onContextStateChange', {
      state: this.context.state,
      isLocked: this.isLocked,
    });
    this.checkUnlockHandlers();
  };

  /**
   * Checks if audio unlock handlers need to be added or removed.
   */
  checkUnlockHandlers = () => {
    this.game.logger.info('checkUnlockHandlers', {
      state: this.context.state,
      isLocked: this.isLocked,
    });
    if (!this.isLocked && (this.context.state === 'suspended' || this.context.state === 'interrupted')) {
      this.addUnlockHandlers();
    } else if (this.isLocked && this.context.state === 'running') {
      this.removeUnlockHandlers();
    }
  };

  /**
   * Adds event listeners to unlock audio context.
   */
  addUnlockHandlers = () => {
    this.isLocked = true;
    this.game.logger.info('addUnlockHandlers', {
      state: this.context.state,
      isLocked: this.isLocked,
    });
    for (const eventType of ['touchend', 'click', 'keydown']) {
      document.body.addEventListener(eventType, this.onUnlockEvent, false);
    }
  };

  /**
   * Removes event listeners that unlock audio context.
   */
  removeUnlockHandlers = () => {
    this.isLocked = false;
    this.game.logger.info('removeUnlockHandlers', {
      state: this.context.state,
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
  onUnlockEvent = (event) => {
    const initialState = this.context.state;
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
    this.context
      .resume()
      .then(() => {
        this.game.logger.info('onContextResumeResult', {
          initialState,
          state: this.context.state,
          isLocked: this.isLocked,
        });
        this.removeUnlockHandlers();
      })
      .catch((error) => {
        this.game.logger.info('onContextResumeReject', {
          initialState,
          state: this.context.state,
          isLocked: this.isLocked,
          error,
        });
        this.removeUnlockHandlers();
        this.game.logger.exception('', error, {
          tags: { 'audio.initialState': initialState, 'audio.state': this.context.state },
        });
      });
  };

  /**
   * Stops all sounds in the manager.
   */
  stopAll() {
    if (this.noAudio) {
      return;
    }
    for (let i = 0; i < this._sounds.length; i += 1) {
      if (this._sounds[i]) {
        this._sounds[i].stop();
      }
    }
  }

  /**
   * Pauses all sounds in the manager.
   */
  pauseAll() {
    if (this.noAudio) {
      return;
    }
    for (let i = 0; i < this._sounds.length; i += 1) {
      if (this._sounds[i]) {
        this._sounds[i].pause();
      }
    }
  }

  /**
   * Resumes all sounds in the manager.
   */
  resumeAll() {
    if (this.noAudio) {
      return;
    }
    for (let i = 0; i < this._sounds.length; i += 1) {
      if (this._sounds[i]) {
        this._sounds[i].resume();
      }
    }
  }

  /**
   * Decodes an audio file for playback.
   * @param {string} key - The key of the sound to decode.
   */
  decode(key) {
    const soundData = this.game.cache.getSoundData(key);
    if (!soundData) {
      return;
    }
    if (this.game.cache.isSoundDecoded(key) === true) {
      return;
    }
    this.game.cache.updateSound(key, 'isDecoding', true);
    this.context
      .decodeAudioData(soundData)
      .then((buffer) => {
        this.game.cache.decodedSound(key, buffer);
      })
      .catch((error) => {
        const typedError = error instanceof Error ? error : new Error(String(error));
        this.game.logger.exception('SoundManager', typedError, { tags: { 'asset.key': key } });
        if (typedError.name === 'InvalidStateError') {
          addPageLifecycleCallback(PAGE_LIFECYCLE_STATE_ACTIVE, () => {
            this.decode(key);
          });
        } else if (typedError.name === 'EncodingError') {
          this._watchList.remove(key);
        }
      });
  }

  /**
   * Sets up a callback to be called when audio files are decoded.
   * @param {Sound[]|string[]} files - The sound files or keys to wait for.
   * @param {Function} callback - The callback function to call when all files are decoded.
   * @param {object} callbackContext - The context in which to call the callback.
   */
  setDecodedCallback(files, callback, callbackContext) {
    if (typeof files === 'string') {
      files = [files];
    }
    this._watchList.reset();
    for (let i = 0; i < files.length; i += 1) {
      if (files[i] instanceof Sound) {
        if (!this.game.cache.isSoundDecoded(files[i].key)) {
          this._watchList.add(files[i].key);
        }
      } else if (!this.game.cache.isSoundDecoded(files[i])) {
        this._watchList.add(files[i]);
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
  update() {
    if (this.noAudio) {
      return;
    }
    for (let i = 0; i < this._sounds.length; i += 1) {
      this._sounds[i].update();
    }
    if (this._watching) {
      let key = this._watchList.first;
      while (key) {
        if (this.game.cache.isSoundDecoded(key)) {
          this._watchList.remove(key);
        }
        key = this._watchList.next;
      }
      if (this._watchList.total === 0) {
        this.game.logger.info('All sounds decoded');
        this._watching = false;
        this._watchCallback.call(this._watchContext);
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
  add(key, volume = 1, loop = false, connect = this.connectToMaster) {
    const sound = new Sound(this.game, key, volume, loop, connect);
    this._sounds.push(sound);
    return sound;
  }

  /**
   * Adds a new sound sprite to the manager.
   * @param {string} key - The key of the sound sprite to add.
   * @returns {SoundSprite} The created SoundSprite object.
   */
  addSprite(key) {
    return new SoundSprite(this.game, key);
  }

  /**
   * Removes a sound from the manager.
   * @param {Sound | null | undefined} sound - The sound object to remove.
   * @returns {boolean} True if the sound was removed, false otherwise.
   */
  remove(sound) {
    let i = this._sounds.length;
    while (i) {
      i -= 1;
      if (this._sounds[i] === sound) {
        this._sounds[i].destroy(false);
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
  removeByKey(key) {
    let i = this._sounds.length;
    let removed = 0;
    while (i) {
      i -= 1;
      if (this._sounds[i].key === key) {
        this._sounds[i].destroy(false);
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
  play(key, volume = 1, loop = false) {
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
  setMute() {
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
  unsetMute() {
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
  destroy() {
    this.stopAll();
    for (let i = 0; i < this._sounds.length; i += 1) {
      if (this._sounds[i]) {
        this._sounds[i].destroy();
      }
    }
    this._sounds = [];
    this.onChange.dispose();
    if (this.context?.close) {
      this.context.close();
    }
  }

  /**
   * Gets the muted state of the sound manager.
   * @returns {boolean} True if the manager is muted, false otherwise.
   */
  get mute() {
    return this._muted;
  }

  /**
   * Sets the muted state of the sound manager.
   */
  set mute(value) {
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
  get volume() {
    return this._volume;
  }

  /**
   * Sets the volume level of the sound manager.
   */
  set volume(value) {
    if (value < 0) {
      value = 0;
    } else if (value > 1) {
      value = 1;
    }
    if (this._volume !== value) {
      this._volume = value;
      if (!this.noAudio) {
        this.masterGain.gain.value = value;
      }
    }
  }
}
