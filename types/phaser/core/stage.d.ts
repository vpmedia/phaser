export class Stage extends DisplayObject {
    /**
     * TBD.
     * @param {import('./game').Game} game - TBD.
     */
    constructor(game: import('./game').Game);
    game: import("./game").Game;
    name: string;
    currentRenderOrderID: number;
    _bgColor: {
        r: number;
        g: number;
        b: number;
        a: number;
        color: number;
        rgba: string;
    };
    /**
     * TBD.
     * @param {number} color - TBD.
     */
    setBackgroundColor(color: number): void;
    /**
     * TBD.
     */
    boot(): void;
    /**
     * TBD.
     */
    updateTransform(): void;
    /**
     * TBD.
     */
    set backgroundColor(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get backgroundColor(): number;
    /**
     * TBD.
     */
    set smoothed(arg: boolean);
    /**
     * TBD.
     * @returns {boolean} TBD.
     */
    get smoothed(): boolean;
}
import { DisplayObject } from '../display/display_object';
//# sourceMappingURL=stage.d.ts.map