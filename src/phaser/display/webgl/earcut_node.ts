export class Node {
  i: number;
  x: number;
  y: number;
  prev: Node | null;
  next: Node | null;
  z: number | null;
  prevZ: Node | null;
  nextZ: Node | null;
  steiner: boolean;

  /**
   * Creates a new Node instance.
   * @param {number} i - The vertice index in coordinates array.
   * @param {number} x - The x coordinate of the vertex.
   * @param {number} y - The y coordinate of the vertex.
   */
  constructor(i: number, x: number, y: number) {
    // vertice index in coordinates array
    this.i = i;
    // vertex coordinates
    this.x = x;
    this.y = y;
    // previous and next vertice nodes in a polygon ring
    this.prev = null;
    this.next = null;
    // z-order curve value
    this.z = null;
    // previous and next nodes in z-order
    this.prevZ = null;
    this.nextZ = null;
    // indicates whether this is a steiner point
    this.steiner = false;
  }
}
