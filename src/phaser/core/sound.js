import { Signal } from  './signal';

export class Sound {
  /**
   *
   * @param game
   * @param key
   * @param volume
   * @param loop
   * @param connect
   */
  constructor(game, key, volume = 1, loop = false, connect = null) {
    // TODO
    // https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Migrating_from_webkitAudioContext
    if (!connect) {
      connect = game.sound.connectToMaster;
    }
    this.game = game;
    this.name = key;
    this.key = key;
    this.loop = loop;
    this.markers = {};
    this.context = null;
    this.autoplay = false;
    this.totalDuration = 0;
    this.startTime = 0;
    this.currentTime = 0;
    this.duration = 0;
    this.durationMS = 0;
    this.position = 0;
    this.stopTime = 0;
    this.paused = false;
    this.pausedPosition = 0;
    this.pausedTime = 0;
    this.isPlaying = false;
    this.currentMarker = '';
    this.fadeTween = null;
    this.pendingPlayback = false;
    this.override = false;
    this.allowMultiple = false;
    this.externalNode = null;
    this.masterGainNode = null;
    this.gainNode = null;
    this._sound = null;
    this._markedToDelete = false;
    this._removeFromSoundManager = false;
    if (!this.game.sound.noAudio) {
      this.context = this.game.sound.context;
      this.masterGainNode = this.game.sound.masterGain;
      if (this.context.createGain === undefined) {
        this.gainNode = this.context.createGainNode();
      } else {
        this.gainNode = this.context.createGain();
      }
      this.gainNode.gain.value = volume * this.game.sound.volume;
      if (connect) {
        this.gainNode.connect(this.masterGainNode);
      }
    }
    this.onPlay = new Signal();
    this.onPause = new Signal();
    this.onResume = new Signal();
    this.onLoop = new Signal();
    this.onStop = new Signal();
    this.onMute = new Signal();
    this.onMarkerComplete = new Signal();
    this.onFadeComplete = new Signal();
    this._volume = volume;
    this._buffer = null;
    this._muted = false;
    this._tempMarker = 0;
    this._tempPosition = 0;
    this._tempVolume = 0;
    this._tempPause = 0;
    this._muteVolume = 0;
    this._tempLoop = 0;
    this._paused = false;
  }

  /**
   *
   * @param key
   */
  soundHasUnlocked(key) {
    if (key === this.key) {
      this._sound = this.game.cache.getSoundData(this.key);
      this.totalDuration = this._sound.duration;
    }
  }

  /**
   *
   * @param name
   * @param start
   * @param duration
   * @param volume
   * @param loop
   */
  addMarker(name, start, duration = 1, volume = 1, loop = false) {
    this.markers[name] = {
      name,
      start,
      stop: start + duration,
      volume,
      duration,
      durationMS: duration * 1000,
      loop,
    };
  }

  /**
   *
   * @param name
   */
  removeMarker(name) {
    delete this.markers[name];
  }

  /**
   *
   */
  onEndedHandler() {
    this._sound.onended = null;
    this.isPlaying = false;
    this.currentTime = this.durationMS;
    this.stop();
    if (this._markedToDelete) {
      if (this.externalNode) {
        this._sound.disconnect(this.externalNode);
      } else if (this.gainNode) {
        this._sound.disconnect(this.gainNode);
      }
      if (this._removeFromSoundManager) {
        this.game.sound.remove(this);
      } else {
        this.markers = {};
        this.context = null;
        this._buffer = null;
        this.externalNode = null;
        this.onPlay.dispose();
        this.onPause.dispose();
        this.onResume.dispose();
        this.onLoop.dispose();
        this.onStop.dispose();
        this.onMute.dispose();
        this.onMarkerComplete.dispose();
      }
    }
  }

  /**
   *
   */
  update() {
    if (!this.game.cache.checkSoundKey(this.key)) {
      this.destroy();
      return;
    }
    if (this.pendingPlayback && this.game.cache.isSoundReady(this.key)) {
      this.pendingPlayback = false;
      this.play(this._tempMarker, this._tempPosition, this._tempVolume, this._tempLoop);
    }
    if (!this.isPlaying) {
      return;
    }
    this.currentTime = this.game.time.time - this.startTime;
    if (this.currentTime >= this.durationMS) {
      if (!this.game.sound.noAudio) {
        if (this.loop) {
          //  won't work with markers, needs to reset the position
          this.onLoop.dispatch(this);
          //  Gets reset by the play function
          this.isPlaying = false;
          if (this.currentMarker === '') {
            this.currentTime = 0;
            this.startTime = this.game.time.time;
            this.isPlaying = true; // play not called again in this case
          } else {
            this.onMarkerComplete.dispatch(this.currentMarker, this);
            this.play(this.currentMarker, 0, this.volume, true, true);
          }
        } else if (this.currentMarker !== '') {
          //  Stop if we're using an audio marker, otherwise we let onended handle it
          this.stop();
        }
      } else if (this.loop) {
        this.onLoop.dispatch(this);
        if (this.currentMarker === '') {
          this.currentTime = 0;
          this.startTime = this.game.time.time;
        }
        //  Gets reset by the play function
        this.isPlaying = false;
        this.play(this.currentMarker, 0, this.volume, true, true);
      } else {
        this.stop();
      }
    }
  }

  /**
   *
   * @param volume
   */
  loopFull(volume) {
    return this.play(null, 0, volume, true);
  }

  /**
   *
   * @param marker
   * @param position
   * @param volume
   * @param loop
   * @param forceRestart
   */
  play(marker, position, volume, loop, forceRestart) {
    if (marker === undefined || marker === false || marker === null) {
      marker = '';
    }
    if (forceRestart === undefined) {
      forceRestart = true;
    }

    if (this.isPlaying && !this.allowMultiple && !forceRestart && !this.override) {
      //  Use Restart instead
      return this;
    }
    if (this._sound && this.isPlaying && !this.allowMultiple && (this.override || forceRestart)) {
      if (!this.game.sound.noAudio) {
        if (this._sound.stop === undefined) {
          this._sound.noteOff(0);
        } else {
          this._sound.stop(0);
        }
        if (this.externalNode) {
          this._sound.disconnect(this.externalNode);
        } else if (this.gainNode) {
          this._sound.disconnect(this.gainNode);
        }
      }
      this.isPlaying = false;
    }
    if (marker === '' && Object.keys(this.markers).length > 0) {
      //  If they didn't specify a marker but this is an audio sprite,
      //  we should never play the entire thing
      return this;
    }
    if (marker !== '') {
      if (this.markers[marker]) {
        this.currentMarker = marker;
        //  Playing a marker? Then we default to the marker values
        this.position = this.markers[marker].start;
        this.volume = this.markers[marker].volume;
        this.loop = this.markers[marker].loop;
        this.duration = this.markers[marker].duration;
        this.durationMS = this.markers[marker].durationMS;
        if (typeof volume !== 'undefined') {
          this.volume = volume;
        }
        if (typeof loop !== 'undefined') {
          this.loop = loop;
        }
        this._tempMarker = marker;
        this._tempPosition = this.position;
        this._tempVolume = this.volume;
        this._tempLoop = this.loop;
      } else {
        console.warn('Sound.play: audio marker ' + marker + ' does not exist');
        return this;
      }
    } else {
      position = position || 0;
      if (volume === undefined) {
        volume = this._volume;
      }
      if (loop === undefined) {
        loop = this.loop;
      }
      this.position = Math.max(0, position);
      this.volume = volume;
      this.loop = loop;
      this.duration = 0;
      this.durationMS = 0;
      this._tempMarker = marker;
      this._tempPosition = position;
      this._tempVolume = volume;
      this._tempLoop = loop;
    }
    if (!this.game.sound.noAudio) {
      //  Does the sound need decoding?
      if (this.game.cache.isSoundDecoded(this.key)) {
        this._sound = this.context.createBufferSource();
        if (this.externalNode) {
          this._sound.connect(this.externalNode);
        } else {
          this._sound.connect(this.gainNode);
        }
        this._buffer = this.game.cache.getSoundData(this.key);
        this._sound.buffer = this._buffer;
        if (this.loop && marker === '') {
          this._sound.loop = true;
        }
        if (!this.loop && marker === '') {
          this._sound.onended = this.onEndedHandler.bind(this);
        }
        this.totalDuration = this._sound.buffer.duration;
        if (this.duration === 0) {
          this.duration = this.totalDuration;
          this.durationMS = Math.ceil(this.totalDuration * 1000);
        }
        //  Useful to cache this somewhere perhaps?
        if (this._sound.start === undefined) {
          this._sound.noteGrainOn(0, this.position, this.duration);
        } else if (this.loop && marker === '') {
          this._sound.start(0, 0);
        } else {
          this._sound.start(0, this.position, this.duration);
        }
        this.isPlaying = true;
        this.startTime = this.game.time.time;
        this.currentTime = 0;
        this.stopTime = this.startTime + this.durationMS;
        this.onPlay.dispatch(this);
      } else {
        this.pendingPlayback = true;
        if (
          this.game.cache.getSound(this.key) &&
          this.game.cache.getSound(this.key).isDecoding === false
        ) {
          this.game.sound.decode(this.key, this);
        }
      }
    } else if (this.game.cache.getSound(this.key) && this.game.cache.getSound(this.key).locked) {
      this.game.cache.reloadSound(this.key);
      this.pendingPlayback = true;
    } else if (this._sound && this._sound.readyState === 4) {
      this._sound.play();
      //  This doesn't become available until you call play(), wonderful ...
      this.totalDuration = this._sound.duration;
      if (this.duration === 0) {
        this.duration = this.totalDuration;
        this.durationMS = this.totalDuration * 1000;
      }
      this._sound.currentTime = this.position;
      this._sound.muted = this._muted;
      if (this._muted || this.game.sound.mute) {
        this._sound.volume = 0;
      } else {
        this._sound.volume = this._volume;
      }
      this.isPlaying = true;
      this.startTime = this.game.time.time;
      this.currentTime = 0;
      this.stopTime = this.startTime + this.durationMS;
      this.onPlay.dispatch(this);
    } else {
      this.pendingPlayback = true;
    }
    return this;
  }

  /**
   *
   * @param marker
   * @param position
   * @param volume
   * @param loop
   */
  restart(marker = '', position = 0, volume = 1, loop = false) {
    this.play(marker, position, volume, loop, true);
  }

  /**
   *
   */
  pause() {
    if (this.isPlaying && this._sound) {
      this.paused = true;
      this.pausedPosition = this.currentTime;
      this.pausedTime = this.game.time.time;
      this._tempPause = this._sound.currentTime;
      this.onPause.dispatch(this);
      this.stop();
    }
  }

  /**
   *
   */
  resume() {
    if (this.paused && this._sound) {
      if (!this.game.sound.noAudio) {
        const p = Math.max(0, this.position + this.pausedPosition / 1000);
        this._sound = this.context.createBufferSource();
        this._sound.buffer = this._buffer;
        if (this.externalNode) {
          this._sound.connect(this.externalNode);
        } else {
          this._sound.connect(this.gainNode);
        }
        if (this.loop) {
          this._sound.loop = true;
        }
        if (!this.loop && this.currentMarker === '') {
          this._sound.onended = this.onEndedHandler.bind(this);
        }
        const duration = this.duration - this.pausedPosition / 1000;
        if (this._sound.start === undefined) {
          this._sound.noteGrainOn(0, p, duration);
          // https://bugs.chromium.org/p/chromium/issues/detail?id=457099
        } else if (this.loop && this.game.device.chrome) {
          this._sound.start(0, p);
        } else {
          this._sound.start(0, p, duration);
        }
      }
      this.isPlaying = true;
      this.paused = false;
      this.startTime += this.game.time.time - this.pausedTime;
      this.onResume.dispatch(this);
    }
  }

  /**
   *
   */
  stop() {
    if (this.isPlaying && this._sound) {
      if (!this.game.sound.noAudio) {
        if (this._sound.stop === undefined) {
          this._sound.noteOff(0);
        } else {
          this._sound.stop(0);
        }
        if (this.externalNode) {
          this._sound.disconnect(this.externalNode);
        } else if (this.gainNode) {
          this._sound.disconnect(this.gainNode);
        }
      }
    }
    this.pendingPlayback = false;
    this.isPlaying = false;
    if (!this.paused) {
      const prevMarker = this.currentMarker;
      if (this.currentMarker !== '') {
        this.onMarkerComplete.dispatch(this.currentMarker, this);
      }
      this.currentMarker = '';
      if (this.fadeTween !== null) {
        this.fadeTween.stop();
      }
      this.onStop.dispatch(this, prevMarker);
    }
  }

  /**
   *
   * @param duration
   * @param loop
   * @param marker
   */
  fadeIn(duration, loop = false, marker = this.currentMarker) {
    if (this.paused) {
      return;
    }
    this.play(marker, 0, 0, loop);
    this.fadeTo(duration, 1);
  }

  /**
   *
   * @param duration
   */
  fadeOut(duration) {
    this.fadeTo(duration, 0);
  }

  /**
   *
   * @param duration
   * @param volume
   */
  fadeTo(duration = 100, volume = 0) {
    if (!this.isPlaying || this.paused || volume === this.volume) {
      return;
    }
    this.fadeTween = this.game.tweens.create(this).to({ volume }, duration, 'Linear', true);
    this.fadeTween.onComplete.add(this.fadeComplete, this);
  }

  /**
   *
   */
  fadeComplete() {
    this.onFadeComplete.dispatch(this, this.volume);
    if (this.volume === 0) {
      this.stop();
    }
  }

  /**
   *
   * @param remove
   */
  destroy(remove = true) {
    this._markedToDelete = true;
    this._removeFromSoundManager = remove;
    this.stop();
    if (remove) {
      this.game.sound.remove(this);
    } else {
      this.markers = {};
      this.context = null;
      this._buffer = null;
      this.externalNode = null;
      this.onPlay.dispose();
      this.onPause.dispose();
      this.onResume.dispose();
      this.onLoop.dispose();
      this.onStop.dispose();
      this.onMute.dispose();
      this.onMarkerComplete.dispose();
    }
  }

  /**
   *
   */
  get mute() {
    return this._muted || this.game.sound.mute;
  }

  /**
   *
   */
  set mute(value) {
    value = value || false;
    if (value === this._muted) {
      return;
    }
    if (value) {
      this._muted = true;
      this._muteVolume = this._tempVolume;
      if (!this.game.sound.noAudio) {
        this.gainNode.gain.value = 0;
      }
    } else {
      this._muted = false;
      if (!this.game.sound.noAudio) {
        this.gainNode.gain.value = this._muteVolume;
      }
    }
    this.onMute.dispatch(this);
  }

  /**
   *
   */
  get volume() {
    return this._volume;
  }

  /**
   *
   */
  set volume(value) {
    if (this._muted) {
      this._muteVolume = value;
      return;
    }
    this._tempVolume = value;
    this._volume = value;
    if (!this.game.sound.noAudio) {
      this.gainNode.gain.value = value;
    }
  }
}
