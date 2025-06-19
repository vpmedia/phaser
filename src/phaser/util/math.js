export const DEG_TO_RAD = Math.PI / 180;
export const RAD_TO_DEG = 180 / Math.PI;
export const PI_2 = Math.PI * 2;

/**
 * TBD.
 * @param {number} hex - TBD.
 * @returns {number[]} TBD.
 */
export const hex2rgb = (hex) => {
  return [((hex >> 16) & 0xff) / 255, ((hex >> 8) & 0xff) / 255, (hex & 0xff) / 255];
};

/**
 * TBD.
 * @param {number} rgb - TBD.
 * @returns {number} TBD.
 */
export const rgb2hex = (rgb) => {
  return ((rgb[0] * 255) << 16) + ((rgb[1] * 255) << 8) + rgb[2] * 255;
};

/**
 * TBD.
 * @param {number} value - TBD.
 * @returns {number} TBD.
 */
export const getNextPowerOfTwo = (value) => {
  // see: https://en.wikipedia.org/wiki/Power_of_two#Fast_algorithm_to_check_if_a_positive_number_is_a_power_of_two
  if (value > 0 && (value & (value - 1)) === 0) {
    return value;
  }
  let result = 1;
  while (result < value) {
    result <<= 1;
  }
  return result;
};

/**
 * TBD.
 * @param {number} width - TBD.
 * @param {number} height - TBD.
 * @returns {boolean} TBD.
 */
export const isPowerOfTwo = (width, height) => {
  return width > 0 && (width & (width - 1)) === 0 && height > 0 && (height & (height - 1)) === 0;
};

/**
 * TBD.
 * @param {number} degrees - TBD.
 * @returns {number} TBD.
 */
export const degToRad = (degrees) => {
  return degrees * DEG_TO_RAD;
};

/**
 * TBD.
 * @param {number} radians - TBD.
 * @returns {number} TBD.
 */
export const radToDeg = (radians) => {
  return radians * RAD_TO_DEG;
};

/**
 * TBD.
 * @param {number} min - TBD.
 * @param {number} max - TBD.
 * @returns {number} TBD.
 */
export const between = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * TBD.
 * @param {number} input - TBD.
 * @param {number} gap - TBD.
 * @param {number} start - TBD.
 * @returns {number} TBD.
 */
export const snapToCeil = (input, gap = 0, start = 0) => {
  if (gap === 0) {
    return input;
  }
  input -= start;
  input = gap * Math.ceil(input / gap);
  return start + input;
};

/**
 * TBD.
 * @param {number} value - TBD.
 * @param {number} min - TBD.
 * @param {number} max - TBD.
 * @returns {number} TBD.
 */
export const wrap = (value, min, max) => {
  const range = max - min;
  if (range <= 0) {
    return 0;
  }
  let result = (value - min) % range;
  if (result < 0) {
    result += range;
  }
  return result + min;
};

/**
 * TBD.
 * @param {number} p0 - TBD.
 * @param {number} p1 - TBD.
 * @param {number} t - TBD.
 * @returns {number} TBD.
 */
export const linear = (p0, p1, t) => {
  return (p1 - p0) * t + p0;
};

/**
 * TBD.
 * @param {number} a - TBD.
 * @param {number} b - TBD.
 * @returns {number} TBD.
 */
export const difference = (a, b) => {
  return Math.abs(a - b);
};

/**
 * TBD.
 * @param {number[]} v - TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const linearInterpolation = (v, k) => {
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
};

/**
 * TBD.
 * @param {number} x1 - TBD.
 * @param {number} y1 - TBD.
 * @param {number} x2 - TBD.
 * @param {number} y2 - TBD.
 * @returns {number} TBD.
 */
export const distance = (x1, y1, x2, y2) => {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * TBD.
 * @param {number} a - TBD.
 * @param {number} b - TBD.
 * @param {number} tolerance - TBD.
 * @returns {boolean} TBD.
 */
export const within = (a, b, tolerance) => {
  return Math.abs(a - b) <= tolerance;
};

/**
 * TBD.
 * @param {number} a - TBD.
 * @param {number} r - TBD.
 * @param {number} g - TBD.
 * @param {number} b - TBD.
 * @returns {number} TBD.
 */
export const getColor32 = (a, r, g, b) => {
  return (a << 24) | (r << 16) | (g << 8) | b;
};

/**
 * TBD.
 * @param {number} r - TBD.
 * @param {number} g - TBD.
 * @param {number} b - TBD.
 * @returns {number} TBD.
 */
export const getColor = (r, g, b) => {
  return (r << 16) | (g << 8) | b;
};

/**
 * TBD.
 * @param {string} value - TBD.
 * @param {{r?: number, g?: number, b?: number}} out - TBD.
 */
export const hexToColor = (value, out) => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  value = value.replace(/^(?:#|0x)?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^(?:#|0x)?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value);
  if (result) {
    out.r = Number.parseInt(result[1], 16);
    out.g = Number.parseInt(result[2], 16);
    out.b = Number.parseInt(result[3], 16);
  }
};

/**
 * TBD.
 * @param {string} value - TBD.
 * @param {{r?: number, g?: number, b?: number, a?: number}} out - TBD.
 */
export const webToColor = (value, out) => {
  const result = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?))?\s*\)$/.exec(value);
  if (result) {
    out.r = Number.parseInt(result[1], 10);
    out.g = Number.parseInt(result[2], 10);
    out.b = Number.parseInt(result[3], 10);
    out.a = result[4] !== undefined ? Number.parseFloat(result[4]) : 1;
  }
};

/**
 * TBD.
 * @param {number} color - TBD.
 * @returns {{ alpha: number, red: number, green: number, blue: number, a: number, r: number, g: number, b: number}} TBD.
 */
export const getRGB = (color) => {
  if (color > 16777215) {
    //  The color value has an alpha component
    return {
      alpha: color >>> 24,
      red: (color >> 16) & 0xff,
      green: (color >> 8) & 0xff,
      blue: color & 0xff,
      a: color >>> 24,
      r: (color >> 16) & 0xff,
      g: (color >> 8) & 0xff,
      b: color & 0xff,
    };
  }
  return {
    alpha: 255,
    red: (color >> 16) & 0xff,
    green: (color >> 8) & 0xff,
    blue: color & 0xff,
    a: 255,
    r: (color >> 16) & 0xff,
    g: (color >> 8) & 0xff,
    b: color & 0xff,
  };
};

/**
 * TBD.
 * @param {string|number} value - TBD.
 * @param {{a?: number, r?: number, g?: number, b?: number, rgba?: string, color?: number, color32?: number}} out - TBD.
 * @returns {{a?: number, r?: number, g?: number, b?: number, rgba?: string, color?: number, color32?: number}} TBD.
 */
export const valueToColor = (value, out) => {
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
  out.rgba = `rgba(${out.r.toString()},${out.g.toString()},${out.b.toString()},${out.a.toString()})`;
  out.color = getColor(out.r, out.g, out.b);
  out.color32 = getColor32(out.a * 255, out.r, out.g, out.b);
  return out;
};
