/**
 *
 * @param {object} parent TBD
 * @param {number} width TBD
 * @param {number} height TBD
 * @param {string} id TBD
 * @param {boolean} skipPool TBD
 * @returns {object} TBD
 */
export function create(parent: object, width: number, height: number, id: string, skipPool: boolean): object;
/**
 *
 * @param {object} canvas TBD
 * @param {string} color TBD
 * @returns {object} TBD
 */
export function setBackgroundColor(canvas: object, color: string): object;
/**
 *
 * @param {object} canvas TBD
 * @param {string} value TBD
 * @returns {object} TBD
 */
export function setTouchAction(canvas: object, value: string): object;
/**
 *
 * @param {object} canvas TBD
 * @param {string} value TBD
 * @returns {object} TBD
 */
export function setUserSelect(canvas: object, value: string): object;
/**
 *
 * @param {object} canvas TBD
 * @param {object} parent TBD
 * @param {boolean} overflowHidden TBD
 * @returns {object} TBD
 */
export function addToDOM(canvas: object, parent: object, overflowHidden?: boolean): object;
/**
 *
 * @param {object} canvas TBD
 */
export function removeFromDOM(canvas: object): void;
/**
 *
 * @param {object} context TBD
 * @param {number} translateX TBD
 * @param {number} translateY TBD
 * @param {number} scaleX TBD
 * @param {number} scaleY TBD
 * @param {number} skewX TBD
 * @param {number} skewY TBD
 * @returns {object} TBD
 */
export function setTransform(context: object, translateX: number, translateY: number, scaleX: number, scaleY: number, skewX: number, skewY: number): object;
/**
 *
 * @param {object} context TBD
 * @returns {object} TBD
 */
export function getSmoothingPrefix(context: object): object;
/**
 *
 * @param {object} context TBD
 * @param {number} value TBD
 * @returns {object} TBD
 */
export function setSmoothingEnabled(context: object, value: number): object;
//# sourceMappingURL=util.d.ts.map