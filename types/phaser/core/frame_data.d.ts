export class FrameData {
    /**
     * @type {Frame[]}
     */
    _frames: Frame[];
    /**
     * @type {string[]}
     */
    _frameNames: string[];
    /**
     * TBD.
     * @param {Frame} frame - TBD.
     * @returns {Frame} TBD.
     */
    addFrame(frame: Frame): Frame;
    /**
     * TBD.
     * @param {number} index - TBD.
     * @returns {Frame} TBD.
     */
    getFrame(index?: number): Frame;
    /**
     * TBD.
     * @param {string} name - TBD.
     * @returns {Frame} TBD.
     */
    getFrameByName(name: string): Frame;
    /**
     * TBD.
     * @param {string} name - TBD.
     * @returns {boolean} TBD.
     */
    checkFrameName(name: string): boolean;
    /**
     * TBD.
     * @returns {FrameData} TBD.
     */
    clone(): FrameData;
    /**
     * TBD.
     * @param {number} start - TBD.
     * @param {number} end - TBD.
     * @param {Frame[]} output - TBD.
     * @returns {Frame[]} TBD.
     */
    getFrameRange(start: number, end: number, output?: Frame[]): Frame[];
    /**
     * TBD.
     * @param {string[]} frames - TBD.
     * @param {boolean} useNumericIndex - TBD.
     * @param {number[]} output - TBD.
     * @returns {number[]} TBD.
     */
    getFrameIndexes(frames: string[], useNumericIndex?: boolean, output?: number[]): number[];
    /**
     * TBD.
     */
    destroy(): void;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get total(): number;
}
import { Frame } from './frame';
//# sourceMappingURL=frame_data.d.ts.map