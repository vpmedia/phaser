import { Signal } from './signal';
import { DisplayObject } from '../display/display_object';

export class EventManager {
  /**
   * TBD.
   * @param {DisplayObject} sprite - TBD.
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
   * TBD.
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
   * TBD.
   * @returns {Signal} TBD.
   */
  get onAddedToGroup() {
    if (!this._onAddedToGroup) {
      this._onAddedToGroup = new Signal();
    }
    return this._onAddedToGroup;
  }

  /**
   * TBD.
   * @param {...any} args - TBD.
   */
  onAddedToGroup$dispatch(...args) {
    if (this._onAddedToGroup) {
      this._onAddedToGroup.dispatch(...args);
    }
  }

  /**
   * TBD.
   * @returns {Signal} TBD.
   */
  get onRemovedFromGroup() {
    if (!this._onRemovedFromGroup) {
      this._onRemovedFromGroup = new Signal();
    }
    return this._onRemovedFromGroup;
  }

  /**
   * TBD.
   * @param {...any} args - TBD.
   */
  onRemovedFromGroup$dispatch(...args) {
    if (this._onRemovedFromGroup) {
      this._onRemovedFromGroup.dispatch(...args);
    }
  }

  /**
   * TBD.
   * @returns {Signal} TBD.
   */
  get onDestroy() {
    if (!this._onDestroy) {
      this._onDestroy = new Signal();
    }
    return this._onDestroy;
  }

  /**
   * TBD.
   * @param {...any} args - TBD.
   */
  onDestroy$dispatch(...args) {
    if (this._onDestroy) {
      this._onDestroy.dispatch(...args);
    }
  }

  /**
   * TBD.
   * @returns {Signal} TBD.
   */
  get onOutOfBounds() {
    if (!this._onOutOfBounds) {
      this._onOutOfBounds = new Signal();
    }
    return this._onOutOfBounds;
  }

  /**
   * TBD.
   * @param {...any} args - TBD.
   */
  onOutOfBounds$dispatch(...args) {
    if (this._onOutOfBounds) {
      this._onOutOfBounds.dispatch(...args);
    }
  }

  /**
   * TBD.
   * @returns {Signal} TBD.
   */
  get onEnterBounds() {
    if (!this._onEnterBounds) {
      this._onEnterBounds = new Signal();
    }
    return this._onEnterBounds;
  }

  /**
   * TBD.
   * @param {...any} args - TBD.
   */
  onEnterBounds$dispatch(...args) {
    if (this._onEnterBounds) {
      this._onEnterBounds.dispatch(...args);
    }
  }

  /**
   * TBD.
   * @returns {Signal} TBD.
   */
  get onInputOver() {
    if (!this._onInputOver) {
      this._onInputOver = new Signal();
    }
    return this._onInputOver;
  }

  /**
   * TBD.
   * @param {...any} args - TBD.
   */
  onInputOver$dispatch(...args) {
    if (this._onInputOver) {
      this._onInputOver.dispatch(...args);
    }
  }

  /**
   * TBD.
   * @returns {Signal} TBD.
   */
  get onInputOut() {
    if (!this._onInputOut) {
      this._onInputOut = new Signal();
    }
    return this._onInputOut;
  }

  /**
   * TBD.
   * @param {...any} args - TBD.
   */
  onInputOut$dispatch(...args) {
    if (this._onInputOut) {
      this._onInputOut.dispatch(...args);
    }
  }

  /**
   * TBD.
   * @returns {Signal} TBD.
   */
  get onInputDown() {
    if (!this._onInputDown) {
      this._onInputDown = new Signal();
    }
    return this._onInputDown;
  }

  /**
   * TBD.
   * @param {...any} args - TBD.
   */
  onInputDown$dispatch(...args) {
    if (this._onInputDown) {
      this._onInputDown.dispatch(...args);
    }
  }

  /**
   * TBD.
   * @returns {Signal} TBD.
   */
  get onInputUp() {
    if (!this._onInputUp) {
      this._onInputUp = new Signal();
    }
    return this._onInputUp;
  }

  /**
   * TBD.
   * @param {...any} args - TBD.
   */
  onInputUp$dispatch(...args) {
    if (this._onInputUp) {
      this._onInputUp.dispatch(...args);
    }
  }

  /**
   * TBD.
   * @returns {Signal} TBD.
   */
  get onDragStart() {
    if (!this._onDragStart) {
      this._onDragStart = new Signal();
    }
    return this._onDragStart;
  }

  /**
   * TBD.
   * @param {...any} args - TBD.
   */
  onDragStart$dispatch(...args) {
    if (this._onDragStart) {
      this._onDragStart.dispatch(...args);
    }
  }

  /**
   * TBD.
   * @returns {Signal} TBD.
   */
  get onDragUpdate() {
    if (!this._onDragUpdate) {
      this._onDragUpdate = new Signal();
    }
    return this._onDragUpdate;
  }

  /**
   * TBD.
   * @param {...any} args - TBD.
   */
  onDragUpdate$dispatch(...args) {
    if (this._onDragUpdate) {
      this._onDragUpdate.dispatch(...args);
    }
  }

  /**
   * TBD.
   * @returns {Signal} TBD.
   */
  get onDragStop() {
    if (!this._onDragStop) {
      this._onDragStop = new Signal();
    }
    return this._onDragStop;
  }

  /**
   * TBD.
   * @param {...any} args - TBD.
   */
  onDragStop$dispatch(...args) {
    if (this._onDragStop) {
      this._onDragStop.dispatch(...args);
    }
  }

  /**
   * TBD.
   * @returns {Signal} TBD.
   */
  get onAnimationStart() {
    if (!this._onAnimationStart) {
      this._onAnimationStart = new Signal();
    }
    return this._onAnimationStart;
  }

  /**
   * TBD.
   * @param {...any} args - TBD.
   */
  onAnimationStart$dispatch(...args) {
    if (this._onAnimationStart) {
      this._onAnimationStart.dispatch(...args);
    }
  }

  /**
   * TBD.
   * @returns {Signal} TBD.
   */
  get onAnimationComplete() {
    if (!this._onAnimationComplete) {
      this._onAnimationComplete = new Signal();
    }
    return this._onAnimationComplete;
  }

  /**
   * TBD.
   * @param {...any} args - TBD.
   */
  onAnimationComplete$dispatch(...args) {
    if (this._onAnimationComplete) {
      this._onAnimationComplete.dispatch(...args);
    }
  }

  /**
   * TBD.
   * @returns {Signal} TBD.
   */
  get onAnimationLoop() {
    if (!this._onAnimationLoop) {
      this._onAnimationLoop = new Signal();
    }
    return this._onAnimationLoop;
  }

  /**
   * TBD.
   * @param {...any} args - TBD.
   */
  onAnimationLoop$dispatch(...args) {
    if (this._onAnimationLoop) {
      this._onAnimationLoop.dispatch(...args);
    }
  }
}
