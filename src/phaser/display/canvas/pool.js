/**
 * TBD.
 * @returns {object[]} TBD.
 */
export function getPool() {
  if (!window.PhaserRegistry) {
    window.PhaserRegistry = {};
  }
  if (!window.PhaserRegistry.CANVAS_POOL) {
    window.PhaserRegistry.CANVAS_POOL = [];
  }
  return window.PhaserRegistry.CANVAS_POOL;
}

/**
 * TBD.
 * @returns {object} TBD.
 */
export function getFirst() {
  const pool = getPool();
  for (let i = 0; i < pool.length; i += 1) {
    if (!pool[i].parent) {
      return i;
    }
  }
  return -1;
}

/**
 * TBD.
 * @param {object} parent - TBD.
 */
export function remove(parent) {
  const pool = getPool();
  for (let i = 0; i < pool.length; i += 1) {
    if (pool[i].parent === parent) {
      pool[i].parent = null;
      pool[i].canvas.width = 1;
      pool[i].canvas.height = 1;
    }
  }
}

/**
 * TBD.
 * @param {HTMLCanvasElement} canvas - TBD.
 */
export function removeByCanvas(canvas) {
  const pool = getPool();
  for (let i = 0; i < pool.length; i += 1) {
    if (pool[i].canvas === canvas) {
      pool[i].parent = null;
      pool[i].canvas.width = 1;
      pool[i].canvas.height = 1;
    }
  }
}

/**
 * TBD.
 * @returns {number} TBD.
 */
export function getTotal() {
  const pool = getPool();
  let c = 0;
  for (let i = 0; i < pool.length; i += 1) {
    if (pool[i].parent) {
      c += 1;
    }
  }
  return c;
}

/**
 * TBD.
 * @returns {number} TBD.
 */
export function getFree() {
  const pool = getPool();
  let c = 0;
  for (let i = 0; i < pool.length; i += 1) {
    if (!pool[i].parent) {
      c += 1;
    }
  }
  return c;
}

/**
 * TBD.
 * @param {object} parent - TBD.
 * @param {number} width - TBD.
 * @param {number} height - TBD.
 * @returns {HTMLCanvasElement} TBD.
 */
export function create(parent, width, height) {
  if (parent === undefined) {
    console.warn('Created CanvasPool element with undefined parent.');
  }
  const idx = getFirst();
  const pool = getPool();
  let canvas;
  if (idx === -1) {
    const container = {
      parent,
      canvas: document.createElement('canvas'),
    };
    pool.push(container);
    canvas = container.canvas;
  } else {
    pool[idx].parent = parent;
    canvas = pool[idx].canvas;
  }
  if (width !== undefined) {
    canvas.width = width;
    canvas.height = height;
  }
  return canvas;
}
