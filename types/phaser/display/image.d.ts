export default class _default extends DisplayObject {
    /**
     * TBD.
     *
     * @param {object} game - TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {string} key - TBD.
     * @param {string} frame - TBD.
     */
    constructor(game: object, x: number, y: number, key: string, frame: string);
    game: object;
    type: number;
    key: string;
    texture: any;
    data: {};
    _width: number;
    _height: number;
    tint: number;
    cachedTint: number;
    tintedTexture: any;
    blendMode: number;
    shader: any;
    _frame: any;
    events: EventManager;
    animations: AnimationManager;
    renderOrderID: any;
    loadTexture(key: any, frame?: number, stopAnimation?: boolean): void;
    customRender: boolean | undefined;
    setFrame(frame: any): void;
    refreshTexture: boolean | undefined;
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
    getBounds(matrix?: null): object;
    getLocalBounds(): object;
    renderWebGL(renderSession: any, matrix?: null): void;
    renderCanvas(renderSession: any, matrix?: null): void;
}
import DisplayObject from './display_object';
import EventManager from '../core/event_manager';
import AnimationManager from '../core/animation_manager';
//# sourceMappingURL=image.d.ts.map