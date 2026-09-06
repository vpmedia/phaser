import type { DisplayObject } from '../display/display_object.js';
import { Signal } from './signal.js';

export class EventManager {
  public parent: DisplayObject | null;
  public _onAddedToGroup: Signal | null;
  public _onRemovedFromGroup: Signal | null;
  public _onDestroy: Signal | null;
  public _onOutOfBounds: Signal | null;
  public _onEnterBounds: Signal | null;
  public _onInputOver: Signal | null;
  public _onInputOut: Signal | null;
  public _onInputDown: Signal | null;
  public _onInputUp: Signal | null;
  public _onDragStart: Signal | null;
  public _onDragUpdate: Signal | null;
  public _onDragStop: Signal | null;
  public _onAnimationStart: Signal | null;
  public _onAnimationComplete: Signal | null;
  public _onAnimationLoop: Signal | null;

  public constructor(sprite: DisplayObject) {
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

  public destroy(): void {
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

  public get onAddedToGroup(): Signal {
    this._onAddedToGroup ??= new Signal();
    return this._onAddedToGroup;
  }
  public onAddedToGroup$dispatch(...args: unknown[]): void {
    if (this._onAddedToGroup) {
      this._onAddedToGroup.dispatch(...args);
    }
  }

  public get onRemovedFromGroup(): Signal {
    this._onRemovedFromGroup ??= new Signal();
    return this._onRemovedFromGroup;
  }
  public onRemovedFromGroup$dispatch(...args: unknown[]): void {
    if (this._onRemovedFromGroup) {
      this._onRemovedFromGroup.dispatch(...args);
    }
  }

  public get onDestroy(): Signal {
    this._onDestroy ??= new Signal();
    return this._onDestroy;
  }
  public onDestroy$dispatch(...args: unknown[]): void {
    if (this._onDestroy) {
      this._onDestroy.dispatch(...args);
    }
  }

  public get onOutOfBounds(): Signal {
    this._onOutOfBounds ??= new Signal();
    return this._onOutOfBounds;
  }
  public onOutOfBounds$dispatch(...args: unknown[]): void {
    if (this._onOutOfBounds) {
      this._onOutOfBounds.dispatch(...args);
    }
  }

  public get onEnterBounds(): Signal {
    this._onEnterBounds ??= new Signal();
    return this._onEnterBounds;
  }
  public onEnterBounds$dispatch(...args: unknown[]): void {
    if (this._onEnterBounds) {
      this._onEnterBounds.dispatch(...args);
    }
  }

  public get onInputOver(): Signal {
    this._onInputOver ??= new Signal();
    return this._onInputOver;
  }
  public onInputOver$dispatch(...args: unknown[]): void {
    if (this._onInputOver) {
      this._onInputOver.dispatch(...args);
    }
  }

  public get onInputOut(): Signal {
    this._onInputOut ??= new Signal();
    return this._onInputOut;
  }
  public onInputOut$dispatch(...args: unknown[]): void {
    if (this._onInputOut) {
      this._onInputOut.dispatch(...args);
    }
  }

  public get onInputDown(): Signal {
    this._onInputDown ??= new Signal();
    return this._onInputDown;
  }
  public onInputDown$dispatch(...args: unknown[]): void {
    if (this._onInputDown) {
      this._onInputDown.dispatch(...args);
    }
  }

  public get onInputUp(): Signal {
    this._onInputUp ??= new Signal();
    return this._onInputUp;
  }
  public onInputUp$dispatch(...args: unknown[]): void {
    if (this._onInputUp) {
      this._onInputUp.dispatch(...args);
    }
  }

  public get onDragStart(): Signal {
    this._onDragStart ??= new Signal();
    return this._onDragStart;
  }
  public onDragStart$dispatch(...args: unknown[]): void {
    if (this._onDragStart) {
      this._onDragStart.dispatch(...args);
    }
  }

  public get onDragUpdate(): Signal {
    this._onDragUpdate ??= new Signal();
    return this._onDragUpdate;
  }
  public onDragUpdate$dispatch(...args: unknown[]): void {
    if (this._onDragUpdate) {
      this._onDragUpdate.dispatch(...args);
    }
  }

  public get onDragStop(): Signal {
    this._onDragStop ??= new Signal();
    return this._onDragStop;
  }
  public onDragStop$dispatch(...args: unknown[]): void {
    if (this._onDragStop) {
      this._onDragStop.dispatch(...args);
    }
  }

  public get onAnimationStart(): Signal {
    this._onAnimationStart ??= new Signal();
    return this._onAnimationStart;
  }
  public onAnimationStart$dispatch(...args: unknown[]): void {
    if (this._onAnimationStart) {
      this._onAnimationStart.dispatch(...args);
    }
  }

  public get onAnimationComplete(): Signal {
    this._onAnimationComplete ??= new Signal();
    return this._onAnimationComplete;
  }
  public onAnimationComplete$dispatch(...args: unknown[]): void {
    if (this._onAnimationComplete) {
      this._onAnimationComplete.dispatch(...args);
    }
  }

  public get onAnimationLoop(): Signal {
    this._onAnimationLoop ??= new Signal();
    return this._onAnimationLoop;
  }
  public onAnimationLoop$dispatch(...args: unknown[]): void {
    if (this._onAnimationLoop) {
      this._onAnimationLoop.dispatch(...args);
    }
  }
}
