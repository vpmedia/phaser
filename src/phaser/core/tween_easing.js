/**
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 */

/**
 * TBD.
 *
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export function LinearNone(k) {
  return k;
}

/**
 * TBD.
 *
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export function QuadraticIn(k) {
  return k * k;
}

/**
 * TBD.
 *
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export function QuadraticOut(k) {
  return k * (2 - k);
}

/**
 * TBD.
 *
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export function QuadraticInOut(k) {
  if ((k *= 2) < 1) return 0.5 * k * k;
  return -0.5 * (--k * (k - 2) - 1);
}

/**
 * TBD.
 *
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export function CubicIn(k) {
  return k * k * k;
}

/**
 * TBD.
 *
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export function CubicOut(k) {
  return --k * k * k + 1;
}

/**
 * TBD.
 *
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export function CubicInOut(k) {
  if ((k *= 2) < 1) return 0.5 * k * k * k;
  return 0.5 * ((k -= 2) * k * k + 2);
}

/**
 * TBD.
 *
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export function QuarticIn(k) {
  return k * k * k * k;
}

/**
 * TBD.
 *
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export function QuarticOut(k) {
  return 1 - --k * k * k * k;
}

/**
 * TBD.
 *
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export function QuarticInOut(k) {
  if ((k *= 2) < 1) return 0.5 * k * k * k * k;
  return -0.5 * ((k -= 2) * k * k * k - 2);
}

/**
 * TBD.
 *
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export function QuinticIn(k) {
  return k * k * k * k * k;
}

/**
 * TBD.
 *
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export function QuinticOut(k) {
  return --k * k * k * k * k + 1;
}

/**
 * TBD.
 *
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export function QuinticInOut(k) {
  if ((k *= 2) < 1) return 0.5 * k * k * k * k * k;
  return 0.5 * ((k -= 2) * k * k * k * k + 2);
}

/**
 * TBD.
 *
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export function SinusoidalIn(k) {
  if (k === 0) return 0;
  if (k === 1) return 1;
  return 1 - Math.cos((k * Math.PI) / 2);
}

/**
 * TBD.
 *
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export function SinusoidalOut(k) {
  if (k === 0) return 0;
  if (k === 1) return 1;
  return Math.sin((k * Math.PI) / 2);
}

/**
 * TBD.
 *
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export function SinusoidalInOut(k) {
  if (k === 0) return 0;
  if (k === 1) return 1;
  return 0.5 * (1 - Math.cos(Math.PI * k));
}

/**
 * TBD.
 *
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export function ExponentialIn(k) {
  return k === 0 ? 0 : Math.pow(1024, k - 1);
}

/**
 * TBD.
 *
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export function ExponentialOut(k) {
  return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
}

/**
 * TBD.
 *
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export function ExponentialInOut(k) {
  if (k === 0) return 0;
  if (k === 1) return 1;
  if ((k *= 2) < 1) return 0.5 * Math.pow(1024, k - 1);
  return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
}

/**
 * TBD.
 *
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export function CircularIn(k) {
  return 1 - Math.sqrt(1 - k * k);
}

/**
 * TBD.
 *
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export function CircularOut(k) {
  return Math.sqrt(1 - --k * k);
}

/**
 * TBD.
 *
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export function CircularInOut(k) {
  if ((k *= 2) < 1) return -0.5 * (Math.sqrt(1 - k * k) - 1);
  return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
}

/**
 * TBD.
 *
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export function ElasticIn(k) {
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
}

/**
 * TBD.
 *
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export function ElasticOut(k) {
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
}

/**
 * TBD.
 *
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export function ElasticInOut(k) {
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
  if ((k *= 2) < 1)
    return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin(((k - s) * (2 * Math.PI)) / p));
  return a * Math.pow(2, -10 * (k -= 1)) * Math.sin(((k - s) * (2 * Math.PI)) / p) * 0.5 + 1;
}

/**
 * TBD.
 *
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export function BackIn(k) {
  const s = 1.70158;
  return k * k * ((s + 1) * k - s);
}

/**
 * TBD.
 *
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export function BackOut(k) {
  const s = 1.70158;
  return --k * k * ((s + 1) * k + s) + 1;
}

/**
 * TBD.
 *
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export function BackInOut(k) {
  const s = 1.70158 * 1.525;
  if ((k *= 2) < 1) return 0.5 * (k * k * ((s + 1) * k - s));
  return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
}

/**
 * TBD.
 *
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export function BounceOut(k) {
  if (k < 1 / 2.75) {
    return 7.5625 * k * k;
  } else if (k < 2 / 2.75) {
    return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
  } else if (k < 2.5 / 2.75) {
    return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
  }
  return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
}

/**
 * TBD.
 *
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export function BounceIn(k) {
  return 1 - BounceOut(1 - k);
}

/**
 * TBD.
 *
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export function BounceInOut(k) {
  if (k < 0.5) return BounceIn(k * 2) * 0.5;
  return BounceOut(k * 2 - 1) * 0.5 + 0.5;
}
