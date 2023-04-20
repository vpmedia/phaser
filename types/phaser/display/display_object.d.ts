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
     * @param child
     */
    addChild(child: any): any;
    /**
     * TBD.
     * @param child
     * @param index
     */
    addChildAt(child: any, index: any): any;
    /**
     * TBD.
     * @param child
     * @param child2
     */
    swapChildren(child: any, child2: any): void;
    /**
     * TBD.
     * @param child
     */
    getChildIndex(child: any): number;
    /**
     * TBD.
     * @param child
     * @param index
     */
    setChildIndex(child: any, index: any): void;
    /**
     * TBD.
     * @param index
     */
    getChildAt(index: any): any;
    /**
     * TBD.
     * @param child
     */
    removeChild(child: any): any;
    /**
     * TBD.
     * @param index
     */
    removeChildAt(index: any): any;
    /**
     * TBD.
     * @param beginIndex
     * @param endIndex
     */
    removeChildren(beginIndex: any, endIndex: any): any[];
    /**
     * TBD.
     * @param parent
     */
    updateTransform(parent: any): DisplayObject;
    rotationCache: any;
    worldRotation: number;
    /**
     * TBD.
     * @param targetCoordinateSpace
     */
    getBounds(targetCoordinateSpace: any): Rectangle;
    /**
     * TBD.
     */
    getLocalBounds(): Rectangle;
    /**
     * TBD.
     * @param child
     */
    contains(child: any): any;
    /**
     * TBD.
     * @param renderSession
     */
    renderWebGL(renderSession: any): void;
    /**
     * TBD.
     * @param renderSession
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
     * @param position
     */
    toGlobal(position: any): any;
    /**
     * TBD.
     * @param position
     * @param from
     */
    toLocal(position: any, from: any): any;
    /**
     * TBD.
     * @param renderSession
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
     */
    get width(): number;
    _width: number;
    /**
     * TBD.
     */
    set height(arg: number);
    /**
     * TBD.
     */
    get height(): number;
    _height: number;
    /**
     * TBD.
     */
    set x(arg: number);
    /**
     * TBD.
     */
    get x(): number;
    /**
     * TBD.
     */
    set y(arg: number);
    /**
     * TBD.
     */
    get y(): number;
    /**
     * TBD.
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
     */
    get offsetX(): number;
    /**
     * TBD.
     */
    get offsetY(): number;
    /**
     * TBD.
     */
    set centerX(arg: number);
    /**
     * TBD.
     */
    get centerX(): number;
    /**
     * TBD.
     */
    set centerY(arg: number);
    /**
     * TBD.
     */
    get centerY(): number;
    /**
     * TBD.
     */
    set left(arg: number);
    /**
     * TBD.
     */
    get left(): number;
    /**
     * TBD.
     */
    set right(arg: number);
    /**
     * TBD.
     */
    get right(): number;
    /**
     * TBD.
     */
    set top(arg: number);
    /**
     * TBD.
     */
    get top(): number;
    /**
     * TBD.
     */
    set bottom(arg: number);
    /**
     * TBD.
     */
    get bottom(): number;
}
import { Point } from '../geom/point';
import { Matrix } from '../geom/matrix';
import { Rectangle } from '../geom/rectangle';
//# sourceMappingURL=display_object.d.ts.map