import { Frame } from './frame.js';
import { FrameData } from './frame_data.js';

export const cloneFrame = (frame: Frame, output: Frame | null = null): Frame => {
  const result = output || new Frame(frame.index, frame.x, frame.y, frame.width, frame.height);
  result.initialize(frame.index, frame.x, frame.y, frame.width, frame.height);
  return result;
};

export const cloneFrameData = (frameData: FrameData, output: FrameData | null = null): FrameData => {
  const result = output || new FrameData();
  for (let i = 0; i < frameData.total; i += 1) {
    result.addFrame(frameData.getFrame(i).clone());
  }
  return result;
};
