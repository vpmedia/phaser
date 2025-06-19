export const DEG_TO_RAD: number;
export const RAD_TO_DEG: number;
export const PI_2: number;
export function hex2rgb(hex: number): number[];
export function rgb2hex(rgb: number): number;
export function getNextPowerOfTwo(value: number): number;
export function isPowerOfTwo(width: number, height: number): boolean;
export function degToRad(degrees: number): number;
export function radToDeg(radians: number): number;
export function between(min: number, max: number): number;
export function snapToCeil(input: number, gap?: number, start?: number): number;
export function wrap(value: number, min: number, max: number): number;
export function linear(p0: number, p1: number, t: number): number;
export function difference(a: number, b: number): number;
export function linearInterpolation(v: number[], k: number): number;
export function distance(x1: number, y1: number, x2: number, y2: number): number;
export function within(a: number, b: number, tolerance: number): boolean;
export function getColor32(a: number, r: number, g: number, b: number): number;
export function getColor(r: number, g: number, b: number): number;
export function hexToColor(value: string, out: {
    r?: number;
    g?: number;
    b?: number;
}): void;
export function webToColor(value: string, out: {
    r?: number;
    g?: number;
    b?: number;
    a?: number;
}): void;
export function getRGB(color: number): {
    alpha: number;
    red: number;
    green: number;
    blue: number;
    a: number;
    r: number;
    g: number;
    b: number;
};
export function valueToColor(value: string | number, out: {
    a?: number;
    r?: number;
    g?: number;
    b?: number;
    rgba?: string;
    color?: number;
    color32?: number;
}): {
    a?: number;
    r?: number;
    g?: number;
    b?: number;
    rgba?: string;
    color?: number;
    color32?: number;
};
//# sourceMappingURL=math.d.ts.map