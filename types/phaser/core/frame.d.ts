export class Frame {
    constructor(index: any, x: any, y: any, width: any, height: any, name: any);
    initialize(index: any, x: any, y: any, width: any, height: any, name: any): void;
    index: any;
    x: any;
    y: any;
    width: any;
    height: any;
    name: any;
    centerX: number;
    centerY: number;
    distance: number;
    rotated: boolean;
    rotationDirection: string;
    trimmed: any;
    sourceSizeW: any;
    sourceSizeH: any;
    spriteSourceSizeX: any;
    spriteSourceSizeY: any;
    spriteSourceSizeW: any;
    spriteSourceSizeH: any;
    right: any;
    bottom: any;
    resize(width: any, height: any): void;
    setTrim(trimmed: any, actualWidth: any, actualHeight: any, destX: any, destY: any, destWidth: any, destHeight: any): void;
    clone(): any;
    getRect(output?: any): any;
}
//# sourceMappingURL=frame.d.ts.map