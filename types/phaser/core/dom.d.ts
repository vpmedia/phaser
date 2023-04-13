export default class _default {
    constructor(device: any);
    treatAsDesktop: any;
    visualBounds: VisualBoundsDesktopRectangle | VisualBoundsRectangle;
    layoutBounds: LayoutBoundsDesktopRectangle | LayoutBoundsRectangle;
    documentBounds: DocumentBoundsRectangle;
    scrollXProvider: () => number;
    scrollYProvider: () => number;
    getOffset(element: any, point?: null): null;
    getBounds(element: any, cushion?: number): false | {
        width: number;
        height: number;
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
    calibrate(coords: any, cushion?: number): {
        width: number;
        height: number;
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
    getScreenOrientation(primaryFallback: any): OrientationType;
    get scrollX(): number;
    get scrollY(): number;
    get clientWidth(): number;
    get clientHeight(): number;
}
declare class VisualBoundsDesktopRectangle {
    get x(): number;
    get y(): number;
    get width(): number;
    get height(): number;
}
declare class VisualBoundsRectangle {
    get x(): number;
    get y(): number;
    get width(): number;
    get height(): number;
}
declare class LayoutBoundsDesktopRectangle {
    get x(): number;
    get y(): number;
    get width(): number;
    get height(): number;
}
declare class LayoutBoundsRectangle {
    get x(): number;
    get y(): number;
    get width(): number;
    get height(): number;
}
declare class DocumentBoundsRectangle {
    get x(): number;
    get y(): number;
    get width(): number;
    get height(): number;
}
export {};
//# sourceMappingURL=dom.d.ts.map