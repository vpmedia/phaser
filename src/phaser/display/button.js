import { BUTTON, POINTER_CONTACT } from '../core/const.js';
import { InputHandler } from '../core/input_handler.js';
import { Signal } from '../core/signal.js';
import { Image } from './image.js';

const STATE_OVER = 'Over';
const STATE_OUT = 'Out';
const STATE_DOWN = 'Down';
const STATE_UP = 'Up';
const STATE_DISABLED = 'Disabled';

export class Button extends Image {
  /**
   * TBD.
   * @param {import('../core/game.js').Game} game - TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   * @param {string} key - TBD.
   * @param {Function} callback - TBD.
   * @param {object} callbackContext - TBD.
   * @param {string} overFrame - TBD.
   * @param {string} outFrame - TBD.
   * @param {string} downFrame - TBD.
   * @param {string} upFrame - TBD.
   * @param {string} disabledFrame - TBD.
   */
  constructor(
    game,
    x = 0,
    y = 0,
    key = null,
    callback = null,
    callbackContext = null,
    overFrame = null,
    outFrame = null,
    downFrame = null,
    upFrame = null,
    disabledFrame = null
  ) {
    super(game, x, y, key, outFrame);
    this.type = BUTTON;
    this._onOverFrame = null;
    this._onOutFrame = null;
    this._onDownFrame = null;
    this._onUpFrame = null;
    this._onDisabledFrame = null;
    this.onInputOver = new Signal();
    this.onInputOut = new Signal();
    this.onInputDown = new Signal();
    this.onInputUp = new Signal();
    this.onOverMouseOnly = true;
    this.justReleasedPreventsOver = POINTER_CONTACT;
    this.freezeFrames = false;
    this.forceOut = false;
    this.input = new InputHandler(this);
    this.input.start(0, true);
    this.input.useHandCursor = true;
    this.setFrames(overFrame, outFrame, downFrame, upFrame, disabledFrame);
    if (callback !== null) {
      this.onInputUp.add(callback, callbackContext);
    }
    //  Redirect the input events to here so we can handle animation updates, etc
    this.events.onInputOver.add(this.onInputOverHandler, this);
    this.events.onInputOut.add(this.onInputOutHandler, this);
    this.events.onInputDown.add(this.onInputDownHandler, this);
    this.events.onInputUp.add(this.onInputUpHandler, this);
  }

  /**
   * TBD.
   */
  destroy() {
    this._onOverFrame = null;
    this._onOutFrame = null;
    this._onDownFrame = null;
    this._onUpFrame = null;
    this._onDisabledFrame = null;
    if (this.onInputOver) {
      this.onInputOver.dispose();
      this.onInputOut.dispose();
      this.onInputDown.dispose();
      this.onInputUp.dispose();
    }
    this.onInputOver = null;
    this.onInputOut = null;
    this.onInputDown = null;
    this.onInputUp = null;
    if (this.input) {
      this.input.destroy();
    }
    this.input = null;
    super.destroy();
  }

  /**
   * TBD.
   * @param {boolean} isEnabled - TBD.
   * @param {boolean} isImmediate - TBD.
   */
  setEnabled(isEnabled, isImmediate = false) {
    this.input.enabled = isEnabled;
    if (isImmediate) {
      this.changeStateFrame(isEnabled ? STATE_UP : STATE_DISABLED);
    } else {
      setTimeout(() => {
        this.changeStateFrame(isEnabled ? STATE_UP : STATE_DISABLED);
      }, 1);
    }
  }

  /**
   * TBD.
   */
  clearFrames() {
    this.setFrames(null, null, null, null, null);
  }

  /**
   * TBD.
   */
  removedFromWorld() {
    this.inputEnabled = false;
  }

  /**
   * TBD.
   * @param {string} state - TBD.
   * @param {string} frame - TBD.
   * @param {boolean} switchImmediately - TBD.
   */
  setStateFrame(state, frame, switchImmediately = false) {
    const frameKey = `_on${state}Frame`;
    if (frame) {
      this[frameKey] = frame;
      if (switchImmediately) {
        this.changeStateFrame(state);
      }
    } else {
      this[frameKey] = null;
    }
  }

  /**
   * TBD.
   * @param {string} newState - TBD.
   * @returns {boolean} TBD.
   */
  changeStateFrame(newState) {
    if (this.freezeFrames) {
      return false;
    }
    const state = this.input.enabled || !this._onDisabledFrame ? newState : STATE_DISABLED;
    const frameKey = `_on${state}Frame`;
    const frame = this[frameKey];
    if (typeof frame === 'string') {
      this.frameName = frame;
      return true;
    } else if (typeof frame === 'number') {
      this.frame = frame;
      return true;
    }
    return false;
  }

  /**
   * TBD.
   * @param {string} overFrame - TBD.
   * @param {string} outFrame - TBD.
   * @param {string} downFrame - TBD.
   * @param {string} upFrame - TBD.
   * @param {string} disabledFrame - TBD.
   */
  setFrames(overFrame, outFrame, downFrame, upFrame, disabledFrame = null) {
    this.setStateFrame(STATE_OVER, overFrame, this.input.pointerOver());
    this.setStateFrame(STATE_OUT, outFrame, !this.input.pointerOver());
    this.setStateFrame(STATE_DOWN, downFrame, this.input.pointerDown());
    this.setStateFrame(STATE_UP, upFrame, this.input.pointerUp());
    if (disabledFrame) {
      this.setStateFrame(STATE_DISABLED, disabledFrame, !this.input.enabled);
    }
  }

  /**
   * TBD.
   * @param {object} sprite - TBD.
   * @param {object} pointer - TBD.
   */
  onInputOverHandler(sprite, pointer) {
    if (pointer.justReleased() && (this.justReleasedPreventsOver & pointer.pointerMode) === pointer.pointerMode) {
      //  If the Pointer was only just released then we don't fire an over event
      return;
    }
    this.changeStateFrame(STATE_OVER);
    if (this.onOverMouseOnly && !pointer.isMouse) {
      return;
    }
    if (this.onInputOver) {
      this.onInputOver.dispatch(this, pointer);
    }
  }

  /**
   * TBD.
   * @param {object} sprite - TBD.
   * @param {object} pointer - TBD.
   */
  onInputOutHandler(sprite, pointer) {
    this.changeStateFrame(STATE_OUT);
    if (this.onInputOut) {
      this.onInputOut.dispatch(this, pointer);
    }
  }

  /**
   * TBD.
   * @param {object} sprite - TBD.
   * @param {object} pointer - TBD.
   */
  onInputDownHandler(sprite, pointer) {
    this.changeStateFrame(STATE_DOWN);
    if (this.onInputDown) {
      this.onInputDown.dispatch(this, pointer);
    }
  }

  /**
   * TBD.
   * @param {object} sprite - TBD.
   * @param {object} pointer - TBD.
   * @param {boolean} isOver - TBD.
   */
  onInputUpHandler(sprite, pointer, isOver) {
    if (this.onInputUp) {
      this.onInputUp.dispatch(this, pointer, isOver);
    }
    if (this.freezeFrames) {
      return;
    }
    if (this.forceOut === true || (this.forceOut & pointer.pointerMode) === pointer.pointerMode) {
      this.changeStateFrame(STATE_OUT);
    } else {
      const changedUp = this.changeStateFrame(STATE_UP);
      if (!changedUp) {
        //  No Up frame to show..
        if (isOver) {
          this.changeStateFrame(STATE_OVER);
        } else {
          this.changeStateFrame(STATE_OUT);
        }
      }
    }
  }

  /**
   * TBD.
   * @returns {boolean} TBD.
   */
  get inputEnabled() {
    return this.input && this.input.enabled;
  }

  /**
   * TBD.
   */
  set inputEnabled(value) {
    if (value) {
      if (this.input === null) {
        this.input = new InputHandler(this);
        this.input.start();
      } else if (this.input && !this.input.enabled) {
        this.input.start();
      }
    } else if (this.input && this.input.enabled) {
      this.input.stop();
    }
  }
}
