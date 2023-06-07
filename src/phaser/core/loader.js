import { Signal } from './signal';
import { Rectangle } from '../geom/rectangle';
import { canPlayAudio } from './device_util';

const TEXTURE_ATLAS_JSON_HASH = 1;

export class Loader {
  /**
   * TBD.
   * @param {import('./game').Game} game - TBD.
   */
  constructor(game) {
    this.game = game;
    this.cache = game.cache;
    this.isLoading = false;
    this.isUseLog = false;
    this.isUseRetry = true;
    this.maxRetry = 3;
    this.hasLoaded = false;
    this.preloadSprite = null;
    this.crossOrigin = false;
    this.baseURL = '';
    this.path = '';
    this.headers = {
      requestedWith: false,
      json: 'application/json',
      xml: 'application/xml',
    };
    this.onLoadStart = new Signal();
    this.onLoadComplete = new Signal();
    this.onPackComplete = new Signal();
    this.onFileStart = new Signal();
    this.onFileComplete = new Signal();
    this.onFileError = new Signal();
    this.maxParallelDownloads = this.game.config.maxParallelDownloads || 16;
    this._withSyncPointDepth = 0;
    this._fileList = [];
    this._flightQueue = [];
    this._processingHead = 0;
    this._fileLoadStarted = false;
    this._totalPackCount = 0;
    this._totalFileCount = 0;
    this._loadedPackCount = 0;
    this._loadedFileCount = 0;
  }

  /**
   * TBD.
   * @param {import('../display/image').Image} sprite - TBD.
   * @param {number} direction - TBD.
   */
  setPreloadSprite(sprite, direction = 0) {
    this.preloadSprite = {
      sprite,
      direction,
      width: sprite.width,
      height: sprite.height,
      rect: null,
    };
    if (direction === 0) {
      // Horizontal rect
      this.preloadSprite.rect = new Rectangle(0, 0, 1, sprite.height);
    } else {
      // Vertical rect
      this.preloadSprite.rect = new Rectangle(0, 0, sprite.width, 1);
    }
    sprite.crop(this.preloadSprite.rect);
    sprite.visible = true;
  }

  /**
   * TBD.
   */
  resize() {
    if (this.preloadSprite && this.preloadSprite.height !== this.preloadSprite.sprite.height) {
      this.preloadSprite.rect.height = this.preloadSprite.sprite.height;
    }
  }

  /**
   * TBD.
   * @param {string} type - TBD.
   * @param {string} key - TBD.
   * @returns {boolean} TBD.
   */
  checkKeyExists(type, key) {
    return this.getAssetIndex(type, key) > -1;
  }

  /**
   * TBD.
   * @param {string} type - TBD.
   * @param {string} key - TBD.
   * @returns {number} TBD.
   */
  getAssetIndex(type, key) {
    let bestFound = -1;
    for (let i = 0; i < this._fileList.length; i += 1) {
      const file = this._fileList[i];
      if (file.type === type && file.key === key) {
        bestFound = i;
        // An already loaded/loading file may be superceded.
        if (!file.loaded && !file.loading) {
          break;
        }
      }
    }

    return bestFound;
  }

  /**
   * TBD.
   * @param {string} type - TBD.
   * @param {string} key - TBD.
   * @returns {object} TBD.
   */
  getAsset(type, key) {
    const fileIndex = this.getAssetIndex(type, key);
    if (fileIndex > -1) {
      return { index: fileIndex, file: this._fileList[fileIndex] };
    }
    return null;
  }

  /**
   * TBD.
   * @param {boolean} hard - TBD.
   * @param {boolean} clearEvents - TBD.
   */
  reset(hard = false, clearEvents = false) {
    if (hard) {
      this.preloadSprite = null;
    }
    this.isLoading = false;
    this._processingHead = 0;
    this._fileList.length = 0;
    this._flightQueue.length = 0;
    this._fileLoadStarted = false;
    this._totalFileCount = 0;
    this._totalPackCount = 0;
    this._loadedPackCount = 0;
    this._loadedFileCount = 0;
    if (clearEvents) {
      this.onLoadStart.removeAll();
      this.onLoadComplete.removeAll();
      this.onPackComplete.removeAll();
      this.onFileStart.removeAll();
      this.onFileComplete.removeAll();
      this.onFileError.removeAll();
    }
  }

  /**
   * TBD.
   * @param {string} type - TBD.
   * @param {string} key - TBD.
   * @param {string} url - TBD.
   * @param {object} properties - TBD.
   * @param {boolean} overwrite - TBD.
   * @param {string} extension - TBD.
   * @returns {Loader} TBD.
   */
  addToFileList(type, key = '', url = null, properties = null, overwrite = false, extension = null) {
    if (key === undefined || key === '') {
      console.warn('Loader: Invalid or no key given of type ' + type);
      return this;
    }
    if (url === undefined || url === null) {
      if (extension) {
        url = key + extension;
      } else {
        console.warn('Loader: No URL given for file type: ' + type + ' key: ' + key);
        return this;
      }
    }
    const file = {
      type,
      key,
      path: this.path,
      url,
      syncPoint: this._withSyncPointDepth > 0,
      data: null,
      loading: false,
      loaded: false,
      error: false,
    };
    if (properties) {
      const keys = Object.keys(properties);
      for (let i = 0; i < keys.length; i += 1) {
        const prop = keys[i];
        file[prop] = properties[prop];
      }
    }
    const fileIndex = this.getAssetIndex(type, key);
    if (overwrite && fileIndex > -1) {
      const currentFile = this._fileList[fileIndex];
      if (!currentFile.loading && !currentFile.loaded) {
        this._fileList[fileIndex] = file;
      } else {
        this._fileList.push(file);
        this._totalFileCount += 1;
      }
    } else if (fileIndex === -1) {
      this._fileList.push(file);
      this._totalFileCount += 1;
    }
    return this;
  }

  /**
   * TBD.
   * @param {string} type - TBD.
   * @param {string} key - TBD.
   * @param {string} url - TBD.
   * @param {object} properties - TBD.
   * @returns {Loader} TBD.
   */
  replaceInFileList(type, key, url, properties) {
    return this.addToFileList(type, key, url, properties, true);
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @param {string} url - TBD.
   * @param {object} data - TBD.
   * @param {object} callbackContext - TBD.
   * @returns {Loader} TBD.
   */
  pack(key, url, data, callbackContext) {
    const pack = {
      type: 'packfile',
      key: key,
      url: url,
      path: this.path,
      syncPoint: true,
      data: null,
      loading: false,
      loaded: false,
      error: false,
      callbackContext: callbackContext,
    };
    if (data) {
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }
      pack.data = data || {};
      pack.loaded = true;
    }
    for (let i = 0; i < this._fileList.length + 1; i += 1) {
      const file = this._fileList[i];
      if (!file || (!file.loaded && !file.loading && file.type !== 'packfile')) {
        this._fileList.splice(i, 0, pack);
        this._totalPackCount += 1;
        break;
      }
    }
    return this;
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @param {string} url - TBD.
   * @param {boolean} overwrite - TBD.
   * @returns {Loader} TBD.
   */
  image(key, url, overwrite = false) {
    return this.addToFileList('image', key, url, undefined, overwrite, '.png');
  }

  /**
   * TBD.
   * @param {string[]} keys - TBD.
   * @param {string[]} urls - TBD.
   * @returns {Loader} TBD.
   */
  images(keys, urls) {
    if (Array.isArray(urls)) {
      for (let i = 0; i < keys.length; i += 1) {
        this.image(keys[i], urls[i]);
      }
    } else {
      for (let i = 0; i < keys.length; i += 1) {
        this.image(keys[i]);
      }
    }
    return this;
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @param {string} url - TBD.
   * @param {boolean} overwrite - TBD.
   * @returns {Loader} TBD.
   */
  text(key, url, overwrite) {
    return this.addToFileList('text', key, url, undefined, overwrite, '.txt');
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @param {string} url - TBD.
   * @param {boolean} overwrite - TBD.
   * @returns {Loader} TBD.
   */
  json(key, url, overwrite) {
    return this.addToFileList('json', key, url, undefined, overwrite, '.json');
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @param {string} url - TBD.
   * @param {boolean} overwrite - TBD.
   * @returns {Loader} TBD.
   */
  xml(key, url, overwrite) {
    return this.addToFileList('xml', key, url, undefined, overwrite, '.xml');
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @param {string} url - TBD.
   * @param {number} frameWidth - TBD.
   * @param {number} frameHeight - TBD.
   * @param {number} frameMax - TBD.
   * @param {number} margin - TBD.
   * @param {number} spacing - TBD.
   * @returns {Loader} TBD.
   */
  spritesheet(key, url, frameWidth, frameHeight, frameMax = -1, margin = 0, spacing = 0) {
    return this.addToFileList(
      'spritesheet',
      key,
      url,
      { frameWidth, frameHeight, frameMax, margin, spacing },
      false,
      '.png'
    );
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @param {string[]} urls - TBD.
   * @param {boolean} autoDecode - TBD.
   * @returns {Loader} TBD.
   */
  audio(key, urls, autoDecode = true) {
    if (this.game.sound.noAudio) {
      return this;
    }
    if (typeof urls === 'string') {
      urls = [urls];
    }
    return this.addToFileList('audio', key, urls, { buffer: null, autoDecode });
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @param {string} urls - TBD.
   * @param {string} jsonURL - TBD.
   * @param {object} jsonData - TBD.
   * @param {boolean} autoDecode - TBD.
   * @returns {Loader} TBD.
   */
  audioSprite(key, urls, jsonURL, jsonData, autoDecode = true) {
    if (this.game.sound.noAudio) {
      return this;
    }
    this.audio(key, urls, autoDecode);
    if (jsonURL) {
      this.json(key + '-audioatlas', jsonURL);
    } else if (jsonData) {
      if (typeof jsonData === 'string') {
        jsonData = JSON.parse(jsonData);
      }
      this.cache.addJSON(key + '-audioatlas', '', jsonData);
    }
    return this;
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @param {string} textureURL - TBD.
   * @param {string} atlasURL - TBD.
   * @param {object} atlasData - TBD.
   * @param {number} xSpacing - TBD.
   * @param {number} ySpacing - TBD.
   * @returns {Loader} TBD.
   * @throws Error.
   */
  bitmapFont(key, textureURL = null, atlasURL = null, atlasData = null, xSpacing = 0, ySpacing = 0) {
    if (textureURL === undefined || textureURL === null) {
      textureURL = key + '.png';
    }
    if (atlasURL === null && atlasData === null) {
      atlasURL = key + '.xml';
    }
    //  A URL to a json/xml atlas has been given
    if (atlasURL) {
      this.addToFileList('bitmapfont', key, textureURL, { atlasURL, xSpacing, ySpacing });
    } else if (typeof atlasData === 'string') {
      //  A stringified xml/json atlas has been given
      let json = null;
      let xml = null;
      try {
        json = JSON.parse(atlasData);
      } catch (e) {
        xml = this.parseXml(atlasData);
      }
      if (!xml && !json) {
        throw new Error('Loader. Invalid Bitmap Font atlas given');
      }
      this.addToFileList('bitmapfont', key, textureURL, {
        atlasURL: null,
        atlasData: json || xml,
        atlasType: json ? 'json' : 'xml',
        xSpacing,
        ySpacing,
      });
    }
    return this;
  }

  /**
   * TBD.
   * @param {string} key - TBD.
   * @param {string} textureURL - TBD.
   * @param {string} atlasURL - TBD.
   * @param {object} atlasData - TBD.
   * @param {number} format - TBD.
   * @returns {Loader} TBD.
   */
  atlas(key, textureURL, atlasURL = null, atlasData = null, format = TEXTURE_ATLAS_JSON_HASH) {
    if (textureURL === undefined || textureURL === null) {
      textureURL = key + '.png';
    }
    if (!atlasURL && !atlasData) {
      atlasURL = key + '.json';
    }
    //  A URL to a json/xml file has been given
    if (atlasURL) {
      this.addToFileList('textureatlas', key, textureURL, { atlasURL, format });
    } else {
      this.addToFileList('textureatlas', key, textureURL, { atlasURL: null, atlasData, format });
    }
    return this;
  }

  /**
   * TBD.
   * @param {Function} callback - TBD.
   * @param {object} callbackContext - TBD.
   * @returns {Loader} TBD.
   */
  withSyncPoint(callback, callbackContext) {
    this._withSyncPointDepth += 1;
    try {
      callback.call(callbackContext || this, this);
    } finally {
      this._withSyncPointDepth -= 1;
    }
    return this;
  }

  /**
   * TBD.
   * @param {string} type - TBD.
   * @param {string} key - TBD.
   * @returns {Loader} TBD.
   */
  addSyncPoint(type, key) {
    const asset = this.getAsset(type, key);
    if (asset) {
      asset.file.syncPoint = true;
    }
    return this;
  }

  /**
   * TBD.
   * @param {string} type - TBD.
   * @param {string} key - TBD.
   */
  removeFile(type, key) {
    const asset = this.getAsset(type, key);
    if (asset) {
      if (!asset.loaded && !asset.loading) {
        this._fileList.splice(asset.index, 1);
      }
    }
  }

  /**
   * TBD.
   */
  removeAll() {
    this._fileList.length = 0;
    this._flightQueue.length = 0;
  }

  /**
   * TBD.
   */
  start() {
    if (this.isLoading) {
      return;
    }
    this.hasLoaded = false;
    this.isLoading = true;
    this.updateProgress();
    this.processLoadQueue();
  }

  /**
   * TBD.
   */
  processLoadQueue() {
    if (!this.isLoading) {
      console.warn('Loader - active loading canceled / reset');
      this.finishedLoading(true);
      return;
    }
    // Empty the flight queue as applicable
    for (let i = 0; i < this._flightQueue.length; i += 1) {
      const file = this._flightQueue[i];
      if (file.loaded || file.error) {
        this._flightQueue.splice(i, 1);
        i -= 1;
        file.loading = false;
        file.requestUrl = null;
        file.requestObject = null;
        if (file.error) {
          this.onFileError.dispatch(file.key, file);
        }
        if (file.type !== 'packfile') {
          this._loadedFileCount += 1;
          this.onFileComplete.dispatch(
            this.progress,
            file.key,
            !file.error,
            this._loadedFileCount,
            this._totalFileCount
          );
        } else if (file.type === 'packfile' && file.error) {
          // Non-error pack files are handled when processing the file queue
          this._loadedPackCount += 1;
          this.onPackComplete.dispatch(file.key, !file.error, this._loadedPackCount, this._totalPackCount);
        }
      }
    }
    // When true further non-pack file downloads are suppressed
    let syncblock = false;
    const inflightLimit = this.maxParallelDownloads;
    for (let i = this._processingHead; i < this._fileList.length; i += 1) {
      const file = this._fileList[i];
      // Pack is fetched (ie. has data) and is currently at the start of the process queue.
      if (file.type === 'packfile' && !file.error && file.loaded && i === this._processingHead) {
        // Processing the pack / adds more files
        this.processPack(file);
        this._loadedPackCount += 1;
        this.onPackComplete.dispatch(file.key, !file.error, this._loadedPackCount, this._totalPackCount);
      }
      if (file.loaded || file.error) {
        // Item at the start of file list finished, can skip it in future
        if (i === this._processingHead) {
          this._processingHead = i + 1;
        }
      } else if (!file.loading && this._flightQueue.length < inflightLimit) {
        // -> not loaded/failed, not loading
        if (file.type === 'packfile' && !file.data) {
          // Fetches the pack data: the pack is processed above as it reaches queue-start.
          // (Packs do not trigger onLoadStart or onFileStart.)
          this._flightQueue.push(file);
          file.loading = true;
          this.loadFile(file);
        } else if (!syncblock) {
          if (!this._fileLoadStarted) {
            this._fileLoadStarted = true;
            this.onLoadStart.dispatch();
          }
          this._flightQueue.push(file);
          file.loading = true;
          this.onFileStart.dispatch(this.progress, file.key, file.url);
          this.loadFile(file);
        }
      }
      if (!file.loaded && file.syncPoint) {
        syncblock = true;
      }
      // Stop looking if queue full - or if syncblocked and there are no more packs.
      // (As only packs can be loaded around a syncblock)
      if (this._flightQueue.length >= inflightLimit || (syncblock && this._loadedPackCount === this._totalPackCount)) {
        break;
      }
    }
    this.updateProgress();
    // True when all items in the queue have been advanced over
    // (There should be no inflight items as they are complete - loaded/error.)
    if (this._processingHead >= this._fileList.length) {
      this.finishedLoading();
    } else if (!this._flightQueue.length) {
      // Flight queue is empty but file list is not done being processed.
      // This indicates a critical internal error with no known recovery.
      console.warn('Loader - aborting: processing queue empty, loading may have stalled');
      const scope = this;
      setTimeout(() => {
        scope.finishedLoading(true);
      }, 2000);
    }
  }

  /**
   * TBD.
   * @param {boolean} abnormal - TBD.
   */
  finishedLoading(abnormal) {
    if (this.hasLoaded) {
      return;
    }
    this.hasLoaded = true;
    this.isLoading = false;
    // If there were no files make sure to trigger the event anyway, for consistency
    if (!abnormal && !this._fileLoadStarted) {
      this._fileLoadStarted = true;
      this.onLoadStart.dispatch();
    }
    // https://github.com/photonstorm/phaser-ce/pull/54/
    this.reset();
    this.onLoadComplete.dispatch();
    this.game.state.loadComplete();
    // https://github.com/photonstorm/phaser-ce/pull/54/
    // this.reset();
  }

  /**
   * TBD.
   * @param {object} file - TBD.
   * @param {string} errorMessage - TBD.
   */
  asyncComplete(file, errorMessage = '') {
    file.loaded = true;
    file.error = !!errorMessage;
    if (file.error) {
      file.errorMessage = errorMessage;
      console.warn(file, errorMessage);
    }
    this.log('asyncComplete', file);
    this.processLoadQueue();
  }

  /**
   * TBD.
   * @param {object} pack - TBD.
   */
  processPack(pack) {
    const packData = pack.data[pack.key];
    if (!packData) {
      console.warn('Missing loader pack key', pack.key);
      return;
    }
    const packDataCompat = Array.isArray(packData) ? packData : packData.files;
    for (let i = 0; i < packDataCompat.length; i += 1) {
      const file = packDataCompat[i];
      switch (file.type) {
        case 'image':
          this.image(file.key, file.url, file.overwrite);
          break;
        case 'text':
          this.text(file.key, file.url, file.overwrite);
          break;
        case 'json':
          this.json(file.key, file.url, file.overwrite);
          break;
        case 'xml':
          this.xml(file.key, file.url, file.overwrite);
          break;
        case 'spritesheet':
          this.spritesheet(
            file.key,
            file.url,
            file.frameWidth,
            file.frameHeight,
            file.frameMax,
            file.margin,
            file.spacing
          );
          break;
        case 'audio':
          this.audio(file.key, file.urls ? file.urls : file.url);
          break;
        case 'audiosprite':
          this.audioSprite(file.key, file.urls ? file.urls : file.url, file.jsonURL, file.jsonData);
          break;
        case 'audioSprite':
          this.audioSprite(file.key, file.audioURL, file.jsonURL, file.jsonData);
          break;
        case 'bitmapFont':
          this.bitmapFont(
            file.key,
            file.textureURL,
            file.fontDataURL ? file.fontDataURL : file.atlasURL,
            file.atlasData,
            file.xSpacing,
            file.ySpacing
          );
          break;
        case 'atlas':
          this.atlas(file.key, file.textureURL, file.atlasURL, file.atlasData, TEXTURE_ATLAS_JSON_HASH);
          break;
      }
    }
  }

  /**
   * TBD.
   * @param {string} url - TBD.
   * @param {object} file - TBD.
   * @returns {string} TBD.
   */
  transformUrl(url, file) {
    if (!url) {
      return false;
    }
    if (url.match(/^(?:blob:|data:|http:\/\/|https:\/\/|\/\/)/)) {
      return url;
    }
    return this.baseURL + file.path + url;
  }

  /**
   * TBD.
   * @param {object} file - TBD.
   */
  loadFile(file) {
    switch (file.type) {
      case 'packfile':
        this.xhrLoad(file, this.transformUrl(file.url, file), 'text', this.fileComplete);
        break;
      case 'image':
      case 'spritesheet':
      case 'textureatlas':
      case 'bitmapfont':
        this.loadImageTag(file);
        break;
      case 'audio':
        file.url = this.getAudioURL(file.url);
        if (file.url) {
          this.xhrLoad(file, this.transformUrl(file.url, file), 'arraybuffer', this.fileComplete);
        } else {
          this.fileError(file, null, 'No supported audio URL specified or device does not have audio playback support');
        }
        break;
      case 'json':
        this.xhrLoad(file, this.transformUrl(file.url, file), 'text', this.jsonLoadComplete);
        break;
      case 'xml':
        this.xhrLoad(file, this.transformUrl(file.url, file), 'text', this.xmlLoadComplete);
        break;
      case 'text':
        this.xhrLoad(file, this.transformUrl(file.url, file), 'text', this.fileComplete);
        break;
      default:
        // pass
        break;
    }
  }

  /**
   * TBD.
   * @param {object} file - TBD.
   */
  loadImageTag(file) {
    this.log('loadImageTag', file);
    const scope = this;
    file.data = new Image();
    file.data.name = file.key;
    if (this.crossOrigin) {
      file.data.crossOrigin = this.crossOrigin;
    }
    file.data.onload = () => {
      if (file.data.onload) {
        file.data.onload = null;
        file.data.onerror = null;
        scope.fileComplete(file);
      }
    };
    file.data.onerror = () => {
      if (scope.isUseRetry && (!file.numRetry || file.numRetry < scope.maxRetry)) {
        setTimeout(() => {
          file.numRetry = !file.numRetry ? 1 : (file.numRetry += 1);
          scope.loadImageTag(file);
        }, 1000);
      } else if (file.data.onload) {
        file.data.onload = null;
        file.data.onerror = null;
        scope.fileError(file);
      }
    };
    file.data.src = this.transformUrl(file.url, file);
  }

  /**
   * TBD.
   * @param {object} file - TBD.
   * @param {string} url - TBD.
   * @param {string} type - TBD.
   * @param {Function} onload - TBD.
   * @param {Function} onerror - TBD.
   */
  xhrLoad(file, url, type, onload, onerror = null) {
    this.log('xhrLoad', file);
    const scope = this;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = type;
    if (this.headers.requestedWith !== false) {
      xhr.setRequestHeader('X-Requested-With', this.headers.requestedWith);
    }
    if (this.headers[file.type]) {
      xhr.setRequestHeader('Accept', this.headers[file.type]);
    }
    onerror = onerror || this.fileError;
    xhr.onload = () => {
      try {
        if (xhr.readyState === 4 && xhr.status >= 400 && xhr.status <= 599) {
          // Handle HTTP status codes of 4xx and 5xx as errors, even if xhr.onerror was not called.
          if (scope.isUseRetry && (!file.numRetry || file.numRetry < scope.maxRetry)) {
            setTimeout(() => {
              file.numRetry = !file.numRetry ? 1 : (file.numRetry += 1);
              scope.xhrLoad(file, url, type, onload, onerror);
            }, 1000);
            return null;
          } else {
            return onerror.call(scope, file, xhr);
          }
        }
        return onload.call(scope, file, xhr);
      } catch (e) {
        //  If this was the last file in the queue and an error is thrown in the create method
        //  then it's caught here, so be sure we don't carry on processing it
        if (!scope.hasLoaded) {
          scope.asyncComplete(file, e.message || 'Exception');
        } else {
          scope.game.exceptionHandler(e);
        }
      }
      return null;
    };
    xhr.onerror = () => {
      if (scope.isUseRetry && (!file.numRetry || file.numRetry < scope.maxRetry)) {
        setTimeout(() => {
          file.numRetry = !file.numRetry ? 1 : (file.numRetry += 1);
          scope.xhrLoad(file, url, type, onload, onerror);
        }, 1000);
      } else {
        try {
          return onerror.call(scope, file, xhr);
        } catch (e) {
          if (!scope.hasLoaded) {
            scope.asyncComplete(file, e.message || 'Exception');
          } else {
            scope.game.exceptionHandler(e);
          }
        }
      }
      return null;
    };
    file.requestObject = xhr;
    file.requestUrl = url;
    xhr.send();
  }

  /**
   * TBD.
   */
  xhrLoadWithXDR() {
    // TODO
    console.warn('loader.xhrLoadWithXDR() is not implemented');
  }

  /**
   * TBD.
   * @param {object[]} urls - TBD.
   * @returns {string} TBD.
   */
  getAudioURL(urls) {
    if (this.game.sound.noAudio) {
      return null;
    }
    for (let i = 0; i < urls.length; i += 1) {
      let url = urls[i];
      let audioType = null;
      if (url.uri) {
        // {uri: .., type: ..} pair
        audioType = url.type;
        url = url.uri;
        if (canPlayAudio(this.game.device, audioType)) {
          return url;
        }
      } else {
        // Assume direct-data URI can be played if not in a paired form; select immediately
        if (url.indexOf('blob:') === 0 || url.indexOf('data:') === 0) {
          return url;
        }
        if (url.indexOf('?') >= 0) {
          // Remove query from URL
          url = url.substr(0, url.indexOf('?'));
        }
        const extension = url.substr((Math.max(0, url.lastIndexOf('.')) || Infinity) + 1);
        audioType = extension.toLowerCase();
        if (canPlayAudio(this.game.device, audioType)) {
          return urls[i];
        }
      }
    }
    return null;
  }

  /**
   * TBD.
   * @param {object} file - TBD.
   * @param {XMLHttpRequest} xhr - TBD.
   * @param {number} reason - TBD.
   */
  fileError(file, xhr = null, reason = 0) {
    // const url = file.requestUrl || this.transformUrl(file.url, file);
    if (!reason && xhr) {
      reason = xhr.status;
    }
    const message = 'Error loading asset (' + reason + ')';
    this.asyncComplete(file, message);
  }

  /**
   * TBD.
   * @param {object} file - TBD.
   * @param {XMLHttpRequest} xhr - TBD.
   * @throws Error.
   */
  fileComplete(file, xhr) {
    let loadNext = true;
    switch (file.type) {
      case 'packfile':
        // Pack data must never be false-ish after it is fetched without error
        file.data = JSON.parse(xhr.responseText) || {};
        break;
      case 'image':
        this.cache.addImage(file.key, file.url, file.data);
        break;
      case 'spritesheet':
        this.cache.addSpriteSheet(
          file.key,
          file.url,
          file.data,
          file.frameWidth,
          file.frameHeight,
          file.frameMax,
          file.margin,
          file.spacing
        );
        break;
      case 'textureatlas':
        if (file.atlasURL == null) {
          this.cache.addTextureAtlas(file.key, file.url, file.data, file.atlasData, file.format);
        } else {
          loadNext = false;
          if (file.format === TEXTURE_ATLAS_JSON_HASH) {
            this.xhrLoad(file, this.transformUrl(file.atlasURL, file), 'text', this.jsonLoadComplete);
          } else {
            throw new Error('Invalid Texture Atlas format: ' + file.format);
          }
        }
        break;
      case 'bitmapfont':
        if (!file.atlasURL) {
          this.cache.addBitmapFont(
            file.key,
            file.url,
            file.data,
            file.atlasData,
            file.atlasType,
            file.xSpacing,
            file.ySpacing
          );
        } else {
          //  Load the XML before carrying on with the next file
          loadNext = false;
          this.xhrLoad(file, this.transformUrl(file.atlasURL, file), 'text', (bitmapFontFile, bitmapFontXhr) => {
            let json;
            try {
              // Try to parse as JSON, if it fails, then it's hopefully XML
              json = JSON.parse(bitmapFontXhr.responseText);
            } catch (e) {
              // pass
            }
            if (json) {
              bitmapFontFile.atlasType = 'json';
              this.jsonLoadComplete(bitmapFontFile, bitmapFontXhr);
            } else {
              bitmapFontFile.atlasType = 'xml';
              this.xmlLoadComplete(bitmapFontFile, bitmapFontXhr);
            }
          });
        }
        break;
      case 'audio':
        file.data = xhr.response;
        this.cache.addSound(file.key, file.url, file.data);
        if (file.autoDecode) {
          this.game.sound.decode(file.key);
        }
        break;
      case 'text':
        file.data = xhr.responseText;
        this.cache.addText(file.key, file.url, file.data);
        break;
      default:
        // pass
        break;
    }
    if (loadNext) {
      this.asyncComplete(file);
    }
  }

  /**
   * TBD.
   * @param {object} file - TBD.
   * @param {XMLHttpRequest} xhr - TBD.
   */
  jsonLoadComplete(file, xhr) {
    const data = JSON.parse(xhr.responseText);
    if (file.type === 'bitmapfont') {
      this.cache.addBitmapFont(file.key, file.url, file.data, data, file.atlasType, file.xSpacing, file.ySpacing);
    } else if (file.type === 'json') {
      this.cache.addJSON(file.key, file.url, data);
    } else {
      this.cache.addTextureAtlas(file.key, file.url, file.data, data, file.format);
    }
    this.asyncComplete(file);
  }

  /**
   * TBD.
   */
  csvLoadComplete() {
    // TODO
    console.warn('loader.csvLoadComplete() is not implemented');
  }

  /**
   * TBD.
   * @param {object} file - TBD.
   * @param {XMLHttpRequest} xhr - TBD.
   */
  xmlLoadComplete(file, xhr) {
    // Always try parsing the content as XML, regardless of actually response type
    const data = xhr.responseText;
    const xml = this.parseXml(data);
    if (!xml) {
      const responseType = xhr.responseType || xhr.contentType; // contentType for MS-XDomainRequest
      console.warn('Loader - ' + file.key + ': invalid XML (' + responseType + ')');
      this.asyncComplete(file, 'invalid XML');
      return;
    }
    if (file.type === 'bitmapfont') {
      this.cache.addBitmapFont(file.key, file.url, file.data, xml, file.atlasType, file.xSpacing, file.ySpacing);
    } else if (file.type === 'textureatlas') {
      this.cache.addTextureAtlas(file.key, file.url, file.data, xml, file.format);
    } else if (file.type === 'xml') {
      this.cache.addXML(file.key, file.url, xml);
    }
    this.asyncComplete(file);
  }

  /**
   * TBD.
   * @param {object} data - TBD.
   * @returns {Document} TBD.
   */
  parseXml(data) {
    let xml = null;
    try {
      if (window.DOMParser) {
        const domparser = new DOMParser();
        xml = domparser.parseFromString(data, 'text/xml');
      } else {
        xml = new window.ActiveXObject('Microsoft.XMLDOM');
        // Why is this 'false'?
        xml.async = 'false';
        xml.loadXML(data);
      }
    } catch (e) {
      xml = null;
    }
    if (!xml || !xml.documentElement || xml.getElementsByTagName('parsererror').length) {
      return null;
    }
    return xml;
  }

  /**
   * TBD.
   */
  updateProgress() {
    if (this.preloadSprite) {
      if (this.preloadSprite.direction === 0) {
        this.preloadSprite.rect.width = Math.floor((this.preloadSprite.width / 100) * this.progress);
      } else {
        this.preloadSprite.rect.height = Math.floor((this.preloadSprite.height / 100) * this.progress);
      }
      if (this.preloadSprite.sprite) {
        this.preloadSprite.sprite.updateCrop();
      } else {
        // We seem to have lost our sprite - maybe it was destroyed?
        this.preloadSprite = null;
      }
    }
  }

  /**
   * TBD.
   * @param {string} message - TBD.
   * @param {string|object} data - TBD.
   */
  log(message, data = '') {
    if (!this.isUseLog) {
      return;
    }
    console.log(`[Loader] ${message}`, data);
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  totalLoadedFiles() {
    return this._loadedFileCount;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  totalQueuedFiles() {
    return this._totalFileCount - this._loadedFileCount;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  totalLoadedPacks() {
    return this._totalPackCount;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  totalQueuedPacks() {
    return this._totalPackCount - this._loadedPackCount;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get progressFloat() {
    const progress = (this._loadedFileCount / this._totalFileCount) * 100;
    return Math.max(0, Math.min(100, progress || 0));
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get progress() {
    return Math.round(this.progressFloat);
  }
}
