export class ArraySet {
  /**
   * TBD.
   * @param {object[]} list - TBD.
   */
  constructor(list = []) {
    this.position = 0;
    this.list = list;
  }

  /**
   * TBD.
   * @param {object} item - TBD.
   * @returns {object} TBD.
   */
  add(item) {
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
  getIndex(item) {
    return this.list.indexOf(item);
  }

  /**
   * TBD.
   * @param {string} property - TBD.
   * @param {object} value - TBD.
   * @returns {object} TBD.
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
   * @param {object} item - TBD.
   * @returns {boolean} TBD.
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
   * @param {object} item - TBD.
   * @returns {object} TBD.
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
   * @param {object} value - TBD.
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
   * @param {boolean} destroy - TBD.
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
   * @returns {number} TBD.
   */
  get total() {
    return this.list.length;
  }

  /**
   * TBD.
   * @returns {object} TBD.
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
   * @returns {object} TBD.
   */
  get next() {
    if (this.position < this.list.length) {
      this.position += 1;
      return this.list[this.position];
    }
    return null;
  }
}
