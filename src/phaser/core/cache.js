import { Texture } from '../display/webgl/texture';
import { BaseTexture } from '../display/webgl/base_texture';
import { RenderTexture } from '../display/webgl/render_texture';
import { Signal } from './signal';
import { Frame } from './frame';
import { FrameData } from './frame_data';
import { JSONDataHash } from './animation_parser';
import { jsonBitmapFont, xmlBitmapFont } from './loader_parser';
import { Game } from './game';

export const CANVAS = 0;
export const IMAGE = 1;
export const TEXTURE = 2;
export const SOUND = 3;
export const TEXT = 4;
export const BITMAPDATA = 5;
export const BITMAPFONT = 6;
export const JSON = 7;
export const XML = 8;
export const RENDER_TEXTURE = 9;

export class Cache {
  /**
   * TBD.
   * @param {Game} game - TBD.
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
    this._cacheMap[JSON] = this._cache.json;
    this._cacheMap[XML] = this._cache.xml;
    this._cacheMap[RENDER_TEXTURE] = this._cache.renderTexture;
    this.addDefaultImage();
    this.addMissingImage();
  }

  /**
   * TBD.
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
   * TBD.
   */
  addMissingImage() {
    const img = new Image();
    img.src =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJ9JREFUeNq01ssOwyAMRFG46v//Mt1ESmgh+DFmE2GPOBARKb2NVjo+17PXLD8a1+pl5+A+wSgFygymWYHBb0FtsKhJDdZlncG2IzJ4ayoMDv20wTmSMzClEgbWYNTAkQ0Z+OJ+A/eWnAaR9+oxCF4Os0H8htsMUp+pwcgBBiMNnAwF8GqIgL2hAzaGFFgZauDPKABmowZ4GL369/0rwACp2yA/ttmvsQAAAABJRU5ErkJggg==';
    const obj = this.addImage('__missing', null, img);
    window.PhaserRegistry.CACHE_MISSING_IMAGE = new Texture(obj.base);
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @param {string} url - TBD.
   * @param {HTMLCanvasElement} data - TBD.
   * @returns {object} TBD.
   */
  addImage(key, url, data) {
    if (this.checkImageKey(key)) {
      this.removeImage(key);
    }
    /* if (!data.complete) {
      console.warn('Cache addImage %s is incomplete', key);
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
   * TBD.
   * @param {string} key - TBD.
   * @param {string} url - TBD.
   * @param data - TBD.
   * @param {object} atlasData - TBD.
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
   * TBD.
   * @param {string} key - TBD.
   * @param {string} url - TBD.
   * @param data - TBD.
   */
  addSound(key, url, data) {
    this._cache.sound[key] = {
      url,
      data,
      isDecoding: false,
      decoded: false,
      locked: this.game.sound.isLocked,
    };
    this._resolveURL(url, this._cache.sound[key]);
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @param {string} url - TBD.
   * @param {string} data - TBD.
   */
  addText(key, url, data) {
    this._cache.text[key] = { url, data };
    this._resolveURL(url, this._cache.text[key]);
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @param {string} url - TBD.
   * @param {HTMLCanvasElement} data - TBD.
   * @param {object} atlasData - TBD.
   * @param {string} atlasType - TBD.
   * @param {number} xSpacing - TBD.
   * @param {number} ySpacing - TBD.
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
   * TBD.
   * @param {string} key - TBD.
   * @param {string} url - TBD.
   * @param {object} data - TBD.
   */
  addJSON(key, url, data) {
    this._cache.json[key] = { url, data };
    this._resolveURL(url, this._cache.json[key]);
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @param {string} url - TBD.
   * @param data - TBD.
   */
  addXML(key, url, data) {
    this._cache.xml[key] = { url, data };
    this._resolveURL(url, this._cache.xml[key]);
  }

  // SOUND

  /**
   * TBD.
   * @param {string} key - TBD.
   */
  reloadSound(key) {
    const scope = this;
    const sound = this.getSound(key);
    if (sound) {
      sound.data.src = sound.url;
      sound.data.addEventListener('canplaythrough', () => scope.reloadSoundComplete(key), false);
      sound.data.load();
    }
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   */
  reloadSoundComplete(key) {
    const sound = this.getSound(key);
    if (sound) {
      sound.locked = false;
      this.onSoundUnlock.dispatch(key);
    }
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @param {string} property - TBD.
   * @param {any} value - TBD.
   */
  updateSound(key, property, value) {
    const sound = this.getSound(key);
    if (sound) {
      sound[property] = value;
    }
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @param data - TBD.
   */
  decodedSound(key, data) {
    const sound = this.getSound(key);
    sound.data = data;
    sound.decoded = true;
    sound.isDecoding = false;
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @returns {boolean} TBD.
   */
  isSoundDecoded(key) {
    const sound = this.getItem(key, SOUND, 'isSoundDecoded');
    if (sound) {
      return sound.decoded;
    }
    return null;
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @returns {boolean} TBD.
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
   * TBD.
   * @param {number} cache - TBD.
   * @param {string} key - TBD.
   * @returns {boolean} TBD.
   */
  checkKey(cache, key) {
    if (this._cacheMap[cache][key]) {
      return true;
    }
    return false;
  }

  /**
   * TBD.
   * @param {string} url - TBD.
   * @returns {boolean} TBD.
   */
  checkURL(url) {
    if (this._urlMap[this._resolveURL(url)]) {
      return true;
    }
    return false;
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @returns {boolean} TBD.
   */
  checkCanvasKey(key) {
    return this.checkKey(CANVAS, key);
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @returns {boolean} TBD.
   */
  checkImageKey(key) {
    return this.checkKey(IMAGE, key);
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @returns {boolean} TBD.
   */
  checkTextureKey(key) {
    return this.checkKey(TEXTURE, key);
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @returns {boolean} TBD.
   */
  checkSoundKey(key) {
    return this.checkKey(SOUND, key);
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @returns {boolean} TBD.
   */
  checkTextKey(key) {
    return this.checkKey(TEXT, key);
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @returns {boolean} TBD.
   */
  checkBitmapDataKey(key) {
    return this.checkKey(BITMAPDATA, key);
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @returns {boolean} TBD.
   */
  checkBitmapFontKey(key) {
    return this.checkKey(BITMAPFONT, key);
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @returns {boolean} TBD.
   */
  checkJSONKey(key) {
    return this.checkKey(JSON, key);
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @returns {boolean} TBD.
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
   * @param full - TBD.
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
   */
  getTextureFrame(key) {
    return this.getItem(key, TEXTURE, 'getTextureFrame', 'frame');
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   */
  getSound(key) {
    return this.getItem(key, SOUND, 'getSound');
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   */
  getSoundData(key) {
    return this.getItem(key, SOUND, 'getSoundData', 'data');
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   */
  getText(key) {
    return this.getItem(key, TEXT, 'getText', 'data');
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   */
  getBitmapData(key) {
    return this.getItem(key, BITMAPDATA, 'getBitmapData', 'data');
  }

  /**
   * TBD.
   * @param {string} key - TBD.
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
    const data = this.getItem(key, JSON, 'getJSON', 'data');
    return isClone ? JSON.parse(JSON.stringify(data)) : data;
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   */
  getXML(key) {
    return this.getItem(key, XML, 'getXML', 'data');
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @returns {RenderTexture} TBD.
   */
  getRenderTexture(key) {
    return this.getItem(key, RENDER_TEXTURE, 'getRenderTexture');
  }

  // FRAME

  /**
   * TBD.
   * @param {string} key - TBD.
   * @param {number} cache - TBD.
   * @returns {BaseTexture} TBD.
   */
  getBaseTexture(key, cache = IMAGE) {
    return this.getItem(key, cache, 'getBaseTexture', 'base');
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @param {number} cache - TBD.
   * @returns {Frame} TBD.
   */
  getFrame(key, cache = IMAGE) {
    return this.getItem(key, cache, 'getFrame', 'frame');
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @param {number} cache - TBD.
   * @returns {number} TBD.
   */
  getFrameCount(key, cache = IMAGE) {
    const data = this.getFrameData(key, cache);
    if (data) {
      return data.total;
    }
    return 0;
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @param {number} cache - TBD.
   * @returns {FrameData} TBD.
   */
  getFrameData(key, cache = IMAGE) {
    return this.getItem(key, cache, 'getFrameData', 'frameData');
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @param {number} cache - TBD.
   * @returns {boolean} TBD.
   */
  hasFrameData(key, cache = IMAGE) {
    return this.getItem(key, cache, '', 'frameData') !== null;
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @param {FrameData} frameData - TBD.
   * @param {number} cache - TBD.
   */
  updateFrameData(key, frameData, cache = IMAGE) {
    if (this._cacheMap[cache][key]) {
      this._cacheMap[cache][key].frameData = frameData;
    }
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @param {number} index - TBD.
   * @param {number} cache - TBD.
   * @returns {Frame} TBD.
   */
  getFrameByIndex(key, index, cache = IMAGE) {
    const data = this.getFrameData(key, cache);
    if (data) {
      return data.getFrame(index);
    }
    return null;
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @param {string} name - TBD.
   * @param {number} cache - TBD.
   * @returns {Frame} TBD.
   */
  getFrameByName(key, name, cache = IMAGE) {
    const data = this.getFrameData(key, cache);
    if (data) {
      return data.getFrameByName(name);
    }
    return null;
  }

  /**
   * TBD.
   * @param {string} url - TBD.
   * @returns {string} TBD.
   */
  getURL(url) {
    const resolvedURL = this._resolveURL(url);
    if (resolvedURL) {
      return this._urlMap[resolvedURL];
    }
    console.warn('Cache invalid url', resolvedURL);
    return null;
  }

  /**
   * TBD.
   * @param {object} cache - TBD.
   * @returns {string[]} TBD.
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
   * TBD.
   * @param {string} key - TBD.
   */
  removeCanvas(key) {
    delete this._cache.canvas[key];
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @param {boolean} destroyBaseTexture - TBD.
   */
  removeImage(key, destroyBaseTexture = true) {
    const img = this.getImage(key, true);
    if (destroyBaseTexture && img.base) {
      img.base.destroy();
    }
    delete this._cache.image[key];
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   */
  removeSound(key) {
    delete this._cache.sound[key];
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   */
  removeText(key) {
    delete this._cache.text[key];
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   */
  removeBitmapData(key) {
    delete this._cache.bitmapData[key];
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   */
  removeBitmapFont(key) {
    delete this._cache.bitmapFont[key];
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   */
  removeJSON(key) {
    delete this._cache.json[key];
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   */
  removeXML(key) {
    delete this._cache.xml[key];
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   */
  removeRenderTexture(key) {
    delete this._cache.renderTexture[key];
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   */
  removeSpriteSheet(key) {
    delete this._cache.spriteSheet[key];
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   */
  removeTextureAtlas(key) {
    delete this._cache.atlas[key];
  }

  /**
   * TBD.
   */
  clearGLTextures() {
    const keys = Object.keys(this._cache.image);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      this._cache.image[key].base._glTextures = [];
    }
  }

  /**
   * TBD.
   * @param {string} url - TBD.
   * @param {object} data - TBD.
   * @returns {string} TBD.
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
   * TBD.
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
