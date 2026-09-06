import { beforeEach, describe, expect, it } from 'vitest';
import { SCALE_LINEAR } from './const.js';
import { BITMAPFONT, Cache, IMAGE, SOUND } from './cache.js';
import { getRegistry } from './registry.js';
import type { Game } from './game.js';

const createGame = (): Game =>
  ({
    logger: { warn: (): void => undefined },
    load: { baseURL: '' },
    sound: { isLocked: false },
  }) as unknown as Game;

const createImage = (width = 4, height = 4): HTMLImageElement => {
  const img = new Image();
  Object.defineProperty(img, 'width', { value: width });
  Object.defineProperty(img, 'height', { value: height });
  return img;
};

const FONT_XML = `<?xml version="1.0"?>
<font>
  <info face="Arial" size="32" />
  <common lineHeight="40" />
  <chars>
    <char id="65" x="0" y="0" width="20" height="30" xoffset="1" yoffset="2" xadvance="21" />
  </chars>
</font>`;

describe('Cache', () => {
  let cache: Cache;

  beforeEach(() => {
    getRegistry().TEXTURE_SCALE_MODE = SCALE_LINEAR;
    cache = new Cache(createGame());
  });

  describe('images', () => {
    it('seeds the default and missing images', () => {
      expect(cache.checkImageKey('__default')).toBe(true);
      expect(cache.checkImageKey('__missing')).toBe(true);
    });

    it('keeps the default image out of the reported keys', () => {
      expect(cache.getKeys(IMAGE)).toStrictEqual([]);
    });

    it('returns the source bitmap by default and the whole entry when asked', () => {
      const source = createImage();
      cache.addImage('logo', 'logo.png', source);
      expect(cache.getImage('logo')).toBe(source);
      expect(cache.getImage('logo', true).key).toBe('logo');
    });

    it('falls back to the missing image for an unknown key', () => {
      expect(cache.getImage('nope', true).key).toBe('__missing');
    });

    it('gives an image one frame covering the whole bitmap', () => {
      cache.addImage('logo', 'logo.png', createImage(64, 32));
      const frame = cache.getFrameByIndex('logo', 0);
      expect(frame?.width).toBe(64);
      expect(frame?.height).toBe(32);
      expect(cache.getFrameCount('logo')).toBe(1);
    });

    it('reports no frames for a key it does not hold', () => {
      expect(cache.getFrameData('nope')).toBeNull();
      expect(cache.getFrameCount('nope')).toBe(0);
      expect(cache.hasFrameData('nope')).toBe(false);
    });

    it('drops an image when it is removed', () => {
      cache.addImage('logo', 'logo.png', createImage());
      cache.removeImage('logo');
      expect(cache.checkImageKey('logo')).toBe(false);
    });

    it('replaces an image registered twice under the same key', () => {
      cache.addImage('logo', 'a.png', createImage(4, 4));
      const second = createImage(8, 8);
      cache.addImage('logo', 'b.png', second);
      expect(cache.getImage('logo')).toBe(second);
    });

    it('clears the GL textures of every cached image', () => {
      cache.addImage('logo', 'logo.png', createImage());
      const entry = cache.getImage('logo', true);
      entry.base._glTextures = [null];
      cache.clearGLTextures();
      expect(entry.base._glTextures).toStrictEqual([]);
    });
  });

  describe('sounds', () => {
    it('stores a sound as undecoded', () => {
      cache.addSound('shot', 'shot.ogg', new ArrayBuffer(8));
      expect(cache.isSoundDecoded('shot')).toBe(false);
      expect(cache.isSoundReady('shot')).toBe(false);
    });

    it('reports an unknown sound as neither decoded nor ready', () => {
      expect(cache.isSoundDecoded('nope')).toBeNull();
      expect(cache.isSoundReady('nope')).toBe(false);
    });

    it('updates a single property of a cached sound', () => {
      cache.addSound('shot', 'shot.ogg', new ArrayBuffer(8));
      cache.updateSound('shot', 'isDecoding', true);
      expect(cache.getSound('shot')?.isDecoding).toBe(true);
    });

    it('swaps in the decoded buffer and marks the sound ready', () => {
      cache.addSound('shot', 'shot.ogg', new ArrayBuffer(8));
      const buffer = { duration: 1.5 } as AudioBuffer;
      cache.decodedSound('shot', buffer);
      expect(cache.getSoundData('shot')).toBe(buffer);
      expect(cache.isSoundDecoded('shot')).toBe(true);
      expect(cache.isSoundReady('shot')).toBe(true);
    });

    it('ignores a decode result for a sound it never held', () => {
      expect(() => {
        cache.decodedSound('nope', {} as AudioBuffer);
      }).not.toThrow();
    });

    it('drops a sound when it is removed', () => {
      cache.addSound('shot', 'shot.ogg', new ArrayBuffer(8));
      cache.removeSound('shot');
      expect(cache.getSound('shot')).toBeNull();
    });
  });

  describe('data', () => {
    it('round-trips text', () => {
      cache.addText('note', 'note.txt', 'hello');
      expect(cache.getText('note')).toBe('hello');
      cache.removeText('note');
      expect(cache.getText('note')).toBeNull();
    });

    it('round-trips JSON', () => {
      cache.addJSON('config', 'config.json', { a: 1 });
      expect(cache.getJSON('config')).toStrictEqual({ a: 1 });
    });

    it('hands back a detached copy when a clone is asked for', () => {
      const data = { a: 1 };
      cache.addJSON('config', 'config.json', data);
      const clone = cache.getJSON<{ a: number }>('config', true);
      expect(clone).toStrictEqual(data);
      expect(clone).not.toBe(data);
    });

    it('round-trips XML', () => {
      const xml = new DOMParser().parseFromString('<root/>', 'text/xml');
      cache.addXML('doc', 'doc.xml', xml);
      expect(cache.getXML('doc')).toBe(xml);
    });
  });

  describe('bitmap fonts', () => {
    it('parses the descriptor and keeps it beside the atlas', () => {
      const xml = new DOMParser().parseFromString(FONT_XML, 'text/xml');
      cache.addBitmapFont('arial', 'arial.png', createImage(256, 256), xml, 'xml');
      const entry = cache.getBitmapFont('arial');
      expect(entry?.font.font).toBe('Arial');
      expect(entry?.font.chars[65]?.xAdvance).toBe(21);
      expect(entry?.base).toBeDefined();
    });

    it('reports a font it does not hold as absent', () => {
      expect(cache.checkBitmapFontKey('nope')).toBe(false);
      expect(cache.getBitmapFont('nope')).toBeNull();
    });
  });

  describe('getItem', () => {
    it('returns the whole entry when no property is named', () => {
      cache.addText('note', 'note.txt', 'hello');
      expect(cache.getItem('note', 4, 'test')).toStrictEqual({ url: 'note.txt', data: 'hello' });
    });

    it('returns null for a key the bucket does not hold', () => {
      expect(cache.getItem('nope', SOUND, 'test')).toBeNull();
      expect(cache.getItem('nope', BITMAPFONT, 'test', 'font')).toBeNull();
    });
  });

  describe('destroy', () => {
    it('empties every bucket but the built-in images', () => {
      cache.addText('note', 'note.txt', 'hello');
      cache.addSound('shot', 'shot.ogg', new ArrayBuffer(8));
      cache.destroy();
      expect(cache.getText('note')).toBeNull();
      expect(cache.getSound('shot')).toBeNull();
      expect(cache.checkImageKey('__default')).toBe(true);
    });
  });
});
