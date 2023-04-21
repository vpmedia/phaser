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
    _frame: any;
    pendingDestroy: boolean;
    events: EventManager;
    animations: AnimationManager;
    renderOrderID: number;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param frame - TBD.
     * @param {boolean} stopAnimation - TBD.
     */
    loadTexture(key: string, frame?: number, stopAnimation?: boolean): void;
    customRender: boolean;
    /**
     * TBD.
     * @param frame - TBD.
     */
    setFrame(frame: any): void;
    refreshTexture: boolean;
    /**
     * TBD.
     * @param parent
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     */
    resizeFrame(parent: any, width: number, height: number): void;
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
     * @param rect
     * @param copy
     */
    crop(rect: any, copy?: boolean): void;
    cropRect: any;
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
     * @param texture
     * @param destroyBase
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
import { EventManager } from '../core/event_manager';
import { AnimationManager } from '../core/animation_manager';
import { Matrix } from '../geom/matrix';
import { Rectangle } from '../geom/rectangle';
//# sourceMappingURL=image.d.ts.map