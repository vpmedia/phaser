export class DOM {
    /**
     * TBD.
     * @param {import('./device.js').Device} device - TBD.
     */
    constructor(device: import("./device.js").Device);
    treatAsDesktop: boolean;
    visualBounds: VisualBoundsDesktopRectangle | VisualBoundsRectangle;
    layoutBounds: LayoutBoundsDesktopRectangle | LayoutBoundsRectangle;
    documentBounds: DocumentBoundsRectangle;
    scrollXProvider: () => number;
    scrollYProvider: () => number;
    /**
     * TBD.
     * @param {HTMLCanvasElement} element - TBD.
     * @param {Point} point - TBD.
     * @returns {Point} TBD.
     */
    getOffset(element: HTMLCanvasElement, point?: Point): Point;
    /**
     * TBD.
     * @param {HTMLCanvasElement} element - TBD.
     * @param {number} cushion - TBD.
     * @returns {boolean} TBD.
     */
    getBounds(element: HTMLCanvasElement, cushion?: number): boolean;
    /**
     * TBD.
     * @param {DOMRect} coords - TBD.
     * @param {number} cushion - TBD.
     * @returns {{width: number, height: number, left: number, right: number, top: number, bottom: number}} TBD.
     */
    calibrate(coords: DOMRect, cushion?: number): {
        width: number;
        height: number;
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
    /**
     * TBD.
     * @param {string} primaryFallback - TBD.
     * @returns {string} TBD.
     */
    getScreenOrientation(primaryFallback: string): string;
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
import { Point } from '../geom/point.js';
export {};
//# sourceMappingURL=dom.d.ts.map