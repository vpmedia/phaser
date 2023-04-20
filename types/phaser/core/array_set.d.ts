export class ArraySet {
    /**
     * TBD.
     * @param {object[]} list - TBD.
     */
    constructor(list?: object[]);
    position: number;
    list: any[];
    /**
     * TBD.
     * @param {object} item - TBD.
     * @returns {object} TBD.
     */
    add(item: object): object;
    /**
     * TBD.
     * @param {object} item - TBD.
     * @returns {number} TBD.
     */
    getIndex(item: object): number;
    /**
     * TBD.
     * @param {string} property - TBD.
     * @param {object} value - TBD.
     * @returns {object} TBD.
     */
    getByKey(property: string, value: object): object;
    /**
     * TBD.
     * @param {object} item - TBD.
     * @returns {boolean} TBD.
     */
    exists(item: object): boolean;
    /**
     * TBD.
     */
    reset(): void;
    /**
     * TBD.
     * @param {object} item - TBD.
     * @returns {object} TBD.
     */
    remove(item: object): object;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param {object} value - TBD.
     */
    setAll(key: string, value: object): void;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param {...any} args - TBD.
     */
    callAll(key: string, ...args: any[]): void;
    /**
     * TBD.
     * @param {boolean} destroy - TBD.
     */
    removeAll(destroy?: boolean): void;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get total(): number;
    /**
     * TBD.
     * @returns {object} TBD.
     */
    get first(): any;
    /**
     * TBD.
     * @returns {object} TBD.
     */
    get next(): any;
}
//# sourceMappingURL=array_set.d.ts.map