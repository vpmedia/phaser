import type { Frame } from './frame.js';
import { cloneFrameData } from './frame_util.js';

export class FrameData {
  public _frames: Frame[];
  public _frameNames: Record<string, number>;

  public constructor() {
    this._frames = [];
    this._frameNames = {};
  }

  public addFrame(frame: Frame): Frame {
    frame.index = this._frames.length;
    this._frames.push(frame);
    if (frame.name !== '') {
      this._frameNames[frame.name] = frame.index;
    }
    return frame;
  }

  public getFrame(index = 0): Frame {
    if (index >= this._frames.length) {
      index = 0;
    }
    return this._frames[index]!;
  }

  public getFrameByName(name: string): Frame | null {
    const index = this._frameNames[name];
    if (typeof index === 'number') {
      return this._frames[index] ?? null;
    }
    return null;
  }

  public checkFrameName(name: string): boolean {
    if (this._frameNames[name] == null) {
      return false;
    }
    return true;
  }

  public clone(): FrameData {
    return cloneFrameData(this);
  }

  public getFrameRange(start: number, end: number, output: Frame[] | null = null): Frame[] {
    const result = output ?? [];
    for (let i = start; i <= end; i += 1) {
      result.push(this._frames[i]!);
    }
    return result;
  }

  public getFrameIndexes(
    frames: (number | string)[],
    useNumericIndex = true,
    output: number[] | null = null
  ): number[] {
    const result = output ?? [];
    if (frames && frames.length > 0) {
      for (const f of frames) {
        if (useNumericIndex && this._frames[f as number]) {
          result.push(this._frames[f as number]!.index);
        } else {
          const found = this.getFrameByName(f as string);
          if (found) {
            result.push(found.index);
          }
        }
      }
    } else {
      for (const frame of this._frames) {
        result.push(frame.index);
      }
    }
    return result;
  }

  public destroy(): void {
    this._frames = null as unknown as Frame[];
    this._frameNames = null as unknown as Record<string, number>;
  }

  public get total(): number {
    return this._frames.length;
  }
}
