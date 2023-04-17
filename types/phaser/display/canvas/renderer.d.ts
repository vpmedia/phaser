export class CanvasRenderer {
    constructor(game: any);
    type: number;
    resolution: any;
    clearBeforeRender: any;
    transparent: any;
    autoResize: boolean;
    width: number;
    height: number;
    view: any;
    context: any;
    refresh: boolean;
    count: number;
    renderSession: {
        context: any;
        maskManager: typeof CanvasMaskManager;
        scaleMode: number;
        smoothProperty: any;
        roundPixels: any;
    };
    render(root: any): void;
    destroy(removeView?: boolean): void;
    resize(width: any, height: any): void;
    renderDisplayObject(displayObject: any, context: any, matrix: any): void;
    mapBlendModes(): void;
}
import * as CanvasMaskManager from './masker';
//# sourceMappingURL=renderer.d.ts.map