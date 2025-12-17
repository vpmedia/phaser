export class Frame {
    /**
     * Creates a new Frame instance.
     * @param {number} index - The index of this frame in the animation.
     * @param {number} x - The x coordinate of this frame's position in the texture.
     * @param {number} y - The y coordinate of this frame's position in the texture.
     * @param {number} width - The width of this frame in pixels.
     * @param {number} height - The height of this frame in pixels.
     * @param {string} name - The name of this frame.
     */
    constructor(index: number, x: number, y: number, width: number, height: number, name: string);
    /**
     * Initializes this frame with the specified properties.
     * @param {number} index - The index of this frame in the animation.
     * @param {number} x - The x coordinate of this frame's position in the texture.
     * @param {number} y - The y coordinate of this frame's position in the texture.
     * @param {number} width - The width of this frame in pixels.
     * @param {number} height - The height of this frame in pixels.
     * @param {string} name - The name of this frame.
     */
    initialize(index: number, x: number, y: number, width: number, height: number, name: string): void;
    index: number;
    x: number;
    y: number;
    width: number;
    height: number;
    name: string;
    centerX: number;
    centerY: number;
    distance: number;
    rotated: boolean;
    rotationDirection: string;
    trimmed: boolean;
    sourceSizeW: number;
    sourceSizeH: number;
    spriteSourceSizeX: number;
    spriteSourceSizeY: number;
    spriteSourceSizeW: number;
    spriteSourceSizeH: number;
    right: number;
    bottom: number;
    /**
     * Resizes this frame to the specified dimensions.
     * @param {number} width - The new width of this frame in pixels.
     * @param {number} height - The new height of this frame in pixels.
     */
    resize(width: number, height: number): void;
    /**
     * Sets the trim properties for this frame.
     * @param {boolean} trimmed - Whether this frame is trimmed.
     * @param {number} actualWidth - The actual width of the trimmed frame.
     * @param {number} actualHeight - The actual height of the trimmed frame.
     * @param {number} destX - The destination x coordinate for the trimmed frame.
     * @param {number} destY - The destination y coordinate for the trimmed frame.
     * @param {number} destWidth - The destination width of the trimmed frame.
     * @param {number} destHeight - The destination height of the trimmed frame.
     */
    setTrim(trimmed: boolean, actualWidth: number, actualHeight: number, destX: number, destY: number, destWidth: number, destHeight: number): void;
    /**
     * Creates a clone of this frame.
     * @returns {Frame} A new Frame instance with the same properties.
     */
    clone(): Frame;
    /**
     * Gets the rectangle bounds of this frame.
     * @param {Rectangle} output - The rectangle to use for the result (optional).
     * @returns {Rectangle} A Rectangle object representing this frame's bounds.
     */
    getRect(output?: Rectangle): Rectangle;
}
import { Rectangle } from '../geom/rectangle.js';
//# sourceMappingURL=frame.d.ts.map