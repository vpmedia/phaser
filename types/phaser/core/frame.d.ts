export class Frame {
    /**
     * TBD.
     * @param index
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     * @param name
     */
    constructor(index: any, x: number, y: number, width: number, height: number, name: any);
    /**
     * TBD.
     * @param index
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     * @param name
     */
    initialize(index: any, x: number, y: number, width: number, height: number, name: any): void;
    index: any;
    x: number;
    y: number;
    width: number;
    height: number;
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
     * @param trimmed
     * @param actualWidth
     * @param actualHeight
     * @param destX
     * @param destY
     * @param destWidth
     * @param destHeight
     */
    setTrim(trimmed: any, actualWidth: any, actualHeight: any, destX: any, destY: any, destWidth: any, destHeight: any): void;
    /**
     * TBD.
     */
    clone(): any;
    /**
     * TBD.
     * @param output
     */
    getRect(output?: any): any;
}
//# sourceMappingURL=frame.d.ts.map