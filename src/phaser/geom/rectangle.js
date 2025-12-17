import { Point } from './point.js';
import {
  inflate,
  size,
  clone,
  contains,
  containsRect,
  equals,
  intersects,
  intersection,
  intersectsRaw,
  union,
} from './util/rectangle.js';
import {
  GEOM_RECTANGLE,
  TOP_LEFT,
  TOP_CENTER,
  TOP_RIGHT,
  LEFT_CENTER,
  CENTER,
  RIGHT_CENTER,
  BOTTOM_LEFT,
  BOTTOM_CENTER,
  BOTTOM_RIGHT,
} from '../core/const.js';

export class Rectangle {
  /**
   * Creates a new Rectangle instance.
   * @param {number} x - The x coordinate of the top-left corner of the rectangle (default: 0).
   * @param {number} y - The y coordinate of the top-left corner of the rectangle (default: 0).
   * @param {number} width - The width of the rectangle (default: 0).
   * @param {number} height - The height of the rectangle (default: 0).
   */
  constructor(x = 0, y = 0, width = 0, height = 0) {
    /** @type {number} */
    this.x = x;
    /** @type {number} */
    this.y = y;
    /** @type {number} */
    this.width = width;
    /** @type {number} */
    this.height = height;
    /** @type {number} */
    this.type = GEOM_RECTANGLE;
  }

  /**
   * Offsets the rectangle's position by the specified amounts.
   * @param {number} dx - The amount to offset the x coordinate by.
   * @param {number} dy - The amount to offset the y coordinate by.
   * @returns {Rectangle} This rectangle instance for chaining.
   */
  offset(dx, dy) {
    this.x += dx;
    this.y += dy;
    return this;
  }

  /**
   * Offsets the rectangle's position by the specified point coordinates.
   * @param {Point} point - The point to offset the rectangle by.
   * @returns {Rectangle} This rectangle instance for chaining.
   */
  offsetPoint(point) {
    return this.offset(point.x, point.y);
  }

  /**
   * Sets the rectangle's position and size to new values.
   * @param {number} x - The new x coordinate of the top-left corner of the rectangle.
   * @param {number} y - The new y coordinate of the top-left corner of the rectangle.
   * @param {number} width - The new width of the rectangle.
   * @param {number} height - The new height of the rectangle.
   * @returns {Rectangle} This rectangle instance for chaining.
   */
  setTo(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    return this;
  }

  /**
   * Scales the rectangle's size by the specified amounts.
   * @param {number} x - The amount to scale the width by.
   * @param {number} y - The amount to scale the height by (default: x).
   * @returns {Rectangle} This rectangle instance for chaining.
   */
  scale(x, y) {
    if (y === undefined) {
      y = x;
    }
    this.width *= x;
    this.height *= y;
    return this;
  }

  /**
   * Centers the rectangle on the specified point.
   * @param {number} x - The x coordinate to center the rectangle on.
   * @param {number} y - The y coordinate to center the rectangle on.
   * @returns {Rectangle} This rectangle instance for chaining.
   */
  centerOn(x, y) {
    this.centerX = x;
    this.centerY = y;
    return this;
  }

  /**
   * Floors the x and y coordinates of the rectangle (rounds down to nearest integer).
   */
  floor() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
  }

  /**
   * Floors all coordinates of the rectangle (rounds down to nearest integer).
   */
  floorAll() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    this.width = Math.floor(this.width);
    this.height = Math.floor(this.height);
  }

  /**
   * Ceils the x and y coordinates of the rectangle (rounds up to nearest integer).
   */
  ceil() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
  }

  /**
   * Ceils all coordinates of the rectangle (rounds up to nearest integer).
   */
  ceilAll() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    this.width = Math.ceil(this.width);
    this.height = Math.ceil(this.height);
  }

  /**
   * Copies the values from another rectangle to this rectangle.
   * @param {Rectangle} source - The rectangle to copy values from.
   * @returns {Rectangle} This rectangle instance for chaining.
   */
  copyFrom(source) {
    return this.setTo(source.x, source.y, source.width, source.height);
  }

  /**
   * Copies the values of this rectangle to another rectangle.
   * @param {Rectangle} dest - The rectangle to copy values to.
   * @returns {Rectangle} The destination rectangle.
   */
  copyTo(dest) {
    dest.x = this.x;
    dest.y = this.y;
    dest.width = this.width;
    dest.height = this.height;
    return dest;
  }

  /**
   * Increases the size of the rectangle by the specified amounts.
   * @param {number} dx - The amount to increase the width by.
   * @param {number} dy - The amount to increase the height by.
   * @returns {Rectangle} This rectangle instance for chaining.
   */
  inflate(dx, dy) {
    return inflate(this, dx, dy);
  }

  /**
   * Gets the size of the rectangle as a point.
   * @param {Point} output - The point to store the size in (optional).
   * @returns {Point} The size of the rectangle as a point.
   */
  size(output) {
    return size(this, output);
  }

  /**
   * Resizes the rectangle to the specified dimensions.
   * @param {number} width - The new width of the rectangle.
   * @param {number} height - The new height of the rectangle.
   * @returns {Rectangle} This rectangle instance for chaining.
   */
  resize(width, height) {
    this.width = width;
    this.height = height;
    return this;
  }

  /**
   * Creates a clone of this rectangle.
   * @param {Rectangle} output - The rectangle to store the clone in (optional).
   * @returns {Rectangle} A new rectangle with the same values as this one.
   */
  clone(output) {
    return clone(this, output);
  }

  /**
   * Checks if the specified point is contained within this rectangle.
   * @param {number} x - The x coordinate of the point to check.
   * @param {number} y - The y coordinate of the point to check.
   * @returns {boolean} True if the point is contained within this rectangle, false otherwise.
   */
  contains(x, y) {
    return contains(this, x, y);
  }

  /**
   * Checks if the specified rectangle is fully contained within this rectangle.
   * @param {Rectangle} b - The rectangle to check if it's contained.
   * @returns {boolean} True if the rectangle is contained within this rectangle, false otherwise.
   */
  containsRect(b) {
    return containsRect(b, this);
  }

  /**
   * Checks if this rectangle is equal to another rectangle.
   * @param {Rectangle} b - The rectangle to compare with.
   * @returns {boolean} True if the rectangles have the same values, false otherwise.
   */
  equals(b) {
    return equals(this, b);
  }

  /**
   * Gets the intersection of this rectangle and another rectangle.
   * @param {Rectangle} b - The rectangle to intersect with.
   * @param {Rectangle} out - The rectangle to store the result in (optional).
   * @returns {Rectangle} The intersection of the two rectangles.
   */
  intersection(b, out) {
    return intersection(this, b, out);
  }

  /**
   * Checks if this rectangle intersects with another rectangle.
   * @param {Rectangle} b - The rectangle to check for intersection with.
   * @returns {boolean} True if the rectangles intersect, false otherwise.
   */
  intersects(b) {
    return intersects(this, b);
  }

  /**
   * Checks if this rectangle intersects with the specified bounds.
   * @param {number} left - The left boundary of the area to check for intersection.
   * @param {number} right - The right boundary of the area to check for intersection.
   * @param {number} top - The top boundary of the area to check for intersection.
   * @param {number} bottom - The bottom boundary of the area to check for intersection.
   * @param {number} tolerance - A tolerance value to use when checking (default: 0).
   * @returns {boolean} True if the rectangle intersects with the bounds, false otherwise.
   */
  intersectsRaw(left, right, top, bottom, tolerance) {
    return intersectsRaw(this, left, right, top, bottom, tolerance);
  }

  /**
   * Gets the union of this rectangle and another rectangle.
   * @param {Rectangle} b - The rectangle to union with.
   * @param {Rectangle} out - The rectangle to store the result in (optional).
   * @returns {Rectangle} The union of the two rectangles.
   */
  union(b, out) {
    return union(this, b, out);
  }

  /**
   * Gets a random point within this rectangle.
   * @param {Point} output - The point to store the result in (optional).
   * @returns {Point} A random point within this rectangle.
   */
  random(output = null) {
    const result = output || new Point();
    result.x = this.randomX;
    result.y = this.randomY;
    return result;
  }

  /**
   * Gets a point at a specific position on the rectangle.
   * @param {number} position - The position to get the point for (TOP_LEFT, TOP_CENTER, etc.).
   * @param {Point} output - The point to store the result in (optional).
   * @returns {Point} A point at the specified position on the rectangle.
   */
  getPoint(position, output = null) {
    const result = output || new Point();
    switch (position) {
      case TOP_LEFT:
        return result.setTo(this.x, this.y);
      case TOP_CENTER:
        return result.setTo(this.centerX, this.y);
      case TOP_RIGHT:
        return result.setTo(this.right, this.y);
      case LEFT_CENTER:
        return result.setTo(this.x, this.centerY);
      case CENTER:
        return result.setTo(this.centerX, this.centerY);
      case RIGHT_CENTER:
        return result.setTo(this.right, this.centerY);
      case BOTTOM_LEFT:
        return result.setTo(this.x, this.bottom);
      case BOTTOM_CENTER:
        return result.setTo(this.centerX, this.bottom);
      case BOTTOM_RIGHT:
        return result.setTo(this.right, this.bottom);
      default:
        return result.setTo(this.x, this.y);
    }
  }

  /**
   * Returns a string representation of this rectangle.
   * @returns {string} A string representation of the rectangle.
   */
  toString() {
    return `[{Rectangle (x=${this.x} y=${this.y} width=${this.width} height=${this.height} empty=${this.empty})}]`;
  }

  /**
   * Gets half the width of this rectangle.
   * @returns {number} Half the width of this rectangle.
   */
  get halfWidth() {
    return Math.round(this.width / 2);
  }

  /**
   * Gets half the height of this rectangle.
   * @returns {number} Half the height of this rectangle.
   */
  get halfHeight() {
    return Math.round(this.height / 2);
  }

  /**
   * Gets the top coordinate of this rectangle.
   * @returns {number} The top coordinate of this rectangle.
   */
  get top() {
    return this.y;
  }

  /**
   * Sets the top coordinate of this rectangle.
   */
  set top(value) {
    if (value >= this.bottom) {
      this.height = 0;
      this.y = value;
    } else {
      this.height = this.bottom - value;
    }
  }

  /**
   * Gets the top-left point of this rectangle.
   * @returns {Point} The top-left point of this rectangle.
   */
  get topLeft() {
    return new Point(this.x, this.y);
  }

  /**
   * Sets the top-left point of this rectangle.
   */
  set topLeft(value) {
    this.x = value.x;
    this.y = value.y;
  }

  /**
   * Gets the top-right point of this rectangle.
   * @returns {Point} The top-right point of this rectangle.
   */
  get topRight() {
    return new Point(this.x + this.width, this.y);
  }

  /**
   * Sets the top-right point of this rectangle.
   */
  set topRight(value) {
    this.right = value.x;
    this.y = value.y;
  }

  /**
   * Gets the bottom coordinate of this rectangle.
   * @returns {number} The bottom coordinate of this rectangle.
   */
  get bottom() {
    return this.y + this.height;
  }

  /**
   * Sets the bottom coordinate of this rectangle.
   */
  set bottom(value) {
    if (value <= this.y) {
      this.height = 0;
    } else {
      this.height = value - this.y;
    }
  }

  /**
   * Gets the bottom-left point of this rectangle.
   * @returns {Point} The bottom-left point of this rectangle.
   */
  get bottomLeft() {
    return new Point(this.x, this.bottom);
  }

  /**
   * Sets the bottom-left point of this rectangle.
   */
  set bottomLeft(value) {
    this.x = value.x;
    this.bottom = value.y;
  }

  /**
   * Gets the bottom-right point of this rectangle.
   * @returns {Point} The bottom-right point of this rectangle.
   */
  get bottomRight() {
    return new Point(this.right, this.bottom);
  }

  /**
   * Sets the bottom-right point of this rectangle.
   */
  set bottomRight(value) {
    this.right = value.x;
    this.bottom = value.y;
  }

  /**
   * Gets the left coordinate of this rectangle.
   * @returns {number} The left coordinate of this rectangle.
   */
  get left() {
    return this.x;
  }

  /**
   * Sets the left coordinate of this rectangle.
   */
  set left(value) {
    if (value >= this.right) {
      this.width = 0;
    } else {
      this.width = this.right - value;
    }
    this.x = value;
  }

  /**
   * Gets the right coordinate of this rectangle.
   * @returns {number} The right coordinate of this rectangle.
   */
  get right() {
    return this.x + this.width;
  }

  /**
   * Sets the right coordinate of this rectangle.
   */
  set right(value) {
    if (value <= this.x) {
      this.width = 0;
    } else {
      this.width = value - this.x;
    }
  }

  /**
   * Gets the volume (area) of this rectangle.
   * @returns {number} The volume (area) of this rectangle.
   */
  get volume() {
    return this.width * this.height;
  }

  /**
   * Gets the perimeter of this rectangle.
   * @returns {number} The perimeter of this rectangle.
   */
  get perimeter() {
    return this.width * 2 + this.height * 2;
  }

  /**
   * Gets the x coordinate of the center of this rectangle.
   * @returns {number} The x coordinate of the center of this rectangle.
   */
  get centerX() {
    return this.x + this.halfWidth;
  }

  /**
   * Sets the x coordinate of the center of this rectangle.
   */
  set centerX(value) {
    this.x = value - this.halfWidth;
  }

  /**
   * Gets the y coordinate of the center of this rectangle.
   * @returns {number} The y coordinate of the center of this rectangle.
   */
  get centerY() {
    return this.y + this.halfHeight;
  }

  /**
   * Sets the y coordinate of the center of this rectangle.
   */
  set centerY(value) {
    this.y = value - this.halfHeight;
  }

  /**
   * Gets a random x coordinate within this rectangle.
   * @returns {number} A random x coordinate within this rectangle.
   */
  get randomX() {
    return this.x + Math.random() * this.width;
  }

  /**
   * Gets a random y coordinate within this rectangle.
   * @returns {number} A random y coordinate within this rectangle.
   */
  get randomY() {
    return this.y + Math.random() * this.height;
  }

  /**
   * Checks if this rectangle is empty (has zero width or height).
   * @returns {boolean} True if the rectangle is empty, false otherwise.
   */
  get empty() {
    return !this.width || !this.height;
  }

  /**
   * Sets whether this rectangle is empty (zero width or height).
   */
  set empty(value) {
    if (value === true) {
      this.setTo(0, 0, 0, 0);
    }
  }
}
