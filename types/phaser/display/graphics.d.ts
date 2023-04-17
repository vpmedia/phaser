export class Graphics extends DisplayObject {
    /**
     * TBD.
     *
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
    lineStyle(lineWidth?: number, color?: number, alpha?: number): Graphics;
    lineAlpha: number;
    moveTo(x: any, y: any): Graphics;
    lineTo(x: any, y: any): Graphics;
    quadraticCurveTo(cpX: any, cpY: any, toX: any, toY: any): Graphics;
    bezierCurveTo(cpX: any, cpY: any, cpX2: any, cpY2: any, toX: any, toY: any): Graphics;
    arcTo(x1: any, y1: any, x2: any, y2: any, radius: any): Graphics;
    arc(cx: any, cy: any, radius: any, startAngle: any, endAngle: any, anticlockwise?: boolean, segments?: number): Graphics;
    beginFill(color?: number, alpha?: number): Graphics;
    filling: boolean;
    fillColor: number;
    endFill(): Graphics;
    drawRect(x: any, y: any, width: any, height: any): Graphics;
    drawRoundedRect(x: any, y: any, width: any, height: any, radius: any): Graphics;
    drawCircle(x: any, y: any, diameter: any): Graphics;
    drawEllipse(x: any, y: any, width: any, height: any): Graphics;
    drawPolygon(path: any): Graphics;
    clear(): Graphics;
    clearDirty: boolean;
    _prevTint: any;
    getBounds(matrix?: any): any;
    getLocalBounds(): any;
    worldTransform: any;
    containsPoint(point: any, tempPoint: any): boolean;
    updateLocalBounds(): void;
    updateCachedSpriteTexture(): void;
    drawShape(shape: any): GraphicsData;
    drawTriangle(points: any, cull?: boolean): void;
    drawTriangles(vertices: any, indices: any, cull?: boolean): void;
}
import { DisplayObject } from './display_object';
import { Game } from '../core/game';
import { GraphicsData } from './graphics_data';
import { Rectangle } from '../geom/rectangle';
//# sourceMappingURL=graphics.d.ts.map