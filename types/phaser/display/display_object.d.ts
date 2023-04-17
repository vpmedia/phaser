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
    destroy(): void;
    addChild(child: any): any;
    addChildAt(child: any, index: any): any;
    swapChildren(child: any, child2: any): void;
    getChildIndex(child: any): number;
    setChildIndex(child: any, index: any): void;
    getChildAt(index: any): any;
    removeChild(child: any): any;
    removeChildAt(index: any): any;
    removeChildren(beginIndex: any, endIndex: any): any[];
    updateTransform(parent: any): DisplayObject;
    rotationCache: any;
    worldRotation: number;
    getBounds(targetCoordinateSpace: any): Rectangle;
    getLocalBounds(): Rectangle;
    contains(child: any): any;
    renderWebGL(renderSession: any): void;
    renderCanvas(renderSession: any): void;
    preUpdate(): void;
    update(): void;
    postUpdate(): void;
    generateTexture(): void;
    toGlobal(position: any): any;
    toLocal(position: any, from: any): any;
    renderCachedSprite(renderSession: any): void;
    generateCachedSprite(): void;
    destroyCachedSprite(): void;
    _cachedSprite: any;
    set width(arg: number);
    get width(): number;
    _width: number;
    set height(arg: number);
    get height(): number;
    _height: number;
    set x(arg: number);
    get x(): number;
    set y(arg: number);
    get y(): number;
    get worldVisible(): boolean;
    set mask(arg: any);
    get mask(): any;
    get offsetX(): number;
    get offsetY(): number;
    set centerX(arg: number);
    get centerX(): number;
    set centerY(arg: number);
    get centerY(): number;
    set left(arg: number);
    get left(): number;
    set right(arg: number);
    get right(): number;
    set top(arg: number);
    get top(): number;
    set bottom(arg: number);
    get bottom(): number;
}
import { Point } from '../geom/point';
import { Matrix } from '../geom/matrix';
import { Rectangle } from '../geom/rectangle';
//# sourceMappingURL=display_object.d.ts.map