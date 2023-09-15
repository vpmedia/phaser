export class FrameData {
    /**
     * @type {import('./frame.js').Frame[]}
     */
    _frames: import('./frame.js').Frame[];
    /**
     * @type {string[]}
     */
    _frameNames: string[];
    /**
     * TBD.
     * @param {import('./frame.js').Frame} frame - TBD.
     * @returns {import('./frame.js').Frame} TBD.
     */
    addFrame(frame: import('./frame.js').Frame): import('./frame.js').Frame;
    /**
     * TBD.
     * @param {number} index - TBD.
     * @returns {import('./frame.js').Frame} TBD.
     */
    getFrame(index?: number): import('./frame.js').Frame;
    /**
     * TBD.
     * @param {string} name - TBD.
     * @returns {import('./frame.js').Frame} TBD.
     */
    getFrameByName(name: string): import('./frame.js').Frame;
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
     * @param {import('./frame.js').Frame[]} output - TBD.
     * @returns {import('./frame.js').Frame[]} TBD.
     */
    getFrameRange(start: number, end: number, output?: import('./frame.js').Frame[]): import('./frame.js').Frame[];
    /**
     * TBD.
     * @param {number[]|string[]} frames - TBD.
     * @param {boolean} useNumericIndex - TBD.
     * @param {number[]} output - TBD.
     * @returns {number[]} TBD.
     */
    getFrameIndexes(frames: number[] | string[], useNumericIndex?: boolean, output?: number[]): number[];
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
//# sourceMappingURL=frame_data.d.ts.map