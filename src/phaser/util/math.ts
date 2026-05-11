export const DEG_TO_RAD = Math.PI / 180;
export const RAD_TO_DEG = 180 / Math.PI;
export const PI_2 = Math.PI * 2;

export interface ColorTarget {
  r?: number;
  g?: number;
  b?: number;
  a?: number;
  rgba?: string;
  color?: number;
  color32?: number;
}

export interface ColorComponents {
  alpha: number;
  red: number;
  green: number;
  blue: number;
  a: number;
  r: number;
  g: number;
  b: number;
}

/** Converts a hexadecimal color value to RGB components. */
export const hex2rgb = (hex: number): [number, number, number] => {
  return [((hex >> 16) & 0xff) / 255, ((hex >> 8) & 0xff) / 255, (hex & 0xff) / 255];
};

/** Converts RGB components to a hexadecimal color value. */
export const rgb2hex = (rgb: number[]): number => {
  return ((rgb[0] * 255) << 16) + ((rgb[1] * 255) << 8) + rgb[2] * 255;
};

/** Gets the next power of two greater than or equal to a value. */
export const getNextPowerOfTwo = (value: number): number => {
  if (value > 0 && (value & (value - 1)) === 0) {
    return value;
  }
  let result = 1;
  while (result < value) {
    result <<= 1;
  }
  return result;
};

/** Checks if both width and height are powers of two. */
export const isPowerOfTwo = (width: number, height: number): boolean => {
  return width > 0 && (width & (width - 1)) === 0 && height > 0 && (height & (height - 1)) === 0;
};

/** Converts degrees to radians. */
export const degToRad = (degrees: number): number => {
  return degrees * DEG_TO_RAD;
};

/** Converts radians to degrees. */
export const radToDeg = (radians: number): number => {
  return radians * RAD_TO_DEG;
};

/** Gets a random integer between min and max (inclusive). */
export const between = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/** Snaps a value to the nearest multiple of gap, starting from start. */
export const snapToCeil = (input: number, gap: number = 0, start: number = 0): number => {
  if (gap === 0) {
    return input;
  }
  input -= start;
  input = gap * Math.ceil(input / gap);
  return start + input;
};

/** Wraps a value within a range. */
export const wrap = (value: number, min: number, max: number): number => {
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

/** Performs linear interpolation between two values. */
export const linear = (p0: number, p1: number, t: number): number => {
  return (p1 - p0) * t + p0;
};

/** Calculates the absolute difference between two numbers. */
export const difference = (a: number, b: number): number => {
  return Math.abs(a - b);
};

/** Performs linear interpolation on an array of values. */
export const linearInterpolation = (v: number[], k: number): number => {
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

/** Calculates the distance between two points. */
export const distance = (x1: number, y1: number, x2: number, y2: number): number => {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
};

/** Checks if two numbers are within a tolerance of each other. */
export const within = (a: number, b: number, tolerance: number): boolean => {
  return Math.abs(a - b) <= tolerance;
};

/** Creates a 32-bit color value from alpha, red, green, and blue components. */
export const getColor32 = (a: number, r: number, g: number, b: number): number => {
  return (a << 24) | (r << 16) | (g << 8) | b;
};

/** Creates a 24-bit color value from red, green, and blue components. */
export const getColor = (r: number, g: number, b: number): number => {
  return (r << 16) | (g << 8) | b;
};

/** Converts a hex color string to RGB components. */
export const hexToColor = (value: string, out: ColorTarget): void => {
  value = value.replace(/^(?:#|0x)?([a-f\d])([a-f\d])([a-f\d])$/i, (_m, r, g, b) => r + r + g + g + b + b);
  const result = /^(?:#|0x)?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value);
  if (result) {
    out.r = Number.parseInt(result[1], 16);
    out.g = Number.parseInt(result[2], 16);
    out.b = Number.parseInt(result[3], 16);
  }
};

/** Converts a web color string (e.g. "rgb(255, 0, 0)") to RGB components with alpha. */
export const webToColor = (value: string, out: ColorTarget): void => {
  const result = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?))?\s*\)$/.exec(value);
  if (result) {
    out.r = Number.parseInt(result[1], 10);
    out.g = Number.parseInt(result[2], 10);
    out.b = Number.parseInt(result[3], 10);
    out.a = result[4] !== undefined ? Number.parseFloat(result[4]) : 1;
  }
};

/** Extracts RGB components from a 32-bit color value. */
export const getRGB = (color: number): ColorComponents => {
  if (color > 16777215) {
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

/** Converts a color value (string or number) to an object with various color formats. */
export const valueToColor = (value: string | number, out: ColorTarget): ColorTarget => {
  if (typeof value === 'string') {
    if (value.indexOf('rgb') === 0) {
      webToColor(value, out);
    } else {
      out.a = 1;
      hexToColor(value, out);
    }
  } else if (typeof value === 'number') {
    const tempColor = getRGB(value);
    out.r = tempColor.r;
    out.g = tempColor.g;
    out.b = tempColor.b;
    out.a = tempColor.a / 255;
  }
  out.rgba = `rgba(${out.r!.toString()},${out.g!.toString()},${out.b!.toString()},${out.a!.toString()})`;
  out.color = getColor(out.r!, out.g!, out.b!);
  out.color32 = getColor32(out.a! * 255, out.r!, out.g!, out.b!);
  return out;
};
