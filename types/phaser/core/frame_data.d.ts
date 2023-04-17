export class FrameData {
    _frames: any[];
    _frameNames: any[];
    addFrame(frame: any): any;
    getFrame(index?: number): any;
    getFrameByName(name: any): any;
    checkFrameName(name: any): boolean;
    clone(): object;
    getFrameRange(start: any, end: any, output?: null): any[];
    getFrameIndexes(frames: any, useNumericIndex?: boolean, output?: null): any[];
    destroy(): void;
    get total(): number;
}
//# sourceMappingURL=frame_data.d.ts.map