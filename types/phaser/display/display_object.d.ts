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
    _mask: any;
    children: any[];
    ignoreChildInput: boolean;
    /**
     * TBD.
     */
    destroy(): void;
    /**
     * TBD.
     * @param child - TBD.
     */
    addChild(child: any): any;
    /**
     * TBD.
     * @param child - TBD.
     * @param {number} index - TBD.
     */
    addChildAt(child: any, index: number): any;
    /**
     * TBD.
     * @param child - TBD.
     * @param child2 - TBD.
     */
    swapChildren(child: any, child2: any): void;
    /**
     * TBD.
     * @param child - TBD.
     */
    getChildIndex(child: any): number;
    /**
     * TBD.
     * @param child - TBD.
     * @param {number} index - TBD.
     */
    setChildIndex(child: any, index: number): void;
    /**
     * TBD.
     * @param {number} index - TBD.
     */
    getChildAt(index: number): any;
    /**
     * TBD.
     * @param child - TBD.
     */
    removeChild(child: any): any;
    /**
     * TBD.
     * @param {number} index - TBD.
     */
    removeChildAt(index: number): any;
    /**
     * TBD.
     * @param {number} beginIndex - TBD.
     * @param {number} endIndex - TBD.
     */
    removeChildren(beginIndex: number, endIndex: number): any[];
    /**
     * TBD.
     * @param parent - TBD.
     */
    updateTransform(parent: any): DisplayObject;
    rotationCache: any;
    worldRotation: number;
    /**
     * TBD.
     * @param targetCoordinateSpace - TBD.
     */
    getBounds(targetCoordinateSpace: any): Rectangle;
    /**
     * TBD.
     * @returns {Rectangle} TBD.
     */
    getLocalBounds(): Rectangle;
    /**
     * TBD.
     * @param child - TBD.
     * @returns {boolean} TBD.
     */
    contains(child: any): boolean;
    /**
     * TBD.
     * @param renderSession - TBD.
     */
    renderWebGL(renderSession: any): void;
    /**
     * TBD.
     * @param renderSession - TBD.
     */
    renderCanvas(renderSession: any): void;
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
     * @param position - TBD.
     */
    toGlobal(position: any): Point;
    /**
     * TBD.
     * @param position - TBD.
     * @param from - TBD.
     */
    toLocal(position: any, from: any): Point;
    /**
     * TBD.
     * @param renderSession - TBD.
     */
    renderCachedSprite(renderSession: any): void;
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
    set mask(arg: any);
    /**
     * TBD.
     */
    get mask(): any;
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
import { Point } from '../geom/point';
import { Matrix } from '../geom/matrix';
import { Rectangle } from '../geom/rectangle';
//# sourceMappingURL=display_object.d.ts.map