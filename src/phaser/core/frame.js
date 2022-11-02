/**
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 */
import Rectangle from '../geom/rectangle';
import { distance } from '../util/math';
import { cloneFrame } from './frame_util';

export default class {

  constructor(index, x, y, width, height, name) {
    this.initialize(index, x, y, width, height, name);
  }

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

  clone() {
    return cloneFrame(this);
  }

  getRect(output = null) {
    const result = output || new Rectangle();
    result.setTo(this.x, this.y, this.width, this.height);
    return result;
  }

}
