export class Image extends DisplayObject {
    /**
     * TBD.
     *
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
    loadTexture(key: any, frame?: number, stopAnimation?: boolean): void;
    customRender: boolean;
    setFrame(frame: any): void;
    refreshTexture: boolean;
    resizeFrame(parent: any, width: any, height: any): void;
    resetFrame(): void;
    set frame(arg: any);
    get frame(): any;
    set frameName(arg: any);
    get frameName(): any;
    crop(rect: any, copy?: boolean): void;
    cropRect: any;
    _crop: any;
    updateCrop(): void;
    onTextureUpdate(): void;
    setTexture(texture: any, destroyBase?: boolean): void;
    getBounds(matrix?: any): any;
    getLocalBounds(): any;
    renderWebGL(renderSession: any, matrix?: any): void;
    renderCanvas(renderSession: any, matrix?: any): void;
}
import { DisplayObject } from './display_object';
import { Game } from '../core/game';
import { EventManager } from '../core/event_manager';
import { AnimationManager } from '../core/animation_manager';
//# sourceMappingURL=image.d.ts.map