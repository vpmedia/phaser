export class ArraySet {
  /**
   * TBD.
   * @param list - TBD.
   */
  constructor(list = []) {
    this.position = 0;
    this.list = list;
  }

  /**
   * TBD.
   * @param item - TBD.
   */
  add(item) {
    if (!this.exists(item)) {
      this.list.push(item);
    }
    return item;
  }

  /**
   * TBD.
   * @param item - TBD.
   */
  getIndex(item) {
    return this.list.indexOf(item);
  }

  /**
   * TBD.
   * @param property - TBD.
   * @param value - TBD.
   */
  getByKey(property, value) {
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
   * @param item - TBD.
   */
  exists(item) {
    return this.list.indexOf(item) > -1;
  }

  /**
   * TBD.
   */
  reset() {
    this.list.length = 0;
  }

  /**
   * TBD.
   * @param item - TBD.
   */
  remove(item) {
    const idx = this.list.indexOf(item);
    if (idx > -1) {
      this.list.splice(idx, 1);
      return item;
    }
    return null;
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @param value - TBD.
   */
  setAll(key, value) {
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
  callAll(key, ...args) {
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
   * @param destroy - TBD.
   */
  removeAll(destroy = false) {
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
   */
  get total() {
    return this.list.length;
  }

  /**
   * TBD.
   */
  get first() {
    this.position = 0;
    if (this.list.length > 0) {
      return this.list[0];
    }
    return null;
  }

  /**
   * TBD.
   */
  get next() {
    if (this.position < this.list.length) {
      this.position += 1;
      return this.list[this.position];
    }
    return null;
  }
}
