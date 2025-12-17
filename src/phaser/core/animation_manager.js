import { Animation } from './animation.js';
import { ENGINE_ERROR_CANNOT_SET_FRAME, ENGINE_ERROR_CANNOT_SET_FRAME_NAME } from './error_code.js';

export class AnimationManager {
  /**
   * Creates a new AnimationManager instance.
   * @param {import('../display/image.js').Image} sprite - Reference to the parent Sprite.
   */
  constructor(sprite) {
    this.sprite = sprite;
    this.game = sprite.game;
    /** @type {import('./frame.js').Frame} */
    this.currentFrame = null;
    /** @type {Animation} */
    this.currentAnim = null;
    this.updateIfVisible = true;
    this.isLoaded = false;
    /** @type {import('./frame_data.js').FrameData} */
    this._frameData = null;
    /** @type {{[key: string]: Animation}} */
    this._anims = {};
    /** @type {number[]} */
    this._outputFrames = [];
  }

  /**
   * Destroys the AnimationManager and cleans up resources.
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
   * Loads frame data into the AnimationManager.
   * @param {import('./frame_data.js').FrameData} frameData - The FrameData to load.
   * @param {string|number} frame - The frame index or name to set as current.
   * @returns {boolean} True if the frame data was loaded successfully, false otherwise.
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
   * Copies frame data into the AnimationManager.
   * @param {import('./frame_data.js').FrameData} frameData - The FrameData to copy.
   * @param {string|number} frame - The frame index or name to set as current.
   * @returns {boolean} True if the frame data was copied successfully, false otherwise.
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
   * Adds a new animation to the AnimationManager.
   * @param {string} name - The name of the animation.
   * @param {number[] | string[] | null | undefined} frameList - The list of frames to include in the animation.
   * @param {number} frameRate - The frame rate of the animation (frames per second).
   * @param {boolean} loop - Whether the animation should loop.
   * @param {boolean | undefined} useNumericIndex - Whether to treat frameList as numeric indices.
   * @returns {Animation} The created Animation object.
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
   * Validates a list of frames against the current frame data.
   * @param {string[] | number[]} frames - The list of frames to validate.
   * @param {boolean} useNumericIndex - Whether to treat frameList as numeric indices.
   * @returns {boolean} True if all frames are valid, false otherwise.
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
   * Plays an animation by name.
   * @param {string} name - The name of the animation to play.
   * @param {number} frameRate - The frame rate (frames per second) to play at, or null to use the animation's default.
   * @param {boolean} loop - Whether the animation should loop, or null to use the animation's default.
   * @returns {Animation} The Animation object that was played, or null if not found.
   */
  play(name, frameRate = null, loop = null) {
    if (this._anims[name]) {
      if (this.currentAnim === this._anims[name]) {
        if (this.currentAnim.isPlaying === false) {
          this.currentAnim.paused = false;
          return this.currentAnim.play(frameRate, loop);
        }
        return this.currentAnim;
      }
      if (this.currentAnim && this.currentAnim.isPlaying) {
        this.currentAnim.stop();
      }
      this.currentAnim = this._anims[name];
      this.currentAnim.paused = false;
      this.currentFrame = this.currentAnim.currentFrame;
      return this.currentAnim.play(frameRate, loop);
    }
    return null;
  }

  /**
   * Stops an animation by name.
   * @param {string} name - The name of the animation to stop, or null to stop the current animation.
   * @param {boolean} resetFrame - Whether to reset the frame to the first frame of the animation.
   */
  stop(name = null, resetFrame = false) {
    if (this.currentAnim && (typeof name !== 'string' || name === this.currentAnim.name)) {
      this.currentAnim.stop(resetFrame);
    }
  }

  /**
   * Updates the animation manager state.
   * @returns {boolean} True if an animation was updated, false otherwise.
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
   * Advances the current animation by a specified number of frames.
   * @param {number} quantity - The number of frames to advance by.
   */
  next(quantity) {
    if (this.currentAnim) {
      this.currentAnim.next(quantity);
      this.currentFrame = this.currentAnim.currentFrame;
    }
  }

  /**
   * Moves the current animation back by a specified number of frames.
   * @param {number} quantity - The number of frames to move back by.
   */
  previous(quantity) {
    if (this.currentAnim) {
      this.currentAnim.previous(quantity);
      this.currentFrame = this.currentAnim.currentFrame;
    }
  }

  /**
   * Gets an animation by name.
   * @param {string} name - The name of the animation to retrieve.
   * @returns {Animation} The Animation object, or null if not found.
   */
  getAnimation(name) {
    if (name && this._anims[name]) {
      return this._anims[name];
    }
    return null;
  }

  /**
   * Refreshes the current frame texture (not implemented).
   */
  refreshFrame() {
    // TODO
    this.game.logger.warn('animation_manager.refreshFrame() is not implemented');
    // this.sprite.setTexture(PIXI.TextureCache[this.currentFrame.uuid]);
  }

  /**
   * Gets the frame data used by this AnimationManager.
   * @returns {import('./frame_data.js').FrameData} The FrameData object.
   */
  get frameData() {
    return this._frameData;
  }

  /**
   * Gets the total number of frames in the frame data.
   * @returns {number} The total number of frames.
   */
  get frameTotal() {
    return this._frameData.total;
  }

  /**
   * Gets the paused state of the current animation.
   * @returns {boolean} True if the current animation is paused, false otherwise.
   */
  get paused() {
    return this.currentAnim.isPaused;
  }

  /**
   * Sets the paused state of the current animation.
   */
  set paused(value) {
    this.currentAnim.paused = value;
  }

  /**
   * Gets the name of the current animation.
   * @returns {string} The name of the current animation, or null if no animation is active.
   */
  get name() {
    if (this.currentAnim) {
      return this.currentAnim.name;
    }
    return null;
  }

  /**
   * Gets the current frame index.
   * @returns {number} The current frame index.
   */
  get frame() {
    if (this.currentFrame) {
      return this.currentFrame.index;
    }
    return 0;
  }

  /**
   * Sets the current frame index.
   */
  set frame(value) {
    if (typeof value === 'number' && this._frameData && this._frameData.getFrame(value) !== null) {
      this.currentFrame = this._frameData.getFrame(value);
      if (this.currentFrame) {
        this.sprite.setFrame(this.currentFrame);
      }
    } else {
      this.game.logger.exception('AnimationManager', new Error(ENGINE_ERROR_CANNOT_SET_FRAME), {
        tags: { 'asset.key': value },
      });
    }
  }

  /**
   * Gets the current frame name.
   * @returns {string} The current frame name, or null if no frame is set.
   */
  get frameName() {
    if (this.currentFrame) {
      return this.currentFrame.name;
    }
    return null;
  }

  /**
   * Sets the current frame by name.
   */
  set frameName(value) {
    if (typeof value === 'string' && this._frameData && this._frameData.getFrameByName(value) !== null) {
      this.currentFrame = this._frameData.getFrameByName(value);
      if (this.currentFrame) {
        this._frameIndex = this.currentFrame.index;
        this.sprite.setFrame(this.currentFrame);
      }
    } else {
      this.game.logger.exception('AnimationManager', new Error(ENGINE_ERROR_CANNOT_SET_FRAME_NAME), {
        tags: { 'asset.key': value },
      });
    }
  }
}
