import type { Frame } from './frame.js';
import { cloneFrameData } from './frame_util.js';

export class FrameData {
  _frames: Frame[];
  _frameNames: Record<string, number>;

  constructor() {
    this._frames = [];
    this._frameNames = {};
  }

  addFrame(frame: Frame): Frame {
    frame.index = this._frames.length;
    this._frames.push(frame);
    if (frame.name !== '') {
      this._frameNames[frame.name] = frame.index;
    }
    return frame;
  }

  getFrame(index: number = 0): Frame {
    if (index >= this._frames.length) {
      index = 0;
    }
    return this._frames[index];
  }

  getFrameByName(name: string): Frame | null {
    if (typeof this._frameNames[name] === 'number') {
      return this._frames[this._frameNames[name]];
    }
    return null;
  }

  checkFrameName(name: string): boolean {
    if (this._frameNames[name] == null) {
      return false;
    }
    return true;
  }

  clone(): FrameData {
    return cloneFrameData(this);
  }

  getFrameRange(start: number, end: number, output: Frame[] | null = null): Frame[] {
    const result = output || [];
    for (let i = start; i <= end; i += 1) {
      result.push(this._frames[i]);
    }
    return result;
  }

  getFrameIndexes(
    frames: (number | string)[],
    useNumericIndex: boolean = true,
    output: number[] | null = null
  ): number[] {
    const result = output || [];
    if (frames && frames.length > 0) {
      for (let i = 0; i < frames.length; i += 1) {
        const f = frames[i];
        if (useNumericIndex && this._frames[f as number]) {
          result.push(this._frames[f as number].index);
        } else {
          const found = this.getFrameByName(f as string);
          if (found) {
            result.push(found.index);
          }
        }
      }
    } else {
      for (let i = 0; i < this._frames.length; i += 1) {
        result.push(this._frames[i].index);
      }
    }
    return result;
  }

  destroy(): void {
    this._frames = null as unknown as Frame[];
    this._frameNames = null as unknown as Record<string, number>;
  }

  get total(): number {
    return this._frames.length;
  }
}
