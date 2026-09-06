import { expect, describe, it } from 'vitest';
import {
  between,
  DEG_TO_RAD,
  degToRad,
  difference,
  distance,
  getNextPowerOfTwo,
  isPowerOfTwo,
  linear,
  linearInterpolation,
  PI_2,
  RAD_TO_DEG,
  radToDeg,
  snapToCeil,
  within,
  wrap,
} from './math.js';

describe('DEG_TO_RAD', (): void => {
  it('returns the correct value', (): void => {
    expect(DEG_TO_RAD).toBeCloseTo(Math.PI / 180);
  });
});

describe('RAD_TO_DEG', (): void => {
  it('returns the correct value', (): void => {
    expect(RAD_TO_DEG).toBeCloseTo(180 / Math.PI);
  });
});

describe('PI_2', (): void => {
  it('returns the correct value', (): void => {
    expect(PI_2).toBeCloseTo(Math.PI * 2);
  });
});

describe('getNextPowerOfTwo', (): void => {
  it('returns the correct power of two value for a valid input', (): void => {
    expect(getNextPowerOfTwo(10)).toBe(16);
  });

  it('returns the correct power of two value for an invalid input', (): void => {
    expect(getNextPowerOfTwo(-5)).toBe(1);
  });
});

describe('isPowerOfTwo', (): void => {
  it('returns true for a valid power of two value', (): void => {
    expect(isPowerOfTwo(8, 16)).toBe(true);
  });

  it('returns false for an invalid power of two value', (): void => {
    expect(isPowerOfTwo(7, 15)).toBe(false);
  });
});

describe('degToRad', (): void => {
  it('returns the correct radian value for a valid degree input', (): void => {
    expect(degToRad(90)).toBeCloseTo(Math.PI / 2);
  });

  it('returns the correct radian value for an invalid degree input', (): void => {
    expect(degToRad(-45)).toBeCloseTo(-0.7853);
  });
});

describe('radToDeg', (): void => {
  it('returns the correct degree value for a valid radian input', (): void => {
    expect(radToDeg(Math.PI / 2)).toBe(90);
  });

  it('returns the correct degree value for an invalid radian input', (): void => {
    expect(radToDeg(-Math.PI / 10)).toBe(-18);
  });
});

describe('between', (): void => {
  it('returns a random value within the specified range', (): void => {
    const min = 1;
    const max = 100;
    const result = between(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });
});

describe('snapToCeil', (): void => {
  it('returns the correct snapped value for a valid input with a gap of 1', (): void => {
    expect(snapToCeil(3.7, 1)).toBe(4);
  });

  it('returns the correct snapped value for a valid input with a gap of 2', (): void => {
    expect(snapToCeil(5.3, 2)).toBe(6);
  });
});

describe('wrap', (): void => {
  it('returns the correct wrapped value for a valid input', (): void => {
    const min = 0;
    const max = 100;
    const result = wrap(150, min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });

  it('returns the correct wrapped value for an invalid input', (): void => {
    const min = -1;
    const max = 10;
    const result = wrap(-20, min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });
});

describe('linear', (): void => {
  it('returns the correct interpolated value for a valid input', (): void => {
    const p0 = 1;
    const p1 = 2;
    const t = 0.5;
    expect(linear(p0, p1, t)).toStrictEqual(1.5);
  });

  it('returns the correct interpolated value for an invalid input', (): void => {
    const p0 = 1;
    const p1 = 2;
    const t = 2;
    expect(linear(p0, p1, t)).toBe(3);
  });
});

describe('difference', (): void => {
  it('returns the correct difference value for a valid input', (): void => {
    expect(difference(10, 5)).toBe(5);
  });

  it('returns the correct difference value for an invalid input', (): void => {
    expect(difference(-10, -15)).toBe(5);
  });
});

describe('linearInterpolation', (): void => {
  it('returns the correct interpolated value for a valid input', (): void => {
    const v = [1, 2, 3];
    const k = 0.5;
    expect(linearInterpolation(v, k)).toBe(2);
  });

  it('returns the correct interpolated value for an invalid input', (): void => {
    const v = [-10, -20, -30];
    const k = -1;
    expect(linearInterpolation(v, k)).toBe(10);
  });
});

describe('distance', (): void => {
  it('returns the correct distance value for a valid input', (): void => {
    const x1 = 0;
    const y1 = 0;
    const x2 = 3;
    const y2 = 4;
    expect(distance(x1, y1, x2, y2)).toBeCloseTo(5);
  });

  it('returns the correct distance value for an invalid input', (): void => {
    const x1 = -10;
    const y1 = -20;
    const x2 = 100;
    const y2 = 200;
    expect(distance(x1, y1, x2, y2)).toBeCloseTo(245.967);
  });
});

describe('within', (): void => {
  it('returns true for a valid input within the specified tolerance', (): void => {
    const a = 6;
    const b = 5;
    const tolerance = 1;
    expect(within(a, b, tolerance)).toBe(true);
  });

  it('returns false for an invalid input outside the specified tolerance', (): void => {
    const a = -10;
    const b = -15;
    const tolerance = 0.001;
    expect(within(a, b, tolerance)).toBe(false);
  });
});
