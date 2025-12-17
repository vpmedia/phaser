export class CanvasRenderer {
    /**
     * Creates a new CanvasRenderer instance.
     * @param {import('../../core/game.js').Game} game - The game instance.
     */
    constructor(game: import("../../core/game.js").Game);
    /** @type {number} */
    type: number;
    resolution: any;
    clearBeforeRender: any;
    transparent: any;
    autoResize: boolean;
    contextLost: boolean;
    width: number;
    height: number;
    view: HTMLCanvasElement;
    /** @type {CanvasRenderingContext2D} */
    context: CanvasRenderingContext2D;
    refresh: boolean;
    count: number;
    renderSession: {
        context: CanvasRenderingContext2D;
        maskManager: typeof CanvasMaskManager;
        scaleMode: number;
        smoothProperty: string;
        roundPixels: any;
    };
    /**
     * Renders the stage to canvas.
     * @param {import('../../core/stage.js').Stage} root - The root stage to render.
     */
    render(root: import("../../core/stage.js").Stage): void;
    /**
     * Destroys this renderer and cleans up resources.
     * @param {boolean} removeView - Whether to remove the view from the DOM.
     */
    destroy(removeView?: boolean): void;
    /**
     * Resizes the canvas to the specified dimensions.
     * @param {number} width - The new width of the canvas.
     * @param {number} height - The new height of the canvas.
     */
    resize(width: number, height: number): void;
    /**
     * Renders a display object to canvas.
     * @param {import('../../display/image.js').Image} displayObject - The display object to render.
     * @param {CanvasRenderingContext2D} context - The canvas rendering context.
     * @param {import('../../geom/matrix.js').Matrix} matrix - The transformation matrix.
     */
    renderDisplayObject(displayObject: import("../../display/image.js").Image, context: CanvasRenderingContext2D, matrix: import("../../geom/matrix.js").Matrix): void;
    /**
     * TBD.
     */
    mapBlendModes(): void;
    /**
     * TBD.
     * @param {import('../../core/game.js').Game} game - TBD.
     */
    initContext(game: import("../../core/game.js").Game): void;
}
import * as CanvasMaskManager from './masker.js';
//# sourceMappingURL=renderer.d.ts.map