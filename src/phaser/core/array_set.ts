export class ArraySet {
  public position = 0;
  public list: any[];

  /**
   * TBD.
   * @param {object[]} list - TBD.
   */
  public constructor(list: any[] = []) {
    this.list = list;
  }

  /**
   * TBD.
   * @param {object} item - TBD.
   * @returns {object} TBD.
   */
  public add(item: any) {
    if (!this.exists(item)) {
      this.list.push(item);
    }
    return item;
  }

  /**
   * TBD.
   * @param {object} item - TBD.
   * @returns {number} TBD.
   */
  public getIndex(item: any): number {
    return this.list.indexOf(item);
  }

  /**
   * TBD.
   * @param {string} property - TBD.
   * @param {object} value - TBD.
   * @returns {object} TBD.
   */
  public getByKey(property: string, value: any) {
    let i = this.list.length;
    while (i) {
      i -= 1;
      if (this.list[i][property] === value) {
        return this.list[i];
      }
    }
    return null;
  }

  /**
   * TBD.
   * @param {object} item - TBD.
   * @returns {boolean} TBD.
   */
  public exists(item: any): boolean {
    return this.list.includes(item);
  }

  /**
   * TBD.
   */
  public reset(): void {
    this.list.length = 0;
  }

  /**
   * TBD.
   * @param {object} item - TBD.
   * @returns {object} TBD.
   */
  public remove(item: any) {
    const idx = this.list.indexOf(item);
    if (idx !== -1) {
      this.list.splice(idx, 1);
      return item;
    }
    return null;
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @param {object} value - TBD.
   */
  public setAll(key: string, value: any): void {
    let i = this.list.length;
    while (i) {
      i -= 1;
      if (this.list[i]) {
        this.list[i][key] = value;
      }
    }
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @param {...any} args - TBD.
   */
  public callAll(key: string, ...args: unknown[]): void {
    let i = this.list.length;
    while (i) {
      i -= 1;
      if (this.list[i] && this.list[i][key]) {
        this.list[i][key].apply(this.list[i], args);
      }
    }
  }

  /**
   * TBD.
   * @param {boolean} destroy - TBD.
   */
  public removeAll(destroy = false): void {
    let i = this.list.length;
    while (i) {
      i -= 1;
      if (this.list[i]) {
        const item = this.remove(this.list[i]);
        if (destroy) {
          item.destroy();
        }
      }
    }
    this.position = 0;
    this.list = [];
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  public get total(): number {
    return this.list.length;
  }

  /**
   * TBD.
   * @returns {object} TBD.
   */
  public get first() {
    this.position = 0;
    if (this.list.length > 0) {
      return this.list[0];
    }
    return null;
  }

  /**
   * TBD.
   * @returns {object} TBD.
   */
  public get next() {
    if (this.position < this.list.length) {
      this.position += 1;
      return this.list[this.position];
    }
    return null;
  }
}
