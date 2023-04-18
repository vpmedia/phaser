/**
 * @module display/group
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 */
import { DisplayObject } from  './display_object';
import { Image } from './image';
import { Signal } from  '../core/signal';
import { Game } from  '../core/game';
import { GROUP } from '../core/const';

export const SORT_ASCENDING = -1;
export const SORT_DESCENDING = 1;

export class Group extends DisplayObject {
  /**
   * TBD.
   * @param {Game} game - TBD.
   * @param {DisplayObject} parent - TBD.
   * @param {string} name - TBD.
   * @param {boolean} addToStage - TBD.
   */
  constructor(game, parent = null, name = 'group', addToStage = false) {
    super();
    this.game = game;
    this.type = GROUP;
    if (!parent) {
      parent = game.world;
    }
    this.name = name || 'group';
    this.z = 0;
    if (addToStage) {
      this.game.stage.addChild(this);
      this.z = this.game.stage.children.length;
    } else if (parent) {
      parent.addChild(this);
      this.z = parent.children.length;
    }
    this.ignoreDestroy = false;
    this.pendingDestroy = false;
    this.classType = Image;
    this.cursor = null;
    this.inputEnableChildren = false;
    this.onChildInputDown = new Signal();
    this.onChildInputUp = new Signal();
    this.onChildInputOver = new Signal();
    this.onChildInputOut = new Signal();
    this.onDestroy = new Signal();
    this.cursorIndex = 0;
    this._sortProperty = 'z';
  }

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

  addAt(child, index, silent) {
    this.add(child, silent, index);
  }

  getAt(index) {
    if (index < 0 || index >= this.children.length) {
      return -1;
    }
    return this.getChildAt(index);
  }

  updateZ() {
    let i = this.children.length;
    while (i) {
      i -= 1;
      this.children[i].z = i;
    }
  }

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

  swap(child1, child2) {
    this.swapChildren(child1, child2);
    this.updateZ();
  }

  bringToTop(child) {
    if (child.parent === this && this.getIndex(child) < this.children.length) {
      this.remove(child, false, true);
      this.add(child, true);
    }
    return child;
  }

  sendToBack(child) {
    if (child.parent === this && this.getIndex(child) > 0) {
      this.remove(child, false, true);
      this.addAt(child, 0, true);
    }
    return child;
  }

  reverse() {
    this.children.reverse();
    this.updateZ();
  }

  getIndex(child) {
    return this.children.indexOf(child);
  }

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

  update() {
    let i = this.children.length;
    while (i) {
      i -= 1;
      this.children[i].update();
    }
  }

  postUpdate() {
    for (let i = 0; i < this.children.length; i += 1) {
      this.children[i].postUpdate();
    }
  }

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
