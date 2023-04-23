export class Image extends DisplayObject {
    /**
     * TBD.
     * @param {Game} game - TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {string} key - TBD.
     * @param {string} frame - TBD.
     */
    constructor(game: Game, x: number, y: number, key: string, frame: string);
    game: Game;
    type: number;
    key: string;
    texture: any;
    data: {};
    tint: number;
    cachedTint: number;
    tintedTexture: any;
    blendMode: number;
    shader: any;
    _frame: Rectangle | Frame;
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
     * @param {Frame} frame - TBD.
     */
    setFrame(frame: Frame): void;
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
     * @param texture - TBD.
     * @param {boolean} destroyBase - TBD.
     */
    setTexture(texture: any, destroyBase?: boolean): void;
    /**
     * TBD.
     * @param {Matrix} matrix - TBD.
     * @returns {Rectangle} TBD.
     */
    getBounds(matrix?: Matrix): Rectangle;
    /**
     * TBD.
     * @param {object} renderSession - TBD.
     * @param {Matrix} matrix - TBD.
     */
    renderWebGL(renderSession: object, matrix?: Matrix): void;
    /**
     * TBD.
     * @param {object} renderSession - TBD.
     * @param {Matrix} matrix - TBD.
     */
    renderCanvas(renderSession: object, matrix?: Matrix): void;
}
import { DisplayObject } from './display_object';
import { Game } from '../core/game';
import { Rectangle } from '../geom/rectangle';
import { Frame } from '../core/frame';
import { EventManager } from '../core/event_manager';
import { AnimationManager } from '../core/animation_manager';
import { Matrix } from '../geom/matrix';
//# sourceMappingURL=image.d.ts.map