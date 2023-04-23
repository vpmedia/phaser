export class Loader {
    /**
     * TBD.
     * @param {Game} game - TBD.
     */
    constructor(game: Game);
    game: Game;
    cache: import("./cache").Cache;
    isLoading: boolean;
    isUseLog: boolean;
    isUseRetry: boolean;
    maxRetry: number;
    hasLoaded: boolean;
    preloadSprite: {
        sprite: any;
        direction: number;
        width: any;
        height: any;
        rect: any;
    };
    crossOrigin: boolean;
    baseURL: string;
    path: string;
    headers: {
        requestedWith: boolean;
        json: string;
        xml: string;
    };
    onLoadStart: Signal;
    onLoadComplete: Signal;
    onPackComplete: Signal;
    onFileStart: Signal;
    onFileComplete: Signal;
    onFileError: Signal;
    maxParallelDownloads: any;
    _withSyncPointDepth: number;
    _fileList: any[];
    _flightQueue: any[];
    _processingHead: number;
    _fileLoadStarted: boolean;
    _totalPackCount: number;
    _totalFileCount: number;
    _loadedPackCount: number;
    _loadedFileCount: number;
    /**
     * TBD.
     * @param sprite - TBD.
     * @param {number} direction - TBD.
     */
    setPreloadSprite(sprite: any, direction?: number): void;
    /**
     * TBD.
     */
    resize(): void;
    /**
     * TBD.
     * @param {string} type - TBD.
     * @param {string} key - TBD.
     * @returns {boolean} TBD.
     */
    checkKeyExists(type: string, key: string): boolean;
    /**
     * TBD.
     * @param {string} type - TBD.
     * @param {string} key - TBD.
     * @returns {number} TBD.
     */
    getAssetIndex(type: string, key: string): number;
    /**
     * TBD.
     * @param {string} type - TBD.
     * @param {string} key - TBD.
     * @returns {object} TBD.
     */
    getAsset(type: string, key: string): object;
    /**
     * TBD.
     * @param {boolean} hard
     * @param {boolean} clearEvents
     */
    reset(hard: boolean, clearEvents?: boolean): void;
    /**
     * TBD.
     * @param {string} type - TBD.
     * @param {string} key - TBD.
     * @param {string} url - TBD.
     * @param properties - TBD.
     * @param {boolean} overwrite - TBD.
     * @param extension - TBD.
     * @returns {Loader} TBD.
     */
    addToFileList(type: string, key?: string, url?: string, properties?: any, overwrite?: boolean, extension?: any): Loader;
    /**
     * TBD.
     * @param {string} type - TBD.
     * @param {string} key - TBD.
     * @param {string} url - TBD.
     * @param {object} properties - TBD.
     * @returns {Loader} TBD.
     */
    replaceInFileList(type: string, key: string, url: string, properties: object): Loader;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param {string} url - TBD.
     * @param data - TBD.
     * @param {object} callbackContext - TBD.
     * @returns {Loader} TBD.
     */
    pack(key: string, url: string, data: any, callbackContext: object): Loader;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param {string} url - TBD.
     * @param {boolean} overwrite - TBD.
     * @returns {Loader} TBD.
     */
    image(key: string, url: string, overwrite: boolean): Loader;
    /**
     * TBD.
     * @param {string[]} keys - TBD.
     * @param {string[]} urls - TBD.
     * @returns {Loader} TBD.
     */
    images(keys: string[], urls: string[]): Loader;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param {string} url - TBD.
     * @param {boolean} overwrite - TBD.
     * @returns {Loader} TBD.
     */
    text(key: string, url: string, overwrite: boolean): Loader;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param {string} url - TBD.
     * @param {boolean} overwrite - TBD.
     * @returns {Loader} TBD.
     */
    json(key: string, url: string, overwrite: boolean): Loader;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param {string} url - TBD.
     * @param {boolean} overwrite - TBD.
     * @returns {Loader} TBD.
     */
    xml(key: string, url: string, overwrite: boolean): Loader;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param {string} url - TBD.
     * @param frameWidth - TBD.
     * @param frameHeight - TBD.
     * @param frameMax - TBD.
     * @param margin - TBD.
     * @param spacing - TBD.
     * @returns {Loader} TBD.
     */
    spritesheet(key: string, url: string, frameWidth: any, frameHeight: any, frameMax?: number, margin?: number, spacing?: number): Loader;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param urls
     * @param {boolean} autoDecode
     * @returns {Loader} TBD.
     */
    audio(key: string, urls: any, autoDecode?: boolean): Loader;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param urls - TBD.
     * @param jsonURL - TBD.
     * @param jsonData - TBD.
     * @param autoDecode - TBD.
     * @returns {Loader} TBD.
     */
    audioSprite(key: string, urls: any, jsonURL: any, jsonData: any, autoDecode?: boolean): Loader;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param textureURL - TBD.
     * @param atlasURL - TBD.
     * @param atlasData - TBD.
     * @param xSpacing - TBD.
     * @param ySpacing - TBD.
     * @returns {Loader} TBD.
     * @throws Error.
     */
    bitmapFont(key: string, textureURL?: any, atlasURL?: any, atlasData?: any, xSpacing?: number, ySpacing?: number): Loader;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param {string} textureURL - TBD.
     * @param {string} atlasURL - TBD.
     * @param atlasData - TBD.
     * @param {number} format - TBD.
     * @returns {Loader} TBD.
     */
    atlas(key: string, textureURL: string, atlasURL?: string, atlasData?: any, format?: number): Loader;
    /**
     * TBD.
     * @param {Function} callback - TBD.
     * @param {object} callbackContext - TBD.
     * @returns {Loader} TBD.
     */
    withSyncPoint(callback: Function, callbackContext: object): Loader;
    /**
     * TBD.
     * @param {string} type - TBD.
     * @param {string} key - TBD.
     * @returns {Loader} TBD.
     */
    addSyncPoint(type: string, key: string): Loader;
    /**
     * TBD.
     * @param {string} type - TBD.
     * @param {string} key - TBD.
     */
    removeFile(type: string, key: string): void;
    /**
     * TBD.
     */
    removeAll(): void;
    /**
     * TBD.
     */
    start(): void;
    /**
     * TBD.
     */
    processLoadQueue(): void;
    /**
     * TBD.
     * @param {boolean} abnormal - TBD.
     */
    finishedLoading(abnormal: boolean): void;
    /**
     * TBD.
     * @param {object} file - TBD.
     * @param {string} errorMessage - TBD.
     */
    asyncComplete(file: object, errorMessage?: string): void;
    /**
     * TBD.
     * @param {object} pack - TBD.
     */
    processPack(pack: object): void;
    /**
     * TBD.
     * @param {string} url - TBD.
     * @param {object} file - TBD.
     * @returns {string} TBD.
     */
    transformUrl(url: string, file: object): string;
    /**
     * TBD.
     * @param {object} file - TBD.
     */
    loadFile(file: object): void;
    /**
     * TBD.
     * @param {object} file - TBD.
     */
    loadImageTag(file: object): void;
    /**
     * TBD.
     * @param {object} file - TBD.
     * @param {string} url - TBD.
     * @param {string} type - TBD.
     * @param {Function} onload - TBD.
     * @param {Function} onerror - TBD.
     */
    xhrLoad(file: object, url: string, type: string, onload: Function, onerror: Function): void;
    /**
     * TBD.
     */
    xhrLoadWithXDR(): void;
    /**
     * TBD.
     * @param {object[]} urls - TBD.
     * @returns {string} TBD.
     */
    getAudioURL(urls: object[]): string;
    /**
     * TBD.
     * @param {object} file - TBD.
     * @param xhr - TBD.
     * @param {number} reason - TBD.
     */
    fileError(file: object, xhr: any, reason: number): void;
    /**
     * TBD.
     * @param {object} file - TBD.
     * @param xhr - TBD.
     * @throws Error.
     */
    fileComplete(file: object, xhr: any): void;
    /**
     * TBD.
     * @param {object} file - TBD.
     * @param xhr - TBD.
     */
    jsonLoadComplete(file: object, xhr: any): void;
    /**
     * TBD.
     */
    csvLoadComplete(): void;
    /**
     * TBD.
     * @param {object} file - TBD.
     * @param xhr - TBD.
     */
    xmlLoadComplete(file: object, xhr: any): void;
    /**
     * TBD.
     * @param data - TBD.
     * @returns {Document} TBD.
     */
    parseXml(data: any): Document;
    /**
     * TBD.
     */
    updateProgress(): void;
    /**
     * TBD.
     * @param {string} message - TBD.
     * @param {string|object} data - TBD.
     */
    log(message: string, data?: string | object): void;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    totalLoadedFiles(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    totalQueuedFiles(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    totalLoadedPacks(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    totalQueuedPacks(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get progressFloat(): number;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get progress(): number;
}
import { Game } from './game';
import { Signal } from './signal';
//# sourceMappingURL=loader.d.ts.map