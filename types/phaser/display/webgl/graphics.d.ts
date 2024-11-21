export function getStencilBufferLimit(): number;
export function getGraphicsDataPool(): object[];
export function switchMode(webGL: object, type: number): object;
export function buildLine(graphicsData: object, webGLData: GraphicsData): void;
export function buildRectangle(graphicsData: object, webGLData: GraphicsData): void;
export function quadraticBezierCurve(fromX: number, fromY: number, cpX: number, cpY: number, toX: number, toY: number): number[];
export function buildRoundedRectangle(graphicsData: object, webGLData: GraphicsData): void;
export function buildCircle(graphicsData: object, webGLData: GraphicsData): void;
export function buildComplexPoly(graphicsData: object, webGLData: GraphicsData): void;
export function buildPoly(graphicsData: object, webGLData: GraphicsData): boolean;
export function updateGraphics(graphics: object, gl: WebGLRenderingContext & {
    id: number;
}): void;
export function renderGraphics(graphics: object, renderSession: object): void;
import { GraphicsData } from './graphics_data.js';
//# sourceMappingURL=graphics.d.ts.map