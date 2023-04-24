export class WebGLRenderer {
    /**
     * TBD.
     * @param {import('../../core/game').Game} game - TBD.
     */
    constructor(game: import('../../core/game').Game);
    type: number;
    resolution: any;
    autoResize: boolean;
    contextLost: boolean;
    clearBeforeRender: any;
    width: number;
    height: number;
    view: any;
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
    gl: any;
    /**
     * TBD.
     */
    initRegistry(): void;
    /**
     * TBD.
     * @throws Error.
     */
    initContext(): void;
    glContextId: any;
    /**
     * TBD.
     * @param {import('../../core/stage').Stage} stage - TBD.
     */
    render(stage: import('../../core/stage').Stage): void;
    /**
     * TBD.
     * @param {import('../../display/display_object').DisplayObject} displayObject - TBD.
     * @param {Point} projection - TBD.
     * @param {object} buffer - TBD.
     * @param {import('../../geom/matrix').Matrix} matrix - TBD.
     */
    renderDisplayObject(displayObject: import('../../display/display_object').DisplayObject, projection: Point, buffer: object, matrix: import('../../geom/matrix').Matrix): void;
    /**
     * TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     */
    resize(width: number, height: number): void;
    /**
     * TBD.
     * @param {import('./base_texture').BaseTexture} texture - TBD.
     * @returns {boolean} TBD.
     */
    updateTexture(texture: import('./base_texture').BaseTexture): boolean;
    /**
     * TBD.
     */
    mapBlendModes(): void;
}
import { Point } from '../../geom/point';
import { WebGLShaderManager } from './shader_manager';
import { WebGLSpriteBatch } from './sprite_batch';
import { WebGLFilterManager } from './filter_manager';
import { WebGLStencilManager } from './stencil_manager';
import { WebGLBlendModeManager } from './blend_manager';
//# sourceMappingURL=renderer.d.ts.map