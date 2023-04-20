export class CanvasRenderer {
    /**
     * TBD.
     * @param {object} game - TBD.
     */
    constructor(game: object);
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
    /**
     * TBD.
     * @param root
     */
    render(root: any): void;
    /**
     * TBD.
     * @param removeView
     */
    destroy(removeView?: boolean): void;
    /**
     * TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     */
    resize(width: number, height: number): void;
    /**
     * TBD.
     * @param displayObject
     * @param context
     * @param matrix - TBD.
     */
    renderDisplayObject(displayObject: any, context: any, matrix: any): void;
    /**
     * TBD.
     */
    mapBlendModes(): void;
}
import * as CanvasMaskManager from './masker';
//# sourceMappingURL=renderer.d.ts.map