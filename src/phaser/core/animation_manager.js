import { Animation } from './animation';

export class AnimationManager {
  /**
   * TBD.
   * @param sprite
   */
  constructor(sprite) {
    this.sprite = sprite;
    this.game = sprite.game;
    this.currentFrame = null;
    this.currentAnim = null;
    this.updateIfVisible = true;
    this.isLoaded = false;
    this._frameData = null;
    this._anims = {};
    this._outputFrames = [];
  }

  /**
   * TBD.
   */
  destroy() {
    const keys = Object.keys(this._anims);
    for (let i = 0; i < keys.length; i += 1) {
      this._anims[keys[i]].destroy();
    }
    this._anims = {};
    this._outputFrames = [];
    this._frameData = null;
    this.currentAnim = null;
    this.currentFrame = null;
    this.sprite = null;
    this.game = null;
  }

  /**
   * TBD.
   * @param frameData
   * @param frame
   */
  loadFrameData(frameData, frame) {
    if (!frameData) {
      return false;
    }
    if (this.isLoaded) {
      // We need to update the frameData that the animations are using
      const keys = Object.keys(this._anims);
      for (let i = 0; i < keys.length; i += 1) {
        const anim = keys[i];
        this._anims[anim].updateFrameData(frameData);
      }
    }
    this._frameData = frameData;
    if (frame === undefined || frame === null) {
      this.frame = 0;
    } else if (typeof frame === 'string') {
      this.frameName = frame;
    } else {
      this.frame = frame;
    }
    this.isLoaded = true;
    return true;
  }

  /**
   * TBD.
   * @param frameData
   * @param frame
   */
  copyFrameData(frameData, frame) {
    this._frameData = frameData.clone();
    if (this.isLoaded) {
      // We need to update the frameData that the animations are using
      const keys = Object.keys(this._anims);
      for (let i = 0; i < keys.length; i += 1) {
        const anim = keys[i];
        this._anims[anim].updateFrameData(this._frameData);
      }
    }
    if (frame === undefined || frame === null) {
      this.frame = 0;
    } else if (typeof frame === 'string') {
      this.frameName = frame;
    } else {
      this.frame = frame;
    }
    this.isLoaded = true;
    return true;
  }

  /**
   * TBD.
   * @param name
   * @param frameList
   * @param frameRate
   * @param loop
   * @param useNumericIndex
   */
  add(name, frameList, frameRate = 60, loop = false, useNumericIndex = undefined) {
    const frames = frameList || [];
    //  If they didn't set the useNumericIndex then let's at least try and guess it
    if (useNumericIndex === undefined) {
      if (frames && typeof frames[0] === 'number') {
        useNumericIndex = true;
      } else {
        useNumericIndex = false;
      }
    }
    this._outputFrames = [];
    this._frameData.getFrameIndexes(frames, useNumericIndex, this._outputFrames);
    this._anims[name] = new Animation(
      this.game,
      this.sprite,
      name,
      this._frameData,
      this._outputFrames,
      frameRate,
      loop
    );
    this.currentAnim = this._anims[name];
    if (this.sprite.tilingTexture) {
      this.sprite.refreshTexture = true;
    }
    return this._anims[name];
  }

  /**
   * TBD.
   * @param frames
   * @param useNumericIndex
   */
  validateFrames(frames, useNumericIndex = false) {
    for (let i = 0; i < frames.length; i += 1) {
      if (useNumericIndex === true) {
        if (frames[i] > this._frameData.total) {
          return false;
        }
      } else if (this._frameData.checkFrameName(frames[i]) === false) {
        return false;
      }
    }
    return true;
  }

  /**
   * TBD.
   * @param name
   * @param frameRate
   * @param loop
   * @param killOnComplete
   */
  play(name, frameRate, loop, killOnComplete) {
    if (this._anims[name]) {
      if (this.currentAnim === this._anims[name]) {
        if (this.currentAnim.isPlaying === false) {
          this.currentAnim.paused = false;
          return this.currentAnim.play(frameRate, loop, killOnComplete);
        }
        return this.currentAnim;
      }
      if (this.currentAnim && this.currentAnim.isPlaying) {
        this.currentAnim.stop();
      }
      this.currentAnim = this._anims[name];
      this.currentAnim.paused = false;
      this.currentFrame = this.currentAnim.currentFrame;
      return this.currentAnim.play(frameRate, loop, killOnComplete);
    }
    return null;
  }

  /**
   * TBD.
   * @param name
   * @param resetFrame
   */
  stop(name, resetFrame = false) {
    if (this.currentAnim && (typeof name !== 'string' || name === this.currentAnim.name)) {
      this.currentAnim.stop(resetFrame);
    }
  }

  /**
   * TBD.
   */
  update() {
    if (this.updateIfVisible && !this.sprite.visible) {
      return false;
    }
    if (this.currentAnim && this.currentAnim.update()) {
      this.currentFrame = this.currentAnim.currentFrame;
      return true;
    }
    return false;
  }

  /**
   * TBD.
   * @param quantity
   */
  next(quantity) {
    if (this.currentAnim) {
      this.currentAnim.next(quantity);
      this.currentFrame = this.currentAnim.currentFrame;
    }
  }

  /**
   * TBD.
   * @param quantity
   */
  previous(quantity) {
    if (this.currentAnim) {
      this.currentAnim.previous(quantity);
      this.currentFrame = this.currentAnim.currentFrame;
    }
  }

  /**
   * TBD.
   * @param name
   */
  getAnimation(name) {
    if (name && this._anims[name]) {
      return this._anims[name];
    }
    return null;
  }

  /**
   * TBD.
   */
  refreshFrame() {
    // TODO
    console.warn('animation_manager.refreshFrame() is not implemented');
    // this.sprite.setTexture(PIXI.TextureCache[this.currentFrame.uuid]);
  }

  /**
   * TBD.
   */
  get frameData() {
    return this._frameData;
  }

  /**
   * TBD.
   */
  get frameTotal() {
    return this._frameData.total;
  }

  /**
   * TBD.
   */
  get paused() {
    return this.currentAnim.isPaused;
  }

  /**
   * TBD.
   */
  set paused(value) {
    this.currentAnim.paused = value;
  }

  /**
   * TBD.
   */
  get name() {
    if (this.currentAnim) {
      return this.currentAnim.name;
    }
    return null;
  }

  /**
   * TBD.
   */
  get frame() {
    if (this.currentFrame) {
      return this.currentFrame.index;
    }
    return 0;
  }

  /**
   * TBD.
   */
  set frame(value) {
    if (typeof value === 'number' && this._frameData && this._frameData.getFrame(value) !== null) {
      this.currentFrame = this._frameData.getFrame(value);
      if (this.currentFrame) {
        this.sprite.setFrame(this.currentFrame);
      }
    } else {
      console.warn('Cannot set frame: ' + value);
    }
  }

  /**
   * TBD.
   */
  get frameName() {
    if (this.currentFrame) {
      return this.currentFrame.name;
    }
    return null;
  }

  /**
   * TBD.
   */
  set frameName(value) {
    if (
      typeof value === 'string' &&
      this._frameData &&
      this._frameData.getFrameByName(value) !== null
    ) {
      this.currentFrame = this._frameData.getFrameByName(value);
      if (this.currentFrame) {
        this._frameIndex = this.currentFrame.index;
        this.sprite.setFrame(this.currentFrame);
      }
    } else {
      console.warn('Cannot set frameName: ' + value);
    }
  }
}
