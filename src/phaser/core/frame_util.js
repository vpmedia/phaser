/**
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 */
import Frame from './frame';
import FrameData from './frame_data';

/**
 *
 * @param frame
 * @param output
 */
export function cloneFrame(frame, output = null) {
  const result = output || new Frame();
  result.initialize(frame.index, frame.x, frame.y, frame.width, frame.height);
  return result;
}

/**
 *
 * @param frameData
 * @param output
 */
export function cloneFrameData(frameData, output = null) {
  const result = output || new FrameData();
  for (let i = 0; i < frameData.total; i += 1) {
    result.addFrame(frameData.getFrame(i).clone());
  }
  return result;
}
