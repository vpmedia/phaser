import { Rectangle } from '../geom/rectangle.js';
import { distance } from '../util/math.js';
import { cloneFrame } from './frame_util.js';

export class Frame {
  index!: number;
  x!: number;
  y!: number;
  width!: number;
  height!: number;
  name!: string;
  centerX!: number;
  centerY!: number;
  distance!: number;
  rotated!: boolean;
  rotationDirection!: 'cw' | 'ccw';
  trimmed!: boolean;
  sourceSizeW!: number;
  sourceSizeH!: number;
  spriteSourceSizeX!: number;
  spriteSourceSizeY!: number;
  spriteSourceSizeW!: number;
  spriteSourceSizeH!: number;
  right!: number;
  bottom!: number;

  constructor(index: number, x: number, y: number, width: number, height: number, name?: string) {
    this.initialize(index, x, y, width, height, name);
  }

  initialize(index: number, x: number, y: number, width: number, height: number, name?: string): void {
    this.index = index;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.name = name as string;
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

  resize(width: number, height: number): void {
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

  setTrim(
    trimmed: boolean,
    actualWidth: number,
    actualHeight: number,
    destX: number,
    destY: number,
    destWidth: number,
    destHeight: number
  ): void {
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

  clone(): Frame {
    return cloneFrame(this);
  }

  getRect(output: Rectangle | null = null): Rectangle {
    const result = output || new Rectangle();
    result.setTo(this.x, this.y, this.width, this.height);
    return result;
  }
}
