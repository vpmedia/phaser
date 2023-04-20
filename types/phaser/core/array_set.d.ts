export class ArraySet {
    /**
     * TBD.
     * @param list
     */
    constructor(list?: any[]);
    position: number;
    list: any[];
    /**
     * TBD.
     * @param item
     */
    add(item: any): any;
    /**
     * TBD.
     * @param item
     */
    getIndex(item: any): number;
    /**
     * TBD.
     * @param property
     * @param value
     */
    getByKey(property: any, value: any): any;
    /**
     * TBD.
     * @param item
     */
    exists(item: any): boolean;
    /**
     * TBD.
     */
    reset(): void;
    /**
     * TBD.
     * @param item
     */
    remove(item: any): any;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param value
     */
    setAll(key: string, value: any): void;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param {...any} args
     */
    callAll(key: string, ...args: any[]): void;
    /**
     * TBD.
     * @param destroy
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