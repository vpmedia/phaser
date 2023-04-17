/**
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 */
export class ArraySet {
  constructor(list = []) {
    this.position = 0;
    this.list = list;
  }

  add(item) {
    if (!this.exists(item)) {
      this.list.push(item);
    }
    return item;
  }

  getIndex(item) {
    return this.list.indexOf(item);
  }

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

  exists(item) {
    return this.list.indexOf(item) > -1;
  }

  reset() {
    this.list.length = 0;
  }

  remove(item) {
    const idx = this.list.indexOf(item);
    if (idx > -1) {
      this.list.splice(idx, 1);
      return item;
    }
    return null;
  }

  setAll(key, value) {
    let i = this.list.length;
    while (i) {
      i -= 1;
      if (this.list[i]) {
        this.list[i][key] = value;
      }
    }
  }

  callAll(key, ...args) {
    let i = this.list.length;
    while (i) {
      i -= 1;
      if (this.list[i] && this.list[i][key]) {
        this.list[i][key].apply(this.list[i], args);
      }
    }
  }

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

  get total() {
    return this.list.length;
  }

  get first() {
    this.position = 0;
    if (this.list.length > 0) {
      return this.list[0];
    }
    return null;
  }

  get next() {
    if (this.position < this.list.length) {
      this.position += 1;
      return this.list[this.position];
    }
    return null;
  }
}
