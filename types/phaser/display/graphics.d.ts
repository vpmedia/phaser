export class Graphics extends DisplayObject {
    /**
     * TBD.
     * @param {import('../core/game.js').Game} game - TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     */
    constructor(game: import('../core/game.js').Game, x?: number, y?: number);
    game: import("../core/game.js").Game;
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
    _cacheAsBitmap: boolean;
    webGLDirty: boolean;
    cachedSpriteDirty: boolean;
    /**
     * TBD.
     * @param {number} lineWidth - TBD.
     * @param {number} color - TBD.
     * @param {number} alpha - TBD.
     * @returns {Graphics} TBD.
     */
    lineStyle(lineWidth?: number, color?: number, alpha?: number): Graphics;
    lineAlpha: number;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @returns {Graphics} TBD.
     */
    moveTo(x: number, y: number): Graphics;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @returns {Graphics} TBD.
     */
    lineTo(x: number, y: number): Graphics;
    /**
     * TBD.
     * @param {number} cpX - TBD.
     * @param {number} cpY - TBD.
     * @param {number} toX - TBD.
     * @param {number} toY - TBD.
     * @returns {Graphics} TBD.
     */
    quadraticCurveTo(cpX: number, cpY: number, toX: number, toY: number): Graphics;
    /**
     * TBD.
     * @param {number} cpX - TBD.
     * @param {number} cpY - TBD.
     * @param {number} cpX2 - TBD.
     * @param {number} cpY2 - TBD.
     * @param {number} toX - TBD.
     * @param {number} toY - TBD.
     * @returns {Graphics} TBD.
     */
    bezierCurveTo(cpX: number, cpY: number, cpX2: number, cpY2: number, toX: number, toY: number): Graphics;
    /**
     * TBD.
     * @param {number} x1 - TBD.
     * @param {number} y1 - TBD.
     * @param {number} x2 - TBD.
     * @param {number} y2 - TBD.
     * @param {number} radius - TBD.
     * @returns {Graphics} TBD.
     */
    arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): Graphics;
    /**
     * TBD.
     * @param {number} cx - TBD.
     * @param {number} cy - TBD.
     * @param {number} radius - TBD.
     * @param {number} startAngle - TBD.
     * @param {number} endAngle - TBD.
     * @param {boolean} anticlockwise - TBD.
     * @param {number} segments - TBD.
     * @returns {Graphics} TBD.
     */
    arc(cx: number, cy: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean, segments?: number): Graphics;
    /**
     * TBD.
     * @param {number} color - TBD.
     * @param {number} alpha - TBD.
     * @returns {Graphics} TBD.
     */
    beginFill(color?: number, alpha?: number): Graphics;
    filling: boolean;
    fillColor: number;
    /**
     * TBD.
     * @returns {Graphics} TBD.
     */
    endFill(): Graphics;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     * @returns {Graphics} TBD.
     */
    drawRect(x: number, y: number, width: number, height: number): Graphics;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     * @param {number} radius - TBD.
     * @returns {Graphics} TBD.
     */
    drawRoundedRect(x: number, y: number, width: number, height: number, radius: number): Graphics;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {number} diameter - TBD.
     * @returns {Graphics} TBD.
     */
    drawCircle(x: number, y: number, diameter: number): Graphics;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     * @returns {Graphics} TBD.
     */
    drawEllipse(x: number, y: number, width: number, height: number): Graphics;
    /**
     * TBD.
     * @param {Polygon} path - TBD.
     * @returns {Graphics} TBD.
     */
    drawPolygon(path: Polygon): Graphics;
    /**
     * TBD.
     * @returns {Graphics} TBD.
     */
    clear(): Graphics;
    clearDirty: boolean;
    _prevTint: any;
    /**
     * TBD.
     * @param {import('../geom/matrix.js').Matrix} matrix - TBD.
     * @returns {Rectangle} TBD.
     */
    getBounds(matrix?: import('../geom/matrix.js').Matrix): Rectangle;
    /**
     * TBD.
     * @param {Point} point - TBD.
     * @param {Point} tempPoint - TBD.
     * @returns {boolean} TBD.
     */
    containsPoint(point: Point, tempPoint: Point): boolean;
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
     * @param {object} shape - TBD.
     * @returns {GraphicsData} TBD.
     */
    drawShape(shape: object): GraphicsData;
    /**
     * TBD.
     * @param {Point[]} points - TBD.
     * @param {boolean} cull - TBD.
     */
    drawTriangle(points: Point[], cull?: boolean): void;
    /**
     * TBD.
     * @param {number[]|Point[]} vertices - TBD.
     * @param {number[]} indices - TBD.
     * @param {boolean} cull - TBD.
     */
    drawTriangles(vertices: number[] | Point[], indices: number[], cull?: boolean): void;
}
import { DisplayObject } from './display_object.js';
import { GraphicsData } from './graphics_data.js';
import { Rectangle } from '../geom/rectangle.js';
import { Polygon } from '../geom/polygon.js';
import { Point } from '../geom/point.js';
//# sourceMappingURL=graphics.d.ts.map