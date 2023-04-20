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
     * @param direction - TBD.
     */
    setPreloadSprite(sprite: any, direction?: number): void;
    /**
     * TBD.
     */
    resize(): void;
    /**
     * TBD.
     * @param type - TBD.
     * @param {string} key - TBD.
     * @returns {boolean} TBD.
     */
    checkKeyExists(type: any, key: string): boolean;
    /**
     * TBD.
     * @param type - TBD.
     * @param {string} key - TBD.
     * @returns {number} TBD.
     */
    getAssetIndex(type: any, key: string): number;
    /**
     * TBD.
     * @param type - TBD.
     * @param {string} key - TBD.
     * @returns {object} TBD.
     */
    getAsset(type: any, key: string): object;
    /**
     * TBD.
     * @param hard
     * @param clearEvents
     */
    reset(hard: any, clearEvents?: boolean): void;
    /**
     * TBD.
     * @param type - TBD.
     * @param {string} key - TBD.
     * @param {string} url - TBD.
     * @param properties - TBD.
     * @param overwrite - TBD.
     * @param extension - TBD.
     * @returns {Loader} TBD.
     */
    addToFileList(type: any, key?: string, url?: string, properties?: any, overwrite?: boolean, extension?: any): Loader;
    /**
     * TBD.
     * @param type - TBD.
     * @param {string} key - TBD.
     * @param {string} url - TBD.
     * @param properties - TBD.
     * @returns {Loader} TBD.
     */
    replaceInFileList(type: any, key: string, url: string, properties: any): Loader;
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
     * @param overwrite - TBD.
     * @returns {Loader} TBD.
     */
    image(key: string, url: string, overwrite: any): Loader;
    /**
     * TBD.
     * @param keys - TBD.
     * @param urls - TBD.
     * @returns {Loader} TBD.
     */
    images(keys: any, urls: any): Loader;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param {string} url - TBD.
     * @param overwrite - TBD.
     * @returns {Loader} TBD.
     */
    text(key: string, url: string, overwrite: any): Loader;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param {string} url - TBD.
     * @param overwrite - TBD.
     * @returns {Loader} TBD.
     */
    json(key: string, url: string, overwrite: any): Loader;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param {string} url - TBD.
     * @param overwrite - TBD.
     * @returns {Loader} TBD.
     */
    xml(key: string, url: string, overwrite: any): Loader;
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
     * @param autoDecode
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
     * @param textureURL - TBD.
     * @param atlasURL - TBD.
     * @param atlasData - TBD.
     * @param format - TBD.
     * @returns {Loader} TBD.
     */
    atlas(key: string, textureURL: any, atlasURL?: any, atlasData?: any, format?: number): Loader;
    /**
     * TBD.
     * @param {Function} callback - TBD.
     * @param {object} callbackContext - TBD.
     * @returns {Loader} TBD.
     */
    withSyncPoint(callback: Function, callbackContext: object): Loader;
    /**
     * TBD.
     * @param type - TBD.
     * @param {string} key - TBD.
     * @returns {Loader} TBD.
     */
    addSyncPoint(type: any, key: string): Loader;
    /**
     * TBD.
     * @param type - TBD.
     * @param {string} key - TBD.
     */
    removeFile(type: any, key: string): void;
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
     * @param abnormal - TBD.
     */
    finishedLoading(abnormal: any): void;
    /**
     * TBD.
     * @param file - TBD.
     * @param errorMessage - TBD.
     */
    asyncComplete(file: any, errorMessage?: string): void;
    /**
     * TBD.
     * @param pack - TBD.
     */
    processPack(pack: any): void;
    /**
     * TBD.
     * @param {string} url - TBD.
     * @param file - TBD.
     * @returns {string} TBD.
     */
    transformUrl(url: string, file: any): string;
    /**
     * TBD.
     * @param file - TBD.
     */
    loadFile(file: any): void;
    /**
     * TBD.
     * @param file - TBD.
     */
    loadImageTag(file: any): void;
    /**
     * TBD.
     * @param file - TBD.
     * @param {string} url - TBD.
     * @param type - TBD.
     * @param onload - TBD.
     * @param onerror - TBD.
     */
    xhrLoad(file: any, url: string, type: any, onload: any, onerror: any): void;
    /**
     * TBD.
     */
    xhrLoadWithXDR(): void;
    /**
     * TBD.
     * @param urls - TBD.
     * @returns {string} TBD.
     */
    getAudioURL(urls: any): string;
    /**
     * TBD.
     * @param file - TBD.
     * @param xhr - TBD.
     * @param reason - TBD.
     */
    fileError(file: any, xhr: any, reason: any): void;
    /**
     * TBD.
     * @param file - TBD.
     * @param xhr - TBD.
     * @throws Error.
     */
    fileComplete(file: any, xhr: any): void;
    /**
     * TBD.
     * @param file - TBD.
     * @param xhr - TBD.
     */
    jsonLoadComplete(file: any, xhr: any): void;
    /**
     * TBD.
     */
    csvLoadComplete(): void;
    /**
     * TBD.
     * @param file - TBD.
     * @param xhr - TBD.
     */
    xmlLoadComplete(file: any, xhr: any): void;
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
     * @param message - TBD.
     * @param data - TBD.
     */
    log(message: any, data?: string): void;
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