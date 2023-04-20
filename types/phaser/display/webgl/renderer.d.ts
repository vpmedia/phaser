export class WebGLRenderer {
    /**
     * TBD.
     * @param {object} game - TBD.
     */
    constructor(game: object);
    type: number;
    resolution: any;
    autoResize: boolean;
    clearBeforeRender: any;
    width: any;
    height: any;
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
     * @param stage
     */
    render(stage: any): void;
    /**
     * TBD.
     * @param displayObject
     * @param projection
     * @param buffer
     * @param matrix - TBD.
     */
    renderDisplayObject(displayObject: any, projection: any, buffer: any, matrix: any): void;
    /**
     * TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     */
    resize(width: number, height: number): void;
    /**
     * TBD.
     * @param texture
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
//# sourceMappingURL=renderer.d.ts.map