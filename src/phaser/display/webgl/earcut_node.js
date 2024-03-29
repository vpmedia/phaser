export class Node {
  /**
   * TBD.
   * @param {number} i - TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   */
  constructor(i, x, y) {
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
