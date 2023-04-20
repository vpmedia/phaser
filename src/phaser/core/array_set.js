export class ArraySet {
  /**
   * TBD.
   * @param list
   */
  constructor(list = []) {
    this.position = 0;
    this.list = list;
  }

  /**
   * TBD.
   * @param item
   */
  add(item) {
    if (!this.exists(item)) {
      this.list.push(item);
    }
    return item;
  }

  /**
   * TBD.
   * @param item
   */
  getIndex(item) {
    return this.list.indexOf(item);
  }

  /**
   * TBD.
   * @param property
   * @param value
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
   * @param item
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
   * @param item
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
   * @param value
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
   * @param {...any} args
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
   * @param destroy
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
