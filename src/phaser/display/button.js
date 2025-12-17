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
   * Creates a new Button instance.
   * @param {import('../core/game.js').Game} game - The game instance this button belongs to.
   * @param {number} x - The x position of the button.
   * @param {number} y - The y position of the button.
   * @param {string} key - The texture key to use for the button.
   * @param {Function} callback - The function to call when the button is clicked.
   * @param {object} callbackContext - The context in which to call the callback function.
   * @param {string} overFrame - The frame identifier to use when the mouse is over the button.
   * @param {string} outFrame - The frame identifier to use when the mouse is outside the button.
   * @param {string} downFrame - The frame identifier to use when the button is pressed.
   * @param {string} upFrame - The frame identifier to use when the button is released.
   * @param {string} disabledFrame - The frame identifier to use when the button is disabled.
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
   * Destroys this button and cleans up resources.
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
   * Sets whether this button is enabled or disabled.
   * @param {boolean} isEnabled - Whether the button should be enabled (true) or disabled (false).
   * @param {boolean} isImmediate - Whether to change the state immediately or with a delay (default: false).
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
   * Clears all the frame settings for this button.
   */
  clearFrames() {
    this.setFrames(null, null, null, null, null);
  }

  /**
   * Called when this button is removed from the world.
   */
  removedFromWorld() {
    this.inputEnabled = false;
  }

  /**
   * Sets a specific frame for a particular state of this button.
   * @param {string} state - The state name (Over, Out, Down, Up, Disabled).
   * @param {string} frame - The frame identifier to set for this state.
   * @param {boolean} switchImmediately - Whether to switch to the new frame immediately (default: false).
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
   * Changes the frame of this button to match the specified state.
   * @param {string} newState - The new state to change to (Over, Out, Down, Up, Disabled).
   * @returns {boolean} True if the frame was changed, false otherwise.
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
   * Sets the frame identifiers for all states of this button.
   * @param {string} overFrame - The frame identifier to use when the mouse is over the button.
   * @param {string} outFrame - The frame identifier to use when the mouse is outside the button.
   * @param {string} downFrame - The frame identifier to use when the button is pressed.
   * @param {string} upFrame - The frame identifier to use when the button is released.
   * @param {string} disabledFrame - The frame identifier to use when the button is disabled.
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
   * Handles the input over event for this button.
   * @param {object} sprite - The sprite that triggered the event.
   * @param {object} pointer - The pointer that triggered the event.
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
   * Handles the input out event for this button.
   * @param {object} sprite - The sprite that triggered the event.
   * @param {object} pointer - The pointer that triggered the event.
   */
  onInputOutHandler(sprite, pointer) {
    this.changeStateFrame(STATE_OUT);
    if (this.onInputOut) {
      this.onInputOut.dispatch(this, pointer);
    }
  }

  /**
   * Handles the input down event for this button.
   * @param {object} sprite - The sprite that triggered the event.
   * @param {object} pointer - The pointer that triggered the event.
   */
  onInputDownHandler(sprite, pointer) {
    this.changeStateFrame(STATE_DOWN);
    if (this.onInputDown) {
      this.onInputDown.dispatch(this, pointer);
    }
  }

  /**
   * Handles the input up event for this button.
   * @param {object} sprite - The sprite that triggered the event.
   * @param {object} pointer - The pointer that triggered the event.
   * @param {boolean} isOver - Whether the pointer is currently over the button (default: true).
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
   * Gets whether input is currently enabled for this button.
   * @returns {boolean} True if input is enabled, false otherwise.
   */
  get inputEnabled() {
    return this.input && this.input.enabled;
  }

  /**
   * Sets whether input is currently enabled for this button.
   * @param {boolean} value - Whether to enable (true) or disable (false) input.
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
