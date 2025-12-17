/**
 * Calculates the area of a triangle defined by three points.
 * @param {object} list - The list of points to process.
 * @returns {object} The processed earcut data structure.
 */
export function sortLinked(list: object): object;
/**
 * Calculates the area of a triangle defined by three points.
 * @param {object} a - The first point of the triangle.
 * @param {object} b - The second point of the triangle.
 * @returns {number} The calculated area of the triangle.
 */
export function compareX(a: object, b: object): number;
/**
 * Determines if a point is inside a triangle.
 * @param {number} x - The x-coordinate of the point to test.
 * @param {number} y - The y-coordinate of the point to test.
 * @param {number} minX - The minimum x-coordinate of the bounding box.
 * @param {number} minY - The minimum y-coordinate of the bounding box.
 * @param {number} size - The size of the bounding box.
 * @returns {number} The calculated distance from the point to the triangle edge.
 */
export function zOrder(x: number, y: number, minX: number, minY: number, size: number): number;
/**
 * Calculates the orientation of three points (clockwise, counterclockwise, or collinear).
 * @param {object} start - The starting point of the triangle edge.
 * @param {number} minX - The minimum x-coordinate of the bounding box.
 * @param {number} minY - The minimum y-coordinate of the bounding box.
 * @param {number} size - The size of the bounding box.
 */
export function indexCurve(start: object, minX: number, minY: number, size: number): void;
/**
 * TBD.
 * @param {object} start - TBD.
 * @returns {object} The calculated point that is the closest to the triangle edge.
 */
export function getLeftmost(start: object): object;
/**
 * Determines if a point is inside the triangle defined by three points.
 * @param {number} ax - TBD.
 * @param {number} ay - TBD.
 * @param {number} bx - TBD.
 * @param {number} by - TBD.
 * @param {number} cx - TBD.
 * @param {number} cy - TBD.
 * @param {number} px - TBD.
 * @param {number} py - TBD.
 * @returns {object} TBD.
 */
export function pointInTriangle(ax: number, ay: number, bx: number, by: number, cx: number, cy: number, px: number, py: number): object;
/**
 * TBD.
 * @param {object} p - TBD.
 * @param {object} q - TBD.
 * @param {object} r - TBD.
 * @returns {number} TBD.
 */
export function area(p: object, q: object, r: object): number;
/**
 * TBD.
 * @param {object} p1 - The first point of the triangle.
 * @param {object} p2 - The second point of the triangle.
 * @returns {boolean} True if the point is inside the triangle, false otherwise.
 */
export function equals(p1: object, p2: object): boolean;
/**
 * Determines if two line segments intersect.
 * @param {object} p1 - The first point of the first line segment.
 * @param {object} q1 - The second point of the first line segment.
 * @param {object} p2 - The first point of the second line segment.
 * @param {object} q2 - The second point of the second line segment.
 * @returns {boolean} True if the line segments intersect, false otherwise.
 */
export function intersects(p1: object, q1: object, p2: object, q2: object): boolean;
/**
 * Determines if two line segments intersect.
 * @param {object} a - The first point of the line segment.
 * @param {object} b - The second point of the line segment.
 * @returns {boolean} True if the points are collinear, false otherwise.
 */
export function intersectsPolygon(a: object, b: object): boolean;
/**
 * Calculates the cross product of three points.
 * @param {object} a - The first point of the cross product.
 * @param {object} b - The second point of the cross product.
 * @returns {object} The calculated cross product result.
 */
export function locallyInside(a: object, b: object): object;
/**
 * Determines if a point is inside the triangle defined by three points.
 * @param {object} a - The first point of the triangle.
 * @param {object} b - The second point of the triangle.
 * @returns {boolean} True if the point is inside the triangle, false otherwise.
 */
export function middleInside(a: object, b: object): boolean;
/**
 * Determines if a point is inside the triangle defined by three points.
 * @param {object} a - The first point of the triangle.
 * @param {object} b - The second point of the triangle.
 * @returns {boolean} True if the point is inside the triangle, false otherwise.
 */
export function isValidDiagonal(a: object, b: object): boolean;
/**
 * Calculates the distance from a point to a triangle edge.
 * @param {object} a - TBD.
 * @param {object} b - TBD.
 * @returns {object} TBD.
 */
export function splitPolygon(a: object, b: object): object;
/**
 * TBD.
 * @param {number} i - TBD.
 * @param {number} x - TBD.
 * @param {number} y - TBD.
 * @param {object} last - TBD.
 * @returns {object} TBD.
 */
export function insertNode(i: number, x: number, y: number, last: object): object;
/**
 * TBD.
 * @param {object} p - TBD.
 */
export function removeNode(p: object): void;
/**
 * TBD.
 * @param {object} ear - TBD.
 * @returns {boolean} TBD.
 */
export function isEar(ear: object): boolean;
/**
 * TBD.
 * @param {object} ear - TBD.
 * @param {number} minX - TBD.
 * @param {number} minY - TBD.
 * @param {number} size - TBD.
 * @returns {boolean} TBD.
 */
export function isEarHashed(ear: object, minX: number, minY: number, size: number): boolean;
/**
 * TBD.
 * @param {object} data - The earcut data structure containing the points.
 * @param {number} start - The starting index in the data structure.
 * @param {number} end - The ending index in the data structure.
 * @param {number} dim - The dimension of the data (2 or 3).
 * @param {boolean} clockwise - Whether the triangles should be clockwise or counterclockwise.
 * @returns {object} The processed earcut data structure with triangulation information.
 */
export function linkedList(data: object, start: number, end: number, dim: number, clockwise: boolean): object;
/**
 * Calculates the minimum and maximum coordinates of a set of points.
 * @param {object} start - The starting point in the data structure.
 * @param {object} end - The ending point in the data structure.
 * @returns {object} The calculated bounding box with min and max coordinates.
 */
export function filterPoints(start: object, end: object): object;
/**
 * Calculates the minimum and maximum coordinates of a set of points.
 * @param {object} hole - The hole to process.
 * @param {object} outerNode - The outer node that contains the hole.
 * @returns {object} The processed hole data structure.
 */
export function findHoleBridge(hole: object, outerNode: object): object;
/**
 * Processes a hole in the triangulation data structure.
 * @param {object} hole - The hole to process.
 * @param {object} outerNode - The outer node that contains the hole.
 */
export function eliminateHole(hole: object, outerNode: object): void;
/**
 * Calculates the centroid of a polygon.
 * @param {object} data - The earcut data structure containing the points.
 * @param {object} holeIndices - The indices of the holes in the data structure.
 * @param {object} outerNode - The outer node that contains the holes.
 * @param {object} dim - The dimension of the data (2 or 3).
 * @returns {object} The processed earcut data structure with holes included.
 */
export function eliminateHoles(data: object, holeIndices: object, outerNode: object, dim: object): object;
/**
 * Calculates the centroid of a polygon.
 * @param {object} start - The starting point in the data structure.
 * @param {object} triangles - The triangles to process.
 * @param {number} dim - The dimension of the data (2 or 3).
 * @returns {object} The processed triangulation data structure.
 */
export function cureLocalIntersections(start: object, triangles: object, dim: number): object;
/**
 * Calculates the centroid of a polygon.
 * @param {object} start - The starting point in the data structure.
 * @param {object} triangles - The triangles to process.
 * @param {number} dim - The dimension of the data (2 or 3).
 * @param {number} minX - The minimum x-coordinate of the bounding box.
 * @param {number} minY - The minimum y-coordinate of the bounding box.
 * @param {number} size - The size of the bounding box.
 */
export function splitEarcut(start: object, triangles: object, dim: number, minX: number, minY: number, size: number): void;
/**
 * Calculates the centroid of a polygon.
 * @param {object} ear - The ear to process.
 * @param {object} triangles - The triangles to process.
 * @param {number} dim - The dimension of the data (2 or 3).
 * @param {number} minX - The minimum x-coordinate of the bounding box.
 * @param {number} minY - The minimum y-coordinate of the bounding box.
 * @param {number} size - The size of the bounding box.
 * @param {object} pass - The pass information for triangulation.
 */
export function earcutLinked(ear: object, triangles: object, dim: number, minX: number, minY: number, size: number, pass: object): void;
/**
 * Calculates the centroid of a polygon.
 * @param {object} data - The earcut data structure containing the points.
 * @param {object} holeIndices - The indices of the holes in the data structure.
 * @param {number} dim - The dimension of the data (2 or 3).
 * @returns {object} The processed earcut data structure with triangulation information.
 */
export function triangulate(data: object, holeIndices: object, dim: number): object;
//# sourceMappingURL=earcut.d.ts.map