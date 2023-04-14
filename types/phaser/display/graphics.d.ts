export default class _default extends DisplayObject {
    /**
     * TBD.
     *
     * @param {object} game - TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     */
    constructor(game: object, x?: number, y?: number);
    game: object;
    type: number;
    fillAlpha: number;
    lineWidth: number;
    lineColor: number;
    graphicsData: any[];
    tint: number;
    blendMode: number;
    currentPath: GraphicsData | null;
    _webGL: any[];
    isMask: boolean;
    boundsPadding: number;
    _localBounds: Rectangle;
    dirty: boolean;
    _boundsDirty: boolean;
    webGLDirty: boolean;
    cachedSpriteDirty: boolean;
    lineStyle(lineWidth?: number, color?: number, alpha?: number): default;
    lineAlpha: number | undefined;
    moveTo(x: any, y: any): default;
    lineTo(x: any, y: any): default;
    quadraticCurveTo(cpX: any, cpY: any, toX: any, toY: any): default;
    bezierCurveTo(cpX: any, cpY: any, cpX2: any, cpY2: any, toX: any, toY: any): default;
    arcTo(x1: any, y1: any, x2: any, y2: any, radius: any): default;
    arc(cx: any, cy: any, radius: any, startAngle: any, endAngle: any, anticlockwise?: boolean, segments?: number): default;
    beginFill(color?: number, alpha?: number): default;
    filling: boolean | undefined;
    fillColor: number | null | undefined;
    endFill(): default;
    drawRect(x: any, y: any, width: any, height: any): default;
    drawRoundedRect(x: any, y: any, width: any, height: any, radius: any): default;
    drawCircle(x: any, y: any, diameter: any): default;
    drawEllipse(x: any, y: any, width: any, height: any): default;
    drawPolygon(path: any): default;
    clear(): default;
    clearDirty: boolean | undefined;
    _prevTint: any;
    getBounds(matrix?: null): any;
    getLocalBounds(): any;
    worldTransform: any;
    containsPoint(point: any, tempPoint: any): boolean;
    updateLocalBounds(): void;
    updateCachedSpriteTexture(): void;
    drawShape(shape: any): GraphicsData;
    drawTriangle(points: any, cull?: boolean): void;
    drawTriangles(vertices: any, indices: any, cull?: boolean): void;
}
import DisplayObject from './display_object';
import GraphicsData from './graphics_data';
import Rectangle from '../geom/rectangle';
//# sourceMappingURL=graphics.d.ts.map