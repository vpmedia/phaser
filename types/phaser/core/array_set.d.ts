/**
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 */
export default class _default {
    constructor(list?: any[]);
    position: number;
    list: any[];
    add(item: any): any;
    getIndex(item: any): number;
    getByKey(property: any, value: any): any;
    exists(item: any): boolean;
    reset(): void;
    remove(item: any): any;
    setAll(key: any, value: any): void;
    callAll(key: any, ...args: any[]): void;
    removeAll(destroy?: boolean): void;
    get total(): number;
    get first(): any;
    get next(): any;
}
//# sourceMappingURL=array_set.d.ts.map