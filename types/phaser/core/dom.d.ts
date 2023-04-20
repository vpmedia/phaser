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
     */
    get scrollX(): number;
    /**
     * TBD.
     */
    get scrollY(): number;
    /**
     * TBD.
     */
    get clientWidth(): number;
    /**
     * TBD.
     */
    get clientHeight(): number;
}
declare class VisualBoundsDesktopRectangle {
    /**
     * TBD.
     */
    get x(): number;
    /**
     * TBD.
     */
    get y(): number;
    /**
     * TBD.
     */
    get width(): number;
    /**
     * TBD.
     */
    get height(): number;
}
declare class VisualBoundsRectangle {
    /**
     * TBD.
     */
    get x(): number;
    /**
     * TBD.
     */
    get y(): number;
    /**
     * TBD.
     */
    get width(): number;
    /**
     * TBD.
     */
    get height(): number;
}
declare class LayoutBoundsDesktopRectangle {
    /**
     * TBD.
     */
    get x(): number;
    /**
     * TBD.
     */
    get y(): number;
    /**
     * TBD.
     */
    get width(): number;
    /**
     * TBD.
     */
    get height(): number;
}
declare class LayoutBoundsRectangle {
    /**
     * TBD.
     */
    get x(): number;
    /**
     * TBD.
     */
    get y(): number;
    /**
     * TBD.
     */
    get width(): number;
    /**
     * TBD.
     */
    get height(): number;
}
declare class DocumentBoundsRectangle {
    /**
     * TBD.
     */
    get x(): number;
    /**
     * TBD.
     */
    get y(): number;
    /**
     * TBD.
     */
    get width(): number;
    /**
     * TBD.
     */
    get height(): number;
}
export {};
//# sourceMappingURL=dom.d.ts.map