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
    events: EventManager;
    animations: AnimationManager;
    renderOrderID: number;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param frame
     * @param stopAnimation
     */
    loadTexture(key: string, frame?: number, stopAnimation?: boolean): void;
    customRender: boolean;
    /**
     * TBD.
     * @param frame
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
    set frame(arg: any);
    /**
     * TBD.
     */
    get frame(): any;
    /**
     * TBD.
     */
    set frameName(arg: any);
    /**
     * TBD.
     */
    get frameName(): any;
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
     * @param matrix
     */
    getBounds(matrix?: any): any;
    /**
     * TBD.
     */
    getLocalBounds(): any;
    /**
     * TBD.
     * @param renderSession
     * @param matrix
     */
    renderWebGL(renderSession: any, matrix?: any): void;
    /**
     * TBD.
     * @param renderSession
     * @param matrix
     */
    renderCanvas(renderSession: any, matrix?: any): void;
}
import { DisplayObject } from './display_object';
import { Game } from '../core/game';
import { EventManager } from '../core/event_manager';
import { AnimationManager } from '../core/animation_manager';
//# sourceMappingURL=image.d.ts.map