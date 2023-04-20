export class ArraySet {
    /**
     * TBD.
     * @param list - TBD.
     */
    constructor(list?: any[]);
    position: number;
    list: any[];
    /**
     * TBD.
     * @param item - TBD.
     */
    add(item: any): any;
    /**
     * TBD.
     * @param item - TBD.
     */
    getIndex(item: any): number;
    /**
     * TBD.
     * @param property - TBD.
     * @param value - TBD.
     */
    getByKey(property: any, value: any): any;
    /**
     * TBD.
     * @param item - TBD.
     */
    exists(item: any): boolean;
    /**
     * TBD.
     */
    reset(): void;
    /**
     * TBD.
     * @param item - TBD.
     */
    remove(item: any): any;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param value - TBD.
     */
    setAll(key: string, value: any): void;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param {...any} args - TBD.
     */
    callAll(key: string, ...args: any[]): void;
    /**
     * TBD.
     * @param destroy - TBD.
     */
    removeAll(destroy?: boolean): void;
    /**
     * TBD.
     */
    get total(): number;
    /**
     * TBD.
     */
    get first(): any;
    /**
     * TBD.
     */
    get next(): any;
}
//# sourceMappingURL=array_set.d.ts.map