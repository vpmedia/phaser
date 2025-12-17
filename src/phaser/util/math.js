export const DEG_TO_RAD = Math.PI / 180;
export const RAD_TO_DEG = 180 / Math.PI;
export const PI_2 = Math.PI * 2;

/**
 * Converts a hexadecimal color value to RGB components.
 * @param {number} hex - The hexadecimal color value.
 * @returns {number[]} An array containing the RGB components [r, g, b].
 */
export const hex2rgb = (hex) => {
  return [((hex >> 16) & 0xff) / 255, ((hex >> 8) & 0xff) / 255, (hex & 0xff) / 255];
};

/**
 * Converts RGB components to a hexadecimal color value.
 * @param {number} rgb - The RGB components array [r, g, b].
 * @returns {number} The hexadecimal color value.
 */
export const rgb2hex = (rgb) => {
  return ((rgb[0] * 255) << 16) + ((rgb[1] * 255) << 8) + rgb[2] * 255;
};

/**
 * Gets the next power of two greater than or equal to a value.
 * @param {number} value - The input value.
 * @returns {number} The next power of two.
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
 * Checks if both width and height are powers of two.
 * @param {number} width - The width to check.
 * @param {number} height - The height to check.
 * @returns {boolean} True if both width and height are powers of two, false otherwise.
 */
export const isPowerOfTwo = (width, height) => {
  return width > 0 && (width & (width - 1)) === 0 && height > 0 && (height & (height - 1)) === 0;
};

/**
 * Converts degrees to radians.
 * @param {number} degrees - The angle in degrees.
 * @returns {number} The angle in radians.
 */
export const degToRad = (degrees) => {
  return degrees * DEG_TO_RAD;
};

/**
 * Converts radians to degrees.
 * @param {number} radians - The angle in radians.
 * @returns {number} The angle in degrees.
 */
export const radToDeg = (radians) => {
  return radians * RAD_TO_DEG;
};

/**
 * Gets a random integer between min and max (inclusive).
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {number} A random integer between min and max.
 */
export const between = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Snaps a value to the nearest multiple of gap, starting from start.
 * @param {number} input - The value to snap.
 * @param {number} gap - The gap size to snap to.
 * @param {number} start - The starting offset for snapping.
 * @returns {number} The snapped value.
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
 * Wraps a value within a range.
 * @param {number} value - The value to wrap.
 * @param {number} min - The minimum value of the range.
 * @param {number} max - The maximum value of the range.
 * @returns {number} The wrapped value.
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
 * Performs linear interpolation between two values.
 * @param {number} p0 - The first point.
 * @param {number} p1 - The second point.
 * @param {number} t - The interpolation factor (0 to 1).
 * @returns {number} The interpolated value.
 */
export const linear = (p0, p1, t) => {
  return (p1 - p0) * t + p0;
};

/**
 * Calculates the absolute difference between two numbers.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} The absolute difference between a and b.
 */
export const difference = (a, b) => {
  return Math.abs(a - b);
};

/**
 * Performs linear interpolation on an array of values.
 * @param {number[]} v - The array of values.
 * @param {number} k - The interpolation factor (0 to 1).
 * @returns {number} The interpolated value.
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
 * Calculates the distance between two points.
 * @param {number} x1 - The x-coordinate of the first point.
 * @param {number} y1 - The y-coordinate of the first point.
 * @param {number} x2 - The x-coordinate of the second point.
 * @param {number} y2 - The y-coordinate of the second point.
 * @returns {number} The distance between the two points.
 */
export const distance = (x1, y1, x2, y2) => {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Checks if two numbers are within a tolerance of each other.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @param {number} tolerance - The tolerance value.
 * @returns {boolean} True if the numbers are within tolerance, false otherwise.
 */
export const within = (a, b, tolerance) => {
  return Math.abs(a - b) <= tolerance;
};

/**
 * Creates a 32-bit color value from alpha, red, green, and blue components.
 * @param {number} a - The alpha component (0-255).
 * @param {number} r - The red component (0-255).
 * @param {number} g - The green component (0-255).
 * @param {number} b - The blue component (0-255).
 * @returns {number} The 32-bit color value.
 */
export const getColor32 = (a, r, g, b) => {
  return (a << 24) | (r << 16) | (g << 8) | b;
};

/**
 * Creates a 24-bit color value from red, green, and blue components.
 * @param {number} r - The red component (0-255).
 * @param {number} g - The green component (0-255).
 * @param {number} b - The blue component (0-255).
 * @returns {number} The 24-bit color value.
 */
export const getColor = (r, g, b) => {
  return (r << 16) | (g << 8) | b;
};

/**
 * Converts a hex color string to RGB components.
 * @param {string} value - The hex color string (e.g. "#FF0000").
 * @param {{r?: number, g?: number, b?: number}} out - The object to store the result in.
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
 * Converts a web color string (e.g. "rgb(255, 0, 0)") to RGB components with alpha.
 * @param {string} value - The web color string (e.g. "rgba(255, 0, 0, 0.5)").
 * @param {{r?: number, g?: number, b?: number, a?: number}} out - The object to store the result in.
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
 * Extracts RGB components from a 32-bit color value.
 * @param {number} color - The 32-bit color value.
 * @returns {{ alpha: number, red: number, green: number, blue: number, a: number, r: number, g: number, b: number}} An object containing the color components.
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
 * Converts a color value (string or number) to an object with various color formats.
 * @param {string|number} value - The color value (e.g. "#FF0000" or 0xFF0000).
 * @param {{a?: number, r?: number, g?: number, b?: number, rgba?: string, color?: number, color32?: number}} out - The object to store the result in.
 * @returns {{a?: number, r?: number, g?: number, b?: number, rgba?: string, color?: number, color32?: number}} The updated out object.
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
