export const SORT_ASCENDING: -1;
export const SORT_DESCENDING: 1;
export class Group extends DisplayObject {
    /**
     * Creates a new Group object.
     * @param {import('../core/game.js').Game} game - The game instance this group belongs to.
     * @param {DisplayObject} parent - The parent display object.
     * @param {string} name - The name of this group.
     * @param {boolean} addToStage - Whether to add this group to the stage.
     */
    constructor(game: import("../core/game.js").Game, parent?: DisplayObject, name?: string, addToStage?: boolean);
    /** @type {number} */
    type: number;
    /** @type {number} */
    z: number;
    /** @type {boolean} */
    ignoreDestroy: boolean;
    /** @type {boolean} */
    pendingDestroy: boolean;
    classType: typeof Image;
    cursor: any;
    /** @type {boolean} */
    inputEnableChildren: boolean;
    /** @type {Signal} */
    onChildInputDown: Signal;
    /** @type {Signal} */
    onChildInputUp: Signal;
    /** @type {Signal} */
    onChildInputOver: Signal;
    /** @type {Signal} */
    onChildInputOut: Signal;
    /** @type {Signal} */
    onDestroy: Signal;
    /** @type {number} */
    cursorIndex: number;
    /** @type {string} */
    _sortProperty: string;
    /**
     * Destroys this group and cleans up resources.
     * @param {boolean} destroyChildren - Whether to destroy children as well.
     * @param {boolean} soft - Whether to perform a soft destroy (leaving the group in the parent's children list).
     */
    destroy(destroyChildren?: boolean, soft?: boolean): void;
    filters: any;
    /**
     * Adds a child to this group.
     * @param {DisplayObject} child - The child to add.
     * @param {boolean} silent - Whether to dispatch events.
     * @param {number} index - The index to add the child at.
     * @returns {DisplayObject} The added child.
     */
    add(child: DisplayObject, silent?: boolean, index?: number): DisplayObject;
    /**
     * Adds a child to this group at a specific index.
     * @param {DisplayObject} child - The child to add.
     * @param {number} index - The index to add the child at.
     * @param {boolean} silent - Whether to dispatch events.
     */
    addAt(child: DisplayObject, index: number, silent: boolean): void;
    /**
     * Gets a child at the specified index.
     * @param {number} index - The index of the child to get.
     * @returns {DisplayObject} The child at the specified index, or -1 if not found.
     */
    getAt(index: number): DisplayObject;
    /**
     * Updates the Z indices of all children in this group.
     */
    updateZ(): void;
    /**
     * Gets the next child in this group (with circular wrapping).
     * @returns {DisplayObject} The next child, or null if no children exist.
     */
    next(): DisplayObject;
    /**
     * Gets the previous child in this group (with circular wrapping).
     * @returns {DisplayObject} The previous child, or null if no children exist.
     */
    previous(): DisplayObject;
    /**
     * Swaps the positions of two children in this group.
     * @param {DisplayObject} child1 - The first child to swap.
     * @param {DisplayObject} child2 - The second child to swap.
     */
    swap(child1: DisplayObject, child2: DisplayObject): void;
    /**
     * Brings a child to the top of this group.
     * @param {DisplayObject} child - The child to bring to the top.
     * @returns {DisplayObject} The child that was brought to the top.
     */
    bringToTop(child: DisplayObject): DisplayObject;
    /**
     * Sends a child to the back of this group.
     * @param {DisplayObject} child - The child to send to the back.
     * @returns {DisplayObject} The child that was sent to the back.
     */
    sendToBack(child: DisplayObject): DisplayObject;
    /**
     * Reverses the order of children in this group.
     */
    reverse(): void;
    /**
     * Gets the index of a child in this group.
     * @param {DisplayObject} child - The child to get the index of.
     * @returns {number} The index of the child, or -1 if not found.
     */
    getIndex(child: DisplayObject): number;
    renderOrderID: number;
    /**
     * Removes a child from this group.
     * @param {DisplayObject} child - The child to remove.
     * @param {boolean} destroy - Whether to destroy the child after removing it.
     * @param {boolean} silent - Whether to dispatch events.
     * @returns {boolean} True if the child was removed, false otherwise.
     */
    remove(child: DisplayObject, destroy?: boolean, silent?: boolean): boolean;
    /**
     * Removes all children from this group.
     * @param {boolean} destroy - Whether to destroy children as well.
     * @param {boolean} silent - Whether to dispatch events.
     * @param {boolean} destroyTexture - Whether to destroy textures as well.
     */
    removeAll(destroy?: boolean, silent?: boolean, destroyTexture?: boolean): void;
}
import { DisplayObject } from './display_object.js';
import { Image } from './image.js';
import { Signal } from '../core/signal.js';
//# sourceMappingURL=group.d.ts.map