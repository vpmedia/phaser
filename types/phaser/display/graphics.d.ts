export class Graphics extends DisplayObject {
    /**
     * Creates a new Graphics object.
     * @param {import('../core/game.js').Game} game - The game instance.
     * @param {number} x - The x coordinate of the graphics object.
     * @param {number} y - The y coordinate of the graphics object.
     */
    constructor(game: import("../core/game.js").Game, x?: number, y?: number);
    /** @type {number} */
    type: number;
    /** @type {number} */
    fillAlpha: number;
    /** @type {number} */
    lineWidth: number;
    /** @type {number} */
    lineColor: number;
    graphicsData: any[];
    /** @type {number} */
    tint: number;
    /** @type {number} */
    blendMode: number;
    /** @type {GraphicsData} */
    currentPath: GraphicsData;
    /** @type {object[]} */
    _webGL: object[];
    /** @type {boolean} */
    isMask: boolean;
    /** @type {number} */
    boundsPadding: number;
    /** @type {Rectangle} */
    _localBounds: Rectangle;
    /** @type {boolean} */
    dirty: boolean;
    /** @type {boolean} */
    _boundsDirty: boolean;
    /** @type {boolean} */
    _cacheAsBitmap: boolean;
    /** @type {boolean} */
    webGLDirty: boolean;
    /** @type {boolean} */
    cachedSpriteDirty: boolean;
    /**
     * Sets the line style for subsequent drawing operations.
     * @param {number} lineWidth - The width of the line to draw.
     * @param {number} color - The color of the line to draw.
     * @param {number} alpha - The alpha (transparency) of the line to draw.
     * @returns {Graphics} This Graphics object for chaining.
     */
    lineStyle(lineWidth?: number, color?: number, alpha?: number): Graphics;
    lineAlpha: number;
    /**
     * Moves the drawing cursor to the specified point.
     * @param {number} x - The x coordinate to move to.
     * @param {number} y - The y coordinate to move to.
     * @returns {Graphics} This Graphics object for chaining.
     */
    moveTo(x: number, y: number): Graphics;
    /**
     * Draws a line from the current drawing position to the specified point.
     * @param {number} x - The x coordinate to draw to.
     * @param {number} y - The y coordinate to draw to.
     * @returns {Graphics} This Graphics object for chaining.
     */
    lineTo(x: number, y: number): Graphics;
    /**
     * Draws a quadratic curve from the current position to the specified point.
     * @param {number} cpX - The x coordinate of the control point.
     * @param {number} cpY - The y coordinate of the control point.
     * @param {number} toX - The x coordinate to draw to.
     * @param {number} toY - The y coordinate to draw to.
     * @returns {Graphics} This Graphics object for chaining.
     */
    quadraticCurveTo(cpX: number, cpY: number, toX: number, toY: number): Graphics;
    /**
     * Draws a cubic Bezier curve from the current position to the specified point.
     * @param {number} cpX - The x coordinate of the first control point.
     * @param {number} cpY - The y coordinate of the first control point.
     * @param {number} cpX2 - The x coordinate of the second control point.
     * @param {number} cpY2 - The y coordinate of the second control point.
     * @param {number} toX - The x coordinate to draw to.
     * @param {number} toY - The y coordinate to draw to.
     * @returns {Graphics} This Graphics object for chaining.
     */
    bezierCurveTo(cpX: number, cpY: number, cpX2: number, cpY2: number, toX: number, toY: number): Graphics;
    /**
     * Draws an arc from the current position to the specified point.
     * @param {number} x1 - The x coordinate of the starting point.
     * @param {number} y1 - The y coordinate of the starting point.
     * @param {number} x2 - The x coordinate of the end point.
     * @param {number} y2 - The y coordinate of the end point.
     * @param {number} radius - The radius of the arc.
     * @returns {Graphics} This Graphics object for chaining.
     */
    arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): Graphics;
    /**
     * Draws an arc with the specified center, radius, and angles.
     * @param {number} cx - The x coordinate of the center point.
     * @param {number} cy - The y coordinate of the center point.
     * @param {number} radius - The radius of the arc.
     * @param {number} startAngle - The starting angle in radians.
     * @param {number} endAngle - The ending angle in radians.
     * @param {boolean} anticlockwise - Whether to draw the arc anticlockwise.
     * @param {number} segments - The number of segments to use for drawing the arc.
     * @returns {Graphics} This Graphics object for chaining.
     */
    arc(cx: number, cy: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean, segments?: number): Graphics;
    /**
     * Begins filling with the specified color and alpha.
     * @param {number} color - The fill color to use.
     * @param {number} alpha - The fill alpha (transparency) to use.
     * @returns {Graphics} This Graphics object for chaining.
     */
    beginFill(color?: number, alpha?: number): Graphics;
    filling: boolean;
    fillColor: number;
    /**
     * Ends the current fill operation.
     * @returns {Graphics} This Graphics object for chaining.
     */
    endFill(): Graphics;
    /**
     * Draws a rectangle with the specified properties.
     * @param {number} x - The x coordinate of the rectangle.
     * @param {number} y - The y coordinate of the rectangle.
     * @param {number} width - The width of the rectangle.
     * @param {number} height - The height of the rectangle.
     * @returns {Graphics} This Graphics object for chaining.
     */
    drawRect(x: number, y: number, width: number, height: number): Graphics;
    /**
     * Draws a rounded rectangle with the specified properties.
     * @param {number} x - The x coordinate of the rectangle.
     * @param {number} y - The y coordinate of the rectangle.
     * @param {number} width - The width of the rectangle.
     * @param {number} height - The height of the rectangle.
     * @param {number} radius - The radius of the rounded corners.
     * @returns {Graphics} This Graphics object for chaining.
     */
    drawRoundedRect(x: number, y: number, width: number, height: number, radius: number): Graphics;
    /**
     * Draws a circle with the specified properties.
     * @param {number} x - The x coordinate of the center point.
     * @param {number} y - The y coordinate of the center point.
     * @param {number} diameter - The diameter of the circle.
     * @returns {Graphics} This Graphics object for chaining.
     */
    drawCircle(x: number, y: number, diameter: number): Graphics;
    /**
     * Draws an ellipse with the specified properties.
     * @param {number} x - The x coordinate of the center point.
     * @param {number} y - The y coordinate of the center point.
     * @param {number} width - The width of the ellipse.
     * @param {number} height - The height of the ellipse.
     * @returns {Graphics} This Graphics object for chaining.
     */
    drawEllipse(x: number, y: number, width: number, height: number): Graphics;
    /**
     * Draws a polygon with the specified path.
     * @param {Polygon} path - The polygon to draw.
     * @returns {Graphics} This Graphics object for chaining.
     */
    drawPolygon(path: Polygon): Graphics;
    /**
     * Clears all graphics data.
     * @returns {Graphics} This Graphics object for chaining.
     */
    clear(): Graphics;
    clearDirty: boolean;
    _prevTint: any;
    /**
     * Gets the bounds of the graphics object.
     * @param {import('../geom/matrix.js').Matrix} matrix - The transformation matrix to use.
     * @returns {Rectangle} The bounds rectangle of the graphics object.
     */
    getBounds(matrix?: import("../geom/matrix.js").Matrix): Rectangle;
    /**
     * Checks if the graphics object contains a point.
     * @param {Point} point - The point to check.
     * @param {Point} tempPoint - A temporary point object to use.
     * @returns {boolean} True if the graphics object contains the point, otherwise false.
     */
    containsPoint(point: Point, tempPoint: Point): boolean;
    /**
     * Updates the local bounds of the graphics object.
     */
    updateLocalBounds(): void;
    /**
     * Updates the cached sprite texture.
     */
    updateCachedSpriteTexture(): void;
    /**
     * Draws a shape with the specified properties.
     * @param {object} shape - The shape to draw.
     * @returns {GraphicsData} The graphics data for the drawn shape.
     */
    drawShape(shape: object): GraphicsData;
    /**
     * Draws a triangle with the specified points and culling options.
     * @param {Point[]} points - The points of the triangle.
     * @param {boolean} cull - Whether to perform backface culling.
     */
    drawTriangle(points: Point[], cull?: boolean): void;
    /**
     * Draws triangles with the specified vertices and indices.
     * @param {number[]|Point[]} vertices - The vertices of the triangles.
     * @param {number[]} indices - The indices of the vertices to use.
     * @param {boolean} cull - Whether to perform backface culling.
     */
    drawTriangles(vertices: number[] | Point[], indices: number[], cull?: boolean): void;
}
import { DisplayObject } from './display_object.js';
import { GraphicsData } from './graphics_data.js';
import { Rectangle } from '../geom/rectangle.js';
import { Polygon } from '../geom/polygon.js';
import { Point } from '../geom/point.js';
//# sourceMappingURL=graphics.d.ts.map