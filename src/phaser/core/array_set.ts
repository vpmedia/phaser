import type { AppliedCallback } from './callback.js';

export class ArraySet<T> {
  public position = 0;
  public list: T[];

  /**
   * TBD.
   * @param {object[]} list - TBD.
   */
  public constructor(list: T[] = []) {
    this.list = list;
  }

  /**
   * TBD.
   * @param {object} item - TBD.
   * @returns {object} TBD.
   */
  public add(item: T): T {
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
  public getIndex(item: T): number {
    return this.list.indexOf(item);
  }

  /**
   * TBD.
   * @param {string} property - TBD.
   * @param {object} value - TBD.
   * @returns {object} TBD.
   */
  public getByKey(property: string, value: unknown): T | null {
    for (let i = this.list.length - 1; i >= 0; i -= 1) {
      const item = this.list[i] as Record<string, unknown> | undefined;
      if (item?.[property] === value) {
        return this.list[i]!;
      }
    }
    return null;
  }

  /**
   * TBD.
   * @param {object} item - TBD.
   * @returns {boolean} TBD.
   */
  public exists(item: T): boolean {
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
  public remove(item: T): T | null {
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
  public setAll(key: string, value: unknown): void {
    for (const item of this.list) {
      if (item !== undefined) {
        (item as Record<string, unknown>)[key] = value;
      }
    }
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @param {...any} args - TBD.
   */
  public callAll(key: string, ...args: unknown[]): void {
    // walked backwards so a callback that removes its own entry does not skip the next one
    for (let i = this.list.length - 1; i >= 0; i -= 1) {
      const item = this.list[i] as Record<string, AppliedCallback> | undefined;
      if (item?.[key]) {
        item[key](...args);
      }
    }
  }

  /**
   * TBD.
   * @param {boolean} destroy - TBD.
   */
  public removeAll(destroy = false): void {
    for (let i = this.list.length - 1; i >= 0; i -= 1) {
      const entry = this.list[i];
      if (entry !== undefined) {
        const item = this.remove(entry) as { destroy?: () => void } | null;
        if (destroy) {
          item?.destroy?.();
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
  public get first(): T | null {
    this.position = 0;
    if (this.list.length > 0) {
      return this.list[0]!;
    }
    return null;
  }

  /**
   * TBD.
   * @returns {object} TBD.
   */
  public get next(): T | null {
    if (this.position < this.list.length) {
      this.position += 1;
      return this.list[this.position] ?? null;
    }
    return null;
  }
}
