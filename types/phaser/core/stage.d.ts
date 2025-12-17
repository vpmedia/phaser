export class Stage extends DisplayObject {
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
     * Sets the background color of the stage.
     * @param {number} color - The color to set as the background.
     */
    setBackgroundColor(color: number): void;
    /**
     * Initializes the stage after game creation.
     */
    boot(): void;
    /**
     * Updates the stage's transformation matrix.
     */
    updateTransform(): void;
    /**
     * Sets the background color of the stage.
     */
    set backgroundColor(value: number);
    /**
     * Gets the background color of the stage.
     * @returns {number} The background color.
     */
    get backgroundColor(): number;
    /**
     * Sets whether texture smoothing is enabled.
     */
    set smoothed(value: boolean);
    /**
     * Gets whether texture smoothing is enabled.
     * @returns {boolean} True if texture smoothing is enabled, false otherwise.
     */
    get smoothed(): boolean;
}
import { DisplayObject } from '../display/display_object.js';
//# sourceMappingURL=stage.d.ts.map