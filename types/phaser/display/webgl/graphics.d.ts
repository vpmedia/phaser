/**
 * TBD.
 * @returns {number} TBD.
 */
export function getStencilBufferLimit(): number;
/**
 * TBD.
 * @returns {object[]} TBD.
 */
export function getGraphicsDataPool(): object[];
/**
 * TBD.
 * @param {object} webGL - TBD.
 * @param {number} type - TBD.
 * @returns {object} TBD.
 */
export function switchMode(webGL: object, type: number): object;
/**
 * TBD.
 * @param {object} graphicsData - TBD.
 * @param {GraphicsData} webGLData - TBD.
 */
export function buildLine(graphicsData: object, webGLData: GraphicsData): void;
/**
 * TBD.
 * @param {object} graphicsData - TBD.
 * @param {GraphicsData} webGLData - TBD.
 */
export function buildRectangle(graphicsData: object, webGLData: GraphicsData): void;
/**
 * TBD.
 * @param {number} fromX - TBD.
 * @param {number} fromY - TBD.
 * @param {number} cpX - TBD.
 * @param {number} cpY - TBD.
 * @param {number} toX - TBD.
 * @param {number} toY - TBD.
 * @returns {number[]} TBD.
 */
export function quadraticBezierCurve(fromX: number, fromY: number, cpX: number, cpY: number, toX: number, toY: number): number[];
/**
 * TBD.
 * @param {object} graphicsData - TBD.
 * @param {GraphicsData} webGLData - TBD.
 */
export function buildRoundedRectangle(graphicsData: object, webGLData: GraphicsData): void;
/**
 * TBD.
 * @param {object} graphicsData - TBD.
 * @param {GraphicsData} webGLData - TBD.
 */
export function buildCircle(graphicsData: object, webGLData: GraphicsData): void;
/**
 * TBD.
 * @param {object} graphicsData - TBD.
 * @param {GraphicsData} webGLData - TBD.
 */
export function buildComplexPoly(graphicsData: object, webGLData: GraphicsData): void;
/**
 * TBD.
 * @param {object} graphicsData - TBD.
 * @param {GraphicsData} webGLData - TBD.
 * @returns {boolean} TBD.
 */
export function buildPoly(graphicsData: object, webGLData: GraphicsData): boolean;
/**
 * TBD.
 * @param {object} graphics - TBD.
 * @param {WebGLRenderingContext & { id: number }} gl - TBD.
 */
export function updateGraphics(graphics: object, gl: WebGLRenderingContext & {
    id: number;
}): void;
/**
 * TBD.
 * @param {object} graphics - TBD.
 * @param {object} renderSession - TBD.
 */
export function renderGraphics(graphics: object, renderSession: object): void;
import { GraphicsData } from './graphics_data.js';
//# sourceMappingURL=graphics.d.ts.map