/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const LinearNone = (k) => {
  return k;
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const QuadraticIn = (k) => {
  return k * k;
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const QuadraticOut = (k) => {
  return k * (2 - k);
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const QuadraticInOut = (k) => {
  if ((k *= 2) < 1) return 0.5 * k * k;
  return -0.5 * (--k * (k - 2) - 1);
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const CubicIn = (k) => {
  return k * k * k;
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const CubicOut = (k) => {
  return --k * k * k + 1;
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const CubicInOut = (k) => {
  if ((k *= 2) < 1) return 0.5 * k * k * k;
  return 0.5 * ((k -= 2) * k * k + 2);
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const QuarticIn = (k) => {
  return k * k * k * k;
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const QuarticOut = (k) => {
  return 1 - --k * k * k * k;
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const QuarticInOut = (k) => {
  if ((k *= 2) < 1) return 0.5 * k * k * k * k;
  return -0.5 * ((k -= 2) * k * k * k - 2);
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const QuinticIn = (k) => {
  return k * k * k * k * k;
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const QuinticOut = (k) => {
  return --k * k * k * k * k + 1;
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const QuinticInOut = (k) => {
  if ((k *= 2) < 1) return 0.5 * k * k * k * k * k;
  return 0.5 * ((k -= 2) * k * k * k * k + 2);
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const SinusoidalIn = (k) => {
  if (k === 0) return 0;
  if (k === 1) return 1;
  return 1 - Math.cos((k * Math.PI) / 2);
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const SinusoidalOut = (k) => {
  if (k === 0) return 0;
  if (k === 1) return 1;
  return Math.sin((k * Math.PI) / 2);
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const SinusoidalInOut = (k) => {
  if (k === 0) return 0;
  if (k === 1) return 1;
  return 0.5 * (1 - Math.cos(Math.PI * k));
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const ExponentialIn = (k) => {
  return k === 0 ? 0 : Math.pow(1024, k - 1);
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const ExponentialOut = (k) => {
  return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const ExponentialInOut = (k) => {
  if (k === 0) return 0;
  if (k === 1) return 1;
  if ((k *= 2) < 1) return 0.5 * Math.pow(1024, k - 1);
  return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const CircularIn = (k) => {
  return 1 - Math.sqrt(1 - k * k);
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const CircularOut = (k) => {
  return Math.sqrt(1 - --k * k);
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const CircularInOut = (k) => {
  if ((k *= 2) < 1) return -0.5 * (Math.sqrt(1 - k * k) - 1);
  return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const ElasticIn = (k) => {
  let s;
  let a = 0.1;
  const p = 0.4;
  if (k === 0) return 0;
  if (k === 1) return 1;
  if (!a || a < 1) {
    a = 1;
    s = p / 4;
  } else {
    s = (p * Math.asin(1 / a)) / (2 * Math.PI);
  }
  return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin(((k - s) * (2 * Math.PI)) / p));
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const ElasticOut = (k) => {
  let s;
  let a = 0.1;
  const p = 0.4;
  if (k === 0) return 0;
  if (k === 1) return 1;
  if (!a || a < 1) {
    a = 1;
    s = p / 4;
  } else {
    s = (p * Math.asin(1 / a)) / (2 * Math.PI);
  }
  return a * Math.pow(2, -10 * k) * Math.sin(((k - s) * (2 * Math.PI)) / p) + 1;
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const ElasticInOut = (k) => {
  let s;
  let a = 0.1;
  const p = 0.4;
  if (k === 0) return 0;
  if (k === 1) return 1;
  if (!a || a < 1) {
    a = 1;
    s = p / 4;
  } else {
    s = (p * Math.asin(1 / a)) / (2 * Math.PI);
  }
  if ((k *= 2) < 1) return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin(((k - s) * (2 * Math.PI)) / p));
  return a * Math.pow(2, -10 * (k -= 1)) * Math.sin(((k - s) * (2 * Math.PI)) / p) * 0.5 + 1;
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const BackIn = (k) => {
  const s = 1.70158;
  return k * k * ((s + 1) * k - s);
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const BackOut = (k) => {
  const s = 1.70158;
  return --k * k * ((s + 1) * k + s) + 1;
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const BackInOut = (k) => {
  const s = 1.70158 * 1.525;
  if ((k *= 2) < 1) return 0.5 * (k * k * ((s + 1) * k - s));
  return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const BounceOut = (k) => {
  if (k < 1 / 2.75) {
    return 7.5625 * k * k;
  } else if (k < 2 / 2.75) {
    return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
  } else if (k < 2.5 / 2.75) {
    return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
  }
  return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const BounceIn = (k) => {
  return 1 - BounceOut(1 - k);
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const BounceInOut = (k) => {
  if (k < 0.5) return BounceIn(k * 2) * 0.5;
  return BounceOut(k * 2 - 1) * 0.5 + 0.5;
};
