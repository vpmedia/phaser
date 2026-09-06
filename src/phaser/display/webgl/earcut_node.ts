export class Node {
  public i: number;
  public x: number;
  public y: number;
  public prev: Node;
  public next: Node;
  public z: number | null;
  public prevZ: Node | null;
  public nextZ: Node | null;
  public steiner: boolean;

  /**
   * Creates a new Node instance.
   * @param {number} i - The vertice index in coordinates array.
   * @param {number} x - The x coordinate of the vertex.
   * @param {number} y - The y coordinate of the vertex.
   */
  public constructor(i: number, x: number, y: number) {
    // vertice index in coordinates array
    this.i = i;
    // vertex coordinates
    this.x = x;
    this.y = y;
    // previous and next vertice nodes in a polygon ring; a lone node is its own ring
    this.prev = this;
    this.next = this;
    // z-order curve value
    this.z = null;
    // previous and next nodes in z-order
    this.prevZ = null;
    this.nextZ = null;
    // indicates whether this is a steiner point
    this.steiner = false;
  }
}
