import { Rectangle } from '../geom/rectangle.js';
import { distance } from '../util/math.js';
import { cloneFrame } from './frame_util.js';

export class Frame {
  /**
   * TBD.
   * @param {number} index - TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   * @param {number} width - TBD.
   * @param {number} height - TBD.
   * @param {string} name - TBD.
   */
  constructor(index, x, y, width, height, name) {
    this.initialize(index, x, y, width, height, name);
  }

  /**
   * TBD.
   * @param {number} index - TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   * @param {number} width - TBD.
   * @param {number} height - TBD.
   * @param {string} name - TBD.
   */
  initialize(index, x, y, width, height, name) {
    this.index = index;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.name = name;
    this.centerX = Math.floor(width / 2);
    this.centerY = Math.floor(height / 2);
    this.distance = distance(0, 0, width, height);
    this.rotated = false;
    this.rotationDirection = 'cw';
    this.trimmed = false;
    this.sourceSizeW = width;
    this.sourceSizeH = height;
    this.spriteSourceSizeX = 0;
    this.spriteSourceSizeY = 0;
    this.spriteSourceSizeW = 0;
    this.spriteSourceSizeH = 0;
    this.right = this.x + this.width;
    this.bottom = this.y + this.height;
  }

  /**
   * TBD.
   * @param {number} width - TBD.
   * @param {number} height - TBD.
   */
  resize(width, height) {
    this.width = width;
    this.height = height;
    this.centerX = Math.floor(width / 2);
    this.centerY = Math.floor(height / 2);
    this.distance = distance(0, 0, width, height);
    this.sourceSizeW = width;
    this.sourceSizeH = height;
    this.right = this.x + width;
    this.bottom = this.y + height;
  }

  /**
   * TBD.
   * @param {boolean} trimmed - TBD.
   * @param {number} actualWidth - TBD.
   * @param {number} actualHeight - TBD.
   * @param {number} destX - TBD.
   * @param {number} destY - TBD.
   * @param {number} destWidth - TBD.
   * @param {number} destHeight - TBD.
   */
  setTrim(trimmed, actualWidth, actualHeight, destX, destY, destWidth, destHeight) {
    this.trimmed = trimmed;
    if (trimmed) {
      this.sourceSizeW = actualWidth;
      this.sourceSizeH = actualHeight;
      this.centerX = Math.floor(actualWidth / 2);
      this.centerY = Math.floor(actualHeight / 2);
      this.spriteSourceSizeX = destX;
      this.spriteSourceSizeY = destY;
      this.spriteSourceSizeW = destWidth;
      this.spriteSourceSizeH = destHeight;
    }
  }

  /**
   * TBD.
   * @returns {Frame} TBD.
   */
  clone() {
    return cloneFrame(this);
  }

  /**
   * TBD.
   * @param {Rectangle} output - TBD.
   * @returns {Rectangle} TBD.
   */
  getRect(output = null) {
    const result = output || new Rectangle();
    result.setTo(this.x, this.y, this.width, this.height);
    return result;
  }
}
