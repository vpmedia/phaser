import { Texture } from '../display/webgl/texture.js';
import { Rectangle } from '../geom/rectangle.js';

/**
 * Finalizes bitmap font data by attaching textures to characters.
 * @param {import('../display/webgl/base_texture.js').BaseTexture} baseTexture - The base texture for the font.
 * @param {object} bitmapFontData - The bitmap font data to finalize.
 * @returns {object} The finalized bitmap font data.
 */
export const finalizeBitmapFont = (baseTexture, bitmapFontData) => {
  Object.keys(bitmapFontData.chars).forEach((charCode) => {
    const letter = bitmapFontData.chars[charCode];
    letter.texture = new Texture(baseTexture, new Rectangle(letter.x, letter.y, letter.width, letter.height));
  });
  return bitmapFontData;
};

/**
 * Parses XML bitmap font data.
 * @param {object} xml - The XML document containing the bitmap font data.
 * @param {import('../display/webgl/base_texture.js').BaseTexture} baseTexture - The base texture for the font.
 * @param {number} xSpacing - Horizontal spacing between characters.
 * @param {number} ySpacing - Vertical spacing between characters.
 * @returns {object} The parsed bitmap font data.
 */
export const xmlBitmapFont = (xml, baseTexture, xSpacing, ySpacing) => {
  const data = {};
  const info = xml.getElementsByTagName('info')[0];
  const common = xml.getElementsByTagName('common')[0];
  data.font = info.getAttribute('face');
  data.size = Number.parseInt(info.getAttribute('size'), 10);
  data.lineHeight = Number.parseInt(common.getAttribute('lineHeight'), 10) + ySpacing;
  data.chars = {};
  const letters = xml.getElementsByTagName('char');
  for (let i = 0; i < letters.length; i += 1) {
    const charCode = Number.parseInt(letters[i].getAttribute('id'), 10);
    data.chars[charCode] = {
      x: Number.parseInt(letters[i].getAttribute('x'), 10),
      y: Number.parseInt(letters[i].getAttribute('y'), 10),
      width: Number.parseInt(letters[i].getAttribute('width'), 10),
      height: Number.parseInt(letters[i].getAttribute('height'), 10),
      xOffset: Number.parseInt(letters[i].getAttribute('xoffset'), 10),
      yOffset: Number.parseInt(letters[i].getAttribute('yoffset'), 10),
      xAdvance: Number.parseInt(letters[i].getAttribute('xadvance'), 10) + xSpacing,
      kerning: {},
    };
  }
  const kernings = xml.getElementsByTagName('kerning');
  for (let i = 0; i < kernings.length; i += 1) {
    const first = Number.parseInt(kernings[i].getAttribute('first'), 10);
    const second = Number.parseInt(kernings[i].getAttribute('second'), 10);
    const amount = Number.parseInt(kernings[i].getAttribute('amount'), 10);
    data.chars[second].kerning[first] = amount;
  }
  return finalizeBitmapFont(baseTexture, data);
};

/**
 * Parses XML bitmap font data (alias for xmlBitmapFont).
 * @param {object} xml - The XML document containing the bitmap font data.
 * @param {import('../display/webgl/base_texture.js').BaseTexture} baseTexture - The base texture for the font.
 * @param {number} xSpacing - Horizontal spacing between characters.
 * @param {number} ySpacing - Vertical spacing between characters.
 * @returns {object} The parsed bitmap font data.
 */
export const bitmapFont = (xml, baseTexture, xSpacing, ySpacing) => {
  return xmlBitmapFont(xml, baseTexture, xSpacing, ySpacing);
};

/**
 * Parses JSON bitmap font data.
 * @param {object} json - The JSON object containing the bitmap font data.
 * @param {import('../display/webgl/base_texture.js').BaseTexture} baseTexture - The base texture for the font.
 * @param {number} xSpacing - Horizontal spacing between characters.
 * @param {number} ySpacing - Vertical spacing between characters.
 * @returns {object} The parsed bitmap font data.
 */
export const jsonBitmapFont = (json, baseTexture, xSpacing, ySpacing) => {
  const data = {
    font: json.font.info._face,
    size: Number.parseInt(json.font.info._size, 10),
    lineHeight: Number.parseInt(json.font.common._lineHeight, 10) + ySpacing,
    chars: {},
  };
  json.font.chars.char.forEach((letter) => {
    const charCode = Number.parseInt(letter._id, 10);
    data.chars[charCode] = {
      x: Number.parseInt(letter._x, 10),
      y: Number.parseInt(letter._y, 10),
      width: Number.parseInt(letter._width, 10),
      height: Number.parseInt(letter._height, 10),
      xOffset: Number.parseInt(letter._xoffset, 10),
      yOffset: Number.parseInt(letter._yoffset, 10),
      xAdvance: Number.parseInt(letter._xadvance, 10) + xSpacing,
      kerning: {},
    };
  });
  if (json.font.kernings && json.font.kernings.kerning) {
    json.font.kernings.kerning.forEach((kerning) => {
      data.chars[kerning._second].kerning[kerning._first] = Number.parseInt(kerning._amount, 10);
    });
  }
  return finalizeBitmapFont(baseTexture, data);
};
