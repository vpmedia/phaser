export class FrameData {
    _frames: any[];
    _frameNames: any[];
    /**
     * TBD.
     * @param frame - TBD.
     */
    addFrame(frame: any): any;
    /**
     * TBD.
     * @param index - TBD.
     */
    getFrame(index?: number): any;
    /**
     * TBD.
     * @param name
     */
    getFrameByName(name: any): any;
    /**
     * TBD.
     * @param name
     */
    checkFrameName(name: any): boolean;
    /**
     * TBD.
     */
    clone(): any;
    /**
     * TBD.
     * @param start
     * @param end
     * @param output
     */
    getFrameRange(start: any, end: any, output?: any): any;
    /**
     * TBD.
     * @param frames
     * @param useNumericIndex
     * @param output
     */
    getFrameIndexes(frames: any, useNumericIndex?: boolean, output?: any): any;
    /**
     * TBD.
     */
    destroy(): void;
    /**
     * TBD.
     */
    get total(): number;
}
//# sourceMappingURL=frame_data.d.ts.map