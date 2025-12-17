import { Signal } from './signal.js';

export class EventManager {
  /**
   * Creates a new EventManager instance.
   * @param {import('../display/display_object.js').DisplayObject} sprite - Reference to the parent DisplayObject.
   */
  constructor(sprite) {
    this.parent = sprite;
    this._onAddedToGroup = null;
    this._onRemovedFromGroup = null;
    this._onDestroy = null;
    this._onOutOfBounds = null;
    this._onEnterBounds = null;
    this._onInputOver = null;
    this._onInputOut = null;
    this._onInputDown = null;
    this._onInputUp = null;
    this._onDragStart = null;
    this._onDragUpdate = null;
    this._onDragStop = null;
    this._onAnimationStart = null;
    this._onAnimationComplete = null;
    this._onAnimationLoop = null;
  }

  /**
   * Destroys the EventManager and cleans up resources.
   */
  destroy() {
    this._parent = null;
    if (this._onDestroy) {
      this._onDestroy.dispose();
    }
    if (this._onAddedToGroup) {
      this._onAddedToGroup.dispose();
    }
    if (this._onRemovedFromGroup) {
      this._onRemovedFromGroup.dispose();
    }
    if (this._onEnterBounds) {
      this._onEnterBounds.dispose();
    }
    if (this._onOutOfBounds) {
      this._onOutOfBounds.dispose();
    }
    if (this._onInputOver) {
      this._onInputOver.dispose();
    }
    if (this._onInputOut) {
      this._onInputOut.dispose();
    }
    if (this._onInputDown) {
      this._onInputDown.dispose();
    }
    if (this._onInputUp) {
      this._onInputUp.dispose();
    }
    if (this._onDragStart) {
      this._onDragStart.dispose();
    }
    if (this._onDragUpdate) {
      this._onDragUpdate.dispose();
    }
    if (this._onDragStop) {
      this._onDragStop.dispose();
    }
    if (this._onAnimationStart) {
      this._onAnimationStart.dispose();
    }
    if (this._onAnimationComplete) {
      this._onAnimationComplete.dispose();
    }
    if (this._onAnimationLoop) {
      this._onAnimationLoop.dispose();
    }
  }

  /**
   * Gets the onAddedToGroup signal.
   * @returns {Signal} The Signal object for the onAddedToGroup event.
   */
  get onAddedToGroup() {
    if (!this._onAddedToGroup) {
      this._onAddedToGroup = new Signal();
    }
    return this._onAddedToGroup;
  }

  /**
   * Dispatches the onAddedToGroup event.
   * @param {...any} args - Arguments to pass to the signal.
   */
  onAddedToGroup$dispatch(...args) {
    if (this._onAddedToGroup) {
      this._onAddedToGroup.dispatch(...args);
    }
  }

  /**
   * Gets the onRemovedFromGroup signal.
   * @returns {Signal} The Signal object for the onRemovedFromGroup event.
   */
  get onRemovedFromGroup() {
    if (!this._onRemovedFromGroup) {
      this._onRemovedFromGroup = new Signal();
    }
    return this._onRemovedFromGroup;
  }

  /**
   * Dispatches the onRemovedFromGroup event.
   * @param {...any} args - Arguments to pass to the signal.
   */
  onRemovedFromGroup$dispatch(...args) {
    if (this._onRemovedFromGroup) {
      this._onRemovedFromGroup.dispatch(...args);
    }
  }

  /**
   * Gets the onDestroy signal.
   * @returns {Signal} The Signal object for the onDestroy event.
   */
  get onDestroy() {
    if (!this._onDestroy) {
      this._onDestroy = new Signal();
    }
    return this._onDestroy;
  }

  /**
   * Dispatches the onDestroy event.
   * @param {...any} args - Arguments to pass to the signal.
   */
  onDestroy$dispatch(...args) {
    if (this._onDestroy) {
      this._onDestroy.dispatch(...args);
    }
  }

  /**
   * Gets the onOutOfBounds signal.
   * @returns {Signal} The Signal object for the onOutOfBounds event.
   */
  get onOutOfBounds() {
    if (!this._onOutOfBounds) {
      this._onOutOfBounds = new Signal();
    }
    return this._onOutOfBounds;
  }

  /**
   * Dispatches the onOutOfBounds event.
   * @param {...any} args - Arguments to pass to the signal.
   */
  onOutOfBounds$dispatch(...args) {
    if (this._onOutOfBounds) {
      this._onOutOfBounds.dispatch(...args);
    }
  }

  /**
   * Gets the onEnterBounds signal.
   * @returns {Signal} The Signal object for the onEnterBounds event.
   */
  get onEnterBounds() {
    if (!this._onEnterBounds) {
      this._onEnterBounds = new Signal();
    }
    return this._onEnterBounds;
  }

  /**
   * Dispatches the onEnterBounds event.
   * @param {...any} args - Arguments to pass to the signal.
   */
  onEnterBounds$dispatch(...args) {
    if (this._onEnterBounds) {
      this._onEnterBounds.dispatch(...args);
    }
  }

  /**
   * Gets the onInputOver signal.
   * @returns {Signal} The Signal object for the onInputOver event.
   */
  get onInputOver() {
    if (!this._onInputOver) {
      this._onInputOver = new Signal();
    }
    return this._onInputOver;
  }

  /**
   * Dispatches the onInputOver event.
   * @param {...any} args - Arguments to pass to the signal.
   */
  onInputOver$dispatch(...args) {
    if (this._onInputOver) {
      this._onInputOver.dispatch(...args);
    }
  }

  /**
   * Gets the onInputOut signal.
   * @returns {Signal} The Signal object for the onInputOut event.
   */
  get onInputOut() {
    if (!this._onInputOut) {
      this._onInputOut = new Signal();
    }
    return this._onInputOut;
  }

  /**
   * Dispatches the onInputOut event.
   * @param {...any} args - Arguments to pass to the signal.
   */
  onInputOut$dispatch(...args) {
    if (this._onInputOut) {
      this._onInputOut.dispatch(...args);
    }
  }

  /**
   * Gets the onInputDown signal.
   * @returns {Signal} The Signal object for the onInputDown event.
   */
  get onInputDown() {
    if (!this._onInputDown) {
      this._onInputDown = new Signal();
    }
    return this._onInputDown;
  }

  /**
   * Dispatches the onInputDown event.
   * @param {...any} args - Arguments to pass to the signal.
   */
  onInputDown$dispatch(...args) {
    if (this._onInputDown) {
      this._onInputDown.dispatch(...args);
    }
  }

  /**
   * Gets the onInputUp signal.
   * @returns {Signal} The Signal object for the onInputUp event.
   */
  get onInputUp() {
    if (!this._onInputUp) {
      this._onInputUp = new Signal();
    }
    return this._onInputUp;
  }

  /**
   * Dispatches the onInputUp event.
   * @param {...any} args - Arguments to pass to the signal.
   */
  onInputUp$dispatch(...args) {
    if (this._onInputUp) {
      this._onInputUp.dispatch(...args);
    }
  }

  /**
   * Gets the onDragStart signal.
   * @returns {Signal} The Signal object for the onDragStart event.
   */
  get onDragStart() {
    if (!this._onDragStart) {
      this._onDragStart = new Signal();
    }
    return this._onDragStart;
  }

  /**
   * Dispatches the onDragStart event.
   * @param {...any} args - Arguments to pass to the signal.
   */
  onDragStart$dispatch(...args) {
    if (this._onDragStart) {
      this._onDragStart.dispatch(...args);
    }
  }

  /**
   * Gets the onDragUpdate signal.
   * @returns {Signal} The Signal object for the onDragUpdate event.
   */
  get onDragUpdate() {
    if (!this._onDragUpdate) {
      this._onDragUpdate = new Signal();
    }
    return this._onDragUpdate;
  }

  /**
   * Dispatches the onDragUpdate event.
   * @param {...any} args - Arguments to pass to the signal.
   */
  onDragUpdate$dispatch(...args) {
    if (this._onDragUpdate) {
      this._onDragUpdate.dispatch(...args);
    }
  }

  /**
   * Gets the onDragStop signal.
   * @returns {Signal} The Signal object for the onDragStop event.
   */
  get onDragStop() {
    if (!this._onDragStop) {
      this._onDragStop = new Signal();
    }
    return this._onDragStop;
  }

  /**
   * Dispatches the onDragStop event.
   * @param {...any} args - Arguments to pass to the signal.
   */
  onDragStop$dispatch(...args) {
    if (this._onDragStop) {
      this._onDragStop.dispatch(...args);
    }
  }

  /**
   * Gets the onAnimationStart signal.
   * @returns {Signal} The Signal object for the onAnimationStart event.
   */
  get onAnimationStart() {
    if (!this._onAnimationStart) {
      this._onAnimationStart = new Signal();
    }
    return this._onAnimationStart;
  }

  /**
   * Dispatches the onAnimationStart event.
   * @param {...any} args - Arguments to pass to the signal.
   */
  onAnimationStart$dispatch(...args) {
    if (this._onAnimationStart) {
      this._onAnimationStart.dispatch(...args);
    }
  }

  /**
   * Gets the onAnimationComplete signal.
   * @returns {Signal} The Signal object for the onAnimationComplete event.
   */
  get onAnimationComplete() {
    if (!this._onAnimationComplete) {
      this._onAnimationComplete = new Signal();
    }
    return this._onAnimationComplete;
  }

  /**
   * Dispatches the onAnimationComplete event.
   * @param {...any} args - Arguments to pass to the signal.
   */
  onAnimationComplete$dispatch(...args) {
    if (this._onAnimationComplete) {
      this._onAnimationComplete.dispatch(...args);
    }
  }

  /**
   * Gets the onAnimationLoop signal.
   * @returns {Signal} The Signal object for the onAnimationLoop event.
   */
  get onAnimationLoop() {
    if (!this._onAnimationLoop) {
      this._onAnimationLoop = new Signal();
    }
    return this._onAnimationLoop;
  }

  /**
   * Dispatches the onAnimationLoop event.
   * @param {...any} args - Arguments to pass to the signal.
   */
  onAnimationLoop$dispatch(...args) {
    if (this._onAnimationLoop) {
      this._onAnimationLoop.dispatch(...args);
    }
  }
}
