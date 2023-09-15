export class DisplayObject {
    exists: boolean;
    renderable: boolean;
    visible: boolean;
    position: Point;
    scale: Point;
    pivot: Point;
    anchor: Point;
    rotation: number;
    alpha: number;
    hitArea: any;
    parent: any;
    worldAlpha: number;
    worldTransform: Matrix;
    worldScale: Point;
    filterArea: any;
    _sr: number;
    _cr: number;
    cachedBounds: Rectangle;
    currentBounds: any;
    _mask: import("./graphics").Graphics;
    children: any[];
    ignoreChildInput: boolean;
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
     * @throws Error.
     */
    addChildAt(child: DisplayObject, index: number): DisplayObject;
    /**
     * TBD.
     * @param {DisplayObject} child - TBD.
     * @param {DisplayObject} child2 - TBD.
     * @throws Error.
     */
    swapChildren(child: DisplayObject, child2: DisplayObject): void;
    /**
     * TBD.
     * @param {DisplayObject} child - TBD.
     * @returns {number} TBD.
     * @throws Error.
     */
    getChildIndex(child: DisplayObject): number;
    /**
     * TBD.
     * @param {DisplayObject} child - TBD.
     * @param {number} index - TBD.
     * @throws Error.
     */
    setChildIndex(child: DisplayObject, index: number): void;
    /**
     * TBD.
     * @param {number} index - TBD.
     * @returns {DisplayObject} TBD.
     * @throws Error.
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
     * @throws Error.
     */
    removeChildren(beginIndex: number, endIndex: number): DisplayObject[];
    /**
     * TBD.
     * @param {DisplayObject} parent - TBD.
     * @returns {DisplayObject} TBD.
     */
    updateTransform(parent: DisplayObject): DisplayObject;
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
    set width(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get width(): number;
    _width: number;
    /**
     * TBD.
     */
    set height(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get height(): number;
    _height: number;
    /**
     * TBD.
     */
    set x(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get x(): number;
    /**
     * TBD.
     */
    set y(arg: number);
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
    set mask(arg: import("./graphics").Graphics);
    /**
     * TBD.
     * @returns {import('./graphics').Graphics} TBD.
     */
    get mask(): import("./graphics").Graphics;
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
    set centerX(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get centerX(): number;
    /**
     * TBD.
     */
    set centerY(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get centerY(): number;
    /**
     * TBD.
     */
    set left(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get left(): number;
    /**
     * TBD.
     */
    set right(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get right(): number;
    /**
     * TBD.
     */
    set top(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get top(): number;
    /**
     * TBD.
     */
    set bottom(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get bottom(): number;
}
import { Point } from '../geom/point.js';
import { Matrix } from '../geom/matrix.js';
import { Rectangle } from '../geom/rectangle.js';
//# sourceMappingURL=display_object.d.ts.map