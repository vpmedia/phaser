export class Stage extends DisplayObject {
    /**
     * TBD.
     * @param {object} game - TBD.
     */
    constructor(game: object);
    game: any;
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
     * @param color
     */
    setBackgroundColor(color: any): void;
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
     */
    get backgroundColor(): number;
    /**
     * TBD.
     */
    set smoothed(arg: boolean);
    /**
     * TBD.
     */
    get smoothed(): boolean;
}
import { DisplayObject } from '../display/display_object';
//# sourceMappingURL=stage.d.ts.map