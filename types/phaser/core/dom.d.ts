export class DOM {
    /**
     * TBD.
     * @param {Device} device - TBD.
     */
    constructor(device: Device);
    treatAsDesktop: boolean;
    visualBounds: VisualBoundsDesktopRectangle | VisualBoundsRectangle;
    layoutBounds: LayoutBoundsDesktopRectangle | LayoutBoundsRectangle;
    documentBounds: DocumentBoundsRectangle;
    scrollXProvider: () => number;
    scrollYProvider: () => number;
    /**
     * TBD.
     * @param element - TBD.
     * @param {Point} point - TBD.
     * @returns {Point} TBD.
     */
    getOffset(element: any, point?: Point): Point;
    /**
     * TBD.
     * @param element - TBD.
     * @param {number} cushion - TBD.
     * @returns {boolean} TBD.
     */
    getBounds(element: any, cushion?: number): boolean;
    /**
     * TBD.
     * @param coords - TBD.
     * @param {number} cushion - TBD.
     * @returns {object} TBD.
     */
    calibrate(coords: any, cushion?: number): object;
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
import { Point } from '../geom/point';
import { Device } from './device';
export {};
//# sourceMappingURL=dom.d.ts.map