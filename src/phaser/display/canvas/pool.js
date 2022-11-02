/**
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @author       Mat Groves http://matgroves.com/ @Doormat23
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 */

/**
 *
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
 *
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
 *
 * @param parent
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
 *
 * @param canvas
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
 *
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
 *
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
 *
 * @param parent
 * @param width
 * @param height
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
