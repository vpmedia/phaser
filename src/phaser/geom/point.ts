import { GEOM_POINT } from '../core/const.js';
import { clone, distance, rotate } from './util/point.js';

export class Point {
  public x: number;
  public y: number;
  public type: number;

  /**
   * Creates a new Point instance.
   * @param {number} x - The x coordinate of the point (default: 0).
   * @param {number} y - The y coordinate of the point (default: 0).
   */
  public constructor(x = 0, y = 0) {
    /** @type {number} */
    this.x = x;
    /** @type {number} */
    this.y = y;
    /** @type {number} */
    this.type = GEOM_POINT;
  }

  /**
   * Copies the coordinates from another point to this point.
   * @param {Point} source - The point to copy coordinates from.
   * @returns {Point} This point instance for chaining.
   */
  public copyFrom(source: Point): this {
    return this.setTo(source.x, source.y);
  }

  /**
   * Returns a new point with the x and y coordinates swapped.
   * @returns {Point} A new point instance with swapped coordinates.
   */
  public invert(): this {
    return this.setTo(this.y, this.x);
  }

  /**
   * Sets the coordinates of this point to new values.
   * @param {number} x - The new x coordinate for the point.
   * @param {number} y - The new y coordinate for the point.
   * @returns {Point} This point instance for chaining.
   */
  public setTo(x: number, y?: number): this {
    this.x = x || 0;
    this.y = y ?? (y !== 0 ? this.x : 0);
    return this;
  }

  /**
   * Sets the coordinates of this point to new values.
   * @param {number} x - The new x coordinate for the point.
   * @param {number} y - The new y coordinate for the point.
   * @returns {Point} This point instance for chaining.
   * @deprecated Use setTo instead.
   */
  public set(x: number, y: number): this {
    this.x = x || 0;
    this.y = y || (y !== 0 ? this.x : 0);
    return this;
  }

  /**
   * Adds the given x and y values to the point's coordinates.
   * @param {number} x - The amount to add to the x coordinate.
   * @param {number} y - The amount to add to the y coordinate.
   * @returns {Point} This point instance for chaining.
   */
  public add(x: number, y: number): this {
    this.x += x;
    this.y += y;
    return this;
  }

  /**
   * Subtracts the given x and y values from the point's coordinates.
   * @param {number} x - The amount to subtract from the x coordinate.
   * @param {number} y - The amount to subtract from the y coordinate.
   * @returns {Point} This point instance for chaining.
   */
  public subtract(x: number, y: number): this {
    this.x -= x;
    this.y -= y;
    return this;
  }

  /**
   * Multiplies the point's coordinates by the given x and y values.
   * @param {number} x - The amount to multiply the x coordinate by.
   * @param {number} y - The amount to multiply the y coordinate by.
   * @returns {Point} This point instance for chaining.
   */
  public multiply(x: number, y: number): this {
    this.x *= x;
    this.y *= y;
    return this;
  }

  /**
   * Divides the point's coordinates by the given x and y values.
   * @param {number} x - The amount to divide the x coordinate by.
   * @param {number} y - The amount to divide the y coordinate by.
   * @returns {Point} This point instance for chaining.
   */
  public divide(x: number, y: number): this {
    this.x /= x;
    this.y /= y;
    return this;
  }

  /**
   * Constrains the x coordinate of this point to the given range.
   * @param {number} min - The minimum value for the x coordinate.
   * @param {number} max - The maximum value for the x coordinate.
   * @returns {Point} This point instance for chaining.
   */
  public clampX(min: number, max: number): this {
    this.x = Math.max(min, Math.min(max, this.x));
    return this;
  }

  /**
   * Constrains the y coordinate of this point to the given range.
   * @param {number} min - The minimum value for the y coordinate.
   * @param {number} max - The maximum value for the y coordinate.
   * @returns {Point} This point instance for chaining.
   */
  public clampY(min: number, max: number): this {
    this.y = Math.max(min, Math.min(max, this.y));
    return this;
  }

  /**
   * Constrains both coordinates of this point to the given range.
   * @param {number} min - The minimum value for both coordinates.
   * @param {number} max - The maximum value for both coordinates.
   * @returns {Point} This point instance for chaining.
   */
  public clamp(min: number, max: number): this {
    this.x = Math.max(min, Math.min(max, this.x));
    this.y = Math.max(min, Math.min(max, this.y));
    return this;
  }

  /**
   * Creates a clone of this point.
   * @returns {Point} A new point with the same coordinates as this one.
   */
  public clone(): Point {
    return clone(this);
  }

  /**
   * Copies the coordinates of this point to another point.
   * @param {Point} dest - The point to copy coordinates to.
   * @returns {Point} The destination point.
   */
  public copyTo(dest: Point): Point {
    dest.x = this.x;
    dest.y = this.y;
    return dest;
  }

  /**
   * Calculates the distance between this point and another point.
   * @param {Point} b - The other point to calculate the distance to.
   * @returns {number} The distance between the two points.
   */
  public distance(b: Point): number {
    return distance(this, b);
  }

  /**
   * Checks if this point is equal to another point.
   * @param {Point} a - The other point to compare with.
   * @returns {boolean} True if the points have the same coordinates, false otherwise.
   */
  public equals(a: Point): boolean {
    return a.x === this.x && a.y === this.y;
  }

  /**
   * Calculates the angle between this point and another point.
   * @param {Point} a - The other point to calculate the angle to.
   * @param {boolean} asDegrees - Whether to return the result in degrees (default: false).
   * @returns {number} The angle between the two points in radians or degrees.
   */
  public angle(a: Point, asDegrees = false): number {
    if (asDegrees) {
      return (180 / Math.PI) * Math.atan2(a.y - this.y, a.x - this.x);
    }
    return Math.atan2(a.y - this.y, a.x - this.x);
  }

  /**
   * Rotates this point around another point by a given angle.
   * @param {number} x - The x coordinate of the center point to rotate around.
   * @param {number} y - The y coordinate of the center point to rotate around.
   * @param {number} angle - The angle in radians to rotate by.
   * @param {boolean} asDegrees - Whether the angle is provided in degrees (default: false).
   * @param {number | null | undefined} dist - The distance to rotate from (default: null).
   * @returns {Point} This point instance for chaining.
   */
  public rotate(
    x: number,
    y: number,
    angle: number,
    asDegrees: boolean,
    dist: number | null | undefined = null
  ): Point {
    return rotate(this, x, y, angle, asDegrees, dist);
  }

  /**
   * Calculates the magnitude (length) of this point from the origin.
   * @returns {number} The magnitude of the point.
   */
  public getMagnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * Calculates the square of the magnitude (length) of this point from the origin.
   * @returns {number} The square of the magnitude of the point.
   */
  public getMagnitudeSq(): number {
    return this.x * this.x + this.y * this.y;
  }

  /**
   * Sets the magnitude (length) of this point while preserving its direction.
   * @param {number} magnitude - The new magnitude for the point.
   * @returns {Point} This point instance for chaining.
   */
  public setMagnitude(magnitude: number): this {
    return this.normalize().multiply(magnitude, magnitude);
  }

  /**
   * Normalizes this point to have a magnitude of 1 while preserving its direction.
   * @returns {Point} This point instance for chaining.
   */
  public normalize(): this {
    if (!this.isZero()) {
      const m = this.getMagnitude();
      this.x /= m;
      this.y /= m;
    }
    return this;
  }

  /**
   * Checks if this point has zero magnitude (is at the origin).
   * @returns {boolean} True if both x and y coordinates are zero, false otherwise.
   */
  public isZero(): boolean {
    return this.x === 0 && this.y === 0;
  }

  /**
   * Calculates the dot product of this point and another point.
   * @param {Point} a - The other point to calculate the dot product with.
   * @returns {number} The dot product of the two points.
   */
  public dot(a: Point): number {
    return this.x * a.x + this.y * a.y;
  }

  /**
   * Calculates the cross product of this point and another point.
   * @param {Point} a - The other point to calculate the cross product with.
   * @returns {number} The cross product of the two points.
   */
  public cross(a: Point): number {
    return this.x * a.y - this.y * a.x;
  }

  /**
   * Returns a perpendicular point (rotated 90 degrees counter-clockwise).
   * @returns {Point} A new point that is perpendicular to this one.
   */
  public perp(): this {
    return this.setTo(-this.y, this.x);
  }

  /**
   * Returns a perpendicular point (rotated 90 degrees clockwise).
   * @returns {Point} A new point that is perpendicular to this one (rotated clockwise).
   */
  public rperp(): this {
    return this.setTo(this.y, -this.x);
  }

  /**
   * Returns a point with the same direction as this one but with y coordinate negated.
   * @returns {Point} A new point with the same x coordinate but negated y coordinate.
   */
  public normalRightHand(): this {
    return this.setTo(this.y * -1, this.x);
  }

  /**
   * Returns a new point with the x and y coordinates rounded down to the nearest integer.
   * @returns {Point} A new point with floored coordinates.
   */
  public floor(): this {
    return this.setTo(Math.floor(this.x), Math.floor(this.y));
  }

  /**
   * Returns a new point with the x and y coordinates rounded up to the nearest integer.
   * @returns {Point} A new point with ceiled coordinates.
   */
  public ceil(): this {
    return this.setTo(Math.ceil(this.x), Math.ceil(this.y));
  }

  /**
   * Returns a string representation of this point.
   * @returns {string} A string representation of the point in the format "[Point (x=value y=value)]".
   */
  public toString(): string {
    return `[{Point (x=${this.x} y=${this.y})}]`;
  }
}
