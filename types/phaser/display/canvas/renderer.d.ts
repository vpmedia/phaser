export class CanvasRenderer {
    /**
     * TBD.
     * @param {import('../../core/game').Game} game - TBD.
     */
    constructor(game: import('../../core/game').Game);
    type: number;
    resolution: any;
    clearBeforeRender: any;
    transparent: any;
    autoResize: boolean;
    contextLost: boolean;
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
     * @param {import('../../core/stage').Stage} root - TBD.
     */
    render(root: import('../../core/stage').Stage): void;
    /**
     * TBD.
     * @param {boolean} removeView - TBD.
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
     * @param {Image} displayObject - TBD.
     * @param {CanvasRenderingContext2D} context - TBD.
     * @param {import('../../geom/matrix').Matrix} matrix - TBD.
     */
    renderDisplayObject(displayObject: new (width?: number, height?: number) => HTMLImageElement, context: CanvasRenderingContext2D, matrix: import('../../geom/matrix').Matrix): void;
    /**
     * TBD.
     */
    mapBlendModes(): void;
}
import * as CanvasMaskManager from './masker';
//# sourceMappingURL=renderer.d.ts.map