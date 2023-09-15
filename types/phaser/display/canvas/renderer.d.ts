export class CanvasRenderer {
    /**
     * TBD.
     * @param {import('../../core/game.js').Game} game - TBD.
     */
    constructor(game: import('../../core/game.js').Game);
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
     * @param {import('../../core/stage.js').Stage} root - TBD.
     */
    render(root: import('../../core/stage.js').Stage): void;
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
     * @param {import('../../display/image.js').Image} displayObject - TBD.
     * @param {CanvasRenderingContext2D} context - TBD.
     * @param {import('../../geom/matrix.js').Matrix} matrix - TBD.
     */
    renderDisplayObject(displayObject: import('../../display/image.js').Image, context: CanvasRenderingContext2D, matrix: import('../../geom/matrix.js').Matrix): void;
    /**
     * TBD.
     */
    mapBlendModes(): void;
}
import * as CanvasMaskManager from './masker.js';
//# sourceMappingURL=renderer.d.ts.map