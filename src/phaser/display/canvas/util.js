/**
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @author       Mat Groves http://matgroves.com/ @Doormat23
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 */
import { create as createCanvas } from './pool';

/**
 *
 * @param parent
 * @param width
 * @param height
 * @param id
 * @param skipPool
 */
export function create(parent, width, height, id, skipPool) {
  width = width || 256;
  height = height || 256;
  const canvas = (skipPool) ? document.createElement('canvas') : createCanvas(parent, width, height);
  if (typeof id === 'string' && id !== '') {
    canvas.id = id;
  }
  canvas.width = width;
  canvas.height = height;
  canvas.style.display = 'block';
  return canvas;
}

/**
 *
 * @param canvas
 * @param color
 */
export function setBackgroundColor(canvas, color) {
  color = color || 'rgb(0,0,0)';
  canvas.style.backgroundColor = color;
  return canvas;
}

/**
 *
 * @param canvas
 * @param value
 */
export function setTouchAction(canvas, value) {
  value = value || 'none';
  canvas.style.msTouchAction = value;
  canvas.style['ms-touch-action'] = value;
  canvas.style['touch-action'] = value;
  return canvas;
}

/**
 *
 * @param canvas
 * @param value
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
 *
 * @param canvas
 * @param parent
 * @param overflowHidden
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
 *
 * @param canvas
 */
export function removeFromDOM(canvas) {
  if (canvas.parentNode) {
    canvas.parentNode.removeChild(canvas);
  }
}

/**
 *
 * @param context
 * @param translateX
 * @param translateY
 * @param scaleX
 * @param scaleY
 * @param skewX
 * @param skewY
 */
export function setTransform(context, translateX, translateY, scaleX, scaleY, skewX, skewY) {
  context.setTransform(scaleX, skewX, skewY, scaleY, translateX, translateY);
  return context;
}

/**
 *
 * @param context
 */
export function getSmoothingPrefix(context) {
  const VENDORS = ['i', 'webkitI', 'msI', 'mozI', 'oI'];
  for (let i = 0; i < VENDORS.length; i += 1) {
    const prefix = VENDORS[i];
    const s = VENDORS[prefix] + 'mageSmoothingEnabled';
    if (context && context[s]) {
      return s;
    }
  }
  return null;
}

/**
 *
 * @param context
 * @param value
 */
export function setSmoothingEnabled(context, value) {
  const s = getSmoothingPrefix(context);
  if (s) {
    context[s] = value;
  }
  return context;
}
