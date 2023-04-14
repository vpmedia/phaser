/**
 * TBD.
 *
 * @param {number} hex - TBD.
 * @returns {number[]} TBD.
 */
export function hex2rgb(hex: number): number[];
/**
 * TBD.
 *
 * @param {number} rgb - TBD.
 * @returns {number} TBD.
 */
export function rgb2hex(rgb: number): number;
/**
 * TBD.
 *
 * @param {number} value - TBD.
 * @returns {number} TBD.
 */
export function getNextPowerOfTwo(value: number): number;
/**
 * TBD.
 *
 * @param {number} width - TBD.
 * @param {number} height - TBD.
 * @returns {boolean} TBD.
 */
export function isPowerOfTwo(width: number, height: number): boolean;
/**
 * TBD.
 *
 * @param {number} degrees - TBD.
 * @returns {number} TBD.
 */
export function degToRad(degrees: number): number;
/**
 * TBD.
 *
 * @param {number} radians - TBD.
 * @returns {number} TBD.
 */
export function radToDeg(radians: number): number;
/**
 * TBD.
 *
 * @param {number} min - TBD.
 * @param {number} max - TBD.
 * @returns {number} TBD.
 */
export function between(min: number, max: number): number;
/**
 * TBD.
 *
 * @param {number} input - TBD.
 * @param {number} gap - TBD.
 * @param {number} start - TBD.
 * @returns {number} TBD.
 */
export function snapToCeil(input: number, gap?: number, start?: number): number;
/**
 * TBD.
 *
 * @param {number} value - TBD.
 * @param {number} min - TBD.
 * @param {number} max - TBD.
 * @returns {number} TBD.
 */
export function wrap(value: number, min: number, max: number): number;
/**
 * TBD.
 *
 * @param {number} p0 - TBD.
 * @param {number} p1 - TBD.
 * @param {number} t - TBD.
 * @returns {number} TBD.
 */
export function linear(p0: number, p1: number, t: number): number;
/**
 * TBD.
 *
 * @param {number} a - TBD.
 * @param {number} b - TBD.
 * @returns {number} TBD.
 */
export function difference(a: number, b: number): number;
/**
 * TBD.
 *
 * @param {number[]} v - TBD.
 * @param {number} k - TBD.
 * @returns {number} TBD.
 */
export function linearInterpolation(v: number[], k: number): number;
/**
 * TBD.
 *
 * @param {number} x1 - TBD.
 * @param {number} y1 - TBD.
 * @param {number} x2 - TBD.
 * @param {number} y2 - TBD.
 * @returns {number} TBD.
 */
export function distance(x1: number, y1: number, x2: number, y2: number): number;
/**
 * TBD.
 *
 * @param {number} a - TBD.
 * @param {number} b - TBD.
 * @param {number} tolerance - TBD.
 * @returns {boolean} TBD.
 */
export function within(a: number, b: number, tolerance: number): boolean;
/**
 * TBD.
 *
 * @param {number} a - TBD.
 * @param {number} r - TBD.
 * @param {number} g - TBD.
 * @param {number} b - TBD.
 * @returns {number} TBD.
 */
export function getColor32(a: number, r: number, g: number, b: number): number;
/**
 * TBD.
 *
 * @param {number} r - TBD.
 * @param {number} g - TBD.
 * @param {number} b - TBD.
 * @returns {number} TBD.
 */
export function getColor(r: number, g: number, b: number): number;
/**
 * TBD.
 *
 * @param {string} value - TBD.
 * @param {object} out - TBD.
 */
export function hexToColor(value: string, out: object): void;
/**
 * TBD.
 *
 * @param {string} value - TBD.
 * @param {object} out - TBD.
 */
export function webToColor(value: string, out: object): void;
/**
 * TBD.
 *
 * @param {number} color - TBD.
 * @returns {object} TBD.
 */
export function getRGB(color: number): object;
/**
 * TBD.
 *
 * @param {string|number} value - TBD.
 * @param {object} out - TBD.
 * @returns {object} TBD.
 */
export function valueToColor(value: string | number, out: object): object;
/**
 * TBD.
 *
 * @returns {string} TBD.
 */
export function generateID(): string;
/**
 * TBD.
 *
 * @returns {string} TBD.
 */
export function generateShaderID(): string;
/**
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 */
export const DEG_TO_RAD: number;
export const RAD_TO_DEG: number;
export const PI_2: number;
//# sourceMappingURL=math.d.ts.map