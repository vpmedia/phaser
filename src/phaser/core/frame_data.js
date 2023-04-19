import { cloneFrameData } from './frame_util';

export class FrameData {
  constructor() {
    this._frames = [];
    this._frameNames = [];
  }

  addFrame(frame) {
    frame.index = this._frames.length;
    this._frames.push(frame);
    if (frame.name !== '') {
      this._frameNames[frame.name] = frame.index;
    }
    return frame;
  }

  getFrame(index = 0) {
    if (index >= this._frames.length) {
      index = 0;
    }
    return this._frames[index];
  }

  getFrameByName(name) {
    if (typeof this._frameNames[name] === 'number') {
      return this._frames[this._frameNames[name]];
    }
    return null;
  }

  checkFrameName(name) {
    if (this._frameNames[name] == null) {
      return false;
    }
    return true;
  }

  clone() {
    return cloneFrameData(this);
  }

  getFrameRange(start, end, output = null) {
    const result = output || [];
    for (let i = start; i <= end; i += 1) {
      result.push(this._frames[i]);
    }
    return result;
  }

  getFrameIndexes(frames, useNumericIndex = true, output = null) {
    const result = output || [];
    if (frames && frames.length > 0) {
      for (let i = 0; i < frames.length; i += 1) {
        if (useNumericIndex && this._frames[frames[i]]) {
          result.push(this._frames[frames[i]].index);
        } else if (this.getFrameByName(frames[i])) {
          result.push(this.getFrameByName(frames[i]).index);
        }
      }
    } else {
      for (let i = 0; i < this._frames.length; i += 1) {
        result.push(this._frames[i].index);
      }
    }
    return result;
  }

  destroy() {
    this._frames = null;
    this._frameNames = null;
  }

  get total() {
    return this._frames.length;
  }
}
