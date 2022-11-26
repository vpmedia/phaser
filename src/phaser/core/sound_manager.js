/**
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 */
import ArraySet from './array_set';
import Signal from './signal';
import Sound from './sound';

export default class {

  constructor(game) {
    this.game = game;
    this.onSoundDecode = new Signal();
    this.onVolumeChange = new Signal();
    this.onLockChange = new Signal();
    this.onMute = new Signal();
    this.onUnMute = new Signal();
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
      } catch (e) {
        this.context = null;
        this.noAudio = true;
        this.isLocked = false;
        this.game.exceptionHandler(e);
      }
    } else if (window.webkitAudioContext) {
      try {
        this.context = new window.webkitAudioContext();
      } catch (e) {
        this.context = null;
        this.noAudio = true;
        this.isLocked = false;
        this.game.exceptionHandler(e);
      }
    }
    if (this.context === null || (this.context && this.context.createGain === undefined && this.context.createGainNode === undefined)) {
      this.noAudio = true;
      return;
    } 
    this.baseLatency = this.context.baseLatency || (256 / (this.context.sampleRate || 44100));
    if (this.context.createGain === undefined) {
      this.masterGain = this.context.createGainNode();
    } else {
      this.masterGain = this.context.createGain();
    }
    this.masterGain.gain.value = 1;
    this.masterGain.connect(this.context.destination);
    // handle audio state unlock
    this.onUnlockEventBinded = this.onUnlockEvent.bind(this);
    if (this.isUnlockNeeded()) {
      this.addUnlockHandlers();
    }
    this.context.addEventListener('statechange', () => {
      this.onLockChange.dispatch('onContextStateChange', { state: this.context.state, isLocked: this.isLocked });
      if (this.isUnlockNeeded()) {
        this.addUnlockHandlers();
      }  
    });
  }

  isUnlockNeeded() {
    return !this.isLocked && !this.noAudio && (this.context.state === 'suspended' || this.context.state === 'interrupted');
  }

  addUnlockHandlers() {
    this.onLockChange.dispatch('addUnlockHandlers', { state: this.context.state, isLocked: this.isLocked });
    document.body.addEventListener('touchstart', this.onUnlockEventBinded, false);
    document.body.addEventListener('touchend', this.onUnlockEventBinded, false);
    document.body.addEventListener('click', this.onUnlockEventBinded, false);
    document.body.addEventListener('keydown', this.onUnlockEventBinded, false);
    this.isLocked = true;
  }

  removeUnlockHandlers() {
    this.onLockChange.dispatch('removeUnlockHandlers', { state: this.context.state, isLocked: this.isLocked });
    document.body.removeEventListener('touchstart', this.onUnlockEventBinded);
    document.body.removeEventListener('touchend', this.onUnlockEventBinded);
    document.body.removeEventListener('click', this.onUnlockEventBinded);
    document.body.removeEventListener('keydown', this.onUnlockEventBinded);
    this.isLocked = false;
  }

  onUnlockEvent(event) {
    this.onLockChange.dispatch('onUnlockEvent', { state: this.context.state, isLocked: this.isLocked, event });
    if (!this.isUnlockNeeded()) {
      this.removeUnlockHandlers();
      return;
    }
    const initialState = this.context.state;
    this.context.resume().then(() => {
      this.onLockChange.dispatch('onContextResumeResult', { state: this.context.state, isLocked: this.isLocked });
      this.removeUnlockHandlers();
    }).catch((e) => {
      this.onLockChange.dispatch('onContextResumeReject', { state: this.context.state, isLocked: this.isLocked, error: e });
      this.removeUnlockHandlers();
      this.game.exceptionHandler(e, { initialState, state: this.context.state });
    });
  }

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

  decode(key, sound = null) {
    const soundData = this.game.cache.getSoundData(key);
    if (soundData) {
      if (this.game.cache.isSoundDecoded(key) === false) {
        this.game.cache.updateSound(key, 'isDecoding', true);
        this.context.decodeAudioData(soundData)
          .then((buffer) => {
            this.game.cache.decodedSound(key, buffer);
            this.onSoundDecode.dispatch(key, sound);
          })
          .catch((e) => {
            this.game.exceptionHandler(e, { key });
          });
      }
    }
  }

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
        this._watching = false;
        this._watchCallback.call(this._watchContext);
      }
    }
  }

  add(key, volume = 1, loop = false, connect = this.connectToMaster) {
    const sound = new Sound(this.game, key, volume, loop, connect);
    this._sounds.push(sound);
    return sound;
  }

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

  play(key, volume = 1, loop = false) {
    if (this.noAudio) {
      return null;
    }
    const sound = this.add(key, volume, loop);
    sound.play();
    return sound;
  }

  setMute() {
    if (this._muted) {
      return;
    }
    this._muted = true;
    if (!this.noAudio) {
      this._muteVolume = this.masterGain.gain.value;
      this.masterGain.gain.value = 0;
    }
    this.onMute.dispatch();
  }

  unsetMute() {
    if (!this._muted || this._codeMuted) {
      return;
    }
    this._muted = false;
    if (!this.noAudio) {
      this.masterGain.gain.value = this._muteVolume;
    }
    this.onUnMute.dispatch();
  }

  destroy() {
    this.stopAll();
    for (let i = 0; i < this._sounds.length; i += 1) {
      if (this._sounds[i]) {
        this._sounds[i].destroy();
      }
    }
    this._sounds = [];
    this.onSoundDecode.dispose();
    if (this.context) {
      if (window.PhaserRegistry) {
        window.PhaserRegistry.audioContext = this.context;
      } else if (this.context.close) {
        this.context.close();
      }
    }
  }

  get mute() {
    return this._muted;
  }

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

  get volume() {
    return this._volume;
  }

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
      this.onVolumeChange.dispatch(value);
    }
  }

}
