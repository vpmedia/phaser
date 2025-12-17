import { cloneFrameData } from './frame_util.js';

export class FrameData {
  /**
   * Creates a new FrameData instance.
   * This class holds data about frames in a texture atlas or sprite sheet.
   */
  constructor() {
    /**
     * @type {import('./frame.js').Frame[]}
     */
    this._frames = [];
    /**
     * @type {string[]}
     */
    this._frameNames = [];
  }

  /**
   * Add a frame to the frame data collection.
   * @param {import('./frame.js').Frame} frame - The frame to add.
   * @returns {import('./frame.js').Frame} The added frame.
   */
  addFrame(frame) {
    frame.index = this._frames.length;
    this._frames.push(frame);
    if (frame.name !== '') {
      this._frameNames[frame.name] = frame.index;
    }
    return frame;
  }

  /**
   * Get a frame by its index.
   * @param {number} index - The index of the frame to get.
   * @returns {import('./frame.js').Frame} The frame at the specified index, or the first frame if index is out of bounds.
   */
  getFrame(index = 0) {
    if (index >= this._frames.length) {
      index = 0;
    }
    return this._frames[index];
  }

  /**
   * Get a frame by its name.
   * @param {string} name - The name of the frame to get.
   * @returns {import('./frame.js').Frame} The frame with the specified name, or null if not found.
   */
  getFrameByName(name) {
    if (typeof this._frameNames[name] === 'number') {
      return this._frames[this._frameNames[name]];
    }
    return null;
  }

  /**
   * Check if a frame with the given name exists.
   * @param {string} name - The name of the frame to check.
   * @returns {boolean} True if a frame with this name exists, false otherwise.
   */
  checkFrameName(name) {
    if (this._frameNames[name] == null) {
      return false;
    }
    return true;
  }

  /**
   * Create a clone of this FrameData instance.
   * @returns {FrameData} A new FrameData instance with cloned frames.
   */
  clone() {
    return cloneFrameData(this);
  }

  /**
   * Get a range of frames by index.
   * @param {number} start - The starting index of the frame range.
   * @param {number} end - The ending index of the frame range.
   * @param {import('./frame.js').Frame[]} output - Optional array to populate with frames.
   * @returns {import('./frame.js').Frame[]} An array of frames in the specified range.
   */
  getFrameRange(start, end, output = null) {
    const result = output || [];
    for (let i = start; i <= end; i += 1) {
      result.push(this._frames[i]);
    }
    return result;
  }

  /**
   * Get frame indexes from an array of frame names or indices.
   * @param {number[]|string[]} frames - An array of frame names or indices.
   * @param {boolean} useNumericIndex - Whether to treat numeric values as frame indices.
   * @param {number[]} output - Optional array to populate with frame indexes.
   * @returns {number[]} An array of frame indexes.
   */
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

  /**
   * Destroy this FrameData instance and clean up resources.
   * This method clears internal arrays and releases references to frames.
   */
  destroy() {
    this._frames = null;
    this._frameNames = null;
  }

  /**
   * Get the total number of frames in this FrameData instance.
   * @returns {number} The total number of frames.
   */
  get total() {
    return this._frames.length;
  }
}
