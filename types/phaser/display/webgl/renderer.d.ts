export class WebGLRenderer {
    /**
     * Creates a new WebGLRenderer instance.
     * @param {import('../../core/game.js').Game} game - The game instance.
     */
    constructor(game: import("../../core/game.js").Game);
    /** @type {number} */
    type: number;
    resolution: any;
    autoResize: boolean;
    contextLost: boolean;
    clearBeforeRender: any;
    width: number;
    height: number;
    view: HTMLCanvasElement;
    _contextOptions: {
        alpha: any;
        depth: boolean;
        antialias: any;
        premultipliedAlpha: boolean;
        stencil: boolean;
        failIfMajorPerformanceCaveat: boolean;
        preserveDrawingBuffer: any;
    };
    projection: Point;
    offset: Point;
    shaderManager: WebGLShaderManager;
    spriteBatch: WebGLSpriteBatch;
    filterManager: WebGLFilterManager;
    stencilManager: WebGLStencilManager;
    blendModeManager: WebGLBlendModeManager;
    renderSession: {};
    /**
     * Destroys this renderer and cleans up resources.
     */
    destroy(): void;
    gl: WebGLRenderingContext & {
        id: number;
    };
    /**
     * Initializes the WebGL registry.
     */
    initRegistry(): void;
    /**
     * Initializes the WebGL context for rendering.
     * @param {import('../../core/game.js').Game} game - The game instance.
     * @throws {Error}
     */
    initContext(game: import("../../core/game.js").Game): void;
    glContextId: any;
    /**
     * Renders the stage to WebGL.
     * @param {import('../../core/stage.js').Stage} stage - The root stage to render.
     */
    render(stage: import("../../core/stage.js").Stage): void;
    /**
     * Renders a display object to WebGL.
     * @param {import('../../display/display_object.js').DisplayObject} displayObject - The display object to render.
     * @param {Point} projection - The projection matrix.
     * @param {object} buffer - The render buffer.
     * @param {import('../../geom/matrix.js').Matrix} matrix - The transformation matrix.
     */
    renderDisplayObject(displayObject: import("../../display/display_object.js").DisplayObject, projection: Point, buffer: object, matrix: import("../../geom/matrix.js").Matrix): void;
    /**
     * Resizes the WebGL canvas to the specified dimensions.
     * @param {number} width - The new width of the canvas.
     * @param {number} height - The new height of the canvas.
     */
    resize(width: number, height: number): void;
    /**
     * Updates a texture in the WebGL context.
     * @param {import('./base_texture.js').BaseTexture} texture - The base texture to update.
     * @returns {boolean} Whether the update was successful.
     */
    updateTexture(texture: import("./base_texture.js").BaseTexture): boolean;
    /**
     * Maps blend modes to WebGL rendering operations.
     */
    mapBlendModes(): void;
}
import { Point } from '../../geom/point.js';
import { WebGLShaderManager } from './shader_manager.js';
import { WebGLSpriteBatch } from './sprite_batch.js';
import { WebGLFilterManager } from './filter_manager.js';
import { WebGLStencilManager } from './stencil_manager.js';
import { WebGLBlendModeManager } from './blend_manager.js';
//# sourceMappingURL=renderer.d.ts.map