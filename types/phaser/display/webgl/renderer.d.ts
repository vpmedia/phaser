export class WebGLRenderer {
    /**
     * TBD.
     * @param {import('../../core/game.js').Game} game - TBD.
     */
    constructor(game: import("../../core/game.js").Game);
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
     * TBD.
     */
    destroy(): void;
    gl: WebGLRenderingContext & {
        id: number;
    };
    /**
     * TBD.
     */
    initRegistry(): void;
    /**
     * TBD.
     * @param {import('../../core/game.js').Game} game - TBD.
     * @throws Error.
     */
    initContext(game: import("../../core/game.js").Game): void;
    glContextId: any;
    /**
     * TBD.
     * @param {import('../../core/stage.js').Stage} stage - TBD.
     */
    render(stage: import("../../core/stage.js").Stage): void;
    /**
     * TBD.
     * @param {import('../../display/display_object.js').DisplayObject} displayObject - TBD.
     * @param {Point} projection - TBD.
     * @param {object} buffer - TBD.
     * @param {import('../../geom/matrix.js').Matrix} matrix - TBD.
     */
    renderDisplayObject(displayObject: import("../../display/display_object.js").DisplayObject, projection: Point, buffer: object, matrix: import("../../geom/matrix.js").Matrix): void;
    /**
     * TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     */
    resize(width: number, height: number): void;
    /**
     * TBD.
     * @param {import('./base_texture.js').BaseTexture} texture - TBD.
     * @returns {boolean} TBD.
     */
    updateTexture(texture: import("./base_texture.js").BaseTexture): boolean;
    /**
     * TBD.
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