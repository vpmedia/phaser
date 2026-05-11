import type { DisplayObject } from '../display/display_object.js';
import { Signal } from './signal.js';

export class EventManager {
  parent: DisplayObject | null;
  _onAddedToGroup: Signal | null;
  _onRemovedFromGroup: Signal | null;
  _onDestroy: Signal | null;
  _onOutOfBounds: Signal | null;
  _onEnterBounds: Signal | null;
  _onInputOver: Signal | null;
  _onInputOut: Signal | null;
  _onInputDown: Signal | null;
  _onInputUp: Signal | null;
  _onDragStart: Signal | null;
  _onDragUpdate: Signal | null;
  _onDragStop: Signal | null;
  _onAnimationStart: Signal | null;
  _onAnimationComplete: Signal | null;
  _onAnimationLoop: Signal | null;

  constructor(sprite: DisplayObject) {
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

  destroy(): void {
    this.parent = null;
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

  get onAddedToGroup(): Signal {
    if (!this._onAddedToGroup) {
      this._onAddedToGroup = new Signal();
    }
    return this._onAddedToGroup;
  }
  onAddedToGroup$dispatch(...args: unknown[]): void {
    if (this._onAddedToGroup) {
      this._onAddedToGroup.dispatch(...args);
    }
  }

  get onRemovedFromGroup(): Signal {
    if (!this._onRemovedFromGroup) {
      this._onRemovedFromGroup = new Signal();
    }
    return this._onRemovedFromGroup;
  }
  onRemovedFromGroup$dispatch(...args: unknown[]): void {
    if (this._onRemovedFromGroup) {
      this._onRemovedFromGroup.dispatch(...args);
    }
  }

  get onDestroy(): Signal {
    if (!this._onDestroy) {
      this._onDestroy = new Signal();
    }
    return this._onDestroy;
  }
  onDestroy$dispatch(...args: unknown[]): void {
    if (this._onDestroy) {
      this._onDestroy.dispatch(...args);
    }
  }

  get onOutOfBounds(): Signal {
    if (!this._onOutOfBounds) {
      this._onOutOfBounds = new Signal();
    }
    return this._onOutOfBounds;
  }
  onOutOfBounds$dispatch(...args: unknown[]): void {
    if (this._onOutOfBounds) {
      this._onOutOfBounds.dispatch(...args);
    }
  }

  get onEnterBounds(): Signal {
    if (!this._onEnterBounds) {
      this._onEnterBounds = new Signal();
    }
    return this._onEnterBounds;
  }
  onEnterBounds$dispatch(...args: unknown[]): void {
    if (this._onEnterBounds) {
      this._onEnterBounds.dispatch(...args);
    }
  }

  get onInputOver(): Signal {
    if (!this._onInputOver) {
      this._onInputOver = new Signal();
    }
    return this._onInputOver;
  }
  onInputOver$dispatch(...args: unknown[]): void {
    if (this._onInputOver) {
      this._onInputOver.dispatch(...args);
    }
  }

  get onInputOut(): Signal {
    if (!this._onInputOut) {
      this._onInputOut = new Signal();
    }
    return this._onInputOut;
  }
  onInputOut$dispatch(...args: unknown[]): void {
    if (this._onInputOut) {
      this._onInputOut.dispatch(...args);
    }
  }

  get onInputDown(): Signal {
    if (!this._onInputDown) {
      this._onInputDown = new Signal();
    }
    return this._onInputDown;
  }
  onInputDown$dispatch(...args: unknown[]): void {
    if (this._onInputDown) {
      this._onInputDown.dispatch(...args);
    }
  }

  get onInputUp(): Signal {
    if (!this._onInputUp) {
      this._onInputUp = new Signal();
    }
    return this._onInputUp;
  }
  onInputUp$dispatch(...args: unknown[]): void {
    if (this._onInputUp) {
      this._onInputUp.dispatch(...args);
    }
  }

  get onDragStart(): Signal {
    if (!this._onDragStart) {
      this._onDragStart = new Signal();
    }
    return this._onDragStart;
  }
  onDragStart$dispatch(...args: unknown[]): void {
    if (this._onDragStart) {
      this._onDragStart.dispatch(...args);
    }
  }

  get onDragUpdate(): Signal {
    if (!this._onDragUpdate) {
      this._onDragUpdate = new Signal();
    }
    return this._onDragUpdate;
  }
  onDragUpdate$dispatch(...args: unknown[]): void {
    if (this._onDragUpdate) {
      this._onDragUpdate.dispatch(...args);
    }
  }

  get onDragStop(): Signal {
    if (!this._onDragStop) {
      this._onDragStop = new Signal();
    }
    return this._onDragStop;
  }
  onDragStop$dispatch(...args: unknown[]): void {
    if (this._onDragStop) {
      this._onDragStop.dispatch(...args);
    }
  }

  get onAnimationStart(): Signal {
    if (!this._onAnimationStart) {
      this._onAnimationStart = new Signal();
    }
    return this._onAnimationStart;
  }
  onAnimationStart$dispatch(...args: unknown[]): void {
    if (this._onAnimationStart) {
      this._onAnimationStart.dispatch(...args);
    }
  }

  get onAnimationComplete(): Signal {
    if (!this._onAnimationComplete) {
      this._onAnimationComplete = new Signal();
    }
    return this._onAnimationComplete;
  }
  onAnimationComplete$dispatch(...args: unknown[]): void {
    if (this._onAnimationComplete) {
      this._onAnimationComplete.dispatch(...args);
    }
  }

  get onAnimationLoop(): Signal {
    if (!this._onAnimationLoop) {
      this._onAnimationLoop = new Signal();
    }
    return this._onAnimationLoop;
  }
  onAnimationLoop$dispatch(...args: unknown[]): void {
    if (this._onAnimationLoop) {
      this._onAnimationLoop.dispatch(...args);
    }
  }
}
