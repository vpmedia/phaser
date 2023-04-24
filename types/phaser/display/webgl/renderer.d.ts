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
     * @throws Error.
     */
    initContext(): void;
    glContextId: any;
    /**
     * TBD.
     * @param {Stage} stage - TBD.
     */
    render(stage: Stage): void;
    /**
     * TBD.
     * @param {DisplayObject} displayObject - TBD.
     * @param {Point} projection - TBD.
     * @param {object} buffer - TBD.
     * @param {Matrix} matrix - TBD.
     */
    renderDisplayObject(displayObject: DisplayObject, projection: Point, buffer: object, matrix: Matrix): void;
    /**
     * TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     */
    resize(width: number, height: number): void;
    /**
     * TBD.
     * @param {BaseTexture} texture - TBD.
     * @returns {boolean} TBD.
     */
    updateTexture(texture: BaseTexture): boolean;
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
import { Stage } from '../../core/stage';
import { DisplayObject } from '../../display/display_object';
import { Matrix } from '../../geom/matrix';
import { BaseTexture } from './base_texture';
import { Game } from '../../core/game';
//# sourceMappingURL=renderer.d.ts.map