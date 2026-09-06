import { beforeEach, describe, expect, it } from 'vitest';
import { SCALE_LINEAR } from '../core/const.js';
import { getRegistry } from '../core/registry.js';
import { Rectangle } from '../geom/rectangle.js';
import { BaseTexture } from './webgl/base_texture.js';
import { Texture } from './webgl/texture.js';
import type { BitmapFontCacheEntry } from '../core/cache.js';
import type { Game } from '../core/game.js';
import type { BitmapFontData } from '../core/loader_parser.js';
import { BitmapText } from './bitmap_text.js';

getRegistry().TEXTURE_SCALE_MODE = SCALE_LINEAR;

const createBaseTexture = (): BaseTexture => {
  const base = new BaseTexture(null);
  base.hasLoaded = true;
  base.width = 256;
  base.height = 256;
  return base;
};

const atlas = createBaseTexture();

const glyph = (code: number, width: number): [number, BitmapFontData['chars'][number]] => [
  code,
  {
    x: 0,
    y: 0,
    width,
    height: 10,
    xOffset: 0,
    yOffset: 0,
    xAdvance: width,
    kerning: {},
    texture: new Texture(atlas, new Rectangle(0, 0, width, 10)),
  },
];

const FONT: BitmapFontData = {
  font: 'test',
  size: 10,
  lineHeight: 12,
  chars: Object.fromEntries([
    glyph(32, 5), // space
    glyph(65, 10), // A
    glyph(66, 10), // B
  ]),
};

const createGame = (font: BitmapFontData | null = FONT): Game =>
  ({
    cache: {
      getBitmapFont: (): BitmapFontCacheEntry | null =>
        font === null ? null : ({ url: '', data: null, font, base: {} } as unknown as BitmapFontCacheEntry),
    },
    stage: { currentRenderOrderID: 0 },
  }) as unknown as Game;

const createText = (text: string, size = 10): BitmapText => new BitmapText(createGame(), 0, 0, 'test', text, size);

describe('BitmapText', (): void => {
  beforeEach((): void => {
    getRegistry().CACHE_MISSING_IMAGE = new Texture(atlas, new Rectangle(0, 0, 1, 1));
  });

  describe('updateText', (): void => {
    it('measures a single line from the glyph advances', (): void => {
      const bitmapText = createText('AB');
      expect(bitmapText.textWidth).toBe(20);
      expect(bitmapText.textHeight).toBe(12);
    });

    it('scales the metrics with the font size', (): void => {
      const bitmapText = createText('AB', 20);
      expect(bitmapText.textWidth).toBe(40);
      expect(bitmapText.textHeight).toBe(24);
    });

    it('splits on a newline and takes the widest line as the width', (): void => {
      const bitmapText = createText('AB\nA');
      expect(bitmapText.textWidth).toBe(20);
      expect(bitmapText.textHeight).toBe(24);
    });

    it('creates one glyph sprite per character', (): void => {
      expect(createText('AB')._glyphs).toHaveLength(2);
    });

    it('reuses the glyph pool when the text shrinks', (): void => {
      const bitmapText = createText('AB');
      const pooled = bitmapText._glyphs;
      bitmapText.text = 'A';
      expect(bitmapText._glyphs).toBe(pooled);
      expect(bitmapText._glyphs).toHaveLength(2);
      expect(bitmapText.children).toHaveLength(1);
    });

    it('drops the glyphs that left the display list when purged', (): void => {
      const bitmapText = createText('AB');
      bitmapText.text = 'A';
      expect(bitmapText.purgeGlyphs()).toBe(1);
      expect(bitmapText._glyphs).toHaveLength(1);
    });

    it('lays out an empty string as a single empty line', (): void => {
      const bitmapText = createText('');
      expect(bitmapText.textWidth).toBe(0);
      expect(bitmapText.textHeight).toBe(12);
      expect(bitmapText._glyphs).toHaveLength(0);
    });

    it('does nothing when the font is not in the cache', (): void => {
      const bitmapText = new BitmapText(createGame(null), 0, 0, 'missing', 'AB');
      expect(bitmapText.textWidth).toBe(0);
      expect(bitmapText._glyphs).toHaveLength(0);
    });
  });

  describe('scanLine', (): void => {
    it('reports the whole text when nothing forces a wrap', (): void => {
      const line = createText('AB').scanLine(FONT, 1, 'AB');
      expect(line).toMatchObject({ width: 20, text: 'AB', end: true, chars: [0, 10] });
    });

    it('stops at a newline and reports the line as unfinished', (): void => {
      const line = createText('AB').scanLine(FONT, 1, 'AB\nA');
      expect(line.text).toBe('AB');
      expect(line.end).toBe(false);
    });

    it('wraps at the last space once maxWidth is exceeded', (): void => {
      const bitmapText = createText('A A');
      bitmapText.maxWidth = 20;
      expect(bitmapText.scanLine(FONT, 1, 'A A').text).toBe('A');
    });

    it('substitutes a space for a character the font does not carry', (): void => {
      const line = createText('A').scanLine(FONT, 1, 'Z');
      expect(line.width).toBe(5);
    });

    it('skips a character the font cannot even substitute for', (): void => {
      const spaceless: BitmapFontData = { ...FONT, chars: Object.fromEntries([glyph(65, 10)]) };
      expect(createText('A').scanLine(spaceless, 1, 'AZ').width).toBe(10);
    });
  });

  describe('cleanText', (): void => {
    it('drops characters the font does not carry', (): void => {
      expect(createText('A').cleanText('AZB')).toBe('AB');
    });

    it('replaces them with the given stand-in', (): void => {
      expect(createText('A').cleanText('AZB', '?')).toBe('A?B');
    });

    it('keeps line breaks', (): void => {
      expect(createText('A').cleanText('A\nB')).toBe('A\nB');
    });
  });

  describe('properties', (): void => {
    it('re-lays out when the alignment changes', (): void => {
      const bitmapText = createText('A\nAB');
      bitmapText.align = 'right';
      expect(bitmapText.align).toBe('right');
      expect(bitmapText._glyphs[0]?.position.x).toBe(10);
    });

    it('ignores an alignment it does not know', (): void => {
      const bitmapText = createText('A');
      bitmapText.align = 'sideways';
      expect(bitmapText.align).toBe('left');
    });

    it('coerces a string font size', (): void => {
      const bitmapText = createText('A');
      bitmapText.fontSize = '20';
      expect(bitmapText.fontSize).toBe(20);
    });

    it('ignores a font size of zero or less', (): void => {
      const bitmapText = createText('A');
      bitmapText.fontSize = -5;
      expect(bitmapText.fontSize).toBe(10);
    });

    it('renders the tint as a padded hex string', (): void => {
      const bitmapText = createText('A');
      bitmapText.tint = 0x00ff00;
      expect(bitmapText.fill).toBe('#00FF00');
    });

    it('reads a hex string back into the tint', (): void => {
      const bitmapText = createText('A');
      bitmapText.fill = '#FF0000';
      expect(bitmapText.tint).toBe(0xff0000);
    });

    it('trims the font key before looking it up', (): void => {
      const bitmapText = createText('A');
      bitmapText.font = '  other  ';
      expect(bitmapText.font).toBe('other');
    });

    it('stringifies whatever the text is set to', (): void => {
      const bitmapText = createText('A');
      bitmapText.text = 65;
      expect(bitmapText.text).toBe('65');
    });
  });
});
