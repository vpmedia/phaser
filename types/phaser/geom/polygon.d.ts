export class Polygon {
    constructor(points?: any);
    area: number;
    _points: any[];
    closed: boolean;
    flattened: boolean;
    type: number;
    toNumberArray(output?: any[]): any[];
    flatten(): Polygon;
    clone(): Polygon;
    contains(x: any, y: any): boolean;
    setTo(points: any): Polygon;
    calculateArea(y0: any): number;
    set points(arg: any[]);
    get points(): any[];
}
//# sourceMappingURL=polygon.d.ts.map