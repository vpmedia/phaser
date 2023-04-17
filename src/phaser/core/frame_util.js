/**
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 */
import { Frame } from './frame';
import { FrameData } from './frame_data';

/**
 * TBD.
 *
 * @param {object} frame - TBD.
 * @param {object} output - TBD.
 * @returns {object} TBD.
 */
export function cloneFrame(frame, output = null) {
  const result = output || new Frame();
  result.initialize(frame.index, frame.x, frame.y, frame.width, frame.height);
  return result;
}

/**
 * TBD.
 *
 * @param {object} frameData - TBD.
 * @param {object} output - TBD.
 * @returns {object} TBD.
 */
export function cloneFrameData(frameData, output = null) {
  const result = output || new FrameData();
  for (let i = 0; i < frameData.total; i += 1) {
    result.addFrame(frameData.getFrame(i).clone());
  }
  return result;
}
