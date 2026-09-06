import { getRegistry } from '../../core/registry.js';
/**
 * Gets the canvas pool array.
 * @returns {{canvas: HTMLCanvasElement, parent: object}[]} The canvas pool array.
 */
export const getPool = (): CanvasPoolEntry[] => {
  const registry = getRegistry();
  registry.CANVAS_POOL ??= [];
  return registry.CANVAS_POOL;
};

/**
 * Gets the current size of the canvas pool.
 * @returns {number} The current size of the canvas pool.
 */
export const getFirst = (): number => {
  const pool = getPool();
  for (let i = 0; i < pool.length; i += 1) {
    if (!pool[i]!.parent) {
      return i;
    }
  }
  return -1;
};

/**
 * Adds a canvas to the pool with the specified parent.
 * @param {object} parent - The parent object for the canvas.
 */
export const remove = (parent: any): void => {
  const pool = getPool();
  for (const entry of pool) {
    if (entry.parent === parent) {
      entry.parent = null;
      entry.canvas.width = 1;
      entry.canvas.height = 1;
    }
  }
};

/**
 * Removes a canvas from the pool.
 * @param {HTMLCanvasElement} canvas - The canvas to remove from the pool.
 */
export const removeByCanvas = (canvas: HTMLCanvasElement): void => {
  const pool = getPool();
  for (const entry of pool) {
    if (entry.canvas === canvas) {
      entry.parent = null;
      entry.canvas.width = 1;
      entry.canvas.height = 1;
    }
  }
};

/**
 * Gets the total count of canvases in the pool.
 * @returns {number} The total count of canvases in the pool.
 */
export const getTotal = (): number => {
  const pool = getPool();
  let c = 0;
  for (const entry of pool) {
    if (entry.parent) {
      c += 1;
    }
  }
  return c;
};

/**
 * Gets the number of free canvases in the pool.
 * @returns {number} The number of free canvases in the pool.
 */
export const getFree = (): number => {
  const pool = getPool();
  let c = 0;
  for (const entry of pool) {
    if (!entry.parent) {
      c += 1;
    }
  }
  return c;
};

/**
 * Gets a canvas from the pool or creates a new one.
 * @param {object} parent - The parent object for the canvas.
 * @param {number} [width] - Optional width of the canvas.
 * @param {number} [height] - Optional height of the canvas.
 * @param {boolean} skipPool - True to skip using the pool and create a new canvas.
 * @returns {HTMLCanvasElement} The canvas from the pool or a newly created one.
 */
export const create = (parent: any, width?: any, height?: any, skipPool = false): HTMLCanvasElement => {
  if (parent === undefined) {
    console.warn('Created CanvasPool element with undefined parent.');
  }
  const idx = getFirst();
  const pool = getPool();
  let canvas;
  if (idx === -1 || skipPool) {
    const container = {
      parent,
      canvas: document.createElement('canvas'),
    };
    pool.push(container);
    canvas = container.canvas;
  } else {
    const entry = pool[idx]!;
    entry.parent = parent;
    canvas = entry.canvas;
  }
  if (width !== undefined) {
    canvas.width = width;
    canvas.height = height;
  }
  return canvas;
};
