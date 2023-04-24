import { Signal } from './signal';

export class Animation {
  /**
   * TBD.
   * @param {Game} game - TBD.
   * @param {Image} parent - TBD.
   * @param {string} name - TBD.
   * @param {FrameData} frameData - TBD.
   * @param {string[]|number[]} frames - TBD.
   * @param {number} frameRate - TBD.
   * @param {boolean} loop - TBD.
   */
  constructor(game, parent, name, frameData, frames, frameRate, loop = false) {
    this.game = game;
    this._parent = parent;
    this._frameData = frameData;
    this.name = name;
    this._frames = [];
    this._frames = this._frames.concat(frames);
    this.delay = 1000 / frameRate;
    this.loop = loop;
    this.loopCount = 0;
    this.killOnComplete = false;
    this.isFinished = false;
    this.isPlaying = false;
    this.isPaused = false;
    this._pauseStartTime = 0;
    this._frameIndex = 0;
    this._frameDiff = 0;
    this._frameSkip = 1;
    this.currentFrame = this._frameData.getFrame(this._frames[this._frameIndex]);
    this.onStart = new Signal();
    this.onUpdate = null;
    this.onComplete = new Signal();
    this.onLoop = new Signal();
    this.isReversed = false;
    //  Set-up some event listeners
    this.game.onPause.add(this.onPause, this);
    this.game.onResume.add(this.onResume, this);
  }

  /**
   * TBD.
   * @param {number} frameRate - TBD.
   * @param {boolean} loop - TBD.
   * @param {boolean} killOnComplete - TBD.
   * @returns {Animation} TBD.
   */
  play(frameRate, loop, killOnComplete) {
    if (typeof frameRate === 'number') {
      //  If they set a new frame rate then use it, otherwise use the one set on creation
      this.delay = 1000 / frameRate;
    }
    if (typeof loop === 'boolean') {
      //  If they set a new loop value then use it, otherwise use the one set on creation
      this.loop = loop;
    }
    if (typeof killOnComplete !== 'undefined') {
      //  Remove the parent sprite once the animation has finished?
      this.killOnComplete = killOnComplete;
    }
    this.isPlaying = true;
    this.isFinished = false;
    this.paused = false;
    this.loopCount = 0;
    this._timeLastFrame = this.game.time.time;
    this._timeNextFrame = this.game.time.time + this.delay;
    this._frameIndex = this.isReversed ? this._frames.length - 1 : 0;
    this.updateCurrentFrame(false, true);
    this._parent.events.onAnimationStart$dispatch(this._parent, this);
    this.onStart.dispatch(this._parent, this);
    this._parent.animations.currentAnim = this;
    this._parent.animations.currentFrame = this.currentFrame;
    return this;
  }

  /**
   * TBD.
   */
  restart() {
    this.isPlaying = true;
    this.isFinished = false;
    this.paused = false;
    this.loopCount = 0;
    this._timeLastFrame = this.game.time.time;
    this._timeNextFrame = this.game.time.time + this.delay;
    this._frameIndex = 0;
    this.currentFrame = this._frameData.getFrame(this._frames[this._frameIndex]);
    this._parent.setFrame(this.currentFrame);
    this._parent.animations.currentAnim = this;
    this._parent.animations.currentFrame = this.currentFrame;
    this.onStart.dispatch(this._parent, this);
  }

  /**
   * TBD.
   * @returns {Animation} TBD.
   */
  reverse() {
    this.reversed = !this.reversed;
    return this;
  }

  /**
   * TBD.
   * @returns {Animation} TBD.
   */
  reverseOnce() {
    this.onComplete.addOnce(this.reverse, this);
    return this.reverse();
  }

  /**
   * TBD.
   * @param {number|string} frameId - TBD.
   * @param {boolean} useLocalFrameIndex - TBD.
   */
  setFrame(frameId, useLocalFrameIndex = false) {
    let frameIndex;
    //  Find the index to the desired frame.
    if (typeof frameId === 'string') {
      for (let i = 0; i < this._frames.length; i += 1) {
        if (this._frameData.getFrame(this._frames[i]).name === frameId) {
          frameIndex = i;
        }
      }
    } else if (typeof frameId === 'number') {
      if (useLocalFrameIndex) {
        frameIndex = frameId;
      } else {
        for (let i = 0; i < this._frames.length; i += 1) {
          if (this._frames[i] === frameId) {
            frameIndex = i;
          }
        }
      }
    }
    if (frameIndex) {
      //  Set the current frame index to the found index. Subtract 1 so that it animates to the desired frame on update.
      this._frameIndex = frameIndex - 1;
      //  Make the animation update at next update
      this._timeNextFrame = this.game.time.time;
      this.update();
    }
  }

  /**
   * TBD.
   * @param {boolean} resetFrame - TBD.
   * @param {boolean} dispatchComplete - TBD.
   */
  stop(resetFrame = false, dispatchComplete = false) {
    this.isPlaying = false;
    this.isFinished = true;
    this.paused = false;
    if (resetFrame) {
      this.currentFrame = this._frameData.getFrame(this._frames[0]);
      if (this.currentFrame) {
        this._parent.setFrame(this.currentFrame);
      }
    }
    if (dispatchComplete) {
      this._parent.events.onAnimationComplete$dispatch(this._parent, this);
      this.onComplete.dispatch(this._parent, this);
    }
  }

  /**
   * TBD.
   */
  onPause() {
    if (this.isPlaying) {
      this._frameDiff = this._timeNextFrame - this.game.time.time;
    }
  }

  /**
   * TBD.
   */
  onResume() {
    if (this.isPlaying) {
      this._timeNextFrame = this.game.time.time + this._frameDiff;
    }
  }

  /**
   * TBD.
   * @returns {boolean} TBD.
   */
  update() {
    if (this.isPaused) {
      return false;
    }
    if (this.isPlaying && this.game.time.time >= this._timeNextFrame) {
      this._frameSkip = 1;
      //  Lagging?
      this._frameDiff = this.game.time.time - this._timeNextFrame;
      this._timeLastFrame = this.game.time.time;
      if (this._frameDiff > this.delay) {
        //  We need to skip a frame, work out how many
        this._frameSkip = Math.floor(this._frameDiff / this.delay);
        this._frameDiff -= this._frameSkip * this.delay;
      }
      //  And what's left now?
      this._timeNextFrame = this.game.time.time + (this.delay - this._frameDiff);
      if (this.isReversed) {
        this._frameIndex -= this._frameSkip;
      } else {
        this._frameIndex += this._frameSkip;
      }
      if (
        (!this.isReversed && this._frameIndex >= this._frames.length) ||
        (this.isReversed && this._frameIndex <= -1)
      ) {
        if (this.loop) {
          // Update current state before event callback
          this._frameIndex = Math.abs(this._frameIndex) % this._frames.length;
          if (this.isReversed) {
            this._frameIndex = this._frames.length - 1 - this._frameIndex;
          }
          this.currentFrame = this._frameData.getFrame(this._frames[this._frameIndex]);
          //  Instead of calling updateCurrentFrame we do it here instead
          if (this.currentFrame) {
            this._parent.setFrame(this.currentFrame);
          }
          this.loopCount += 1;
          this._parent.events.onAnimationLoop$dispatch(this._parent, this);
          this.onLoop.dispatch(this._parent, this);
          if (this.onUpdate) {
            this.onUpdate.dispatch(this, this.currentFrame);
            // False if the animation was destroyed from within a callback
            return !!this._frameData;
          }
          return true;
        }
        this.complete();
        return false;
      }
      return this.updateCurrentFrame(true);
    }

    return false;
  }

  /**
   * TBD.
   * @param {boolean} signalUpdate - TBD.
   * @param {boolean} fromPlay - TBD.
   * @returns {boolean} TBD.
   */
  updateCurrentFrame(signalUpdate, fromPlay = false) {
    if (!this._frameData || !this.currentFrame) {
      // The animation is already destroyed, probably from a callback
      return false;
    }
    //  Previous index
    const idx = this.currentFrame.index;
    this.currentFrame = this._frameData.getFrame(this._frames[this._frameIndex]);
    if (this.currentFrame && (fromPlay || (!fromPlay && idx !== this.currentFrame.index))) {
      this._parent.setFrame(this.currentFrame);
    }
    if (this.onUpdate && signalUpdate) {
      this.onUpdate.dispatch(this, this.currentFrame);
      // False if the animation was destroyed from within a callback
      return !!this._frameData;
    }
    return true;
  }

  /**
   * TBD.
   * @param {number} quantity - TBD.
   */
  next(quantity = 1) {
    let frame = this._frameIndex + quantity;
    if (frame >= this._frames.length) {
      if (this.loop) {
        frame %= this._frames.length;
      } else {
        frame = this._frames.length - 1;
      }
    }
    if (frame !== this._frameIndex) {
      this._frameIndex = frame;
      this.updateCurrentFrame(true);
    }
  }

  /**
   * TBD.
   * @param {number} quantity - TBD.
   */
  previous(quantity = 1) {
    let frame = this._frameIndex - quantity;
    if (frame < 0) {
      if (this.loop) {
        frame = this._frames.length + frame;
      } else {
        frame += 1;
      }
    }
    if (frame !== this._frameIndex) {
      this._frameIndex = frame;
      this.updateCurrentFrame(true);
    }
  }

  /**
   * TBD.
   * @param {FrameData} frameData - TBD.
   */
  updateFrameData(frameData) {
    this._frameData = frameData;
    this.currentFrame = this._frameData
      ? this._frameData.getFrame(this._frames[this._frameIndex % this._frames.length])
      : null;
  }

  /**
   * TBD.
   */
  destroy() {
    if (!this._frameData) {
      // Already destroyed
      return;
    }
    this.game.onPause.remove(this.onPause, this);
    this.game.onResume.remove(this.onResume, this);
    this.game = null;
    this._parent = null;
    this._frames = null;
    this._frameData = null;
    this.currentFrame = null;
    this.isPlaying = false;
    this.onStart.dispose();
    this.onLoop.dispose();
    this.onComplete.dispose();
    if (this.onUpdate) {
      this.onUpdate.dispose();
    }
  }

  /**
   * TBD.
   */
  complete() {
    this._frameIndex = this._frames.length - 1;
    this.currentFrame = this._frameData.getFrame(this._frames[this._frameIndex]);
    this.isPlaying = false;
    this.isFinished = true;
    this.paused = false;
    this._parent.events.onAnimationComplete$dispatch(this._parent, this);
    this.onComplete.dispatch(this._parent, this);
    if (this.killOnComplete) {
      this._parent.kill();
    }
  }

  /**
   * TBD.
   * @returns {boolean} TBD.
   */
  get paused() {
    return this.isPaused;
  }

  /**
   * TBD.
   */
  set paused(value) {
    this.isPaused = value;
    if (value) {
      this._pauseStartTime = this.game.time.time;
    } else if (this.isPlaying) {
      this._timeNextFrame = this.game.time.time + this.delay;
    }
  }

  /**
   * TBD.
   * @returns {boolean} TBD.
   */
  get reversed() {
    return this.isReversed;
  }

  /**
   * TBD.
   */
  set reversed(value) {
    this.isReversed = value;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get frameTotal() {
    return this._frames.length;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get frame() {
    if (this.currentFrame !== null) {
      return this.currentFrame.index;
    }
    return this._frameIndex;
  }

  /**
   * TBD.
   */
  set frame(value) {
    this.currentFrame = this._frameData.getFrame(this._frames[value]);
    if (this.currentFrame !== null) {
      this._frameIndex = value;
      this._parent.setFrame(this.currentFrame);
      if (this.onUpdate) {
        this.onUpdate.dispatch(this, this.currentFrame);
      }
    }
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get speed() {
    return 1000 / this.delay;
  }

  /**
   * TBD.
   */
  set speed(value) {
    if (value > 0) {
      this.delay = 1000 / value;
    }
  }

  /**
   * TBD.
   * @returns {boolean} TBD.
   */
  get enableUpdate() {
    return this.onUpdate !== null;
  }

  /**
   * TBD.
   */
  set enableUpdate(value) {
    if (value && this.onUpdate === null) {
      this.onUpdate = new Signal();
    } else if (!value && this.onUpdate !== null) {
      this.onUpdate.dispose();
      this.onUpdate = null;
    }
  }
}
