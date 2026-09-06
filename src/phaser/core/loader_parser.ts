import { Texture } from '../display/webgl/texture.js';
import { Rectangle } from '../geom/rectangle.js';
import type { BaseTexture } from '../display/webgl/base_texture.js';

/** One glyph in a bitmap font, as parsed from the font descriptor. */
export type BitmapFontChar = {
  x: number;
  y: number;
  width: number;
  height: number;
  xOffset: number;
  yOffset: number;
  xAdvance: number;
  kerning: Record<number, number>;
  texture?: Texture;
};

/** A parsed bitmap font: its metrics and the glyphs it can draw. */
export type BitmapFontData = {
  font: string;
  size: number;
  lineHeight: number;
  chars: Record<number, BitmapFontChar>;
};

/**
 * Finalizes bitmap font data by attaching textures to characters.
 * @param {BaseTexture} baseTexture - The base texture for the font.
 * @param {object} bitmapFontData - The bitmap font data to finalize.
 * @returns {object} The finalized bitmap font data.
 */
export const finalizeBitmapFont = (baseTexture: BaseTexture, bitmapFontData: BitmapFontData): BitmapFontData => {
  for (const letter of Object.values(bitmapFontData.chars)) {
    letter.texture = new Texture(baseTexture, new Rectangle(letter.x, letter.y, letter.width, letter.height));
  }
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
export const xmlBitmapFont = (
  xml: XMLDocument,
  baseTexture: BaseTexture,
  xSpacing: number,
  ySpacing: number
): BitmapFontData => {
  const [info] = xml.querySelectorAll('info');
  const [common] = xml.querySelectorAll('common');
  const attr = (element: Element | undefined, name: string): number => Math.trunc(Number(element?.getAttribute(name)));
  const data: BitmapFontData = {
    font: info?.getAttribute('face') ?? '',
    size: attr(info, 'size'),
    lineHeight: attr(common, 'lineHeight') + ySpacing,
    chars: {},
  };
  for (const letter of xml.querySelectorAll('char')) {
    data.chars[attr(letter, 'id')] = {
      x: attr(letter, 'x'),
      y: attr(letter, 'y'),
      width: attr(letter, 'width'),
      height: attr(letter, 'height'),
      xOffset: attr(letter, 'xoffset'),
      yOffset: attr(letter, 'yoffset'),
      xAdvance: attr(letter, 'xadvance') + xSpacing,
      kerning: {},
    };
  }
  for (const kerning of xml.querySelectorAll('kerning')) {
    const char = data.chars[attr(kerning, 'second')];
    if (char) {
      char.kerning[attr(kerning, 'first')] = attr(kerning, 'amount');
    }
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
export const bitmapFont = (
  xml: XMLDocument,
  baseTexture: BaseTexture,
  xSpacing: number,
  ySpacing: number
): BitmapFontData => xmlBitmapFont(xml, baseTexture, xSpacing, ySpacing);

/**
 * Parses JSON bitmap font data.
 * @param {object} json - The JSON object containing the bitmap font data.
 * @param {BaseTexture} baseTexture - The base texture for the font.
 * @param {number} xSpacing - Horizontal spacing between characters.
 * @param {number} ySpacing - Vertical spacing between characters.
 * @returns {object} The parsed bitmap font data.
 */
export const jsonBitmapFont = (
  json: any,
  baseTexture: BaseTexture,
  xSpacing: number,
  ySpacing: number
): BitmapFontData => {
  const data: BitmapFontData = {
    font: json.font.info._face,
    size: Math.trunc(Number(json.font.info._size)),
    lineHeight: Math.trunc(Number(json.font.common._lineHeight)) + ySpacing,
    chars: {},
  };
  for (const letter of json.font.chars.char as Record<string, string>[]) {
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
  }
  if (json.font.kernings && json.font.kernings.kerning) {
    for (const kerning of json.font.kernings.kerning as Record<string, string>[]) {
      const char = data.chars[Math.trunc(Number(kerning['_second']))];
      if (char) {
        char.kerning[Math.trunc(Number(kerning['_first']))] = Math.trunc(Number(kerning['_amount']));
      }
    }
  }
  return finalizeBitmapFont(baseTexture, data);
};
