export const SORT_ASCENDING: -1;
export const SORT_DESCENDING: 1;
export class Group extends DisplayObject {
    /**
     * TBD.
     * @param {import('../core/game.js').Game} game - TBD.
     * @param {DisplayObject} parent - TBD.
     * @param {string} name - TBD.
     * @param {boolean} addToStage - TBD.
     */
    constructor(game: import('../core/game').Game, parent?: DisplayObject, name?: string, addToStage?: boolean);
    game: import("../core/game").Game;
    type: number;
    name: string;
    z: number;
    ignoreDestroy: boolean;
    pendingDestroy: boolean;
    classType: typeof Image;
    cursor: any;
    inputEnableChildren: boolean;
    onChildInputDown: Signal;
    onChildInputUp: Signal;
    onChildInputOver: Signal;
    onChildInputOut: Signal;
    onDestroy: Signal;
    cursorIndex: number;
    _sortProperty: string;
    /**
     * TBD.
     * @param {boolean} destroyChildren - TBD.
     * @param {boolean} soft - TBD.
     */
    destroy(destroyChildren?: boolean, soft?: boolean): void;
    filters: any;
    /**
     * TBD.
     * @param {DisplayObject} child - TBD.
     * @param {boolean} silent - TBD.
     * @param {number} index - TBD.
     * @returns {DisplayObject} TBD.
     */
    add(child: DisplayObject, silent?: boolean, index?: number): DisplayObject;
    /**
     * TBD.
     * @param {DisplayObject} child - TBD.
     * @param {number} index - TBD.
     * @param {boolean} silent - TBD.
     */
    addAt(child: DisplayObject, index: number, silent: boolean): void;
    /**
     * TBD.
     * @param {number} index - TBD.
     * @returns {DisplayObject} TBD.
     */
    getAt(index: number): DisplayObject;
    /**
     * TBD.
     */
    updateZ(): void;
    /**
     * TBD.
     * @returns {DisplayObject} TBD.
     */
    next(): DisplayObject;
    /**
     * TBD.
     * @returns {DisplayObject} TBD.
     */
    previous(): DisplayObject;
    /**
     * TBD.
     * @param {DisplayObject} child1 - TBD.
     * @param {DisplayObject} child2 - TBD.
     */
    swap(child1: DisplayObject, child2: DisplayObject): void;
    /**
     * TBD.
     * @param {DisplayObject} child - TBD.
     * @returns {DisplayObject} TBD.
     */
    bringToTop(child: DisplayObject): DisplayObject;
    /**
     * TBD.
     * @param {DisplayObject} child - TBD.
     * @returns {DisplayObject} TBD.
     */
    sendToBack(child: DisplayObject): DisplayObject;
    /**
     * TBD.
     */
    reverse(): void;
    /**
     * TBD.
     * @param {DisplayObject} child - TBD.
     * @returns {number} TBD.
     */
    getIndex(child: DisplayObject): number;
    renderOrderID: number;
    /**
     * TBD.
     * @param {DisplayObject} child - TBD.
     * @param {boolean} destroy - TBD.
     * @param {boolean} silent - TBD.
     * @returns {boolean} TBD.
     */
    remove(child: DisplayObject, destroy?: boolean, silent?: boolean): boolean;
    /**
     * TBD.
     * @param {boolean} destroy - TBD.
     * @param {boolean} silent - TBD.
     * @param {boolean} destroyTexture - TBD.
     */
    removeAll(destroy?: boolean, silent?: boolean, destroyTexture?: boolean): void;
}
import { Signal } from '../core/signal';
import { DisplayObject } from './display_object';
import { Image } from './image';
//# sourceMappingURL=group.d.ts.map
