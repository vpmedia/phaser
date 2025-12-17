import { Signal } from './signal.js';

export class Animation {
  /**
   * Creates a new Animation instance.
   * @param {import('./game.js').Game} game - The game instance this animation belongs to.
   * @param {import('../display/image.js').Image} parent - The Image object that owns this animation.
   * @param {string} name - The unique name of this animation.
   * @param {import('./frame_data.js').FrameData} frameData - The FrameData object that contains the frames for this animation.
   * @param {string[]|number[]} frames - An array of frame identifiers (names or indices) to use in this animation.
   * @param {number} frameRate - The frame rate at which this animation should play (frames per second).
   * @param {boolean} loop - Whether the animation should loop when it completes.
   */
  constructor(game, parent, name, frameData, frames, frameRate, loop = false) {
    /** @type {import('./game.js').Game} */
    this.game = game;
    this._parent = parent;
    /** @type {import('./frame_data.js').FrameData} */
    this._frameData = frameData;
    /** @type {string} */
    this.name = name;
    this._frames = [];
    this._frames = this._frames.concat(frames);
    /** @type {number} */
    this.delay = 1000 / frameRate;
    /** @type {boolean} */
    this.loop = loop;
    /** @type {number} */
    this.loopCount = 0;
    /** @type {boolean} */
    this.isFinished = false;
    /** @type {boolean} */
    this.isPlaying = false;
    /** @type {boolean} */
    this.isPaused = false;
    /** @type {number} */
    this._pauseStartTime = 0;
    /** @type {number} */
    this._frameIndex = 0;
    /** @type {number} */
    this._frameDiff = 0;
    /** @type {number} */
    this._frameSkip = 1;
    this.currentFrame = this._frameData.getFrame(this._frames[this._frameIndex]);
    /** @type {Signal} */
    this.onStart = new Signal();
    /** @type {Signal} */
    this.onUpdate = null;
    /** @type {Signal} */
    this.onComplete = new Signal();
    /** @type {Signal} */
    this.onLoop = new Signal();
    /** @type {boolean} */
    this.isReversed = false;
    //  Set-up some event listeners
    this.game.onPause.add(this.onPause, this);
    this.game.onResume.add(this.onResume, this);
  }

  /**
   * Plays this animation.
   * @param {number} frameRate - The new frame rate to use for this animation (if null, uses the original frame rate).
   * @param {boolean} loop - Whether to loop this animation (if null, uses the original loop setting).
   * @returns {Animation} This Animation instance for chaining.
   */
  play(frameRate = null, loop = null) {
    if (typeof frameRate === 'number') {
      //  If they set a new frame rate then use it, otherwise use the one set on creation
      this.delay = 1000 / frameRate;
    }
    if (typeof loop === 'boolean') {
      //  If they set a new loop value then use it, otherwise use the one set on creation
      this.loop = loop;
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
   * Restarts this animation from the beginning.
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
   * Reverses the direction of this animation.
   * @returns {Animation} This Animation instance for chaining.
   */
  reverse() {
    this.reversed = !this.reversed;
    return this;
  }

  /**
   * Reverses the animation direction once, then returns to normal direction.
   * @returns {Animation} This Animation instance for chaining.
   */
  reverseOnce() {
    this.onComplete.addOnce(this.reverse, this);
    return this.reverse();
  }

  /**
   * Sets the current frame of this animation.
   * @param {string|number} frameId - The identifier (name or index) of the frame to set.
   * @param {boolean} useLocalFrameIndex - If true, treats frameId as an index into the local frames array.
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
   * Stops this animation.
   * @param {boolean} resetFrame - If true, resets to the first frame.
   * @param {boolean} dispatchComplete - If true, dispatches the onComplete signal.
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
   * Called when the game is paused.
   */
  onPause() {
    if (this.isPlaying) {
      this._frameDiff = this._timeNextFrame - this.game.time.time;
    }
  }

  /**
   * Called when the game is resumed.
   */
  onResume() {
    if (this.isPlaying) {
      this._timeNextFrame = this.game.time.time + this._frameDiff;
    }
  }

  /**
   * Updates this animation.
   * @returns {boolean} True if the animation was updated, false otherwise.
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
   * Updates the current frame of this animation.
   * @param {boolean} signalUpdate - Whether to signal the update event.
   * @param {boolean} fromPlay - Whether this call is from play().
   * @returns {boolean} True if the frame was updated, false otherwise.
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
   * Advances the animation to the next frame(s).
   * @param {number} quantity - The number of frames to advance by.
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
   * Moves the animation to the previous frame(s).
   * @param {number} quantity - The number of frames to move back by.
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
   * Updates the frame data used by this animation.
   * @param {import('./frame_data.js').FrameData} frameData - The new FrameData object to use.
   */
  updateFrameData(frameData) {
    this._frameData = frameData;
    this.currentFrame = this._frameData
      ? this._frameData.getFrame(this._frames[this._frameIndex % this._frames.length])
      : null;
  }

  /**
   * Destroys this animation and cleans up resources.
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
   * Completes this animation, setting it to the final frame.
   */
  complete() {
    this._frameIndex = this._frames.length - 1;
    this.currentFrame = this._frameData.getFrame(this._frames[this._frameIndex]);
    this.isPlaying = false;
    this.isFinished = true;
    this.paused = false;
    this._parent.events.onAnimationComplete$dispatch(this._parent, this);
    this.onComplete.dispatch(this._parent, this);
  }

  /**
   * Gets whether this animation is currently paused.
   * @returns {boolean} True if the animation is paused, false otherwise.
   */
  get paused() {
    return this.isPaused;
  }

  /**
   * Sets whether this animation is currently paused.
   * @param {boolean} value - True to pause the animation, false to resume it.
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
   * Gets whether this animation is currently reversed.
   * @returns {boolean} True if the animation is reversed, false otherwise.
   */
  get reversed() {
    return this.isReversed;
  }

  /**
   * Sets whether this animation is currently reversed.
   * @param {boolean} value - True to reverse the animation, false to normal direction.
   */
  set reversed(value) {
    this.isReversed = value;
  }

  /**
   * Gets the total number of frames in this animation.
   * @returns {number} The total number of frames.
   */
  get frameTotal() {
    return this._frames.length;
  }

  /**
   * Gets the current frame index.
   * @returns {number} The current frame index.
   */
  get frame() {
    if (this.currentFrame !== null) {
      return this.currentFrame.index;
    }
    return this._frameIndex;
  }

  /**
   * Sets the current frame index.
   * @param {number} value - The new frame index to set.
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
   * Gets the current animation speed (frame rate).
   * @returns {number} The frame rate in frames per second.
   */
  get speed() {
    return 1000 / this.delay;
  }

  /**
   * Sets the animation speed (frame rate).
   * @param {number} value - The new frame rate in frames per second.
   */
  set speed(value) {
    if (value > 0) {
      this.delay = 1000 / value;
    }
  }

  /**
   * Gets whether the update signal is enabled.
   * @returns {boolean} True if the update signal is enabled, false otherwise.
   */
  get enableUpdate() {
    return this.onUpdate !== null;
  }

  /**
   * Sets whether the update signal is enabled.
   * @param {boolean} value - True to enable the update signal, false to disable it.
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
