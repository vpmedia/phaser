/**
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 */
import Frame from './frame';
import FrameData from './frame_data';

/**
 *
 * @param {object} game TBD
 * @param {object} key TBD
 * @param {number} frameWidth TBD
 * @param {number} frameHeight TBD
 * @param {number} frameMax TBD
 * @param {number} margin TBD
 * @param {number} spacing TBD
 * @returns {object} TBD
 */
export function spriteSheet(game, key, frameWidth, frameHeight, frameMax, margin, spacing) {
  let img = key;
  if (typeof key === 'string') {
    img = game.cache.getImage(key);
  }
  if (img === null) {
    return null;
  }
  const width = img.width;
  const height = img.height;
  if (frameWidth <= 0) {
    frameWidth = Math.floor(-width / Math.min(-1, frameWidth));
  }
  if (frameHeight <= 0) {
    frameHeight = Math.floor(-height / Math.min(-1, frameHeight));
  }
  const row = Math.floor((width - margin) / (frameWidth + spacing));
  const column = Math.floor((height - margin) / (frameHeight + spacing));
  let total = row * column;
  if (frameMax !== -1) {
    total = frameMax;
  }
  //  Zero or smaller than frame sizes?
  if (width === 0 || height === 0 || width < frameWidth || height < frameHeight || total === 0) {
    console.warn(
      "AnimationParser.spriteSheet: '" +
        key +
        "'s width/height zero or width/height < given frameWidth/frameHeight"
    );
    return null;
  }
  //  Let's create some frames then
  const data = new FrameData();
  let x = margin;
  let y = margin;
  for (let i = 0; i < total; i += 1) {
    data.addFrame(new Frame(i, x, y, frameWidth, frameHeight, ''));
    x += frameWidth + spacing;
    if (x + frameWidth > width) {
      x = margin;
      y += frameHeight + spacing;
    }
  }
  return data;
}

/**
 *
 * @param {object} game TBD
 * @param {object} json TBD
 * @returns {object} TBD
 */
export function JSONDataHash(game, json) {
  if (!json.frames) {
    console.warn('JSONDataHash: Invalid Texture Atlas JSON given, missing frames object', json);
    return null;
  }
  // Let's create some frames then
  const data = new FrameData();
  // By this stage frames is a fully parsed array
  const frames = json.frames;
  let newFrame;
  let i = 0;
  const keys = Object.keys(frames);
  for (let k = 0; k < keys.length; k += 1) {
    const key = keys[k];
    newFrame = data.addFrame(
      new Frame(
        i,
        frames[key].frame.x,
        frames[key].frame.y,
        frames[key].frame.w,
        frames[key].frame.h,
        key
      )
    );
    if (frames[key].trimmed) {
      newFrame.setTrim(
        frames[key].trimmed,
        frames[key].sourceSize.w,
        frames[key].sourceSize.h,
        frames[key].spriteSourceSize.x,
        frames[key].spriteSourceSize.y,
        frames[key].spriteSourceSize.w,
        frames[key].spriteSourceSize.h
      );
    }
    i += 1;
  }
  return data;
}
