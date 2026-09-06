import type { InputEvent } from './input_event.js';
import type { Game } from './game.js';
import type { InputHandler } from './input_handler.js';
import { Circle } from '../geom/circle.js';
import { Point } from '../geom/point.js';
import {
  MOUSE_OVERRIDES_TOUCH,
  MOUSE_TOUCH_COMBINE,
  POINTER,
  POINTER_CONTACT,
  POINTER_CURSOR,
  TOUCH_OVERRIDES_MOUSE,
} from './const.js';

export class Pointer {
  public game!: Game;
  public id!: number;
  public type!: number;
  public exists!: boolean;
  public identifier!: number | null;
  public pointerId!: any;
  public pointerMode!: number;
  public target!: EventTarget | null;
  public button!: any;
  public _holdSent!: boolean;
  public _history!: any;
  public _nextDrop!: number;
  public _stateReset!: boolean;
  public withinGame!: boolean;
  public clientX!: number;
  public clientY!: number;
  public pageX!: number;
  public pageY!: number;
  public screenX!: number;
  public screenY!: number;
  public rawMovementX!: number;
  public rawMovementY!: number;
  public movementX!: number;
  public movementY!: number;
  public x!: number;
  public y!: number;
  public isMouse!: boolean;
  public isDown!: boolean;
  public isUp!: boolean;
  public timeDown!: number;
  public timeUp!: number;
  public previousTapTime!: number;
  public totalTouches!: number;
  public msSinceLastClick!: number;
  public targetObject!: any;
  public interactiveCandidates!: any;
  public active!: boolean;
  public dirty!: boolean;
  public position!: Point;
  public positionDown!: Point;
  public positionUp!: Point;
  public circle!: Circle;
  public _clickTrampolines!: any;
  public _trampolineTargetObject!: any;
  /**
   * TBD.
   * @param {Game} game - TBD.
   * @param {number} id - TBD.
   * @param {number} pointerMode - TBD.
   */
  public constructor(game: Game, id: number, pointerMode: number) {
    this.game = game;
    this.id = id;
    this.type = POINTER;
    this.exists = true;
    this.identifier = 0;
    this.pointerId = null;
    this.pointerMode = pointerMode || POINTER_CURSOR | POINTER_CONTACT;
    this.target = null;
    this.button = null;
    this._holdSent = false;
    this._history = [];
    this._nextDrop = 0;
    this._stateReset = false;
    this.withinGame = false;
    this.clientX = -1;
    this.clientY = -1;
    this.pageX = -1;
    this.pageY = -1;
    this.screenX = -1;
    this.screenY = -1;
    this.rawMovementX = 0;
    this.rawMovementY = 0;
    this.movementX = 0;
    this.movementY = 0;
    this.x = -1;
    this.y = -1;
    this.isMouse = id === 0;
    this.isDown = false;
    this.isUp = true;
    this.timeDown = 0;
    this.timeUp = 0;
    this.previousTapTime = 0;
    this.totalTouches = 0;
    this.msSinceLastClick = Number.MAX_VALUE;
    this.targetObject = null;
    this.interactiveCandidates = [];
    this.active = false;
    this.dirty = false;
    this.position = new Point();
    this.positionDown = new Point();
    this.positionUp = new Point();
    this.circle = new Circle(0, 0, 44);
    this._clickTrampolines = null;
    this._trampolineTargetObject = null;
  }

  /**
   * TBD.
   */
  public resetButtons() {
    this.isDown = false;
    this.isUp = true;
  }

  /**
   * TBD.
   * @param {MouseEvent|PointerEvent} event - TBD.
   */
  public updateButtons(event: InputEvent) {
    if (event.type.toLowerCase().endsWith('down')) {
      this.isUp = false;
      this.isDown = true;
    } else {
      this.isUp = true;
      this.isDown = false;
    }
  }

  /**
   * TBD.
   * @param {PointerEvent} event - TBD.
   * @returns {Pointer} TBD.
   */
  public start(event: InputEvent) {
    const { input } = this.game;
    if (event.pointerId) {
      this.pointerId = event.pointerId;
    }
    this.identifier = event.identifier ?? null;
    this.target = event.target;
    if (this.isMouse) {
      this.updateButtons(event);
    } else {
      this.isDown = true;
      this.isUp = false;
    }
    this.active = true;
    this.withinGame = true;
    this.dirty = false;
    this._history = [];
    this._clickTrampolines = null;
    this._trampolineTargetObject = null;
    //  Work out how long it has been since the last click
    this.msSinceLastClick = this.game.time.time - this.timeDown;
    this.timeDown = this.game.time.time;
    this._holdSent = false;
    //  This sets the x/y and other local values
    this.move(event, true);
    // x and y are the old values here?
    this.positionDown.setTo(this.x, this.y);
    if (
      input.multiInputOverride === MOUSE_OVERRIDES_TOUCH ||
      input.multiInputOverride === MOUSE_TOUCH_COMBINE ||
      (input.multiInputOverride === TOUCH_OVERRIDES_MOUSE && input.totalActivePointers === 0)
    ) {
      input.x = this.x;
      input.y = this.y;
      input.position.setTo(this.x, this.y);
      input.onDown.dispatch(this, event);
      input.resetSpeed(this.x, this.y);
    }
    this._stateReset = false;
    this.totalTouches += 1;
    if (this.targetObject !== null) {
      this.targetObject._touchedHandler(this);
    }
    return this;
  }

  /**
   * TBD.
   */
  public update() {
    const { input } = this.game;
    if (this.active) {
      // Force a check?
      if (this.dirty) {
        if (input.interactiveItems.total > 0) {
          this.processInteractiveObjects(false);
        }
        this.dirty = false;
      }
      if (!this._holdSent && this.duration >= input.holdRate) {
        if (
          input.multiInputOverride === MOUSE_OVERRIDES_TOUCH ||
          input.multiInputOverride === MOUSE_TOUCH_COMBINE ||
          (input.multiInputOverride === TOUCH_OVERRIDES_MOUSE && input.totalActivePointers === 0)
        ) {
          input.onHold.dispatch(this);
        }
        this._holdSent = true;
      }
      //  Update the droppings history
      if (input.recordPointerHistory && this.game.time.time >= this._nextDrop) {
        this._nextDrop = this.game.time.time + input.recordRate;
        this._history.push({
          x: this.position.x,
          y: this.position.y,
        });
        if (this._history.length > input.recordLimit) {
          this._history.shift();
        }
      }
    }
  }

  /**
   * TBD.
   * @param {MouseEvent|PointerEvent} event - TBD.
   * @param {boolean} fromClick - TBD.
   * @returns {Pointer} TBD.
   */
  public move(event: InputEvent, fromClick = false) {
    const { input } = this.game;
    if (input.pollLocked) {
      return null;
    }
    if (fromClick && this.isMouse) {
      this.updateButtons(event);
    }
    this.clientX = event.clientX ?? 0;
    this.clientY = event.clientY ?? 0;
    this.pageX = event.pageX ?? 0;
    this.pageY = event.pageY ?? 0;
    this.screenX = event.screenX ?? 0;
    this.screenY = event.screenY ?? 0;
    if (this.isMouse && input.mouse.locked && !fromClick) {
      this.rawMovementX = event.movementX ?? event.mozMovementX ?? event.webkitMovementX ?? 0;
      this.rawMovementY = event.movementY ?? event.mozMovementY ?? event.webkitMovementY ?? 0;
      this.movementX += this.rawMovementX;
      this.movementY += this.rawMovementY;
    }
    this.x = (this.pageX - this.game.scale.offset.x) * input.scale.x;
    this.y = (this.pageY - this.game.scale.offset.y) * input.scale.y;
    this.position.setTo(this.x, this.y);
    this.circle.x = this.x;
    this.circle.y = this.y;
    if (
      input.multiInputOverride === MOUSE_OVERRIDES_TOUCH ||
      input.multiInputOverride === MOUSE_TOUCH_COMBINE ||
      (input.multiInputOverride === TOUCH_OVERRIDES_MOUSE && input.totalActivePointers === 0)
    ) {
      input.activePointer = this;
      input.x = this.x;
      input.y = this.y;
      input.position.setTo(input.x, input.y);
      input.circle.x = input.x;
      input.circle.y = input.y;
    }
    this.withinGame = this.game.scale.bounds.contains(this.pageX, this.pageY);
    //  If the game is paused we don't process any target objects or callbacks
    if (this.game.paused) {
      return this;
    }
    let i = input.moveCallbacks.length;
    while (i) {
      i -= 1;
      const moveCallback = input.moveCallbacks[i]!;
      moveCallback.callback.call(moveCallback.context, this, this.x, this.y, fromClick);
    }
    //  Easy out if we're dragging something and it still exists
    if (this.targetObject !== null && this.targetObject.isDragged === true) {
      if (this.targetObject.update(this) === false) {
        this.targetObject = null;
      }
    } else if (input.interactiveItems.total > 0) {
      this.processInteractiveObjects(fromClick);
    }
    return this;
  }

  /**
   * TBD.
   * @param {boolean} fromClick - TBD.
   * @returns {boolean} TBD.
   */
  public processInteractiveObjects(fromClick = false) {
    // Work out which object is on the top
    let highestRenderOrderID = 0;
    let highestInputPriorityID = -1;
    let candidateTarget = null;
    // First pass gets all objects that the pointer is over that DON'T use pixelPerfect checks and get the highest ID
    // We know they'll be valid for input detection but not which is the top just yet
    let currentNode = this.game.input.interactiveItems.first;
    this.interactiveCandidates = [];
    while (currentNode) {
      //  Reset checked status
      currentNode.checked = false;
      if (currentNode.validForInput(highestInputPriorityID, highestRenderOrderID, false)) {
        //  Flag it as checked so we don't re-scan it on the next phase
        currentNode.checked = true;
        if (
          (fromClick && currentNode.checkPointerDown(this, true)) ||
          (!fromClick && currentNode.checkPointerOver(this, true))
        ) {
          highestRenderOrderID = currentNode.sprite.renderOrderID;
          highestInputPriorityID = currentNode.priorityID;
          candidateTarget = currentNode;
          this.interactiveCandidates.push(currentNode);
        }
      }
      currentNode = this.game.input.interactiveItems.next;
    }
    // Then in the second sweep we process ONLY the pixel perfect ones that are checked and who have a higher ID
    // because if their ID is lower anyway then we can just automatically discount them
    // (A node that was previously checked did not request a pixel-perfect check.)
    currentNode = this.game.input.interactiveItems.first;
    while (currentNode) {
      if (!currentNode.checked && currentNode.validForInput(highestInputPriorityID, highestRenderOrderID, true)) {
        if (
          (fromClick && currentNode.checkPointerDown(this, false)) ||
          (!fromClick && currentNode.checkPointerOver(this, false))
        ) {
          highestRenderOrderID = currentNode.sprite.renderOrderID;
          highestInputPriorityID = currentNode.priorityID;
          candidateTarget = currentNode;
          this.interactiveCandidates.push(currentNode);
        }
      }
      currentNode = this.game.input.interactiveItems.next;
    }
    if (this.game.input.customCandidateHandler) {
      candidateTarget = this.game.input.customCandidateHandler.call(
        this.game.input.customCandidateHandlerContext,
        this,
        this.interactiveCandidates,
        candidateTarget
      );
    }
    this.swapTarget(candidateTarget, false);
    return this.targetObject !== null;
  }

  /**
   * TBD.
   * @param {InputHandler} newTarget - TBD.
   * @param {boolean} silent - TBD.
   */
  public swapTarget(newTarget: InputHandler, silent = false) {
    //  Now we know the top-most item (if any) we can process it
    if (newTarget === null) {
      //  The pointer isn't currently over anything, check if we've got a lingering previous target
      if (this.targetObject) {
        this.targetObject._pointerOutHandler(this, silent);
        this.targetObject = null;
      }
    } else if (this.targetObject === null) {
      //  And now set the new one
      this.targetObject = newTarget;
      newTarget._pointerOverHandler(this, silent);
    } else if (this.targetObject === newTarget) {
      //  We've got a target from the last update
      //  Same target as before, so update it
      if (!newTarget.update(this)) {
        this.targetObject = null;
      }
    } else {
      //  The target has changed, so tell the old one we've left it
      this.targetObject._pointerOutHandler(this, silent);
      //  And now set the new one
      this.targetObject = newTarget;
      this.targetObject._pointerOverHandler(this, silent);
    }
  }

  /**
   * TBD.
   * @param {MouseEvent|PointerEvent} event - TBD.
   */
  public leave(event: InputEvent) {
    this.withinGame = false;
    this.move(event, false);
  }

  /**
   * TBD.
   * @param {MouseEvent|PointerEvent} event - TBD.
   * @returns {Pointer} TBD.
   */
  public stop(event: InputEvent) {
    const { input } = this.game;
    if (this._stateReset && this.withinGame) {
      event.preventDefault();
      return null;
    }
    this.timeUp = this.game.time.time;
    if (
      input.multiInputOverride === MOUSE_OVERRIDES_TOUCH ||
      input.multiInputOverride === MOUSE_TOUCH_COMBINE ||
      (input.multiInputOverride === TOUCH_OVERRIDES_MOUSE && input.totalActivePointers === 0)
    ) {
      input.onUp.dispatch(this, event);
      //  Was it a tap?
      if (this.duration >= 0 && this.duration <= input.tapRate) {
        //  Was it a double-tap?
        if (this.timeUp - this.previousTapTime < input.doubleTapRate) {
          //  Yes, let's dispatch the signal then with the 2nd parameter set to true
          input.onTap.dispatch(this, true);
        } else {
          //  Wasn't a double-tap, so dispatch a single tap signal
          input.onTap.dispatch(this, false);
        }
        this.previousTapTime = this.timeUp;
      }
    }
    if (this.isMouse) {
      this.updateButtons(event);
    } else {
      this.isDown = false;
      this.isUp = true;
    }
    //  Mouse is always active
    if (this.id > 0) {
      this.active = false;
    }
    this.withinGame = this.game.scale.bounds.contains(event.pageX ?? 0, event.pageY ?? 0);
    this.pointerId = null;
    this.identifier = null;
    this.positionUp.setTo(this.x, this.y);
    input.interactiveItems.callAll('_releasedHandler', this);
    if (this._clickTrampolines) {
      this._trampolineTargetObject = this.targetObject;
    }
    this.targetObject = null;
    return this;
  }

  /**
   * TBD.
   * @param {number} duration - TBD.
   * @returns {boolean} TBD.
   */
  public justPressed(duration: number) {
    duration = duration || this.game.input.justPressedRate;
    return this.isDown && this.timeDown + duration > this.game.time.time;
  }

  /**
   * TBD.
   * @param {number} duration - TBD.
   * @returns {boolean} TBD.
   */
  public justReleased(duration: number) {
    duration = duration || this.game.input.justReleasedRate;
    return this.isUp && this.timeUp + duration > this.game.time.time;
  }

  /**
   * TBD.
   * @param {string} name - TBD.
   * @param {Function} callback - TBD.
   * @param {object} callbackContext - TBD.
   * @param {...any} callbackArgs - TBD.
   */
  public addClickTrampoline(name: string, callback: Function, callbackContext: any, callbackArgs: any) {
    if (!this.isDown) {
      return;
    }
    this._clickTrampolines = this._clickTrampolines ?? [];
    const trampolines = this._clickTrampolines;
    for (let i = 0; i < trampolines.length; i += 1) {
      if (trampolines[i].name === name) {
        trampolines.splice(i, 1);
        break;
      }
    }
    trampolines.push({
      name,
      targetObject: this.targetObject,
      callback,
      callbackContext,
      callbackArgs,
    });
  }

  /**
   * TBD.
   */
  public processClickTrampolines() {
    const trampolines = this._clickTrampolines;
    if (!trampolines) {
      return;
    }
    for (const trampoline of trampolines) {
      if (trampoline.targetObject === this._trampolineTargetObject) {
        trampoline.callback.apply(trampoline.callbackContext, trampoline.callbackArgs);
      }
    }
    this._clickTrampolines = null;
    this._trampolineTargetObject = null;
  }

  /**
   * TBD.
   */
  public reset() {
    if (!this.isMouse) {
      this.active = false;
    }
    this.pointerId = null;
    this.identifier = null;
    this.dirty = false;
    this.totalTouches = 0;
    this._holdSent = false;
    this._history.length = 0;
    this._stateReset = true;
    this.resetButtons();
    if (this.targetObject) {
      this.targetObject._releasedHandler(this);
    }
    this.targetObject = null;
  }

  /**
   * TBD.
   */
  public resetMovement() {
    this.movementX = 0;
    this.movementY = 0;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  public get duration() {
    if (this.isUp) {
      return -1;
    }
    return this.game.time.time - this.timeDown;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  public get worldX() {
    return this.x;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  public get worldY() {
    return this.y;
  }
}
