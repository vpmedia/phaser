/**
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 */
import { Signal } from  './signal';

export default class {
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

  get onAddedToGroup() {
    if (!this._onAddedToGroup) {
      this._onAddedToGroup = new Signal();
    }
    return this._onAddedToGroup;
  }

  onAddedToGroup$dispatch(...args) {
    if (this._onAddedToGroup) {
      this._onAddedToGroup.dispatch(...args);
    }
  }

  get onRemovedFromGroup() {
    if (!this._onRemovedFromGroup) {
      this._onRemovedFromGroup = new Signal();
    }
    return this._onRemovedFromGroup;
  }

  onRemovedFromGroup$dispatch(...args) {
    if (this._onRemovedFromGroup) {
      this._onRemovedFromGroup.dispatch(...args);
    }
  }

  get onDestroy() {
    if (!this._onDestroy) {
      this._onDestroy = new Signal();
    }
    return this._onDestroy;
  }

  onDestroy$dispatch(...args) {
    if (this._onDestroy) {
      this._onDestroy.dispatch(...args);
    }
  }

  get onOutOfBounds() {
    if (!this._onOutOfBounds) {
      this._onOutOfBounds = new Signal();
    }
    return this._onOutOfBounds;
  }

  onOutOfBounds$dispatch(...args) {
    if (this._onOutOfBounds) {
      this._onOutOfBounds.dispatch(...args);
    }
  }

  get onEnterBounds() {
    if (!this._onEnterBounds) {
      this._onEnterBounds = new Signal();
    }
    return this._onEnterBounds;
  }

  onEnterBounds$dispatch(...args) {
    if (this._onEnterBounds) {
      this._onEnterBounds.dispatch(...args);
    }
  }

  get onInputOver() {
    if (!this._onInputOver) {
      this._onInputOver = new Signal();
    }
    return this._onInputOver;
  }

  onInputOver$dispatch(...args) {
    if (this._onInputOver) {
      this._onInputOver.dispatch(...args);
    }
  }

  get onInputOut() {
    if (!this._onInputOut) {
      this._onInputOut = new Signal();
    }
    return this._onInputOut;
  }

  onInputOut$dispatch(...args) {
    if (this._onInputOut) {
      this._onInputOut.dispatch(...args);
    }
  }

  get onInputDown() {
    if (!this._onInputDown) {
      this._onInputDown = new Signal();
    }
    return this._onInputDown;
  }

  onInputDown$dispatch(...args) {
    if (this._onInputDown) {
      this._onInputDown.dispatch(...args);
    }
  }

  get onInputUp() {
    if (!this._onInputUp) {
      this._onInputUp = new Signal();
    }
    return this._onInputUp;
  }

  onInputUp$dispatch(...args) {
    if (this._onInputUp) {
      this._onInputUp.dispatch(...args);
    }
  }

  get onDragStart() {
    if (!this._onDragStart) {
      this._onDragStart = new Signal();
    }
    return this._onDragStart;
  }

  onDragStart$dispatch(...args) {
    if (this._onDragStart) {
      this._onDragStart.dispatch(...args);
    }
  }

  get onDragUpdate() {
    if (!this._onDragUpdate) {
      this._onDragUpdate = new Signal();
    }
    return this._onDragUpdate;
  }

  onDragUpdate$dispatch(...args) {
    if (this._onDragUpdate) {
      this._onDragUpdate.dispatch(...args);
    }
  }

  get onDragStop() {
    if (!this._onDragStop) {
      this._onDragStop = new Signal();
    }
    return this._onDragStop;
  }

  onDragStop$dispatch(...args) {
    if (this._onDragStop) {
      this._onDragStop.dispatch(...args);
    }
  }

  get onAnimationStart() {
    if (!this._onAnimationStart) {
      this._onAnimationStart = new Signal();
    }
    return this._onAnimationStart;
  }

  onAnimationStart$dispatch(...args) {
    if (this._onAnimationStart) {
      this._onAnimationStart.dispatch(...args);
    }
  }

  get onAnimationComplete() {
    if (!this._onAnimationComplete) {
      this._onAnimationComplete = new Signal();
    }
    return this._onAnimationComplete;
  }

  onAnimationComplete$dispatch(...args) {
    if (this._onAnimationComplete) {
      this._onAnimationComplete.dispatch(...args);
    }
  }

  get onAnimationLoop() {
    if (!this._onAnimationLoop) {
      this._onAnimationLoop = new Signal();
    }
    return this._onAnimationLoop;
  }

  onAnimationLoop$dispatch(...args) {
    if (this._onAnimationLoop) {
      this._onAnimationLoop.dispatch(...args);
    }
  }
}
