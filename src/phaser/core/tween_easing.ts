/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const LinearNone = (k: number): number => k;

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const QuadraticIn = (k: number): number => k * k;

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const QuadraticOut = (k: number): number => k * (2 - k);

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const QuadraticInOut = (k: number): number => {
  const t = k * 2;
  if (t < 1) {
    return 0.5 * t * t;
  }
  const u = t - 1;
  return -0.5 * (u * (u - 2) - 1);
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const CubicIn = (k: number): number => k * k * k;

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const CubicOut = (k: number): number => {
  const u = k - 1;
  return u * u * u + 1;
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const CubicInOut = (k: number): number => {
  const t = k * 2;
  if (t < 1) {
    return 0.5 * t * t * t;
  }
  const u = t - 2;
  return 0.5 * (u * u * u + 2);
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const QuarticIn = (k: number): number => k * k * k * k;

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const QuarticOut = (k: number): number => {
  const u = k - 1;
  return 1 - u * u * u * u;
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const QuarticInOut = (k: number): number => {
  const t = k * 2;
  if (t < 1) {
    return 0.5 * t * t * t * t;
  }
  const u = t - 2;
  return -0.5 * (u * u * u * u - 2);
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const QuinticIn = (k: number): number => k * k * k * k * k;

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const QuinticOut = (k: number): number => {
  const u = k - 1;
  return u * u * u * u * u + 1;
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const QuinticInOut = (k: number): number => {
  const t = k * 2;
  if (t < 1) {
    return 0.5 * t * t * t * t * t;
  }
  const u = t - 2;
  return 0.5 * (u * u * u * u * u + 2);
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const SinusoidalIn = (k: number): number => {
  if (k === 0) {
    return 0;
  }
  if (k === 1) {
    return 1;
  }
  return 1 - Math.cos((k * Math.PI) / 2);
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const SinusoidalOut = (k: number): number => {
  if (k === 0) {
    return 0;
  }
  if (k === 1) {
    return 1;
  }
  return Math.sin((k * Math.PI) / 2);
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const SinusoidalInOut = (k: number): number => {
  if (k === 0) {
    return 0;
  }
  if (k === 1) {
    return 1;
  }
  return 0.5 * (1 - Math.cos(Math.PI * k));
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const ExponentialIn = (k: number): number => (k === 0 ? 0 : 1024 ** (k - 1));

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const ExponentialOut = (k: number): number => (k === 1 ? 1 : 1 - 2 ** (-10 * k));

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const ExponentialInOut = (k: number): number => {
  if (k === 0) {
    return 0;
  }
  if (k === 1) {
    return 1;
  }
  const t = k * 2;
  if (t < 1) {
    return 0.5 * 1024 ** (t - 1);
  }
  return 0.5 * (-(2 ** (-10 * (t - 1))) + 2);
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const CircularIn = (k: number): number => 1 - Math.sqrt(1 - k * k);

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const CircularOut = (k: number): number => {
  const u = k - 1;
  return Math.sqrt(1 - u * u);
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const CircularInOut = (k: number): number => {
  const t = k * 2;
  if (t < 1) {
    return -0.5 * (Math.sqrt(1 - t * t) - 1);
  }
  const u = t - 2;
  return 0.5 * (Math.sqrt(1 - u * u) + 1);
};

const ELASTIC_AMPLITUDE = 1;
const ELASTIC_PERIOD = 0.4;
const ELASTIC_PHASE = ELASTIC_PERIOD / 4;

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const ElasticIn = (k: number): number => {
  if (k === 0) {
    return 0;
  }
  if (k === 1) {
    return 1;
  }
  const u = k - 1;
  return -(ELASTIC_AMPLITUDE * 2 ** (10 * u) * Math.sin(((u - ELASTIC_PHASE) * (2 * Math.PI)) / ELASTIC_PERIOD));
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const ElasticOut = (k: number): number => {
  if (k === 0) {
    return 0;
  }
  if (k === 1) {
    return 1;
  }
  return ELASTIC_AMPLITUDE * 2 ** (-10 * k) * Math.sin(((k - ELASTIC_PHASE) * (2 * Math.PI)) / ELASTIC_PERIOD) + 1;
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const ElasticInOut = (k: number): number => {
  if (k === 0) {
    return 0;
  }
  if (k === 1) {
    return 1;
  }
  const t = k * 2;
  const u = t - 1;
  const oscillation = Math.sin(((u - ELASTIC_PHASE) * (2 * Math.PI)) / ELASTIC_PERIOD);
  if (t < 1) {
    return -0.5 * (ELASTIC_AMPLITUDE * 2 ** (10 * u) * oscillation);
  }
  return ELASTIC_AMPLITUDE * 2 ** (-10 * u) * oscillation * 0.5 + 1;
};

const BACK_OVERSHOOT = 1.70158;
const BACK_OVERSHOOT_IN_OUT = BACK_OVERSHOOT * 1.525;

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const BackIn = (k: number): number => k * k * ((BACK_OVERSHOOT + 1) * k - BACK_OVERSHOOT);

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const BackOut = (k: number): number => {
  const u = k - 1;
  return u * u * ((BACK_OVERSHOOT + 1) * u + BACK_OVERSHOOT) + 1;
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const BackInOut = (k: number): number => {
  const t = k * 2;
  if (t < 1) {
    return 0.5 * (t * t * ((BACK_OVERSHOOT_IN_OUT + 1) * t - BACK_OVERSHOOT_IN_OUT));
  }
  const u = t - 2;
  return 0.5 * (u * u * ((BACK_OVERSHOOT_IN_OUT + 1) * u + BACK_OVERSHOOT_IN_OUT) + 2);
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const BounceOut = (k: number): number => {
  if (k < 1 / 2.75) {
    return 7.5625 * k * k;
  }
  if (k < 2 / 2.75) {
    const u = k - 1.5 / 2.75;
    return 7.5625 * u * u + 0.75;
  }
  if (k < 2.5 / 2.75) {
    const u = k - 2.25 / 2.75;
    return 7.5625 * u * u + 0.9375;
  }
  const u = k - 2.625 / 2.75;
  return 7.5625 * u * u + 0.984375;
};

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const BounceIn = (k: number): number => 1 - BounceOut(1 - k);

/**
 * TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export const BounceInOut = (k: number): number => {
  if (k < 0.5) {
    return BounceIn(k * 2) * 0.5;
  }
  return BounceOut(k * 2 - 1) * 0.5 + 0.5;
};
