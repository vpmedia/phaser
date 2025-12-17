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
     * Gets the offset position of an element relative to the document.
     * @param {HTMLCanvasElement} element - The element to get the offset for.
     * @param {Point} point - Optional Point object to store the result.
     * @returns {Point} The offset position of the element.
     */
    getOffset(element: HTMLCanvasElement, point?: Point): Point;
    /**
     * Gets the bounding rectangle of an element with optional cushion.
     * @param {HTMLCanvasElement} element - The element to get bounds for.
     * @param {number} cushion - Optional padding to add around the element.
     * @returns {boolean} True if bounds were successfully retrieved, false otherwise.
     */
    getBounds(element: HTMLCanvasElement, cushion?: number): boolean;
    /**
     * Calibrates DOM rectangle coordinates with optional cushion.
     * @param {DOMRect} coords - The DOM rectangle coordinates to calibrate.
     * @param {number} cushion - Optional padding to add around the rectangle.
     * @returns {{width: number, height: number, left: number, right: number, top: number, bottom: number}} The calibrated rectangle.
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
     * Gets the screen orientation.
     * @param {string} primaryFallback - The fallback method to use if screen orientation API is not available.
     * @returns {string} The screen orientation ('portrait-primary', 'landscape-primary', etc.).
     */
    getScreenOrientation(primaryFallback: string): string;
    /**
     * Gets the horizontal scroll position of the window.
     * @returns {number} The horizontal scroll position in pixels.
     */
    get scrollX(): number;
    /**
     * Gets the vertical scroll position of the window.
     * @returns {number} The vertical scroll position in pixels.
     */
    get scrollY(): number;
    /**
     * Gets the width of the window's client area.
     * @returns {number} The width of the client area in pixels.
     */
    get clientWidth(): number;
    /**
     * Gets the height of the window's client area.
     * @returns {number} The height of the client area in pixels.
     */
    get clientHeight(): number;
}
declare class VisualBoundsDesktopRectangle {
    /**
     * Gets the horizontal scroll position of the window.
     * @returns {number} The horizontal scroll position in pixels.
     */
    get x(): number;
    /**
     * Gets the vertical scroll position of the window.
     * @returns {number} The vertical scroll position in pixels.
     */
    get y(): number;
    /**
     * Gets the width of the window.
     * @returns {number} The width of the window in pixels.
     */
    get width(): number;
    /**
     * Gets the height of the window.
     * @returns {number} The height of the window in pixels.
     */
    get height(): number;
}
declare class VisualBoundsRectangle {
    /**
     * Gets the horizontal scroll position of the document.
     * @returns {number} The horizontal scroll position in pixels.
     */
    get x(): number;
    /**
     * Gets the vertical scroll position of the document.
     * @returns {number} The vertical scroll position in pixels.
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
     * Gets the horizontal scroll position of the window.
     * @returns {number} The horizontal scroll position in pixels.
     */
    get x(): number;
    /**
     * Gets the vertical scroll position of the window.
     * @returns {number} The vertical scroll position in pixels.
     */
    get y(): number;
    /**
     * Gets the width of the window.
     * @returns {number} The width of the window in pixels.
     */
    get width(): number;
    /**
     * Gets the height of the window.
     * @returns {number} The height of the window in pixels.
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