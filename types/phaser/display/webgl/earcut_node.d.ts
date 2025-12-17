export class Node {
    /**
     * Creates a new Node instance.
     * @param {number} i - The vertice index in coordinates array.
     * @param {number} x - The x coordinate of the vertex.
     * @param {number} y - The y coordinate of the vertex.
     */
    constructor(i: number, x: number, y: number);
    i: number;
    x: number;
    y: number;
    prev: any;
    next: any;
    z: any;
    prevZ: any;
    nextZ: any;
    steiner: boolean;
}
//# sourceMappingURL=earcut_node.d.ts.map