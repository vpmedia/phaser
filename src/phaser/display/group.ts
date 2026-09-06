import { GROUP } from '../core/const.js';
import { Signal } from '../core/signal.js';
import { DisplayObject } from './display_object.js';
import { Image } from './image.js';
import type { Game } from '../core/game.js';

export const SORT_ASCENDING = -1;
export const SORT_DESCENDING = 1;

export class Group extends DisplayObject {
  declare public z: number;
  public ignoreDestroy!: boolean;
  public pendingDestroy!: boolean;
  public classType!: new (game: Game, ...args: never[]) => DisplayObject;
  public cursor!: DisplayObject | null;
  public inputEnableChildren!: boolean;
  public onChildInputDown!: Signal;
  public onChildInputUp!: Signal;
  public onChildInputOver!: Signal;
  public onChildInputOut!: Signal;
  public onDestroy!: Signal;
  public cursorIndex!: number;
  public _sortProperty!: string;
  public filters!: object[] | null;
  /**
   * Creates a new Group object.
   * @param {Game} game - The game instance this group belongs to.
   * @param {DisplayObject} parent - The parent display object.
   * @param {string} name - The name of this group.
   * @param {boolean} addToStage - Whether to add this group to the stage.
   */
  public constructor(game: Game, parent: DisplayObject | null = null, name: string | null = null, addToStage = false) {
    super(game);
    /** @type {number} */
    this.type = GROUP;
    const target = parent ?? game.world;
    /** @type {string} */
    this.name = name ?? 'group';
    /** @type {number} */
    this.z = 0;
    if (addToStage) {
      this.game.stage.addChild(this);
      this.z = this.game.stage.children.length;
    } else if (target) {
      target.addChild(this);
      this.z = target.children.length;
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
  public override destroy(destroyChildren = true, soft = false): void {
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
      this.game = null!;
      this.exists = false;
    }
  }

  /**
   * Adds a child to this group.
   * @template T
   * @param {T} child - The child to add.
   * @param {boolean} silent - Whether to dispatch events.
   * @param {number} index - The index to add the child at.
   * @returns {T} The added child.
   */
  public add<T extends DisplayObject>(child: T, silent = false, index = -1): T {
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
    const inputChild = child as T & { input?: unknown; inputEnabled?: boolean };
    if (this.inputEnableChildren && (!inputChild.input || inputChild.inputEnabled)) {
      inputChild.inputEnabled = true;
    }
    if (!silent && child.events) {
      child.events.onAddedToGroup$dispatch(child, this);
    }
    this.cursor ??= child;
    return child;
  }

  /**
   * Adds a child to this group at a specific index.
   * @param {DisplayObject} child - The child to add.
   * @param {number} index - The index to add the child at.
   * @param {boolean} silent - Whether to dispatch events.
   */
  public addAt(child: DisplayObject, index: number, silent: boolean): void {
    this.add(child, silent, index);
  }

  /**
   * Gets a child at the specified index.
   * @param {number} index - The index of the child to get.
   * @returns {DisplayObject} The child at the specified index, or -1 if not found.
   */
  public getAt(index: number): -1 | DisplayObject | undefined {
    if (index < 0 || index >= this.children.length) {
      return -1;
    }
    return this.getChildAt(index);
  }

  /**
   * Updates the Z indices of all children in this group.
   */
  public updateZ(): void {
    let i = this.children.length;
    while (i) {
      i -= 1;
      this.children[i]!.z = i;
    }
  }

  /**
   * Gets the next child in this group (with circular wrapping).
   * @returns {DisplayObject} The next child, or null if no children exist.
   */
  public next(): DisplayObject | null {
    if (this.cursor) {
      //  Wrap the cursor?
      if (this.cursorIndex >= this.children.length - 1) {
        this.cursorIndex = 0;
      } else {
        this.cursorIndex += 1;
      }
      this.cursor = this.children[this.cursorIndex] ?? null;
      return this.cursor;
    }
    return null;
  }

  /**
   * Gets the previous child in this group (with circular wrapping).
   * @returns {DisplayObject} The previous child, or null if no children exist.
   */
  public previous(): DisplayObject | null {
    if (this.cursor) {
      //  Wrap the cursor?
      if (this.cursorIndex === 0) {
        this.cursorIndex = this.children.length - 1;
      } else {
        this.cursorIndex -= 1;
      }
      this.cursor = this.children[this.cursorIndex] ?? null;
      return this.cursor;
    }
    return null;
  }

  /**
   * Swaps the positions of two children in this group.
   * @param {DisplayObject} child1 - The first child to swap.
   * @param {DisplayObject} child2 - The second child to swap.
   */
  public swap(child1: DisplayObject, child2: DisplayObject): void {
    this.swapChildren(child1, child2);
    this.updateZ();
  }

  /**
   * Brings a child to the top of this group.
   * @param {DisplayObject} child - The child to bring to the top.
   * @returns {DisplayObject} The child that was brought to the top.
   */
  public bringToTop(child: DisplayObject): DisplayObject {
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
  public sendToBack(child: DisplayObject): DisplayObject {
    if (child.parent === this && this.getIndex(child) > 0) {
      this.remove(child, false, true);
      this.addAt(child, 0, true);
    }
    return child;
  }

  /**
   * Reverses the order of children in this group.
   */
  public reverse(): void {
    this.children.reverse();
    this.updateZ();
  }

  /**
   * Gets the index of a child in this group.
   * @param {DisplayObject} child - The child to get the index of.
   * @returns {number} The index of the child, or -1 if not found.
   */
  public getIndex(child: DisplayObject): number {
    return this.children.indexOf(child);
  }

  /**
   * Updates the Z indices of all children in this group before the update cycle.
   */
  public override preUpdate(): void {
    if (this.pendingDestroy) {
      this.destroy();
      return;
    }
    if (!this.exists || !this.parent?.exists) {
      this.renderOrderID = -1;
      return;
    }
    for (const child of this.children) {
      child.preUpdate();
    }
  }

  /**
   * Updates all children in this group during the update cycle.
   */
  public override update(): void {
    let i = this.children.length;
    while (i) {
      i -= 1;
      this.children[i]!.update();
    }
  }

  /**
   * Updates all children in this group after the update cycle.
   */
  public override postUpdate(): void {
    for (const child of this.children) {
      child.postUpdate();
    }
  }

  /**
   * Removes a child from this group.
   * @param {DisplayObject} child - The child to remove.
   * @param {boolean} destroy - Whether to destroy the child after removing it.
   * @param {boolean} silent - Whether to dispatch events.
   * @returns {boolean} True if the child was removed, false otherwise.
   */
  public remove(child: DisplayObject, destroy = true, silent = false): boolean {
    if (this.children.length === 0 || !this.children.includes(child)) {
      return false;
    }
    if (!silent && child.events) {
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
  public removeAll(destroy = true, silent = false, destroyTexture = false): void {
    if (this.children.length === 0) {
      return;
    }
    do {
      const first = this.children[0]!;
      if (!silent && first.events) {
        first.events.onRemovedFromGroup$dispatch(first, this);
      }
      const removed = this.removeChild(first);
      if (destroy && removed) {
        removed.destroy(true, destroyTexture);
      }
    } while (this.children.length > 0);
    this.cursor = null;
  }
}
