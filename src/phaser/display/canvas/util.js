/**
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @author       Mat Groves http://matgroves.com/ @Doormat23
 */
import { create as createCanvas } from './pool';

/**
 * TBD.
 *
 * @param {object} parent - TBD.
 * @param {number} width - TBD.
 * @param {number} height - TBD.
 * @param {string} id - TBD.
 * @param {boolean} skipPool - TBD.
 * @returns {object} TBD.
 */
export function create(parent, width, height, id, skipPool) {
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
}

/**
 * TBD.
 *
 * @param {HTMLCanvasElement} canvas - TBD.
 * @param {string} color - TBD.
 * @returns {object} TBD.
 */
export function setBackgroundColor(canvas, color) {
  color = color || 'rgb(0,0,0)';
  canvas.style.backgroundColor = color;
  return canvas;
}

/**
 * TBD.
 *
 * @param {HTMLCanvasElement} canvas - TBD.
 * @param {string} value - TBD.
 * @returns {object} TBD.
 */
export function setTouchAction(canvas, value) {
  value = value || 'none';
  canvas.style.msTouchAction = value;
  canvas.style['ms-touch-action'] = value;
  canvas.style['touch-action'] = value;
  return canvas;
}

/**
 * TBD.
 *
 * @param {HTMLCanvasElement} canvas - TBD.
 * @param {string} value - TBD.
 * @returns {object} TBD.
 */
export function setUserSelect(canvas, value) {
  value = value || 'none';
  canvas.style['-webkit-touch-callout'] = value;
  canvas.style['-webkit-user-select'] = value;
  canvas.style['-khtml-user-select'] = value;
  canvas.style['-moz-user-select'] = value;
  canvas.style['-ms-user-select'] = value;
  canvas.style['user-select'] = value;
  canvas.style['-webkit-tap-highlight-color'] = 'rgba(0, 0, 0, 0)';
  return canvas;
}

/**
 * TBD.
 *
 * @param {HTMLCanvasElement} canvas - TBD.
 * @param {object} parent - TBD.
 * @param {boolean} overflowHidden - TBD.
 * @returns {object} TBD.
 */
export function addToDOM(canvas, parent, overflowHidden = true) {
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
}

/**
 * TBD.
 *
 * @param {HTMLCanvasElement} canvas - TBD.
 */
export function removeFromDOM(canvas) {
  if (canvas.parentNode) {
    canvas.parentNode.removeChild(canvas);
  }
}

/**
 * TBD.
 *
 * @param {object} context - TBD.
 * @param {number} translateX - TBD.
 * @param {number} translateY - TBD.
 * @param {number} scaleX - TBD.
 * @param {number} scaleY - TBD.
 * @param {number} skewX - TBD.
 * @param {number} skewY - TBD.
 * @returns {object} TBD.
 */
export function setTransform(context, translateX, translateY, scaleX, scaleY, skewX, skewY) {
  context.setTransform(scaleX, skewX, skewY, scaleY, translateX, translateY);
  return context;
}

/**
 * TBD.
 *
 * @param {object} context - TBD.
 * @returns {object} TBD.
 */
export function getSmoothingPrefix(context) {
  const VENDORS = ['i', 'webkitI', 'msI', 'mozI', 'oI'];
  for (let i = 0; i < VENDORS.length; i += 1) {
    const s = VENDORS[i] + 'mageSmoothingEnabled';
    if (context && context[s]) {
      return s;
    }
  }
  return null;
}

/**
 * TBD.
 *
 * @param {object} context - TBD.
 * @param {number} value - TBD.
 * @returns {object} TBD.
 */
export function setSmoothingEnabled(context, value) {
  const s = getSmoothingPrefix(context);
  if (s) {
    context[s] = value;
  }
  return context;
}
