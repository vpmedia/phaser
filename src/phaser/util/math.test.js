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

describe('DEG_TO_RAD', () => {
  it('returns the correct value', () => {
    expect(DEG_TO_RAD).toBeCloseTo(Math.PI / 180);
  });
});

describe('RAD_TO_DEG', () => {
  it('returns the correct value', () => {
    expect(RAD_TO_DEG).toBeCloseTo(180 / Math.PI);
  });
});

describe('PI_2', () => {
  it('returns the correct value', () => {
    expect(PI_2).toBeCloseTo(Math.PI * 2);
  });
});

describe('getNextPowerOfTwo', () => {
  it('returns the correct power of two value for a valid input', () => {
    expect(getNextPowerOfTwo(10)).toBe(16);
  });

  it('returns the correct power of two value for an invalid input', () => {
    expect(getNextPowerOfTwo(-5)).toBe(1);
  });
});

describe('isPowerOfTwo', () => {
  it('returns true for a valid power of two value', () => {
    expect(isPowerOfTwo(8, 16)).toBe(true);
  });

  it('returns false for an invalid power of two value', () => {
    expect(isPowerOfTwo(7, 15)).toBe(false);
  });
});

describe('degToRad', () => {
  it('returns the correct radian value for a valid degree input', () => {
    expect(degToRad(90)).toBeCloseTo(Math.PI / 2);
  });

  it('returns the correct radian value for an invalid degree input', () => {
    expect(degToRad(-45)).toBeCloseTo(-0.7853);
  });
});

describe('radToDeg', () => {
  it('returns the correct degree value for a valid radian input', () => {
    expect(radToDeg(Math.PI / 2)).toBe(90);
  });

  it('returns the correct degree value for an invalid radian input', () => {
    expect(radToDeg(-Math.PI / 10)).toBe(-18);
  });
});

describe('between', () => {
  it('returns a random value within the specified range', () => {
    const min = 1;
    const max = 100;
    const result = between(min, max);
    expect(result >= min).toBe(true);
    expect(result <= max).toBe(true);
  });
});

describe('snapToCeil', () => {
  it('returns the correct snapped value for a valid input with a gap of 1', () => {
    expect(snapToCeil(3.7, 1)).toBe(4);
  });

  it('returns the correct snapped value for a valid input with a gap of 2', () => {
    expect(snapToCeil(5.3, 2)).toBe(6);
  });
});

describe('wrap', () => {
  it('returns the correct wrapped value for a valid input', () => {
    const min = 0;
    const max = 100;
    const result = wrap(150, min, max);
    expect(result >= min).toBe(true);
    expect(result <= max).toBe(true);
  });

  it('returns the correct wrapped value for an invalid input', () => {
    const min = -1;
    const max = 10;
    const result = wrap(-20, min, max);
    expect(result >= min).toBe(true);
    expect(result <= max).toBe(true);
  });
});

describe('linear', () => {
  it('returns the correct interpolated value for a valid input', () => {
    const p0 = 1;
    const p1 = 2;
    const t = 0.5;
    expect(linear(p0, p1, t)).toEqual(1.5);
  });

  it('returns the correct interpolated value for an invalid input', () => {
    const p0 = 1;
    const p1 = 2;
    const t = 2;
    expect(linear(p0, p1, t)).toEqual(3);
  });
});

describe('difference', () => {
  it('returns the correct difference value for a valid input', () => {
    expect(difference(10, 5)).toBe(5);
  });

  it('returns the correct difference value for an invalid input', () => {
    expect(difference(-10, -15)).toBe(5);
  });
});

describe('linearInterpolation', () => {
  it('returns the correct interpolated value for a valid input', () => {
    const v = [1, 2, 3];
    const k = 0.5;
    expect(linearInterpolation(v, k)).toEqual(2);
  });

  it('returns the correct interpolated value for an invalid input', () => {
    const v = [-10, -20, -30];
    const k = -1;
    expect(linearInterpolation(v, k)).toEqual(10);
  });
});

describe('distance', () => {
  it('returns the correct distance value for a valid input', () => {
    const x1 = 0;
    const y1 = 0;
    const x2 = 3;
    const y2 = 4;
    expect(distance(x1, y1, x2, y2)).toBeCloseTo(5);
  });

  it('returns the correct distance value for an invalid input', () => {
    const x1 = -10;
    const y1 = -20;
    const x2 = 100;
    const y2 = 200;
    expect(distance(x1, y1, x2, y2)).toBeCloseTo(245.967);
  });
});

describe('within', () => {
  it('returns true for a valid input within the specified tolerance', () => {
    const a = 6;
    const b = 5;
    const tolerance = 1;
    expect(within(a, b, tolerance)).toBe(true);
  });

  it('returns false for an invalid input outside the specified tolerance', () => {
    const a = -10;
    const b = -15;
    const tolerance = 0.001;
    expect(within(a, b, tolerance)).toBe(false);
  });
});
