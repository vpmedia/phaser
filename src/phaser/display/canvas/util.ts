import { create as createCanvas } from './pool.js';

/**
 * Creates a new HTML canvas element.
 * @param {object} parent - The parent element to append the canvas to.
 * @param {number} width - The width of the canvas.
 * @param {number} height - The height of the canvas.
 * @param {string} id - The ID to assign to the canvas.
 * @param {boolean} skipPool - Whether to skip using the canvas pool.
 * @returns {HTMLCanvasElement} The created HTML canvas element.
 */
export const create = (parent, width, height, id, skipPool) => {
  width = width || 256;
  height = height || 256;
  const canvas = skipPool ? document.createElement('canvas') : createCanvas(parent, width, height);
  if (typeof id === 'string' && id !== '') {
    canvas.id = id;
  }
  canvas.width = width;
  canvas.height = height;
  canvas.style.display = 'block';
  return canvas;
};

/**
 * Sets the background color of a canvas element.
 * @param {HTMLCanvasElement} canvas - The canvas element to modify.
 * @param {string} color - The background color to set.
 * @returns {HTMLCanvasElement} The modified canvas element.
 */
export const setBackgroundColor = (canvas, color) => {
  color = color || 'rgb(0,0,0)';
  canvas.style.backgroundColor = color;
  return canvas;
};

/**
 * Sets the touch action property of a canvas element.
 * @param {HTMLCanvasElement} canvas - The canvas element to modify.
 * @param {string} value - The touch action value to set.
 * @returns {HTMLCanvasElement} The modified canvas element.
 */
export const setTouchAction = (canvas, value = 'none') => {
  value = value || 'none';
  // @ts-ignore
  canvas.style.msTouchAction = value;
  canvas.style['ms-touch-action'] = value;
  canvas.style['touch-action'] = value;
  return canvas;
};

/**
 * Sets the user select property of a canvas element.
 * @param {HTMLCanvasElement} canvas - The canvas element to modify.
 * @param {string} value - The user select value to set.
 * @returns {HTMLCanvasElement} The modified canvas element.
 */
export const setUserSelect = (canvas, value = 'none') => {
  value = value || 'none';
  canvas.style['-webkit-touch-callout'] = value;
  canvas.style['-webkit-user-select'] = value;
  canvas.style['-khtml-user-select'] = value;
  canvas.style['-moz-user-select'] = value;
  canvas.style['-ms-user-select'] = value;
  canvas.style['user-select'] = value;
  canvas.style['-webkit-tap-highlight-color'] = 'rgba(0, 0, 0, 0)';
  return canvas;
};

/**
 * Adds a canvas element to the DOM.
 * @param {HTMLCanvasElement} canvas - The canvas element to add.
 * @param {object} parent - The parent element to append the canvas to.
 * @param {boolean} overflowHidden - Whether to set overflow hidden on the parent.
 * @returns {HTMLCanvasElement} The added canvas element.
 */
export const addToDOM = (canvas, parent, overflowHidden = true) => {
  let target;
  if (parent) {
    if (typeof parent === 'string') {
      // hopefully an element ID
      target = document.getElementById(parent);
    } else if (typeof parent === 'object' && parent.nodeType === 1) {
      // quick test for a HTMLelement
      target = parent;
    }
  }
  // Fallback, covers an invalid ID and a non HTMLelement object
  if (!target) {
    target = document.body;
  }
  if (overflowHidden && target.style) {
    target.style.overflow = 'hidden';
  }
  target.appendChild(canvas);
  return canvas;
};

/**
 * Removes a canvas element from the DOM.
 * @param {HTMLCanvasElement} canvas - The canvas element to remove.
 */
export const removeFromDOM = (canvas) => {
  if (canvas && canvas.parentNode) {
    canvas.parentNode.removeChild(canvas);
  }
};

/**
 * Sets the transformation matrix on a canvas rendering context.
 * @param {CanvasRenderingContext2D} context - The canvas rendering context.
 * @param {number} translateX - The X translation value.
 * @param {number} translateY - The Y translation value.
 * @param {number} scaleX - The X scale value.
 * @param {number} scaleY - The Y scale value.
 * @param {number} skewX - The X skew value.
 * @param {number} skewY - The Y skew value.
 * @returns {CanvasRenderingContext2D} The modified rendering context.
 */
export const setTransform = (context, translateX, translateY, scaleX, scaleY, skewX, skewY) => {
  context.setTransform(scaleX, skewX, skewY, scaleY, translateX, translateY);
  return context;
};

/**
 * Gets the smoothing prefix for a canvas rendering context.
 * @param {CanvasRenderingContext2D} context - The canvas rendering context.
 * @returns {string | null} The smoothing property name or null if not found.
 */
export const getSmoothingPrefix = (context) => {
  const VENDORS = ['i', 'webkitI', 'msI', 'mozI', 'oI'];
  for (let i = 0; i < VENDORS.length; i += 1) {
    const s = `${VENDORS[i]}mageSmoothingEnabled`;
    if (context && context[s]) {
      return s;
    }
  }
  return null;
};

/**
 * Sets the smoothing enabled property on a canvas rendering context.
 * @param {object} context - The canvas rendering context.
 * @param {number} value - The smoothing enabled value to set.
 * @returns {object} The modified rendering context.
 */
export const setSmoothingEnabled = (context, value) => {
  const s = getSmoothingPrefix(context);
  if (s) {
    context[s] = value;
  }
  return context;
};
