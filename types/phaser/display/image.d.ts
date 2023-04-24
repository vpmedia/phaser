export class Image extends DisplayObject {
    /**
     * TBD.
     * @param {import('../core/game').Game} game - TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {string} key - TBD.
     * @param {string} frame - TBD.
     */
    constructor(game: import('../core/game').Game, x: number, y: number, key: string, frame: string);
    game: import("../core/game").Game;
    type: number;
    key: string;
    texture: any;
    data: {};
    tint: number;
    cachedTint: number;
    tintedTexture: any;
    blendMode: number;
    shader: any;
    _frame: Rectangle | import("../core/frame").Frame;
    pendingDestroy: boolean;
    events: EventManager;
    animations: AnimationManager;
    renderOrderID: number;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param {number} frame - TBD.
     * @param {boolean} stopAnimation - TBD.
     */
    loadTexture(key: string, frame?: number, stopAnimation?: boolean): void;
    customRender: boolean;
    /**
     * TBD.
     * @param {import('../core/frame').Frame} frame - TBD.
     */
    setFrame(frame: import('../core/frame').Frame): void;
    refreshTexture: boolean;
    /**
     * TBD.
     * @param {DisplayObject} parent - TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     */
    resizeFrame(parent: DisplayObject, width: number, height: number): void;
    /**
     * TBD.
     */
    resetFrame(): void;
    /**
     * TBD.
     */
    set frame(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get frame(): number;
    /**
     * TBD.
     */
    set frameName(arg: string);
    /**
     * TBD.
     * @returns {string} TBD.
     */
    get frameName(): string;
    /**
     * TBD.
     * @param {Rectangle} rect - TBD.
     * @param {boolean} copy - TBD.
     */
    crop(rect: Rectangle, copy?: boolean): void;
    cropRect: Rectangle;
    _crop: any;
    /**
     * TBD.
     */
    updateCrop(): void;
    /**
     * TBD.
     */
    onTextureUpdate(): void;
    /**
     * TBD.
     * @param {Texture} texture - TBD.
     * @param {boolean} destroyBase - TBD.
     */
    setTexture(texture: Texture, destroyBase?: boolean): void;
    /**
     * TBD.
     * @param {import('../geom/matrix').Matrix} matrix - TBD.
     * @returns {Rectangle} TBD.
     */
    getBounds(matrix?: import('../geom/matrix').Matrix): Rectangle;
    /**
     * TBD.
     * @param {object} renderSession - TBD.
     * @param {import('../geom/matrix').Matrix} matrix - TBD.
     */
    renderWebGL(renderSession: object, matrix?: import('../geom/matrix').Matrix): void;
    /**
     * TBD.
     * @param {object} renderSession - TBD.
     * @param {import('../geom/matrix').Matrix} matrix - TBD.
     */
    renderCanvas(renderSession: object, matrix?: import('../geom/matrix').Matrix): void;
}
import { DisplayObject } from './display_object';
import { Rectangle } from '../geom/rectangle';
import { EventManager } from '../core/event_manager';
import { AnimationManager } from '../core/animation_manager';
import { Texture } from './webgl/texture';
//# sourceMappingURL=image.d.ts.map