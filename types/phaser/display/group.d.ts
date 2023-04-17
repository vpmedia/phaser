export const SORT_ASCENDING: -1;
export const SORT_DESCENDING: 1;
export class Group extends DisplayObject {
    /**
     * TBD.
     *
     * @param {object} game - TBD.
     * @param {DisplayObject} parent - TBD.
     * @param {string} name - TBD.
     * @param {boolean} addToStage - TBD.
     */
    constructor(game: object, parent?: DisplayObject, name?: string, addToStage?: boolean);
    game: object;
    type: number;
    name: string;
    z: any;
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
    destroy(destroyChildren?: boolean, soft?: boolean): void;
    filters: any;
    add(child: any, silent?: boolean, index?: number): any;
    addAt(child: any, index: any, silent: any): void;
    getAt(index: any): any;
    updateZ(): void;
    next(): any;
    previous(): any;
    swap(child1: any, child2: any): void;
    bringToTop(child: any): any;
    sendToBack(child: any): any;
    reverse(): void;
    getIndex(child: any): number;
    renderOrderID: number | undefined;
    remove(child: any, destroy?: boolean, silent?: boolean): boolean;
    removeAll(destroy?: boolean, silent?: boolean, destroyTexture?: boolean): void;
}
import { DisplayObject } from './display_object';
import { Image } from './image';
import { Signal } from '../core/signal';
//# sourceMappingURL=group.d.ts.map