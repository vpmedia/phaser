import { Frame } from './frame.js';
import { FrameData } from './frame_data.js';

/**
 * Clone a Frame object.
 * @param {Frame} frame - The frame to clone.
 * @param {Frame} output - Optional output frame to populate.
 * @returns {Frame} The cloned frame or the provided output frame.
 */
export const cloneFrame = (frame, output = null) => {
  const result = output || new Frame(frame.index, frame.x, frame.y, frame.width, frame.height);
  result.initialize(frame.index, frame.x, frame.y, frame.width, frame.height);
  return result;
};

/**
 * Clone a FrameData object.
 * @param {FrameData} frameData - The frame data to clone.
 * @param {FrameData} output - Optional output frame data to populate.
 * @returns {FrameData} The cloned frame data or the provided output frame data.
 */
export const cloneFrameData = (frameData, output = null) => {
  const result = output || new FrameData();
  for (let i = 0; i < frameData.total; i += 1) {
    result.addFrame(frameData.getFrame(i).clone());
  }
  return result;
};
