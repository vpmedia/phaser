export class CanvasRenderer {
    /**
     * TBD.
     * @param {Game} game - TBD.
     */
    constructor(game: Game);
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
     * @param root - TBD.
     */
    render(root: any): void;
    /**
     * TBD.
     * @param removeView - TBD.
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
     * @param {object} context - TBD.
     * @param {Matrix} matrix - TBD.
     */
    renderDisplayObject(displayObject: Image, context: object, matrix: Matrix): void;
    /**
     * TBD.
     */
    mapBlendModes(): void;
}
import * as CanvasMaskManager from './masker';
import { Image } from '../image';
import { Matrix } from '../../geom/matrix';
import { Game } from '../../core/game';
//# sourceMappingURL=renderer.d.ts.map