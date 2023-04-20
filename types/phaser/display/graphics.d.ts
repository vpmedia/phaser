export class Graphics extends DisplayObject {
    /**
     * TBD.
     * @param {Game} game - TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     */
    constructor(game: Game, x?: number, y?: number);
    game: Game;
    type: number;
    fillAlpha: number;
    lineWidth: number;
    lineColor: number;
    graphicsData: any[];
    tint: number;
    blendMode: number;
    currentPath: GraphicsData;
    _webGL: any[];
    isMask: boolean;
    boundsPadding: number;
    _localBounds: Rectangle;
    dirty: boolean;
    _boundsDirty: boolean;
    webGLDirty: boolean;
    cachedSpriteDirty: boolean;
    /**
     * TBD.
     * @param lineWidth - TBD.
     * @param color - TBD.
     * @param alpha - TBD.
     */
    lineStyle(lineWidth?: number, color?: number, alpha?: number): Graphics;
    lineAlpha: number;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     */
    moveTo(x: number, y: number): Graphics;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     */
    lineTo(x: number, y: number): Graphics;
    /**
     * TBD.
     * @param cpX - TBD.
     * @param cpY - TBD.
     * @param toX - TBD.
     * @param toY - TBD.
     */
    quadraticCurveTo(cpX: any, cpY: any, toX: any, toY: any): Graphics;
    /**
     * TBD.
     * @param cpX - TBD.
     * @param cpY - TBD.
     * @param cpX2 - TBD.
     * @param cpY2 - TBD.
     * @param toX - TBD.
     * @param toY - TBD.
     */
    bezierCurveTo(cpX: any, cpY: any, cpX2: any, cpY2: any, toX: any, toY: any): Graphics;
    /**
     * TBD.
     * @param x1 - TBD.
     * @param y1 - TBD.
     * @param x2 - TBD.
     * @param y2 - TBD.
     * @param radius - TBD.
     */
    arcTo(x1: any, y1: any, x2: any, y2: any, radius: any): Graphics;
    /**
     * TBD.
     * @param cx - TBD.
     * @param cy - TBD.
     * @param radius - TBD.
     * @param startAngle - TBD.
     * @param endAngle - TBD.
     * @param anticlockwise - TBD.
     * @param segments - TBD.
     */
    arc(cx: any, cy: any, radius: any, startAngle: any, endAngle: any, anticlockwise?: boolean, segments?: number): Graphics;
    /**
     * TBD.
     * @param color - TBD.
     * @param alpha - TBD.
     */
    beginFill(color?: number, alpha?: number): Graphics;
    filling: boolean;
    fillColor: number;
    /**
     * TBD.
     */
    endFill(): Graphics;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     */
    drawRect(x: number, y: number, width: number, height: number): Graphics;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     * @param radius - TBD.
     */
    drawRoundedRect(x: number, y: number, width: number, height: number, radius: any): Graphics;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param diameter - TBD.
     */
    drawCircle(x: number, y: number, diameter: any): Graphics;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     */
    drawEllipse(x: number, y: number, width: number, height: number): Graphics;
    /**
     * TBD.
     * @param path - TBD.
     */
    drawPolygon(path: any): Graphics;
    /**
     * TBD.
     */
    clear(): Graphics;
    clearDirty: boolean;
    _prevTint: any;
    /**
     * TBD.
     * @param matrix - TBD.
     */
    getBounds(matrix?: any): any;
    /**
     * TBD.
     */
    getLocalBounds(): any;
    worldTransform: any;
    /**
     * TBD.
     * @param point - TBD.
     * @param tempPoint - TBD.
     */
    containsPoint(point: any, tempPoint: any): boolean;
    /**
     * TBD.
     */
    updateLocalBounds(): void;
    /**
     * TBD.
     */
    updateCachedSpriteTexture(): void;
    /**
     * TBD.
     * @param shape - TBD.
     */
    drawShape(shape: any): GraphicsData;
    /**
     * TBD.
     * @param points - TBD.
     * @param cull - TBD.
     */
    drawTriangle(points: any, cull?: boolean): void;
    /**
     * TBD.
     * @param vertices - TBD.
     * @param indices - TBD.
     * @param cull - TBD.
     */
    drawTriangles(vertices: any, indices: any, cull?: boolean): void;
}
import { DisplayObject } from './display_object';
import { Game } from '../core/game';
import { GraphicsData } from './graphics_data';
import { Rectangle } from '../geom/rectangle';
//# sourceMappingURL=graphics.d.ts.map