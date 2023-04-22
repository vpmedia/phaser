export class WebGLRenderer {
    /**
     * TBD.
     * @param {Game} game - TBD.
     */
    constructor(game: Game);
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
     */
    initContext(): void;
    glContextId: any;
    /**
     * TBD.
     * @param stage - TBD.
     */
    render(stage: any): void;
    /**
     * TBD.
     * @param displayObject - TBD.
     * @param projection - TBD.
     * @param buffer - TBD.
     * @param {Matrix} matrix - TBD.
     */
    renderDisplayObject(displayObject: any, projection: any, buffer: any, matrix: Matrix): void;
    /**
     * TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     */
    resize(width: number, height: number): void;
    /**
     * TBD.
     * @param texture - TBD.
     * @returns {boolean} TBD.
     */
    updateTexture(texture: any): boolean;
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
import { Matrix } from '../../geom/matrix';
import { Game } from '../../core/game';
//# sourceMappingURL=renderer.d.ts.map