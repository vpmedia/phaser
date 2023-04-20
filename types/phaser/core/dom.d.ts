export class DOM {
    /**
     * TBD.
     * @param device
     */
    constructor(device: any);
    treatAsDesktop: boolean;
    visualBounds: VisualBoundsDesktopRectangle | VisualBoundsRectangle;
    layoutBounds: LayoutBoundsDesktopRectangle | LayoutBoundsRectangle;
    documentBounds: DocumentBoundsRectangle;
    scrollXProvider: () => number;
    scrollYProvider: () => number;
    /**
     * TBD.
     * @param element
     * @param point
     */
    getOffset(element: any, point?: any): any;
    /**
     * TBD.
     * @param element
     * @param cushion
     */
    getBounds(element: any, cushion?: number): false | {
        width: number;
        height: number;
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
    /**
     * TBD.
     * @param coords
     * @param cushion
     */
    calibrate(coords: any, cushion?: number): {
        width: number;
        height: number;
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
    /**
     * TBD.
     * @param primaryFallback
     */
    getScreenOrientation(primaryFallback: any): any;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get scrollX(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get scrollY(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get clientWidth(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get clientHeight(): number;
}
declare class VisualBoundsDesktopRectangle {
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get x(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get y(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get width(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get height(): number;
}
declare class VisualBoundsRectangle {
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get x(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get y(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get width(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get height(): number;
}
declare class LayoutBoundsDesktopRectangle {
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get x(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get y(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get width(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get height(): number;
}
declare class LayoutBoundsRectangle {
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get x(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get y(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get width(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get height(): number;
}
declare class DocumentBoundsRectangle {
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get x(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get y(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get width(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get height(): number;
}
export {};
//# sourceMappingURL=dom.d.ts.map