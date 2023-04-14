/**
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 */
import Point from './point';
import Rectangle from './rectangle';
import { distance } from '../util/math';
import { clone, contains, circumferencePoint } from './util/circle';
import { GEOM_CIRCLE } from '../core/const';

export default class {
  constructor(x = 0, y = 0, diameter = 0) {
    this.x = x;
    this.y = y;
    this._diameter = diameter;
    this._radius = 0;
    if (diameter > 0) {
      this._radius = diameter * 0.5;
    }
    this.type = GEOM_CIRCLE;
  }

  circumference() {
    return 2 * (Math.PI * this._radius);
  }

  random(output = null) {
    const result = output || new Point();
    const t = 2 * Math.PI * Math.random();
    const u = Math.random() + Math.random();
    const r = u > 1 ? 2 - u : u;
    const x = r * Math.cos(t);
    const y = r * Math.sin(t);
    result.x = this.x + x * this.radius;
    result.y = this.y + y * this.radius;
    return result;
  }

  getBounds() {
    return new Rectangle(this.x - this.radius, this.y - this.radius, this.diameter, this.diameter);
  }

  setTo(x, y, diameter) {
    this.x = x;
    this.y = y;
    this._diameter = diameter;
    this._radius = diameter * 0.5;
    return this;
  }

  copyFrom(source) {
    return this.setTo(source.x, source.y, source.diameter);
  }

  copyTo(dest) {
    dest.x = this.x;
    dest.y = this.y;
    dest.diameter = this._diameter;
    return dest;
  }

  distance(dest, round = false) {
    const d = distance(this.x, this.y, dest.x, dest.y);
    return round ? Math.round(d) : d;
  }

  clone() {
    return clone(this);
  }

  contains(x, y) {
    return contains(this, x, y);
  }

  circumferencePoint(angle, asDegrees, out) {
    return circumferencePoint(this, angle, asDegrees, out);
  }

  offset(dx, dy) {
    this.x += dx;
    this.y += dy;
    return this;
  }

  offsetPoint(point) {
    return this.offset(point.x, point.y);
  }

  toString() {
    return (
      '[{Circle (x=' +
      this.x +
      ' y=' +
      this.y +
      ' diameter=' +
      this.diameter +
      ' radius=' +
      this.radius +
      ')}]'
    );
  }

  get diameter() {
    return this._diameter;
  }

  set diameter(value) {
    if (value > 0) {
      this._diameter = value;
      this._radius = value * 0.5;
    }
  }

  get radius() {
    return this._radius;
  }

  set radius(value) {
    if (value > 0) {
      this._radius = value;
      this._diameter = value * 2;
    }
  }

  get left() {
    return this.x - this._radius;
  }

  set left(value) {
    if (value > this.x) {
      this._radius = 0;
      this._diameter = 0;
    } else {
      this.radius = this.x - value;
    }
  }

  get right() {
    return this.x + this._radius;
  }

  set right(value) {
    if (value < this.x) {
      this._radius = 0;
      this._diameter = 0;
    } else {
      this.radius = value - this.x;
    }
  }

  get top() {
    return this.y - this._radius;
  }

  set top(value) {
    if (value > this.y) {
      this._radius = 0;
      this._diameter = 0;
    } else {
      this.radius = this.y - value;
    }
  }

  get bottom() {
    return this.y + this._radius;
  }

  set bottom(value) {
    if (value < this.y) {
      this._radius = 0;
      this._diameter = 0;
    } else {
      this.radius = value - this.y;
    }
  }

  get area() {
    if (this._radius > 0) {
      return Math.PI * this._radius * this._radius;
    }
    return 0;
  }

  get empty() {
    return this._diameter === 0;
  }

  set empty(value) {
    if (value === true) {
      this.setTo(0, 0, 0);
    }
  }
}
