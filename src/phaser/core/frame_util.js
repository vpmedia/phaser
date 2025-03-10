import { Frame } from './frame.js';
import { FrameData } from './frame_data.js';

/**
 * TBD.
 * @param {Frame} frame - TBD.
 * @param {Frame} output - TBD.
 * @returns {Frame} TBD.
 */
export const cloneFrame = (frame, output = null) => {
  const result = output || new Frame(frame.index, frame.x, frame.y, frame.width, frame.height);
  result.initialize(frame.index, frame.x, frame.y, frame.width, frame.height);
  return result;
};

/**
 * TBD.
 * @param {FrameData} frameData - TBD.
 * @param {FrameData} output - TBD.
 * @returns {FrameData} TBD.
 */
export const cloneFrameData = (frameData, output = null) => {
  const result = output || new FrameData();
  for (let i = 0; i < frameData.total; i += 1) {
    result.addFrame(frameData.getFrame(i).clone());
  }
  return result;
};
