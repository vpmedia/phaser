import { Frame } from './frame.js';

/** One frame in a texture atlas, in the shape the packers emit. */
export type AtlasFrame = {
  frame: { x: number; y: number; w: number; h: number };
  trimmed?: boolean;
  sourceSize?: { w: number; h: number };
  spriteSourceSize?: { x: number; y: number; w: number; h: number };
};

/** A texture atlas descriptor, keyed by frame name. */
export type AtlasJson = { frames: Record<string, AtlasFrame> };
import { FrameData } from './frame_data.js';
import type { Game } from './game.js';
import type { TextureSource } from '../display/webgl/base_texture.js';

/**
 * TBD.
 * @param {Game} game - TBD.
 * @param {string} key - TBD.
 * @param {number} frameWidth - TBD.
 * @param {number} frameHeight - TBD.
 * @param {number} frameMax - TBD.
 * @param {number} margin - TBD.
 * @param {number} spacing - TBD.
 * @returns {FrameData} TBD.
 */
export const spriteSheet = (
  game: Game,
  key: string | TextureSource,
  frameWidth: number,
  frameHeight: number,
  frameMax: number,
  margin: number,
  spacing: number
): FrameData | null => {
  const img = typeof key === 'string' ? game.cache.getImage(key) : key;
  if (img === null) {
    return null;
  }
  const { width } = img;
  const { height } = img;
  const cellWidth = frameWidth <= 0 ? Math.floor(-width / Math.min(-1, frameWidth)) : frameWidth;
  const cellHeight = frameHeight <= 0 ? Math.floor(-height / Math.min(-1, frameHeight)) : frameHeight;
  const row = Math.floor((width - margin) / (cellWidth + spacing));
  const column = Math.floor((height - margin) / (cellHeight + spacing));
  let total = row * column;
  if (frameMax !== -1) {
    total = frameMax;
  }
  //  Zero or smaller than frame sizes?
  if (width === 0 || height === 0 || width < cellWidth || height < cellHeight || total === 0) {
    game.logger.warn(
      `AnimationParser.spriteSheet: '${typeof key === 'string' ? key : 'image'}'s width/height zero or width/height < given cellWidth/cellHeight`
    );
    return null;
  }
  //  Let's create some frames then
  const data = new FrameData();
  let x = margin;
  let y = margin;
  for (let i = 0; i < total; i += 1) {
    data.addFrame(new Frame(i, x, y, cellWidth, cellHeight, ''));
    x += cellWidth + spacing;
    if (x + cellWidth > width) {
      x = margin;
      y += cellHeight + spacing;
    }
  }
  return data;
};

/**
 * TBD.
 * @param {Game} game - TBD.
 * @param {object} json - TBD.
 * @returns {FrameData} TBD.
 */
export const jsonDataHash = (game: Game, json: unknown, _key?: string): FrameData | null => {
  const atlas = json as AtlasJson | null;
  if (!atlas?.frames) {
    game.logger.warn('jsonDataHash: Invalid Texture Atlas JSON given, missing frames object');
    return null;
  }
  // Let's create some frames then
  const data = new FrameData();
  // By this stage frames is a fully parsed array
  const { frames } = atlas;
  let i = 0;
  for (const [key, entry] of Object.entries(frames)) {
    const newFrame = data.addFrame(new Frame(i, entry.frame.x, entry.frame.y, entry.frame.w, entry.frame.h, key));
    if (entry.trimmed === true && entry.sourceSize !== undefined && entry.spriteSourceSize !== undefined) {
      newFrame.setTrim(
        entry.trimmed,
        entry.sourceSize.w,
        entry.sourceSize.h,
        entry.spriteSourceSize.x,
        entry.spriteSourceSize.y,
        entry.spriteSourceSize.w,
        entry.spriteSourceSize.h
      );
    }
    i += 1;
  }
  return data;
};
