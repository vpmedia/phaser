export class Image extends DisplayObject {
    /**
     * Creates a new Image instance.
     * @param {import('../core/game.js').Game} game - The game instance this image belongs to.
     * @param {number} x - The x position of the image.
     * @param {number} y - The y position of the image.
     * @param {string | number | Texture} key - The texture key or texture to use.
     * @param {string | number} frame - The frame identifier (name or index) to use.
     */
    constructor(game: import("../core/game.js").Game, x: number, y: number, key: string | number | Texture, frame?: string | number);
    /** @type {number} */
    type: number;
    /** @type {string | number | Texture} */
    key: string | number | Texture;
    texture: any;
    /** @type {number} */
    tint: number;
    /** @type {number} */
    cachedTint: number;
    /** @type {Texture | null} */
    tilingTexture: Texture | null;
    /** @type {Texture | null} */
    tintedTexture: Texture | null;
    /** @type {number} */
    blendMode: number;
    shader: any;
    _frame: Rectangle | import("../core/frame.js").Frame;
    /** @type {boolean} */
    pendingDestroy: boolean;
    /** @type {EventManager} */
    events: EventManager;
    /** @type {AnimationManager} */
    animations: AnimationManager;
    renderOrderID: number;
    /**
     * Loads a texture for this image.
     * @param {string | number | Texture} key - The texture key or texture to use.
     * @param {string | number | null | undefined} frame - The frame identifier (name or index) to use.
     * @param {boolean} stopAnimation - Whether to stop the animation when changing textures.
     */
    loadTexture(key: string | number | Texture, frame?: string | number | null | undefined, stopAnimation?: boolean): void;
    customRender: boolean;
    /**
     * Sets the current frame of this image.
     * @param {import('../core/frame.js').Frame} frame - The frame to set.
     */
    setFrame(frame: import("../core/frame.js").Frame): void;
    refreshTexture: boolean;
    /**
     * Resizes the frame of this image.
     * @param {DisplayObject} parent - The parent display object.
     * @param {number} width - The new width of the frame.
     * @param {number} height - The new height of the frame.
     */
    resizeFrame(parent: DisplayObject, width: number, height: number): void;
    /**
     * Resets the frame of this image to its original frame.
     */
    resetFrame(): void;
    /**
     * Sets the current frame index of this image.
     * @param {number} value - The new frame index to set.
     */
    set frame(value: number);
    /**
     * Gets the current frame index of this image.
     * @returns {number} The current frame index.
     */
    get frame(): number;
    /**
     * Sets the current frame name of this image.
     * @param {string} value - The new frame name to set.
     */
    set frameName(value: string);
    /**
     * Gets the current frame name of this image.
     * @returns {string} The current frame name.
     */
    get frameName(): string;
    /**
     * Crops the texture of this image.
     * @param {Rectangle} rect - The rectangle to crop to.
     * @param {boolean} copy - Whether to copy the rect or use it directly.
     */
    crop(rect: Rectangle, copy?: boolean): void;
    cropRect: Rectangle;
    _crop: any;
    /**
     * Updates the crop rectangle of this image.
     */
    updateCrop(): void;
    /**
     * Called when the texture of this image is updated.
     */
    onTextureUpdate(): void;
    /**
     * Sets the texture for this image.
     * @param {Texture} texture - The new texture to set.
     * @param {boolean} destroyBase - Whether to destroy the base texture.
     */
    setTexture(texture: Texture, destroyBase?: boolean): void;
    /**
     * Gets the bounds of this image.
     * @param {import('../geom/matrix.js').Matrix} matrix - The transformation matrix to use.
     * @returns {Rectangle} The bounds rectangle of this image.
     */
    getBounds(matrix?: import("../geom/matrix.js").Matrix): Rectangle;
    /**
     * Renders this image using WebGL.
     * @param {object} renderSession - The WebGL rendering session.
     * @param {import('../geom/matrix.js').Matrix} matrix - The transformation matrix to use.
     */
    renderWebGL(renderSession: object, matrix?: import("../geom/matrix.js").Matrix): void;
    /**
     * Renders this image using Canvas.
     * @param {object} renderSession - The Canvas rendering session.
     * @param {import('../geom/matrix.js').Matrix} matrix - The transformation matrix to use.
     */
    renderCanvas(renderSession: object, matrix?: import("../geom/matrix.js").Matrix): void;
}
import { DisplayObject } from './display_object.js';
import { Texture } from './webgl/texture.js';
import { Rectangle } from '../geom/rectangle.js';
import { EventManager } from '../core/event_manager.js';
import { AnimationManager } from '../core/animation_manager.js';
//# sourceMappingURL=image.d.ts.map