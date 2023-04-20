export const SORT_ASCENDING: -1;
export const SORT_DESCENDING: 1;
export class Group extends DisplayObject {
    /**
     * TBD.
     * @param {Game} game - TBD.
     * @param {DisplayObject} parent - TBD.
     * @param {string} name - TBD.
     * @param {boolean} addToStage - TBD.
     */
    constructor(game: Game, parent?: DisplayObject, name?: string, addToStage?: boolean);
    game: Game;
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
     * @param destroyChildren
     * @param soft
     */
    destroy(destroyChildren?: boolean, soft?: boolean): void;
    filters: any;
    /**
     * TBD.
     * @param child
     * @param silent
     * @param index
     */
    add(child: any, silent?: boolean, index?: number): any;
    /**
     * TBD.
     * @param child
     * @param index
     * @param silent
     */
    addAt(child: any, index: any, silent: any): void;
    /**
     * TBD.
     * @param index
     */
    getAt(index: any): any;
    /**
     * TBD.
     */
    updateZ(): void;
    /**
     * TBD.
     */
    next(): any;
    /**
     * TBD.
     */
    previous(): any;
    /**
     * TBD.
     * @param child1
     * @param child2
     */
    swap(child1: any, child2: any): void;
    /**
     * TBD.
     * @param child
     */
    bringToTop(child: any): any;
    /**
     * TBD.
     * @param child
     */
    sendToBack(child: any): any;
    /**
     * TBD.
     */
    reverse(): void;
    /**
     * TBD.
     * @param child
     */
    getIndex(child: any): number;
    renderOrderID: number;
    /**
     * TBD.
     * @param child
     * @param destroy
     * @param silent
     */
    remove(child: any, destroy?: boolean, silent?: boolean): boolean;
    /**
     * TBD.
     * @param destroy
     * @param silent
     * @param destroyTexture
     */
    removeAll(destroy?: boolean, silent?: boolean, destroyTexture?: boolean): void;
}
import { DisplayObject } from './display_object';
import { Game } from '../core/game';
import { Image } from './image';
import { Signal } from '../core/signal';
//# sourceMappingURL=group.d.ts.map