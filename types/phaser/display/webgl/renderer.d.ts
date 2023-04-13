export default class _default {
    constructor(game: any);
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
        premultipliedAlpha: any;
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
    destroy(): void;
    gl: any;
    initRegistry(): void;
    initContext(): void;
    glContextId: any;
    render(stage: any): void;
    renderDisplayObject(displayObject: any, projection: any, buffer: any, matrix: any): void;
    resize(width: any, height: any): void;
    updateTexture(texture: any): boolean;
    mapBlendModes(): void;
}
import Point from '../../geom/point';
import WebGLShaderManager from './shader_manager';
import WebGLSpriteBatch from './sprite_batch';
import WebGLFilterManager from './filter_manager';
import WebGLStencilManager from './stencil_manager';
import WebGLBlendModeManager from './blend_manager';
//# sourceMappingURL=renderer.d.ts.map