import {
  addPageLifecycleCallback,
  getPageLifecycleEventEmitter,
  PAGE_LIFECYCLE_STATE_ACTIVE,
  PAGE_LIFECYCLE_STATE_CHANGE_EVENT,
} from '@vpmedia/simplify';
import { ArraySet } from './array_set.js';
import { Signal } from './signal.js';
import { Sound } from './sound.js';
import { SoundSprite } from './sound_sprite.js';

export class SoundManager {
  /**
   * TBD.
   * @param {import('./game.js').Game} game - TBD.
   */
  constructor(game) {
    this.game = game;
    this.onChange = new Signal();
    /** @type {AudioContext} */
    this.context = null;
    this.baseLatency = 0; // https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/baseLatency
    this.noAudio = false;
    this.connectToMaster = true;
    this.isLocked = false;
    this.muteOnPause = true;
    this._codeMuted = false;
    this._muted = false;
    this._unlockSource = null;
    this._volume = 1;
    this._sounds = [];
    this._watchList = new ArraySet();
    this._watching = false;
    this._watchCallback = null;
    this._watchContext = null;
  }

  /**
   * TBD.
   */
  boot() {
    if (this.game.config.isForceDisabledAudio) {
      this.noAudio = true;
      return;
    }
    if (window.PhaserRegistry && window.PhaserRegistry.audioContext) {
      this.context = window.PhaserRegistry.audioContext;
    } else if (window.AudioContext) {
      try {
        this.context = new window.AudioContext();
      } catch (error) {
        this.context = null;
        this.noAudio = true;
        this.isLocked = false;
        this.game.exceptionHandler(error);
      }
    } else if (window.webkitAudioContext) {
      try {
        this.context = new window.webkitAudioContext();
      } catch (error) {
        this.context = null;
        this.noAudio = true;
        this.isLocked = false;
        this.game.exceptionHandler(error);
      }
    }
    if (
      this.context === null ||
      (this.context && this.context.createGain === undefined && this.context.createGainNode === undefined)
    ) {
      this.game.exceptionHandler(new Error('Error creating AudioContext'));
      this.noAudio = true;
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
   * TBD.
   */
  onPageLifecycleChange = () => {
    if (!document.hidden) {
      this.checkUnlockHandlers();
    }
  };

  /**
   * TBD.
   */
  onContextStateChange = () => {
    this.game.logger.info('onContextStateChange', {
      state: this.context.state,
      isLocked: this.isLocked,
    });
    this.checkUnlockHandlers();
  };

  /**
   * TBD.
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
   * TBD.
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
   * TBD.
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
   * TBD.
   * @param {Event} event - TBD.
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
        this.game.exceptionHandler(error, { 'audio.initialState': initialState, 'audio.state': this.context.state });
      });
  };

  /**
   * TBD.
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
   * TBD.
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
   * TBD.
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
   * TBD.
   * @param {string} key - TBD.
   */
  decode(key) {
    const soundData = this.game.cache.getSoundData(key);
    if (soundData) {
      if (this.game.cache.isSoundDecoded(key) === false) {
        this.game.cache.updateSound(key, 'isDecoding', true);
        this.context
          .decodeAudioData(soundData)
          .then((buffer) => {
            this.game.cache.decodedSound(key, buffer);
          })
          .catch((error) => {
            this.game.exceptionHandler(error, { 'asset.key': key });
            const typedError = error instanceof Error ? error : new Error(error);
            if (typedError.name === 'InvalidStateError') {
              addPageLifecycleCallback(PAGE_LIFECYCLE_STATE_ACTIVE, () => {
                this.decode(key);
              });
            }
          });
      }
    }
  }

  /**
   * TBD.
   * @param {Sound[]|string[]} files - TBD.
   * @param {Function} callback - TBD.
   * @param {object} callbackContext - TBD.
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
      this.game.logger.info('All sounds decoded');
      this._watching = false;
      callback.call(callbackContext);
    } else {
      this._watching = true;
      this._watchCallback = callback;
      this._watchContext = callbackContext;
    }
  }

  /**
   * TBD.
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
   * TBD.
   * @param {string} key - TBD.
   * @param {number} volume - TBD.
   * @param {boolean} loop - TBD.
   * @param {boolean} connect - TBD.
   * @returns {Sound} TBD.
   */
  add(key, volume = 1, loop = false, connect = this.connectToMaster) {
    const sound = new Sound(this.game, key, volume, loop, connect);
    this._sounds.push(sound);
    return sound;
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @returns {SoundSprite} TBD.
   */
  addSprite(key) {
    return new SoundSprite(this.game, key);
  }

  /**
   * TBD.
   * @param {Sound} sound - TBD.
   * @returns {boolean} TBD.
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
   * TBD.
   * @param {string} key - TBD.
   * @returns {number} TBD.
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
   * TBD.
   * @param {string} key - TBD.
   * @param {number} volume - TBD.
   * @param {boolean} loop - TBD.
   * @returns {Sound} TBD.
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
   * TBD.
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
   * TBD.
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
   * TBD.
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
    if (this.context) {
      if (window.PhaserRegistry) {
        window.PhaserRegistry.audioContext = this.context;
      } else if (this.context.close) {
        this.context.close();
      }
    }
  }

  /**
   * TBD.
   * @returns {boolean} TBD.
   */
  get mute() {
    return this._muted;
  }

  /**
   * TBD.
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
   * TBD.
   * @returns {number} TBD.
   */
  get volume() {
    return this._volume;
  }

  /**
   * TBD.
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
