/**
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 */
export const DEG_TO_RAD = Math.PI / 180;
export const RAD_TO_DEG = 180 / Math.PI;
export const PI_2 = Math.PI * 2;

/**
 *
 * @param {number} hex TBD
 * @returns {number[]} TBD
 */
export function hex2rgb(hex) {
  return [(hex >> 16 & 0xFF) / 255, (hex >> 8 & 0xFF) / 255, (hex & 0xFF) / 255];
}

/**
 *
 * @param {number} rgb TBD
 * @returns {number} TBD
 */
export function rgb2hex(rgb) {
  return ((rgb[0] * 255 << 16) + (rgb[1] * 255 << 8) + rgb[2] * 255);
}

/**
 *
 * @param {number} value TBD
 * @returns {number} TBD
 */
export function getNextPowerOfTwo(value) {
  // see: https://en.wikipedia.org/wiki/Power_of_two#Fast_algorithm_to_check_if_a_positive_number_is_a_power_of_two
  if (value > 0 && (value & (value - 1)) === 0) {
    return value;
  }
  let result = 1;
  while (result < value) {
    result <<= 1;
  }
  return result;
}

/**
 *
 * @param {number} width TBD
 * @param {number} height TBD
 * @returns {boolean} TBD
 */
export function isPowerOfTwo(width, height) {
  return (width > 0 && (width & (width - 1)) === 0 && height > 0 && (height & (height - 1)) === 0);
}

/**
 *
 * @param {number} degrees TBD
 * @returns {number} TBD
 */
export function degToRad(degrees) {
  return degrees * DEG_TO_RAD;
}

/**
 *
 * @param {number} radians TBD
 * @returns {number} TBD
 */
export function radToDeg(radians) {
  return radians * RAD_TO_DEG;
}

/**
 *
 * @param {number} min TBD
 * @param {number} max TBD
 * @returns {number} TBD
 */
export function between(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 *
 * @param {number} input TBD
 * @param {number} gap TBD
 * @param {number} start TBD
 * @returns {number} TBD
 */
export function snapToCeil(input, gap = 0, start = 0) {
  if (gap === 0) {
    return input;
  }
  input -= start;
  input = gap * Math.ceil(input / gap);
  return start + input;
}

/**
 *
 * @param {number} value TBD
 * @param {number} min TBD
 * @param {number} max TBD
 * @returns {number} TBD
 */
export function wrap(value, min, max) {
  const range = max - min;
  if (range <= 0) {
    return 0;
  }
  let result = (value - min) % range;
  if (result < 0) {
    result += range;
  }
  return result + min;
}

/**
 *
 * @param {number} p0 TBD
 * @param {number} p1 TBD
 * @param {number} t TBD
 * @returns {number} TBD
 */
export function linear(p0, p1, t) {
  return (p1 - p0) * t + p0;
}

/**
 *
 * @param {number} a TBD
 * @param {number} b TBD
 * @returns {number} TBD
 */
export function difference(a, b) {
  return Math.abs(a - b);
}

/**
 *
 * @param {number[]} v TBD
 * @param {number} k TBD
 * @returns {number} TBD
 */
export function linearInterpolation(v, k) {
  const m = v.length - 1;
  const f = m * k;
  const i = Math.floor(f);
  if (k < 0) {
    return linear(v[0], v[1], f);
  }
  if (k > 1) {
    return linear(v[m], v[m - 1], m - f);
  }
  return linear(v[i], v[i + 1 > m ? m : i + 1], f - i);
}

/**
 *
 * @param {number} x1 TBD
 * @param {number} y1 TBD
 * @param {number} x2 TBD
 * @param {number} y2 TBD
 * @returns {number} TBD
 */
export function distance(x1, y1, x2, y2) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 *
 * @param {number} a TBD
 * @param {number} b TBD
 * @param {number} tolerance TBD
 * @returns {boolean} TBD
 */
export function within(a, b, tolerance) {
  return (Math.abs(a - b) <= tolerance);
}

/**
 *
 * @param {number} a TBD
 * @param {number} r TBD
 * @param {number} g TBD
 * @param {number} b TBD
 * @returns {number} TBD
 */
export function getColor32(a, r, g, b) {
  return a << 24 | r << 16 | g << 8 | b;
}

/**
 *
 * @param {number} r TBD
 * @param {number} g TBD
 * @param {number} b TBD
 * @returns {number} TBD
 */
export function getColor(r, g, b) {
  return r << 16 | g << 8 | b;
}

/**
 *
 * @param {number} value TBD
 * @param {object} out TBD
 */
export function hexToColor(value, out) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  value = value.replace(/^(?:#|0x)?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^(?:#|0x)?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value);
  if (result) {
    out.r = parseInt(result[1], 16);
    out.g = parseInt(result[2], 16);
    out.b = parseInt(result[3], 16);
  }
}

/**
 *
 * @param {number} value TBD
 * @param {object} out TBD
 */
export function webToColor(value, out) {
  const result = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?))?\s*\)$/.exec(value);
  if (result) {
    out.r = parseInt(result[1], 10);
    out.g = parseInt(result[2], 10);
    out.b = parseInt(result[3], 10);
    out.a = result[4] !== undefined ? parseFloat(result[4]) : 1;
  }
}

/**
 *
 * @param {number} color TBD
 * @returns {object} TBD
 */
export function getRGB(color) {
  if (color > 16777215) {
    //  The color value has an alpha component
    return {
      alpha: color >>> 24,
      red: color >> 16 & 0xFF,
      green: color >> 8 & 0xFF,
      blue: color & 0xFF,
      a: color >>> 24,
      r: color >> 16 & 0xFF,
      g: color >> 8 & 0xFF,
      b: color & 0xFF,
    };
  }
  return {
    alpha: 255,
    red: color >> 16 & 0xFF,
    green: color >> 8 & 0xFF,
    blue: color & 0xFF,
    a: 255,
    r: color >> 16 & 0xFF,
    g: color >> 8 & 0xFF,
    b: color & 0xFF,
  };
}

/**
 *
 * @param {number} value TBD
 * @param {object} out TBD
 * @returns {object} TBD
 */
export function valueToColor(value, out) {
  if (typeof value === 'string') {
    if (value.indexOf('rgb') === 0) {
      webToColor(value, out);
    } else {
      //  `hexToColor` does not support alpha; match `createColor`.
      out.a = 1;
      hexToColor(value, out);
    }
  } else if (typeof value === 'number') {
    //  `getRGB` does not take optional object to modify;
    //  alpha is also adjusted to match `createColor`.
    const tempColor = getRGB(value);
    out.r = tempColor.r;
    out.g = tempColor.g;
    out.b = tempColor.b;
    out.a = tempColor.a / 255;
  }
  out.rgba = 'rgba(' + out.r.toString() + ',' + out.g.toString() + ',' + out.b.toString() + ',' + out.a.toString() + ')';
  out.color = getColor(out.r, out.g, out.b);
  out.color32 = getColor32(out.a * 255, out.r, out.g, out.b);
  return out;

}
