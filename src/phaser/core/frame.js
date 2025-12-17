import { Rectangle } from '../geom/rectangle.js';
import { distance } from '../util/math.js';
import { cloneFrame } from './frame_util.js';

export class Frame {
  /**
   * Creates a new Frame instance.
   * @param {number} index - The index of this frame in the animation.
   * @param {number} x - The x coordinate of this frame's position in the texture.
   * @param {number} y - The y coordinate of this frame's position in the texture.
   * @param {number} width - The width of this frame in pixels.
   * @param {number} height - The height of this frame in pixels.
   * @param {string} name - The name of this frame.
   */
  constructor(index, x, y, width, height, name) {
    this.initialize(index, x, y, width, height, name);
  }

  /**
   * Initializes this frame with the specified properties.
   * @param {number} index - The index of this frame in the animation.
   * @param {number} x - The x coordinate of this frame's position in the texture.
   * @param {number} y - The y coordinate of this frame's position in the texture.
   * @param {number} width - The width of this frame in pixels.
   * @param {number} height - The height of this frame in pixels.
   * @param {string} name - The name of this frame.
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
   * Resizes this frame to the specified dimensions.
   * @param {number} width - The new width of this frame in pixels.
   * @param {number} height - The new height of this frame in pixels.
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
   * Sets the trim properties for this frame.
   * @param {boolean} trimmed - Whether this frame is trimmed.
   * @param {number} actualWidth - The actual width of the trimmed frame.
   * @param {number} actualHeight - The actual height of the trimmed frame.
   * @param {number} destX - The destination x coordinate for the trimmed frame.
   * @param {number} destY - The destination y coordinate for the trimmed frame.
   * @param {number} destWidth - The destination width of the trimmed frame.
   * @param {number} destHeight - The destination height of the trimmed frame.
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
   * Creates a clone of this frame.
   * @returns {Frame} A new Frame instance with the same properties.
   */
  clone() {
    return cloneFrame(this);
  }

  /**
   * Gets the rectangle bounds of this frame.
   * @param {Rectangle} output - The rectangle to use for the result (optional).
   * @returns {Rectangle} A Rectangle object representing this frame's bounds.
   */
  getRect(output = null) {
    const result = output || new Rectangle();
    result.setTo(this.x, this.y, this.width, this.height);
    return result;
  }
}
