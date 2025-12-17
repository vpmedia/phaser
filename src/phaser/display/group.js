import { GROUP } from '../core/const.js';
import { Signal } from '../core/signal.js';
import { DisplayObject } from './display_object.js';
import { Image } from './image.js';

export const SORT_ASCENDING = -1;
export const SORT_DESCENDING = 1;

export class Group extends DisplayObject {
  /**
   * Creates a new Group object.
   * @param {import('../core/game.js').Game} game - The game instance this group belongs to.
   * @param {DisplayObject} parent - The parent display object.
   * @param {string} name - The name of this group.
   * @param {boolean} addToStage - Whether to add this group to the stage.
   */
  constructor(game, parent = null, name = null, addToStage = false) {
    super(game);
    /** @type {number} */
    this.type = GROUP;
    if (!parent) {
      parent = game.world;
    }
    /** @type {string} */
    this.name = name || 'group';
    /** @type {number} */
    this.z = 0;
    if (addToStage) {
      this.game.stage.addChild(this);
      this.z = this.game.stage.children.length;
    } else if (parent) {
      parent.addChild(this);
      this.z = parent.children.length;
    }
    /** @type {boolean} */
    this.ignoreDestroy = false;
    /** @type {boolean} */
    this.pendingDestroy = false;
    this.classType = Image;
    this.cursor = null;
    /** @type {boolean} */
    this.inputEnableChildren = false;
    /** @type {Signal} */
    this.onChildInputDown = new Signal();
    /** @type {Signal} */
    this.onChildInputUp = new Signal();
    /** @type {Signal} */
    this.onChildInputOver = new Signal();
    /** @type {Signal} */
    this.onChildInputOut = new Signal();
    /** @type {Signal} */
    this.onDestroy = new Signal();
    /** @type {number} */
    this.cursorIndex = 0;
    /** @type {string} */
    this._sortProperty = 'z';
  }

  /**
   * Destroys this group and cleans up resources.
   * @param {boolean} destroyChildren - Whether to destroy children as well.
   * @param {boolean} soft - Whether to perform a soft destroy (leaving the group in the parent's children list).
   */
  destroy(destroyChildren = true, soft = false) {
    if (this.game === null || this.ignoreDestroy) {
      return;
    }
    this.onDestroy.dispatch(this, destroyChildren, soft);
    this.removeAll(destroyChildren);
    this.cursor = null;
    this.filters = null;
    this.pendingDestroy = false;
    if (!soft) {
      if (this.parent) {
        this.parent.removeChild(this);
      }
      this.game = null;
      this.exists = false;
    }
  }

  /**
   * Adds a child to this group.
   * @param {DisplayObject} child - The child to add.
   * @param {boolean} silent - Whether to dispatch events.
   * @param {number} index - The index to add the child at.
   * @returns {DisplayObject} The added child.
   */
  add(child, silent = false, index = -1) {
    if (child.parent === this) {
      return child;
    }
    if (index === -1) {
      child.z = this.children.length;
      this.addChild(child);
    } else {
      this.addChildAt(child, index);
      this.updateZ();
    }
    if (this.inputEnableChildren && (!child.input || child.inputEnabled)) {
      child.inputEnabled = true;
    }
    if (!silent && child.events) {
      child.events.onAddedToGroup$dispatch(child, this);
    }
    if (this.cursor === null) {
      this.cursor = child;
    }
    return child;
  }

  /**
   * Adds a child to this group at a specific index.
   * @param {DisplayObject} child - The child to add.
   * @param {number} index - The index to add the child at.
   * @param {boolean} silent - Whether to dispatch events.
   */
  addAt(child, index, silent) {
    this.add(child, silent, index);
  }

  /**
   * Gets a child at the specified index.
   * @param {number} index - The index of the child to get.
   * @returns {DisplayObject} The child at the specified index, or -1 if not found.
   */
  getAt(index) {
    if (index < 0 || index >= this.children.length) {
      return -1;
    }
    return this.getChildAt(index);
  }

  /**
   * Updates the Z indices of all children in this group.
   */
  updateZ() {
    let i = this.children.length;
    while (i) {
      i -= 1;
      this.children[i].z = i;
    }
  }

  /**
   * Gets the next child in this group (with circular wrapping).
   * @returns {DisplayObject} The next child, or null if no children exist.
   */
  next() {
    if (this.cursor) {
      //  Wrap the cursor?
      if (this.cursorIndex >= this.children.length - 1) {
        this.cursorIndex = 0;
      } else {
        this.cursorIndex += 1;
      }
      this.cursor = this.children[this.cursorIndex];
      return this.cursor;
    }
    return null;
  }

  /**
   * Gets the previous child in this group (with circular wrapping).
   * @returns {DisplayObject} The previous child, or null if no children exist.
   */
  previous() {
    if (this.cursor) {
      //  Wrap the cursor?
      if (this.cursorIndex === 0) {
        this.cursorIndex = this.children.length - 1;
      } else {
        this.cursorIndex -= 1;
      }
      this.cursor = this.children[this.cursorIndex];
      return this.cursor;
    }
    return null;
  }

  /**
   * Swaps the positions of two children in this group.
   * @param {DisplayObject} child1 - The first child to swap.
   * @param {DisplayObject} child2 - The second child to swap.
   */
  swap(child1, child2) {
    this.swapChildren(child1, child2);
    this.updateZ();
  }

  /**
   * Brings a child to the top of this group.
   * @param {DisplayObject} child - The child to bring to the top.
   * @returns {DisplayObject} The child that was brought to the top.
   */
  bringToTop(child) {
    if (child.parent === this && this.getIndex(child) < this.children.length) {
      this.remove(child, false, true);
      this.add(child, true);
    }
    return child;
  }

  /**
   * Sends a child to the back of this group.
   * @param {DisplayObject} child - The child to send to the back.
   * @returns {DisplayObject} The child that was sent to the back.
   */
  sendToBack(child) {
    if (child.parent === this && this.getIndex(child) > 0) {
      this.remove(child, false, true);
      this.addAt(child, 0, true);
    }
    return child;
  }

  /**
   * Reverses the order of children in this group.
   */
  reverse() {
    this.children.reverse();
    this.updateZ();
  }

  /**
   * Gets the index of a child in this group.
   * @param {DisplayObject} child - The child to get the index of.
   * @returns {number} The index of the child, or -1 if not found.
   */
  getIndex(child) {
    return this.children.indexOf(child);
  }

  /**
   * Updates the Z indices of all children in this group before the update cycle.
   */
  preUpdate() {
    if (this.pendingDestroy) {
      this.destroy();
      return;
    }
    if (!this.exists || !this.parent.exists) {
      this.renderOrderID = -1;
      return;
    }
    for (let i = 0; i < this.children.length; i += 1) {
      this.children[i].preUpdate();
    }
  }

  /**
   * Updates all children in this group during the update cycle.
   */
  update() {
    let i = this.children.length;
    while (i) {
      i -= 1;
      this.children[i].update();
    }
  }

  /**
   * Updates all children in this group after the update cycle.
   */
  postUpdate() {
    for (let i = 0; i < this.children.length; i += 1) {
      this.children[i].postUpdate();
    }
  }

  /**
   * Removes a child from this group.
   * @param {DisplayObject} child - The child to remove.
   * @param {boolean} destroy - Whether to destroy the child after removing it.
   * @param {boolean} silent - Whether to dispatch events.
   * @returns {boolean} True if the child was removed, false otherwise.
   */
  remove(child, destroy = true, silent = false) {
    if (this.children.length === 0 || this.children.indexOf(child) === -1) {
      return false;
    }
    if (!silent && child.events && !child.destroyPhase) {
      child.events.onRemovedFromGroup$dispatch(child, this);
    }
    const removed = this.removeChild(child);
    this.updateZ();
    if (this.cursor === child) {
      this.next();
    }
    if (destroy && removed) {
      removed.destroy(true);
    }
    return true;
  }

  /**
   * Removes all children from this group.
   * @param {boolean} destroy - Whether to destroy children as well.
   * @param {boolean} silent - Whether to dispatch events.
   * @param {boolean} destroyTexture - Whether to destroy textures as well.
   */
  removeAll(destroy = true, silent = false, destroyTexture = false) {
    if (this.children.length === 0) {
      return;
    }
    do {
      if (!silent && this.children[0].events) {
        this.children[0].events.onRemovedFromGroup$dispatch(this.children[0], this);
      }
      const removed = this.removeChild(this.children[0]);
      if (destroy && removed) {
        removed.destroy(true, destroyTexture);
      }
    } while (this.children.length > 0);
    this.cursor = null;
  }
}
