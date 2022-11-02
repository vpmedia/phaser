/**
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 */
import Point from '../geom/point';
import Circle from '../geom/circle';
import DeviceButton from './input_button';
import { POINTER, POINTER_CURSOR, POINTER_CONTACT, MOUSE_OVERRIDES_TOUCH, TOUCH_OVERRIDES_MOUSE, MOUSE_TOUCH_COMBINE } from './const';

const NO_BUTTON = 0;
const LEFT_BUTTON = 1;
const RIGHT_BUTTON = 2;
const MIDDLE_BUTTON = 4;
const BACK_BUTTON = 8;
const FORWARD_BUTTON = 16;
const ERASER_BUTTON = 32;

export default class {

  constructor(game, id, pointerMode) {
    this.game = game;
    this.id = id;
    this.type = POINTER;
    this.exists = true;
    this.identifier = 0;
    this.pointerId = null;
    this.pointerMode = pointerMode || (POINTER_CURSOR | POINTER_CONTACT);
    this.target = null;
    this.button = null;
    this.leftButton = new DeviceButton(this, LEFT_BUTTON);
    this.rightButton = new DeviceButton(this, RIGHT_BUTTON);
    this.middleButton = new DeviceButton(this, MIDDLE_BUTTON);
    this.backButton = new DeviceButton(this, BACK_BUTTON);
    this.forwardButton = new DeviceButton(this, FORWARD_BUTTON);
    this.eraserButton = new DeviceButton(this, ERASER_BUTTON);
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
    this.isMouse = (id === 0);
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

  resetButtons() {
    this.isDown = false;
    this.isUp = true;
    if (this.isMouse) {
      this.leftButton.reset();
    }
  }

  updateButtons(event) {
    if (event.type.toLowerCase().substr(-4) === 'down') {
      this.isUp = false;
      this.isDown = true;
    } else {
      this.isUp = true;
      this.isDown = false;
    }
  }

  start(event) {
    const input = this.game.input;
    if (event.pointerId) {
      this.pointerId = event.pointerId;
    }
    this.identifier = event.identifier;
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
    if (input.multiInputOverride === MOUSE_OVERRIDES_TOUCH || input.multiInputOverride === MOUSE_TOUCH_COMBINE || (input.multiInputOverride === TOUCH_OVERRIDES_MOUSE && input.totalActivePointers === 0)) {
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

  update() {
    const input = this.game.input;
    if (this.active) {
      // Force a check?
      if (this.dirty) {
        if (input.interactiveItems.total > 0) {
          this.processInteractiveObjects(false);
        }
        this.dirty = false;
      }
      if (this._holdSent === false && this.duration >= input.holdRate) {
        if (input.multiInputOverride === MOUSE_OVERRIDES_TOUCH || input.multiInputOverride === MOUSE_TOUCH_COMBINE || (input.multiInputOverride === TOUCH_OVERRIDES_MOUSE && input.totalActivePointers === 0)) {
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

  move(event, fromClick = false) {
    const input = this.game.input;
    if (input.pollLocked) {
      return null;
    }
    if (fromClick && this.isMouse) {
      this.updateButtons(event);
    }
    this.clientX = event.clientX;
    this.clientY = event.clientY;
    this.pageX = event.pageX;
    this.pageY = event.pageY;
    this.screenX = event.screenX;
    this.screenY = event.screenY;
    if (this.isMouse && input.mouse.locked && !fromClick) {
      this.rawMovementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
      this.rawMovementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
      this.movementX += this.rawMovementX;
      this.movementY += this.rawMovementY;
    }
    this.x = (this.pageX - this.game.scale.offset.x) * input.scale.x;
    this.y = (this.pageY - this.game.scale.offset.y) * input.scale.y;
    this.position.setTo(this.x, this.y);
    this.circle.x = this.x;
    this.circle.y = this.y;
    if (input.multiInputOverride === MOUSE_OVERRIDES_TOUCH || input.multiInputOverride === MOUSE_TOUCH_COMBINE || (input.multiInputOverride === TOUCH_OVERRIDES_MOUSE && input.totalActivePointers === 0)) {
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
      input.moveCallbacks[i].callback.call(input.moveCallbacks[i].context, this, this.x, this.y, fromClick);
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

  processInteractiveObjects(fromClick = false) {
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
        if ((fromClick && currentNode.checkPointerDown(this, true)) || (!fromClick && currentNode.checkPointerOver(this, true))) {
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
        if ((fromClick && currentNode.checkPointerDown(this, false)) || (!fromClick && currentNode.checkPointerOver(this, false))) {
          highestRenderOrderID = currentNode.sprite.renderOrderID;
          highestInputPriorityID = currentNode.priorityID;
          candidateTarget = currentNode;
          this.interactiveCandidates.push(currentNode);
        }
      }
      currentNode = this.game.input.interactiveItems.next;
    }
    if (this.game.input.customCandidateHandler) {
      candidateTarget = this.game.input.customCandidateHandler.call(this.game.input.customCandidateHandlerContext, this, this.interactiveCandidates, candidateTarget);
    }
    this.swapTarget(candidateTarget, false);
    return (this.targetObject !== null);
  }

  swapTarget(newTarget, silent = false) {
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
      if (newTarget.update(this) === false) {
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

  leave(event) {
    this.withinGame = false;
    this.move(event, false);
  }

  stop(event) {
    const input = this.game.input;
    if (this._stateReset && this.withinGame) {
      event.preventDefault();
      return null;
    }
    this.timeUp = this.game.time.time;
    if (input.multiInputOverride === MOUSE_OVERRIDES_TOUCH || input.multiInputOverride === MOUSE_TOUCH_COMBINE || (input.multiInputOverride === TOUCH_OVERRIDES_MOUSE && input.totalActivePointers === 0)) {
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
    this.withinGame = this.game.scale.bounds.contains(event.pageX, event.pageY);
    this.pointerId = null;
    this.identifier = null;
    this.positionUp.setTo(this.x, this.y);
    if (this.isMouse === false) {
      input.currentPointers -= 1;
    }
    input.interactiveItems.callAll('_releasedHandler', this);
    if (this._clickTrampolines) {
      this._trampolineTargetObject = this.targetObject;
    }
    this.targetObject = null;
    return this;
  }

  justPressed(duration) {
    duration = duration || this.game.input.justPressedRate;
    return (this.isDown === true && (this.timeDown + duration) > this.game.time.time);
  }

  justReleased(duration) {
    duration = duration || this.game.input.justReleasedRate;
    return (this.isUp && (this.timeUp + duration) > this.game.time.time);
  }

  addClickTrampoline(name, callback, callbackContext, callbackArgs) {
    if (!this.isDown) {
      return;
    }
    this._clickTrampolines = this._clickTrampolines || [];
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

  processClickTrampolines() {
    const trampolines = this._clickTrampolines;
    if (!trampolines) {
      return;
    }
    for (let i = 0; i < trampolines.length; i += 1) {
      const trampoline = trampolines[i];
      if (trampoline.targetObject === this._trampolineTargetObject) {
        trampoline.callback.apply(trampoline.callbackContext, trampoline.callbackArgs);
      }
    }
    this._clickTrampolines = null;
    this._trampolineTargetObject = null;
  }

  reset() {
    if (this.isMouse === false) {
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

  resetMovement() {
    this.movementX = 0;
    this.movementY = 0;
  }

  get duration() {
    if (this.isUp) {
      return -1;
    }
    return this.game.time.time - this.timeDown;
  }

  get worldX() {
    return this.x;
  }

  get worldY() {
    return this.y;
  }

}
