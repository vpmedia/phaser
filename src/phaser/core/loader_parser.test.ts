import { describe, expect, it } from 'vitest';
import type { BaseTexture } from '../display/webgl/base_texture.js';
import { bitmapFont, jsonBitmapFont, xmlBitmapFont } from './loader_parser.js';

const baseTexture = { width: 256, height: 256 } as unknown as BaseTexture;

const parseXml = (markup: string): XMLDocument => new DOMParser().parseFromString(markup, 'text/xml');

const FONT_XML = `<?xml version="1.0"?>
<font>
  <info face="Arial" size="32" />
  <common lineHeight="40" />
  <chars>
    <char id="65" x="0" y="0" width="20" height="30" xoffset="1" yoffset="2" xadvance="21" />
    <char id="66" x="20" y="0" width="22" height="30" xoffset="0" yoffset="2" xadvance="23" />
  </chars>
  <kernings>
    <kerning first="65" second="66" amount="-3" />
  </kernings>
</font>`;

const FONT_JSON = {
  font: {
    info: { _face: 'Arial', _size: '32' },
    common: { _lineHeight: '40' },
    chars: {
      char: [
        { _id: '65', _x: '0', _y: '0', _width: '20', _height: '30', _xoffset: '1', _yoffset: '2', _xadvance: '21' },
        { _id: '66', _x: '20', _y: '0', _width: '22', _height: '30', _xoffset: '0', _yoffset: '2', _xadvance: '23' },
      ],
    },
    kernings: { kerning: [{ _first: '65', _second: '66', _amount: '-3' }] },
  },
};

describe('bitmap font parsing', (): void => {
  describe('xmlBitmapFont', (): void => {
    it('reads the font metrics', (): void => {
      const data = xmlBitmapFont(parseXml(FONT_XML), baseTexture, 0, 0);
      expect(data.font).toBe('Arial');
      expect(data.size).toBe(32);
      expect(data.lineHeight).toBe(40);
    });

    it('reads every glyph, keyed by character code', (): void => {
      const data = xmlBitmapFont(parseXml(FONT_XML), baseTexture, 0, 0);
      expect(Object.keys(data.chars)).toStrictEqual(['65', '66']);
      expect(data.chars[65]).toMatchObject({ x: 0, y: 0, width: 20, height: 30, xOffset: 1, yOffset: 2 });
    });

    it('adds the spacing arguments to advance and line height', (): void => {
      const data = xmlBitmapFont(parseXml(FONT_XML), baseTexture, 5, 7);
      expect(data.chars[65]?.xAdvance).toBe(26);
      expect(data.lineHeight).toBe(47);
    });

    it('records kerning against the second character of the pair', (): void => {
      const data = xmlBitmapFont(parseXml(FONT_XML), baseTexture, 0, 0);
      expect(data.chars[66]?.kerning[65]).toBe(-3);
    });

    it('attaches a texture to every glyph', (): void => {
      const data = xmlBitmapFont(parseXml(FONT_XML), baseTexture, 0, 0);
      expect(data.chars[65]?.texture).toBeDefined();
      expect(data.chars[66]?.texture).toBeDefined();
    });

    it('survives a font with no kerning table', (): void => {
      const markup = FONT_XML.replace(/<kernings>[\s\S]*<\/kernings>/, '');
      expect(() => xmlBitmapFont(parseXml(markup), baseTexture, 0, 0)).not.toThrow();
    });

    it('ignores kerning that names a character the font does not have', (): void => {
      const markup = FONT_XML.replace('second="66"', 'second="999"');
      const data = xmlBitmapFont(parseXml(markup), baseTexture, 0, 0);
      expect(data.chars[66]?.kerning).toStrictEqual({});
    });

    it('falls back to an empty face when the info element is missing', (): void => {
      const markup = FONT_XML.replace(/<info[^>]*\/>/, '');
      expect(xmlBitmapFont(parseXml(markup), baseTexture, 0, 0).font).toBe('');
    });
  });

  describe('jsonBitmapFont', (): void => {
    it('reads the same metrics as the xml form', (): void => {
      const data = jsonBitmapFont(FONT_JSON, baseTexture, 0, 0);
      expect(data.font).toBe('Arial');
      expect(data.size).toBe(32);
      expect(data.lineHeight).toBe(40);
    });

    it('produces the same glyphs as the xml form', (): void => {
      const fromJson = jsonBitmapFont(FONT_JSON, baseTexture, 0, 0);
      const fromXml = xmlBitmapFont(parseXml(FONT_XML), baseTexture, 0, 0);
      for (const code of [65, 66]) {
        expect(fromJson.chars[code]).toMatchObject({
          x: fromXml.chars[code]!.x,
          width: fromXml.chars[code]!.width,
          xAdvance: fromXml.chars[code]!.xAdvance,
        });
      }
    });

    it('records the same kerning as the xml form', (): void => {
      expect(jsonBitmapFont(FONT_JSON, baseTexture, 0, 0).chars[66]?.kerning[65]).toBe(-3);
    });
  });

  describe('bitmapFont', (): void => {
    it('parses the xml form', (): void => {
      expect(bitmapFont(parseXml(FONT_XML), baseTexture, 0, 0).font).toBe('Arial');
    });
  });
});
