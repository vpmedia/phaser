import { Texture } from '../display/webgl/texture.js';
import { Rectangle } from '../geom/rectangle.js';
import type { BaseTexture } from '../display/webgl/base_texture.js';

/**
 * Finalizes bitmap font data by attaching textures to characters.
 * @param {BaseTexture} baseTexture - The base texture for the font.
 * @param {object} bitmapFontData - The bitmap font data to finalize.
 * @returns {object} The finalized bitmap font data.
 */
export const finalizeBitmapFont = (baseTexture: BaseTexture, bitmapFontData: any) => {
  Object.keys(bitmapFontData.chars).forEach((charCode) => {
    const letter = bitmapFontData.chars[charCode];
    letter.texture = new Texture(baseTexture, new Rectangle(letter.x, letter.y, letter.width, letter.height));
  });
  return bitmapFontData;
};

/**
 * Parses XML bitmap font data.
 * @param {object} xml - The XML document containing the bitmap font data.
 * @param {BaseTexture} baseTexture - The base texture for the font.
 * @param {number} xSpacing - Horizontal spacing between characters.
 * @param {number} ySpacing - Vertical spacing between characters.
 * @returns {object} The parsed bitmap font data.
 */
export const xmlBitmapFont = (xml: any, baseTexture: BaseTexture, xSpacing: number, ySpacing: number) => {
  const data: any = {};
  const info = xml.querySelectorAll('info')[0];
  const common = xml.querySelectorAll('common')[0];
  data.font = info.getAttribute('face');
  data.size = Math.trunc(Number(info.getAttribute('size')));
  data.lineHeight = Math.trunc(Number(common.getAttribute('lineHeight'))) + ySpacing;
  data.chars = {};
  const letters = xml.querySelectorAll('char');
  for (let i = 0; i < letters.length; i += 1) {
    const charCode = Math.trunc(Number(letters[i].getAttribute('id')));
    data.chars[charCode] = {
      x: Math.trunc(Number(letters[i].getAttribute('x'))),
      y: Math.trunc(Number(letters[i].getAttribute('y'))),
      width: Math.trunc(Number(letters[i].getAttribute('width'))),
      height: Math.trunc(Number(letters[i].getAttribute('height'))),
      xOffset: Math.trunc(Number(letters[i].getAttribute('xoffset'))),
      yOffset: Math.trunc(Number(letters[i].getAttribute('yoffset'))),
      xAdvance: Math.trunc(Number(letters[i].getAttribute('xadvance'))) + xSpacing,
      kerning: {},
    };
  }
  const kernings = xml.querySelectorAll('kerning');
  for (let i = 0; i < kernings.length; i += 1) {
    const first = Math.trunc(Number(kernings[i].getAttribute('first')));
    const second = Math.trunc(Number(kernings[i].getAttribute('second')));
    const amount = Math.trunc(Number(kernings[i].getAttribute('amount')));
    data.chars[second].kerning[first] = amount;
  }
  return finalizeBitmapFont(baseTexture, data);
};

/**
 * Parses XML bitmap font data (alias for xmlBitmapFont).
 * @param {object} xml - The XML document containing the bitmap font data.
 * @param {BaseTexture} baseTexture - The base texture for the font.
 * @param {number} xSpacing - Horizontal spacing between characters.
 * @param {number} ySpacing - Vertical spacing between characters.
 * @returns {object} The parsed bitmap font data.
 */
export const bitmapFont = (xml: any, baseTexture: BaseTexture, xSpacing: number, ySpacing: number) =>
  xmlBitmapFont(xml, baseTexture, xSpacing, ySpacing);

/**
 * Parses JSON bitmap font data.
 * @param {object} json - The JSON object containing the bitmap font data.
 * @param {BaseTexture} baseTexture - The base texture for the font.
 * @param {number} xSpacing - Horizontal spacing between characters.
 * @param {number} ySpacing - Vertical spacing between characters.
 * @returns {object} The parsed bitmap font data.
 */
export const jsonBitmapFont = (json: any, baseTexture: BaseTexture, xSpacing: number, ySpacing: number) => {
  const data: {
    font: string;
    size: number;
    lineHeight: number;
    chars: Record<number, { kerning: Record<number, number>; [key: string]: unknown }>;
  } = {
    font: json.font.info._face,
    size: Math.trunc(Number(json.font.info._size)),
    lineHeight: Math.trunc(Number(json.font.common._lineHeight)) + ySpacing,
    chars: {},
  };
  json.font.chars.char.forEach((letter: Record<string, string>) => {
    const charCode = Math.trunc(Number(letter['_id']));
    data.chars[charCode] = {
      x: Math.trunc(Number(letter['_x'])),
      y: Math.trunc(Number(letter['_y'])),
      width: Math.trunc(Number(letter['_width'])),
      height: Math.trunc(Number(letter['_height'])),
      xOffset: Math.trunc(Number(letter['_xoffset'])),
      yOffset: Math.trunc(Number(letter['_yoffset'])),
      xAdvance: Math.trunc(Number(letter['_xadvance'])) + xSpacing,
      kerning: {},
    };
  });
  if (json.font.kernings && json.font.kernings.kerning) {
    json.font.kernings.kerning.forEach((kerning: Record<string, string>) => {
      const char = data.chars[Math.trunc(Number(kerning['_second']))];
      if (char) {
        char.kerning[Math.trunc(Number(kerning['_first']))] = Math.trunc(Number(kerning['_amount']));
      }
    });
  }
  return finalizeBitmapFont(baseTexture, data);
};
