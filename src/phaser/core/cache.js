import { BaseTexture } from '../display/webgl/base_texture.js';
import { Texture } from '../display/webgl/texture.js';
import { JSONDataHash } from './animation_parser.js';
import { Frame } from './frame.js';
import { FrameData } from './frame_data.js';
import { jsonBitmapFont, xmlBitmapFont } from './loader_parser.js';
import { Signal } from './signal.js';

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

export class Cache {
  /**
   * Creates a new Cache instance.
   * @param {import('./game.js').Game} game - The game instance.
   */
  constructor(game) {
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
  addDefaultImage() {
    const img = new Image();
    img.src =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgAQMAAABJtOi3AAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAABVJREFUeF7NwIEAAAAAgKD9qdeocAMAoAABm3DkcAAAAABJRU5ErkJggg==';
    const obj = this.addImage('__default', null, img);
    obj.base.skipRender = true; // invisible texture
    window.PhaserRegistry.CACHE_DEFAULT_IMAGE = new Texture(obj.base);
  }

  /**
   * Adds the missing image to the cache.
   */
  addMissingImage() {
    const img = new Image();
    img.src =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJ9JREFUeNq01ssOwyAMRFG46v//Mt1ESmgh+DFmE2GPOBARKb2NVjo+17PXLD8a1+pl5+A+wSgFygymWYHBb0FtsKhJDdZlncG2IzJ4ayoMDv20wTmSMzClEgbWYNTAkQ0Z+OJ+A/eWnAaR9+oxCF4Os0H8htsMUp+pwcgBBiMNnAwF8GqIgL2hAzaGFFgZauDPKABmowZ4GL369/0rwACp2yA/ttmvsQAAAABJRU5ErkJggg==';
    const obj = this.addImage('__missing', null, img);
    window.PhaserRegistry.CACHE_MISSING_IMAGE = new Texture(obj.base);
  }

  /**
   * Adds an image to the cache.
   * @param {string} key - The unique key for this cache entry.
   * @param {string} url - The URL the image was loaded from.
   * @param {HTMLImageElement} data - The image data to cache.
   * @returns {object} The cached image object.
   */
  addImage(key, url, data) {
    if (this.checkImageKey(key)) {
      this.removeImage(key);
    }
    /* if (!data.complete) {
      this.game.logger.warn('Cache addImage %s is incomplete', key);
    } */
    const img = {
      key,
      url,
      data,
      base: new BaseTexture(data),
      frame: new Frame(0, 0, 0, data.width, data.height, key),
      frameData: new FrameData(),
    };
    img.frameData.addFrame(new Frame(0, 0, 0, data.width, data.height, url));
    this._cache.image[key] = img;
    this._resolveURL(url, img);
    return img;
  }

  /**
   * Adds a texture atlas to the cache.
   * @param {string} key - The unique key for this cache entry.
   * @param {string} url - The URL the atlas was loaded from.
   * @param {HTMLCanvasElement} data - The canvas data for the atlas.
   * @param {object} atlasData - The atlas data to cache.
   */
  addTextureAtlas(key, url, data, atlasData) {
    const obj = {
      key,
      url,
      data,
      base: new BaseTexture(data),
    };
    obj.frameData = JSONDataHash(this.game, atlasData, key);
    this._cache.image[key] = obj;
    this._resolveURL(url, obj);
  }

  /**
   * Adds sound data to the cache.
   * @param {string} key - The unique key for this cache entry.
   * @param {string} url - The URL the sound was loaded from.
   * @param {object} data - The sound data to cache.
   */
  addSound(key, url, data) {
    this._cache.sound[key] = {
      url,
      data,
      isDecoding: false,
      decoded: false,
    };
    this._resolveURL(url, this._cache.sound[key]);
  }

  /**
   * Adds text data to the cache.
   * @param {string} key - The unique key for this cache entry.
   * @param {string} url - The URL the text was loaded from.
   * @param {string} data - The text data to cache.
   */
  addText(key, url, data) {
    this._cache.text[key] = { url, data };
    this._resolveURL(url, this._cache.text[key]);
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
  addBitmapFont(key, url, data, atlasData, atlasType, xSpacing = 0, ySpacing = 0) {
    const obj = {
      url,
      data,
      font: null,
      base: new BaseTexture(data),
    };
    if (atlasType === 'json') {
      obj.font = jsonBitmapFont(atlasData, obj.base, xSpacing, ySpacing);
    } else {
      obj.font = xmlBitmapFont(atlasData, obj.base, xSpacing, ySpacing);
    }
    this._cache.bitmapFont[key] = obj;
    this._resolveURL(url, obj);
  }

  /**
   * Adds JSON data to the cache.
   * @param {string} key - The unique key for this cache entry.
   * @param {string} url - The URL the JSON was loaded from.
   * @param {object} data - The JSON data to cache.
   */
  addJSON(key, url, data) {
    this._cache.json[key] = { url, data };
    this._resolveURL(url, this._cache.json[key]);
  }

  /**
   * Adds XML data to the cache.
   * @param {string} key - The unique key for this cache entry.
   * @param {string} url - The URL the XML was loaded from.
   * @param {XMLDocument} data - The XML data to cache.
   */
  addXML(key, url, data) {
    this._cache.xml[key] = { url, data };
    this._resolveURL(url, this._cache.xml[key]);
  }

  // SOUND

  /**
   * Updates a sound property in the cache.
   * @param {string} key - The unique key for the cached sound.
   * @param {string} property - The property to update.
   * @param {any} value - The new value for the property.
   */
  updateSound(key, property, value) {
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
  decodedSound(key, data) {
    const sound = this.getSound(key);
    sound.data = data;
    sound.decoded = true;
    sound.isDecoding = false;
  }

  /**
   * Checks if a sound has been decoded in the cache.
   * @param {string} key - The unique key for the cached sound.
   * @returns {boolean} True if the sound is decoded, false otherwise.
   */
  isSoundDecoded(key) {
    const sound = this.getItem(key, SOUND, 'isSoundDecoded');
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
  isSoundReady(key) {
    const sound = this.getItem(key, SOUND, 'isSoundDecoded');
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
  checkKey(cache, key) {
    if (this._cacheMap[cache][key]) {
      return true;
    }
    return false;
  }

  /**
   * Checks if a URL has been resolved and cached.
   * @param {string} url - The URL to check.
   * @returns {boolean} True if the URL has been resolved and cached, false otherwise.
   */
  checkURL(url) {
    if (this._urlMap[this._resolveURL(url)]) {
      return true;
    }
    return false;
  }

  /**
   * Checks if a canvas cache entry exists.
   * @param {string} key - The unique key for the cache entry.
   * @returns {boolean} True if the entry exists, false otherwise.
   */
  checkCanvasKey(key) {
    return this.checkKey(CANVAS, key);
  }

  /**
   * Checks if an image cache entry exists.
   * @param {string} key - The unique key for the cache entry.
   * @returns {boolean} True if the entry exists, false otherwise.
   */
  checkImageKey(key) {
    return this.checkKey(IMAGE, key);
  }

  /**
   * Checks if a texture cache entry exists.
   * @param {string} key - The unique key for the cache entry.
   * @returns {boolean} True if the entry exists, false otherwise.
   */
  checkTextureKey(key) {
    return this.checkKey(TEXTURE, key);
  }

  /**
   * Checks if a sound cache entry exists.
   * @param {string} key - The unique key for the cache entry.
   * @returns {boolean} True if the entry exists, false otherwise.
   */
  checkSoundKey(key) {
    return this.checkKey(SOUND, key);
  }

  /**
   * Checks if a text cache entry exists.
   * @param {string} key - The unique key for the cache entry.
   * @returns {boolean} True if the entry exists, false otherwise.
   */
  checkTextKey(key) {
    return this.checkKey(TEXT, key);
  }

  /**
   * Checks if a bitmap data cache entry exists.
   * @param {string} key - The unique key for the cache entry.
   * @returns {boolean} True if the entry exists, false otherwise.
   */
  checkBitmapDataKey(key) {
    return this.checkKey(BITMAPDATA, key);
  }

  /**
   * Checks if a bitmap font cache entry exists.
   * @param {string} key - The unique key for the cache entry.
   * @returns {boolean} True if the entry exists, false otherwise.
   */
  checkBitmapFontKey(key) {
    return this.checkKey(BITMAPFONT, key);
  }

  /**
   * Checks if a JSON cache entry exists.
   * @param {string} key - The unique key for the cache entry.
   * @returns {boolean} True if the entry exists, false otherwise.
   */
  checkJSONKey(key) {
    return this.checkKey(JSONDATA, key);
  }

  /**
   * Checks if an XML cache entry exists.
   * @param {string} key - The unique key for the cache entry.
   * @returns {boolean} True if the entry exists, false otherwise.
   */
  checkXMLKey(key) {
    return this.checkKey(XML, key);
  }

  // GET

  /**
   * TBD.
   * @param {string} key - TBD.
   * @param {number} cache - TBD.
   * @param {string} method - TBD.
   * @param {string} property - TBD.
   * @returns {*} TBD.
   */
  getItem(key, cache, method, property = null) {
    if (this.checkKey(cache, key)) {
      if (!property) {
        return this._cacheMap[cache][key];
      }
      return this._cacheMap[cache][key][property];
    }
    return null;
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @returns {HTMLCanvasElement} TBD.
   */
  getCanvas(key) {
    return this.getItem(key, CANVAS, 'getCanvas', 'canvas');
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @param {boolean} full - TBD.
   * @returns {HTMLImageElement} TBD.
   */
  getImage(key = '__default', full = false) {
    let img = this.getItem(key, IMAGE, 'getImage');
    if (img === null) {
      img = this.getItem('__missing', IMAGE, 'getImage');
    }
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
  getTextureFrame(key) {
    return this.getItem(key, TEXTURE, 'getTextureFrame', 'frame');
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @returns {object} TBD.
   */
  getSound(key) {
    return this.getItem(key, SOUND, 'getSound');
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @returns {object} TBD.
   */
  getSoundData(key) {
    return this.getItem(key, SOUND, 'getSoundData', 'data');
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @returns {object} TBD.
   */
  getText(key) {
    return this.getItem(key, TEXT, 'getText', 'data');
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @returns {object} TBD.
   */
  getBitmapData(key) {
    return this.getItem(key, BITMAPDATA, 'getBitmapData', 'data');
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @returns {object} TBD.
   */
  getBitmapFont(key) {
    return this.getItem(key, BITMAPFONT, 'getBitmapFont');
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @param {boolean} isClone - TBD.
   * @returns {object} TBD.
   */
  getJSON(key, isClone = false) {
    const data = this.getItem(key, JSONDATA, 'getJSON', 'data');
    return isClone ? JSON.parse(JSON.stringify(data)) : data;
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @returns {XMLDocument} TBD.
   */
  getXML(key) {
    return this.getItem(key, XML, 'getXML', 'data');
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @returns {import('../display/webgl/render_texture.js').RenderTexture} TBD.
   */
  getRenderTexture(key) {
    return this.getItem(key, RENDER_TEXTURE, 'getRenderTexture');
  }

  // FRAME

  /**
   * Gets the base texture of a cache entry.
   * @param {string} key - The unique key for the cache entry.
   * @param {number} cache - The cache type (CANVAS, IMAGE, etc.).
   * @returns {BaseTexture} The base texture.
   */
  getBaseTexture(key, cache = IMAGE) {
    return this.getItem(key, cache, 'getBaseTexture', 'base');
  }

  /**
   * Gets a frame from the cache.
   * @param {string} key - The unique key for the cache entry.
   * @param {number} cache - The cache type (CANVAS, IMAGE, etc.).
   * @returns {Frame} The frame.
   */
  getFrame(key, cache = IMAGE) {
    return this.getItem(key, cache, 'getFrame', 'frame');
  }

  /**
   * Gets the frame count of a cache entry.
   * @param {string} key - The unique key for the cache entry.
   * @param {number} cache - The cache type (CANVAS, IMAGE, etc.).
   * @returns {number} The number of frames.
   */
  getFrameCount(key, cache = IMAGE) {
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
   * @returns {FrameData} The frame data.
   */
  getFrameData(key, cache = IMAGE) {
    return this.getItem(key, cache, 'getFrameData', 'frameData');
  }

  /**
   * Checks if a cache entry has frame data.
   * @param {string} key - The unique key for the cache entry.
   * @param {number} cache - The cache type (CANVAS, IMAGE, etc.).
   * @returns {boolean} True if the entry has frame data, false otherwise.
   */
  hasFrameData(key, cache = IMAGE) {
    return this.getItem(key, cache, '', 'frameData') !== null;
  }

  /**
   * Updates the frame data of a cache entry.
   * @param {string} key - The unique key for the cache entry.
   * @param {FrameData} frameData - The new frame data.
   * @param {number} cache - The cache type (CANVAS, IMAGE, etc.).
   */
  updateFrameData(key, frameData, cache = IMAGE) {
    if (this._cacheMap[cache][key]) {
      this._cacheMap[cache][key].frameData = frameData;
    }
  }

  /**
   * Gets a frame by index from the cache.
   * @param {string} key - The unique key for the cache entry.
   * @param {number} index - The index of the frame to get.
   * @param {number} cache - The cache type (CANVAS, IMAGE, etc.).
   * @returns {Frame} The frame at the specified index.
   */
  getFrameByIndex(key, index, cache = IMAGE) {
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
  getFrameByName(key, name, cache = IMAGE) {
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
  getURL(url) {
    const resolvedURL = this._resolveURL(url);
    if (resolvedURL) {
      return this._urlMap[resolvedURL];
    }
    this.game.logger.warn('Cache invalid url', { resolvedURL });
    return null;
  }

  /**
   * Gets all keys from a cache type.
   * @param {object} cache - The cache type (CANVAS, IMAGE, etc.).
   * @returns {string[]} An array of cache keys.
   */
  getKeys(cache = IMAGE) {
    const result = [];
    if (this._cacheMap[cache]) {
      const keys = Object.keys(this._cacheMap[cache]);
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
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
  removeCanvas(key) {
    delete this._cache.canvas[key];
  }

  /**
   * Removes an image cache entry.
   * @param {string} key - The unique key for the cache entry to remove.
   * @param {boolean} destroyBaseTexture - Whether to destroy the base texture (default: true).
   */
  removeImage(key, destroyBaseTexture = true) {
    const img = this.getImage(key, true);
    if (destroyBaseTexture && img.base) {
      img.base.destroy();
    }
    delete this._cache.image[key];
  }

  /**
   * Removes a sound cache entry.
   * @param {string} key - The unique key for the cache entry to remove.
   */
  removeSound(key) {
    delete this._cache.sound[key];
  }

  /**
   * Removes a text cache entry.
   * @param {string} key - The unique key for the cache entry to remove.
   */
  removeText(key) {
    delete this._cache.text[key];
  }

  /**
   * Removes a bitmap data cache entry.
   * @param {string} key - The unique key for the cache entry to remove.
   */
  removeBitmapData(key) {
    delete this._cache.bitmapData[key];
  }

  /**
   * Removes a bitmap font cache entry.
   * @param {string} key - The unique key for the cache entry to remove.
   */
  removeBitmapFont(key) {
    delete this._cache.bitmapFont[key];
  }

  /**
   * Removes a JSON cache entry.
   * @param {string} key - The unique key for the cache entry to remove.
   */
  removeJSON(key) {
    delete this._cache.json[key];
  }

  /**
   * Removes an XML cache entry.
   * @param {string} key - The unique key for the cache entry to remove.
   */
  removeXML(key) {
    delete this._cache.xml[key];
  }

  /**
   * Removes a render texture cache entry.
   * @param {string} key - The unique key for the cache entry to remove.
   */
  removeRenderTexture(key) {
    delete this._cache.renderTexture[key];
  }

  /**
   * Removes a sprite sheet cache entry.
   * @param {string} key - The unique key for the cache entry to remove.
   */
  removeSpriteSheet(key) {
    delete this._cache.spriteSheet[key];
  }

  /**
   * Removes a texture atlas cache entry.
   * @param {string} key - The unique key for the cache entry to remove.
   */
  removeTextureAtlas(key) {
    delete this._cache.atlas[key];
  }

  /**
   * Clears all GL textures from the cache.
   */
  clearGLTextures() {
    const keys = Object.keys(this._cache.image);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      this._cache.image[key].base._glTextures = [];
    }
  }

  /**
   * Resolves a URL and stores it in the cache.
   * @param {string} url - The URL to resolve.
   * @param {object} data - The data to associate with the resolved URL.
   * @returns {string} The resolved URL or null if not enabled.
   */
  _resolveURL(url, data) {
    if (!this.autoResolveURL) {
      return null;
    }
    this._urlResolver.src = this.game.load.baseURL + url;
    this._urlTemp = this._urlResolver.src;
    //  Ensure no request is actually made
    this._urlResolver.src = '';
    //  Record the URL to the map
    if (data) {
      this._urlMap[this._urlTemp] = data;
    }
    return this._urlTemp;
  }

  /**
   * Destroys the cache and cleans up resources.
   */
  destroy() {
    for (let i = 0; i < this._cacheMap.length; i += 1) {
      const cache = this._cacheMap[i];
      const keys = cache ? Object.keys(cache) : [];
      for (let j = 0; j < keys.length; j += 1) {
        const key = keys[j];
        if (key !== '__default' && key !== '__missing') {
          if (cache[key].destroy) {
            cache[key].destroy();
          }
          delete cache[key];
        }
      }
    }
    this._urlMap = null;
    this._urlResolver = null;
    this._urlTemp = null;
  }
}
