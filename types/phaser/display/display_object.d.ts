export class DisplayObject {
    /**
     * TBD.
     * @param {import('../core/game.js').Game} game - TBD.
     */
    constructor(game: import("../core/game.js").Game);
    /** @type {boolean} */
    exists: boolean;
    /** @type {boolean} */
    renderable: boolean;
    /** @type {boolean} */
    visible: boolean;
    /** @type {Point} */
    position: Point;
    /** @type {Point} */
    scale: Point;
    /** @type {Point} */
    pivot: Point;
    /** @type {Point} */
    anchor: Point;
    /** @type {number} */
    rotation: number;
    /** @type {number} */
    alpha: number;
    /** @type {Rectangle} */
    hitArea: Rectangle;
    /** @type {DisplayObject} */
    parent: DisplayObject;
    /** @type {number} */
    worldAlpha: number;
    /** @type {Matrix} */
    worldTransform: Matrix;
    /** @type {Point} */
    worldScale: Point;
    /** @type {Rectangle} */
    filterArea: Rectangle;
    /** @type {number} */
    _sr: number;
    /** @type {number} */
    _cr: number;
    /** @type {Rectangle} */
    cachedBounds: Rectangle;
    /** @type {Rectangle} */
    currentBounds: Rectangle;
    /** @type {import('./graphics.js').Graphics} */
    _mask: import("./graphics.js").Graphics;
    /** @type {object[]} */
    _filters: object[];
    /** @type {object} */
    _filterBlock: object;
    /** @type {DisplayObject[]} */
    children: DisplayObject[];
    /** @type {boolean} */
    ignoreChildInput: boolean;
    /** @type {string | null } */
    name: string | null;
    /** @type {object | null } */
    data: object | null;
    /** @type {import('../core/game.js').Game } */
    game: import("../core/game.js").Game;
    /**
     * TBD.
     */
    destroy(): void;
    /**
     * TBD.
     * @param {DisplayObject} child - TBD.
     * @returns {DisplayObject} TBD.
     */
    addChild(child: DisplayObject): DisplayObject;
    /**
     * TBD.
     * @param {DisplayObject} child - TBD.
     * @param {number} index - TBD.
     * @returns {DisplayObject} TBD.
     * @throws {Error}
     */
    addChildAt(child: DisplayObject, index: number): DisplayObject;
    /**
     * TBD.
     * @param {DisplayObject} child - TBD.
     * @param {DisplayObject} child2 - TBD.
     * @throws {Error}
     */
    swapChildren(child: DisplayObject, child2: DisplayObject): void;
    /**
     * TBD.
     * @param {DisplayObject} child - TBD.
     * @returns {number} TBD.
     * @throws {Error}
     */
    getChildIndex(child: DisplayObject): number;
    /**
     * TBD.
     * @param {DisplayObject} child - TBD.
     * @param {number} index - TBD.
     * @throws {Error}
     */
    setChildIndex(child: DisplayObject, index: number): void;
    /**
     * TBD.
     * @param {number} index - TBD.
     * @returns {DisplayObject} TBD.
     * @throws {Error}
     */
    getChildAt(index: number): DisplayObject;
    /**
     * TBD.
     * @param {DisplayObject} child - TBD.
     * @returns {DisplayObject} TBD.
     */
    removeChild(child: DisplayObject): DisplayObject;
    /**
     * TBD.
     * @param {number} index - TBD.
     * @returns {DisplayObject} TBD.
     */
    removeChildAt(index: number): DisplayObject;
    /**
     * TBD.
     * @param {number} beginIndex - TBD.
     * @param {number} endIndex - TBD.
     * @returns {DisplayObject[]} TBD.
     * @throws {Error}
     */
    removeChildren(beginIndex: number, endIndex: number): DisplayObject[];
    /**
     * TBD.
     * @param {DisplayObject | null | undefined} parent - TBD.
     * @returns {DisplayObject} TBD.
     */
    updateTransform(parent?: DisplayObject | null | undefined): DisplayObject;
    rotationCache: any;
    worldRotation: number;
    /**
     * TBD.
     * @param {DisplayObject} targetCoordinateSpace - TBD.
     * @returns {Rectangle} TBD.
     */
    getBounds(targetCoordinateSpace: DisplayObject): Rectangle;
    /**
     * TBD.
     * @returns {Rectangle} TBD.
     */
    getLocalBounds(): Rectangle;
    /**
     * TBD.
     * @param {DisplayObject} child - TBD.
     * @returns {boolean} TBD.
     */
    contains(child: DisplayObject): boolean;
    /**
     * TBD.
     * @param {object} renderSession - TBD.
     */
    renderWebGL(renderSession: object): void;
    /**
     * TBD.
     * @param {object} renderSession - TBD.
     */
    renderCanvas(renderSession: object): void;
    /**
     * TBD.
     */
    preUpdate(): void;
    /**
     * TBD.
     */
    update(): void;
    /**
     * TBD.
     */
    postUpdate(): void;
    /**
     * TBD.
     * @throws {Error}
     */
    generateTexture(): void;
    /**
     * TBD.
     * @param {Point} position - TBD.
     * @returns {Point} TBD.
     */
    toGlobal(position: Point): Point;
    /**
     * TBD.
     * @param {Point} position - TBD.
     * @param {DisplayObject} from - TBD.
     * @returns {Point} TBD.
     */
    toLocal(position: Point, from: DisplayObject): Point;
    /**
     * TBD.
     * @param {object} renderSession - TBD.
     */
    renderCachedSprite(renderSession: object): void;
    /**
     * TBD.
     */
    generateCachedSprite(): void;
    /**
     * TBD.
     */
    destroyCachedSprite(): void;
    _cachedSprite: any;
    /**
     * TBD.
     */
    set width(value: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get width(): number;
    _width: number;
    /**
     * TBD.
     */
    set height(value: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get height(): number;
    _height: number;
    /**
     * TBD.
     */
    set x(value: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get x(): number;
    /**
     * TBD.
     */
    set y(value: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get y(): number;
    /**
     * TBD.
     * @returns {boolean} TBD.
     */
    get worldVisible(): boolean;
    /**
     * TBD.
     */
    set mask(value: import("./graphics.js").Graphics);
    /**
     * TBD.
     * @returns {import('./graphics.js').Graphics} TBD.
     */
    get mask(): import("./graphics.js").Graphics;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get offsetX(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get offsetY(): number;
    /**
     * TBD.
     */
    set centerX(value: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get centerX(): number;
    /**
     * TBD.
     */
    set centerY(value: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get centerY(): number;
    /**
     * TBD.
     */
    set left(value: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get left(): number;
    /**
     * TBD.
     */
    set right(value: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get right(): number;
    /**
     * TBD.
     */
    set top(value: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get top(): number;
    /**
     * TBD.
     */
    set bottom(value: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get bottom(): number;
}
import { Point } from '../geom/point.js';
import { Rectangle } from '../geom/rectangle.js';
import { Matrix } from '../geom/matrix.js';
//# sourceMappingURL=display_object.d.ts.map