import type { TextureSource } from '../display/webgl/base_texture.js';
import { BaseTexture } from '../display/webgl/base_texture.js';
import { Texture } from '../display/webgl/texture.js';
import { jsonDataHash, spriteSheet } from './animation_parser.js';
import { Frame } from './frame.js';
import { FrameData } from './frame_data.js';
import { jsonBitmapFont, xmlBitmapFont } from './loader_parser.js';
import { Signal } from './signal.js';
import type { BitmapFontData } from './loader_parser.js';
import type { Game } from './game.js';

export const CANVAS = 0;
export const IMAGE = 1;
export const TEXTURE = 2;
export const SOUND = 3;
export const TEXT = 4;
export const BITMAPDATA = 5;
export const BITMAPFONT = 6;
export const JSONDATA = 7;
export const XML = 8;
export const RENDER_TEXTURE = 9;

/** An image, sprite sheet or texture atlas: the source bitmap and the frames cut from it. */
export type ImageCacheEntry = {
  key: string;
  url: string;
  data: TextureSource;
  base: BaseTexture;
  frame?: Frame;
  frameData: FrameData | null;
};

/** Audio as the cache holds it: the raw bytes on load, an AudioBuffer once decoded. */
export type SoundData = ArrayBuffer | AudioBuffer;

/** A sound and how far its decoding has got. */
export type SoundCacheEntry = {
  url: string;
  data: SoundData;
  isDecoding: boolean;
  decoded: boolean;
};

/** A bitmap font: the glyph atlas and the descriptor parsed from it. */
export type BitmapFontCacheEntry = {
  url: string;
  data: TextureSource;
  font: BitmapFontData;
  base: BaseTexture;
};

/** A text, JSON or XML payload under the URL it came from. */
export type DataCacheEntry<T> = {
  url: string;
  data: T;
};

/** Anything the cache can hold, whichever bucket it lives in. */
export type CacheEntry = ImageCacheEntry | SoundCacheEntry | BitmapFontCacheEntry | DataCacheEntry<unknown>;

interface CacheBuckets {
  canvas: Record<string, CacheEntry>;
  image: Record<string, ImageCacheEntry>;
  texture: Record<string, CacheEntry>;
  sound: Record<string, SoundCacheEntry>;
  text: Record<string, DataCacheEntry<string>>;
  json: Record<string, DataCacheEntry<unknown>>;
  xml: Record<string, DataCacheEntry<XMLDocument>>;
  bitmapData: Record<string, CacheEntry>;
  bitmapFont: Record<string, BitmapFontCacheEntry>;
  renderTexture: Record<string, CacheEntry>;
}

export class Cache {
  public game!: Game;
  public autoResolveURL!: boolean;
  public _cache!: CacheBuckets;
  public _urlMap!: Record<string, object> | null;
  public _urlResolver!: HTMLImageElement | null;
  public _urlTemp!: string | null;
  public onSoundUnlock!: Signal;
  public _cacheMap!: Record<string, CacheEntry>[];
  /**
   * Creates a new Cache instance.
   * @param {Game} game - The game instance.
   */
  public constructor(game: Game) {
    this.game = game;
    this.autoResolveURL = false;
    this._cache = {
      canvas: {},
      image: {},
      texture: {},
      sound: {},
      text: {},
      json: {},
      xml: {},
      bitmapData: {},
      bitmapFont: {},
      renderTexture: {},
    };
    this._urlMap = {};
    this._urlResolver = new Image();
    this._urlTemp = null;
    this.onSoundUnlock = new Signal();
    this._cacheMap = [];
    this._cacheMap[CANVAS] = this._cache.canvas;
    this._cacheMap[IMAGE] = this._cache.image;
    this._cacheMap[TEXTURE] = this._cache.texture;
    this._cacheMap[SOUND] = this._cache.sound;
    this._cacheMap[TEXT] = this._cache.text;
    this._cacheMap[BITMAPDATA] = this._cache.bitmapData;
    this._cacheMap[BITMAPFONT] = this._cache.bitmapFont;
    this._cacheMap[JSONDATA] = this._cache.json;
    this._cacheMap[XML] = this._cache.xml;
    this._cacheMap[RENDER_TEXTURE] = this._cache.renderTexture;
    this.addDefaultImage();
    this.addMissingImage();
  }

  /**
   * Adds the default image to the cache.
   */
  public addDefaultImage(): void {
    const img = new Image();
    img.src =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgAQMAAABJtOi3AAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAABVJREFUeF7NwIEAAAAAgKD9qdeocAMAoAABm3DkcAAAAABJRU5ErkJggg==';
    const obj = this.addImage('__default', null, img);
    obj.base.skipRender = true; // invisible texture
    globalThis.PhaserRegistry.CACHE_DEFAULT_IMAGE = new Texture(obj.base);
  }

  /**
   * Adds the missing image to the cache.
   */
  public addMissingImage(): void {
    const img = new Image();
    img.src =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJ9JREFUeNq01ssOwyAMRFG46v//Mt1ESmgh+DFmE2GPOBARKb2NVjo+17PXLD8a1+pl5+A+wSgFygymWYHBb0FtsKhJDdZlncG2IzJ4ayoMDv20wTmSMzClEgbWYNTAkQ0Z+OJ+A/eWnAaR9+oxCF4Os0H8htsMUp+pwcgBBiMNnAwF8GqIgL2hAzaGFFgZauDPKABmowZ4GL369/0rwACp2yA/ttmvsQAAAABJRU5ErkJggg==';
    const obj = this.addImage('__missing', null, img);
    globalThis.PhaserRegistry.CACHE_MISSING_IMAGE = new Texture(obj.base);
  }

  /**
   * Adds an image to the cache.
   * @param {string} key - The unique key for this cache entry.
   * @param {string} url - The URL the image was loaded from.
   * @param {HTMLImageElement} data - The image data to cache.
   * @returns {object} The cached image object.
   */
  public addImage(key: string, url: string | null, data: HTMLImageElement): ImageCacheEntry {
    const resolvedUrl = url ?? '';
    if (this.checkImageKey(key)) {
      this.removeImage(key);
    }
    /* if (!data.complete) {
      this.game.logger.warn('Cache addImage %s is incomplete', key);
    } */
    const img = {
      key,
      url: resolvedUrl,
      data,
      base: new BaseTexture(data),
      frame: new Frame(0, 0, 0, data.width, data.height, key),
      frameData: new FrameData(),
    };
    img.frameData.addFrame(new Frame(0, 0, 0, data.width, data.height, resolvedUrl));
    this._cache.image[key] = img;
    this._resolveURL(resolvedUrl, img);
    return img;
  }

  /**
   * Adds a sprite sheet to the cache.
   * @param {string} key - The unique key for this cache entry.
   * @param {string} url - The URL the sprite sheet was loaded from.
   * @param {HTMLImageElement} data - The image data to cache.
   * @param {number} frameWidth - The width of each frame in the sprite sheet.
   * @param {number} frameHeight - The height of each frame in the sprite sheet.
   * @param {number} frameMax - The maximum number of frames to parse (-1 for all).
   * @param {number} margin - The margin around each frame in pixels.
   * @param {number} spacing - The spacing between frames in pixels.
   */
  public addSpriteSheet(
    key: string,
    url: string,
    data: HTMLImageElement,
    frameWidth: number,
    frameHeight: number,
    frameMax = -1,
    margin = 0,
    spacing = 0
  ): void {
    const obj = {
      key,
      url,
      data,
      base: new BaseTexture(data),
      frameData: spriteSheet(this.game, data, frameWidth, frameHeight, frameMax, margin, spacing),
    };
    this._cache.image[key] = obj;
    this._resolveURL(url, obj);
  }

  /**
   * Adds a texture atlas to the cache.
   * @param {string} key - The unique key for this cache entry.
   * @param {string} url - The URL the atlas was loaded from.
   * @param {HTMLCanvasElement} data - The canvas data for the atlas.
   * @param {object} atlasData - The atlas data to cache.
   */
  public addTextureAtlas(key: string, url: string, data: TextureSource, atlasData: unknown): void {
    const obj: ImageCacheEntry = {
      key,
      url,
      data,
      base: new BaseTexture(data),
      frameData: jsonDataHash(this.game, atlasData, key),
    };
    this._cache.image[key] = obj;
    this._resolveURL(url, obj);
  }

  /**
   * Adds sound data to the cache.
   * @param {string} key - The unique key for this cache entry.
   * @param {string} url - The URL the sound was loaded from.
   * @param {object} data - The sound data to cache.
   */
  public addSound(key: string, url: string, data: SoundData): void {
    const obj: SoundCacheEntry = {
      url,
      data,
      isDecoding: false,
      decoded: false,
    };
    this._cache.sound[key] = obj;
    this._resolveURL(url, obj);
  }

  /**
   * Adds text data to the cache.
   * @param {string} key - The unique key for this cache entry.
   * @param {string} url - The URL the text was loaded from.
   * @param {string} data - The text data to cache.
   */
  public addText(key: string, url: string, data: string): void {
    const obj: DataCacheEntry<string> = { url, data };
    this._cache.text[key] = obj;
    this._resolveURL(url, obj);
  }

  /**
   * Adds a bitmap font to the cache.
   * @param {string} key - The unique key for this cache entry.
   * @param {string} url - The URL the bitmap font was loaded from.
   * @param {HTMLCanvasElement} data - The canvas data for the font.
   * @param {object} atlasData - The bitmap font atlas data to cache.
   * @param {string} atlasType - The type of the atlas data ('json' or 'xml').
   * @param {number} xSpacing - Horizontal spacing between characters.
   * @param {number} ySpacing - Vertical spacing between characters.
   */
  public addBitmapFont(
    key: string,
    url: string,
    data: TextureSource,
    atlasData: unknown,
    atlasType: string,
    xSpacing = 0,
    ySpacing = 0
  ): void {
    const base = new BaseTexture(data);
    const font =
      atlasType === 'json'
        ? jsonBitmapFont(atlasData, base, xSpacing, ySpacing)
        : xmlBitmapFont(atlasData as XMLDocument, base, xSpacing, ySpacing);
    const obj: BitmapFontCacheEntry = { url, data, font, base };
    this._cache.bitmapFont[key] = obj;
    this._resolveURL(url, obj);
  }

  /**
   * Adds JSON data to the cache.
   * @param {string} key - The unique key for this cache entry.
   * @param {string} url - The URL the JSON was loaded from.
   * @param {object} data - The JSON data to cache.
   */
  public addJSON(key: string, url: string, data: unknown): void {
    const obj: DataCacheEntry<unknown> = { url, data };
    this._cache.json[key] = obj;
    this._resolveURL(url, obj);
  }

  /**
   * Adds XML data to the cache.
   * @param {string} key - The unique key for this cache entry.
   * @param {string} url - The URL the XML was loaded from.
   * @param {XMLDocument} data - The XML data to cache.
   */
  public addXML(key: string, url: string, data: XMLDocument): void {
    const obj: DataCacheEntry<XMLDocument> = { url, data };
    this._cache.xml[key] = obj;
    this._resolveURL(url, obj);
  }

  // SOUND

  /**
   * Updates a sound property in the cache.
   * @param {string} key - The unique key for the cached sound.
   * @param {string} property - The property to update.
   * @param {any} value - The new value for the property.
   */
  public updateSound<K extends keyof SoundCacheEntry>(key: string, property: K, value: SoundCacheEntry[K]): void {
    const sound = this.getSound(key);
    if (sound) {
      sound[property] = value;
    }
  }

  /**
   * Marks a sound as decoded in the cache.
   * @param {string} key - The unique key for the cached sound.
   * @param {AudioBuffer} data - The decoded audio buffer.
   */
  public decodedSound(key: string, data: AudioBuffer): void {
    const sound = this.getSound(key);
    if (!sound) {
      return;
    }
    sound.data = data;
    sound.decoded = true;
    sound.isDecoding = false;
  }

  /**
   * Checks if a sound has been decoded in the cache.
   * @param {string} key - The unique key for the cached sound.
   * @returns {boolean} True if the sound is decoded, false otherwise.
   */
  public isSoundDecoded(key: string): boolean | null {
    const sound = this.getSound(key);
    if (sound) {
      return sound.decoded;
    }
    return null;
  }

  /**
   * Checks if a sound is ready to play (decoded and not locked).
   * @param {string} key - The unique key for the cached sound.
   * @returns {boolean} True if the sound is ready, false otherwise.
   */
  public isSoundReady(key: string): boolean {
    const sound = this.getSound(key);
    if (sound) {
      return sound.decoded && !this.game.sound.isLocked;
    }
    return false;
  }

  // CHECK

  /**
   * Checks if a cache entry exists.
   * @param {number} cache - The cache type (CANVAS, IMAGE, etc.).
   * @param {string} key - The unique key for the cache entry.
   * @returns {boolean} True if the entry exists, false otherwise.
   */
  public checkKey(cache: number, key: string): boolean {
    if (this._cacheMap[cache]?.[key]) {
      return true;
    }
    return false;
  }

  /**
   * Checks if a URL has been resolved and cached.
   * @param {string} url - The URL to check.
   * @returns {boolean} True if the URL has been resolved and cached, false otherwise.
   */
  public checkURL(url: string): boolean {
    const resolved = this._resolveURL(url);
    if (resolved && this._urlMap?.[resolved]) {
      return true;
    }
    return false;
  }

  /**
   * Checks if a canvas cache entry exists.
   * @param {string} key - The unique key for the cache entry.
   * @returns {boolean} True if the entry exists, false otherwise.
   */
  public checkCanvasKey(key: string): boolean {
    return this.checkKey(CANVAS, key);
  }

  /**
   * Checks if an image cache entry exists.
   * @param {string} key - The unique key for the cache entry.
   * @returns {boolean} True if the entry exists, false otherwise.
   */
  public checkImageKey(key: string): boolean {
    return this.checkKey(IMAGE, key);
  }

  /**
   * Checks if a texture cache entry exists.
   * @param {string} key - The unique key for the cache entry.
   * @returns {boolean} True if the entry exists, false otherwise.
   */
  public checkTextureKey(key: string): boolean {
    return this.checkKey(TEXTURE, key);
  }

  /**
   * Checks if a sound cache entry exists.
   * @param {string} key - The unique key for the cache entry.
   * @returns {boolean} True if the entry exists, false otherwise.
   */
  public checkSoundKey(key: string): boolean {
    return this.checkKey(SOUND, key);
  }

  /**
   * Checks if a text cache entry exists.
   * @param {string} key - The unique key for the cache entry.
   * @returns {boolean} True if the entry exists, false otherwise.
   */
  public checkTextKey(key: string): boolean {
    return this.checkKey(TEXT, key);
  }

  /**
   * Checks if a bitmap data cache entry exists.
   * @param {string} key - The unique key for the cache entry.
   * @returns {boolean} True if the entry exists, false otherwise.
   */
  public checkBitmapDataKey(key: string): boolean {
    return this.checkKey(BITMAPDATA, key);
  }

  /**
   * Checks if a bitmap font cache entry exists.
   * @param {string} key - The unique key for the cache entry.
   * @returns {boolean} True if the entry exists, false otherwise.
   */
  public checkBitmapFontKey(key: string): boolean {
    return this.checkKey(BITMAPFONT, key);
  }

  /**
   * Checks if a JSON cache entry exists.
   * @param {string} key - The unique key for the cache entry.
   * @returns {boolean} True if the entry exists, false otherwise.
   */
  public checkJSONKey(key: string): boolean {
    return this.checkKey(JSONDATA, key);
  }

  /**
   * Checks if an XML cache entry exists.
   * @param {string} key - The unique key for the cache entry.
   * @returns {boolean} True if the entry exists, false otherwise.
   */
  public checkXMLKey(key: string): boolean {
    return this.checkKey(XML, key);
  }

  // GET

  /**
   * TBD.
   * @param {string} key - TBD.
   * @param {number} cache - TBD.
   * @param {string} _method - TBD.
   * @param {string} property - TBD.
   * @returns {*} TBD.
   */
  public getItem(key: string, cache: number, _method: string, property: string | null = null): unknown {
    if (this.checkKey(cache, key)) {
      const entry = this._cacheMap[cache]![key]!;
      if (!property) {
        return entry;
      }
      return (entry as Record<string, unknown>)[property];
    }
    return null;
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @returns {HTMLCanvasElement} TBD.
   */
  public getCanvas(key: string): HTMLCanvasElement | null {
    return this.getItem(key, CANVAS, 'getCanvas', 'canvas') as HTMLCanvasElement | null;
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @param {boolean} full - TBD.
   * @returns {HTMLImageElement} TBD.
   */
  public getImage(key?: string | number, full?: false): TextureSource;
  public getImage(key: string | number | undefined, full: true): ImageCacheEntry;
  public getImage(key: string | number = '__default', full = false): TextureSource | ImageCacheEntry {
    const img = (this.getItem(String(key), IMAGE, 'getImage') ??
      this.getItem('__missing', IMAGE, 'getImage')) as ImageCacheEntry;
    if (full) {
      return img;
    }
    return img.data;
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @returns {object} TBD.
   */
  public getTextureFrame(key: string): Frame | null {
    return this.getItem(key, TEXTURE, 'getTextureFrame', 'frame') as Frame | null;
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @returns {object} TBD.
   */
  public getSound(key: string): SoundCacheEntry | null {
    return this.getItem(key, SOUND, 'getSound') as SoundCacheEntry | null;
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @returns {object} TBD.
   */
  public getSoundData(key: string): SoundData | null {
    return this.getItem(key, SOUND, 'getSoundData', 'data') as SoundData | null;
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @returns {object} TBD.
   */
  public getText(key: string): string | null {
    return this.getItem(key, TEXT, 'getText', 'data') as string | null;
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @returns {object} TBD.
   */
  public getBitmapData(key: string): unknown {
    return this.getItem(key, BITMAPDATA, 'getBitmapData', 'data');
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @returns {object} TBD.
   */
  public getBitmapFont(key: string): BitmapFontCacheEntry | null {
    return this.getItem(key, BITMAPFONT, 'getBitmapFont') as BitmapFontCacheEntry | null;
  }

  /**
   * Gets JSON data from the cache.
   * @template T
   * @param {string} key - The unique key for the cache entry.
   * @param {boolean} isClone - Whether to return a deep clone of the cached data.
   * @returns {T} The cached JSON data.
   */
  public getJSON<T = unknown>(key: string, isClone = false): T {
    const data = this.getItem(key, JSONDATA, 'getJSON', 'data') as T;
    return isClone ? structuredClone(data) : data;
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @returns {XMLDocument} TBD.
   */
  public getXML(key: string): XMLDocument | null {
    return this.getItem(key, XML, 'getXML', 'data') as XMLDocument | null;
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @returns {RenderTexture} TBD.
   */
  public getRenderTexture(key: string): CacheEntry | null {
    return this.getItem(key, RENDER_TEXTURE, 'getRenderTexture') as CacheEntry | null;
  }

  // FRAME

  /**
   * Gets the base texture of a cache entry.
   * @param {string} key - The unique key for the cache entry.
   * @param {number} cache - The cache type (CANVAS, IMAGE, etc.).
   * @returns {BaseTexture} The base texture.
   */
  public getBaseTexture(key: string, cache: number = IMAGE): BaseTexture | null {
    return this.getItem(key, cache, 'getBaseTexture', 'base') as BaseTexture | null;
  }

  /**
   * Gets a frame from the cache.
   * @param {string} key - The unique key for the cache entry.
   * @param {number} cache - The cache type (CANVAS, IMAGE, etc.).
   * @returns {Frame} The frame.
   */
  public getFrame(key: string, cache: number = IMAGE): Frame | null {
    return this.getItem(key, cache, 'getFrame', 'frame') as Frame | null;
  }

  /**
   * Gets the frame count of a cache entry.
   * @param {string} key - The unique key for the cache entry.
   * @param {number} cache - The cache type (CANVAS, IMAGE, etc.).
   * @returns {number} The number of frames.
   */
  public getFrameCount(key: string, cache: number = IMAGE): number {
    const data = this.getFrameData(key, cache);
    if (data) {
      return data.total;
    }
    return 0;
  }

  /**
   * Gets the frame data of a cache entry.
   * @param {string} key - The unique key for the cache entry.
   * @param {number} cache - The cache type (CANVAS, IMAGE, etc.).
   * @returns {FrameData | null} The frame data, or null when the entry has none.
   */
  public getFrameData(key: string, cache: number = IMAGE): FrameData | null {
    return this.getItem(key, cache, 'getFrameData', 'frameData') as FrameData | null;
  }

  /**
   * Checks if a cache entry has frame data.
   * @param {string} key - The unique key for the cache entry.
   * @param {number} cache - The cache type (CANVAS, IMAGE, etc.).
   * @returns {boolean} True if the entry has frame data, false otherwise.
   */
  public hasFrameData(key: string, cache: number = IMAGE): boolean {
    return this.getItem(key, cache, '', 'frameData') !== null;
  }

  /**
   * Updates the frame data of a cache entry.
   * @param {string} key - The unique key for the cache entry.
   * @param {FrameData} frameData - The new frame data.
   * @param {number} cache - The cache type (CANVAS, IMAGE, etc.).
   */
  public updateFrameData(key: string, frameData: FrameData, cache: number = IMAGE): void {
    const entry = this._cacheMap[cache]?.[key];
    if (entry) {
      (entry as ImageCacheEntry).frameData = frameData;
    }
  }

  /**
   * Gets a frame by index from the cache.
   * @param {string} key - The unique key for the cache entry.
   * @param {number} index - The index of the frame to get.
   * @param {number} cache - The cache type (CANVAS, IMAGE, etc.).
   * @returns {Frame} The frame at the specified index.
   */
  public getFrameByIndex(key: string, index: number, cache: number = IMAGE): Frame | null {
    const data = this.getFrameData(key, cache);
    if (data) {
      return data.getFrame(index);
    }
    return null;
  }

  /**
   * Gets a frame by name from the cache.
   * @param {string} key - The unique key for the cache entry.
   * @param {string} name - The name of the frame to get.
   * @param {number} cache - The cache type (CANVAS, IMAGE, etc.).
   * @returns {Frame} The frame with the specified name.
   */
  public getFrameByName(key: string, name: string, cache: number = IMAGE): Frame | null {
    const data = this.getFrameData(key, cache);
    if (data) {
      return data.getFrameByName(name);
    }
    return null;
  }

  /**
   * Gets the resolved URL from cache.
   * @param {string} url - The original URL to resolve.
   * @returns {string} The resolved URL or null if not found.
   */
  public getURL(url: string) {
    const resolvedURL = this._resolveURL(url);
    if (resolvedURL) {
      return this._urlMap?.[resolvedURL] ?? null;
    }
    this.game.logger.warn('Cache invalid url', { resolvedURL });
    return null;
  }

  /**
   * Gets all keys from a cache type.
   * @param {object} cache - The cache type (CANVAS, IMAGE, etc.).
   * @returns {string[]} An array of cache keys.
   */
  public getKeys(cache: number = IMAGE): string[] {
    const result = [];
    const bucket = this._cacheMap[cache];
    if (bucket) {
      const keys = Object.keys(bucket);
      for (const key of keys) {
        if (key !== '__default' && key !== '__missing') {
          result.push(key);
        }
      }
    }
    return result;
  }

  // REMOVE

  /**
   * Removes a canvas cache entry.
   * @param {string} key - The unique key for the cache entry to remove.
   */
  public removeCanvas(key: string): void {
    delete this._cache.canvas[key];
  }

  /**
   * Removes an image cache entry.
   * @param {string} key - The unique key for the cache entry to remove.
   * @param {boolean} destroyBaseTexture - Whether to destroy the base texture (default: true).
   */
  public removeImage(key: string, destroyBaseTexture = true): void {
    const img = this.getImage(key, true);
    if (destroyBaseTexture) {
      img.base.destroy();
    }
    delete this._cache.image[key];
  }

  /**
   * Removes a sound cache entry.
   * @param {string} key - The unique key for the cache entry to remove.
   */
  public removeSound(key: string): void {
    delete this._cache.sound[key];
  }

  /**
   * Removes a text cache entry.
   * @param {string} key - The unique key for the cache entry to remove.
   */
  public removeText(key: string): void {
    delete this._cache.text[key];
  }

  /**
   * Removes a bitmap data cache entry.
   * @param {string} key - The unique key for the cache entry to remove.
   */
  public removeBitmapData(key: string): void {
    delete this._cache.bitmapData[key];
  }

  /**
   * Removes a bitmap font cache entry.
   * @param {string} key - The unique key for the cache entry to remove.
   */
  public removeBitmapFont(key: string): void {
    delete this._cache.bitmapFont[key];
  }

  /**
   * Removes a JSON cache entry.
   * @param {string} key - The unique key for the cache entry to remove.
   */
  public removeJSON(key: string): void {
    delete this._cache.json[key];
  }

  /**
   * Removes an XML cache entry.
   * @param {string} key - The unique key for the cache entry to remove.
   */
  public removeXML(key: string): void {
    delete this._cache.xml[key];
  }

  /**
   * Removes a render texture cache entry.
   * @param {string} key - The unique key for the cache entry to remove.
   */
  public removeRenderTexture(key: string): void {
    delete this._cache.renderTexture[key];
  }

  /**
   * Removes a sprite sheet cache entry.
   * @param {string} key - The unique key for the cache entry to remove.
   */
  public removeSpriteSheet(key: string): void {
    delete this._cache.image[key];
  }

  /**
   * Removes a texture atlas cache entry.
   * @param {string} key - The unique key for the cache entry to remove.
   */
  public removeTextureAtlas(key: string): void {
    delete this._cache.image[key];
  }

  /**
   * Clears all GL textures from the cache.
   */
  public clearGLTextures(): void {
    for (const entry of Object.values(this._cache.image)) {
      entry.base._glTextures = [];
    }
  }

  /**
   * Resolves a URL and stores it in the cache.
   * @param {string} url - The URL to resolve.
   * @param {object} data - The data to associate with the resolved URL.
   * @returns {string} The resolved URL or null if not enabled.
   */
  public _resolveURL(url: string, data: object | null = null): string | null {
    if (!this.autoResolveURL) {
      return null;
    }
    if (!this._urlResolver) {
      return null;
    }
    this._urlResolver.src = this.game.load.baseURL + url;
    this._urlTemp = this._urlResolver.src;
    //  Ensure no request is actually made
    this._urlResolver.src = '';
    //  Record the URL to the map
    if (data && this._urlMap) {
      this._urlMap[this._urlTemp] = data;
    }
    return this._urlTemp;
  }

  /**
   * Destroys the cache and cleans up resources.
   */
  public destroy(): void {
    for (const cache of this._cacheMap) {
      const keys = cache ? Object.keys(cache) : [];
      for (const key of keys) {
        if (key !== '__default' && key !== '__missing') {
          (cache[key] as { destroy?: () => void }).destroy?.();
          delete cache[key];
        }
      }
    }
    this._urlMap = null;
    this._urlResolver = null;
    this._urlTemp = null;
  }
}
