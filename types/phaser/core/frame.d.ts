export class Frame {
    /**
     * TBD.
     * @param {number} index - TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     * @param {string} name - TBD.
     */
    constructor(index: number, x: number, y: number, width: number, height: number, name: string);
    /**
     * TBD.
     * @param {number} index - TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     * @param {string} name - TBD.
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
     * TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     */
    resize(width: number, height: number): void;
    /**
     * TBD.
     * @param {boolean} trimmed - TBD.
     * @param {number} actualWidth - TBD.
     * @param {number} actualHeight - TBD.
     * @param {number} destX - TBD.
     * @param {number} destY - TBD.
     * @param {number} destWidth - TBD.
     * @param {number} destHeight - TBD.
     */
    setTrim(trimmed: boolean, actualWidth: number, actualHeight: number, destX: number, destY: number, destWidth: number, destHeight: number): void;
    /**
     * TBD.
     * @returns {Frame} TBD.
     */
    clone(): Frame;
    /**
     * TBD.
     * @param {Rectangle} output - TBD.
     * @returns {Rectangle} TBD.
     */
    getRect(output?: Rectangle): Rectangle;
}
import { Rectangle } from '../geom/rectangle.js';
//# sourceMappingURL=frame.d.ts.map