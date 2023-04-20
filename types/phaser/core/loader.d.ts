export class Loader {
    /**
     * TBD.
     * @param {object} game - TBD.
     */
    constructor(game: object);
    game: any;
    cache: any;
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
     * @param sprite
     * @param direction
     */
    setPreloadSprite(sprite: any, direction?: number): void;
    /**
     * TBD.
     */
    resize(): void;
    /**
     * TBD.
     * @param type
     * @param {string} key - TBD.
     */
    checkKeyExists(type: any, key: string): boolean;
    /**
     * TBD.
     * @param type
     * @param {string} key - TBD.
     */
    getAssetIndex(type: any, key: string): number;
    /**
     * TBD.
     * @param type
     * @param {string} key - TBD.
     */
    getAsset(type: any, key: string): {
        index: number;
        file: any;
    };
    /**
     * TBD.
     * @param hard
     * @param clearEvents
     */
    reset(hard: any, clearEvents?: boolean): void;
    /**
     * TBD.
     * @param type
     * @param {string} key - TBD.
     * @param url
     * @param properties
     * @param overwrite
     * @param extension
     */
    addToFileList(type: any, key?: string, url?: any, properties?: any, overwrite?: boolean, extension?: any): Loader;
    /**
     * TBD.
     * @param type
     * @param {string} key - TBD.
     * @param url
     * @param properties
     */
    replaceInFileList(type: any, key: string, url: any, properties: any): Loader;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param url
     * @param data
     * @param callbackContext
     */
    pack(key: string, url: any, data: any, callbackContext: any): Loader;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param url
     * @param overwrite
     */
    image(key: string, url: any, overwrite: any): Loader;
    /**
     * TBD.
     * @param keys
     * @param urls
     */
    images(keys: any, urls: any): Loader;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param url
     * @param overwrite
     */
    text(key: string, url: any, overwrite: any): Loader;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param url
     * @param overwrite
     */
    json(key: string, url: any, overwrite: any): Loader;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param url
     * @param overwrite
     */
    xml(key: string, url: any, overwrite: any): Loader;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param url
     * @param frameWidth
     * @param frameHeight
     * @param frameMax
     * @param margin
     * @param spacing
     */
    spritesheet(key: string, url: any, frameWidth: any, frameHeight: any, frameMax?: number, margin?: number, spacing?: number): Loader;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param urls
     * @param autoDecode
     */
    audio(key: string, urls: any, autoDecode?: boolean): Loader;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param urls
     * @param jsonURL
     * @param jsonData
     * @param autoDecode
     */
    audioSprite(key: string, urls: any, jsonURL: any, jsonData: any, autoDecode?: boolean): Loader;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param textureURL
     * @param atlasURL
     * @param atlasData
     * @param xSpacing
     * @param ySpacing
     */
    bitmapFont(key: string, textureURL?: any, atlasURL?: any, atlasData?: any, xSpacing?: number, ySpacing?: number): Loader;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param textureURL
     * @param atlasURL
     * @param atlasData
     * @param format
     */
    atlas(key: string, textureURL: any, atlasURL?: any, atlasData?: any, format?: number): Loader;
    /**
     * TBD.
     * @param callback
     * @param callbackContext
     */
    withSyncPoint(callback: any, callbackContext: any): Loader;
    /**
     * TBD.
     * @param type
     * @param {string} key - TBD.
     */
    addSyncPoint(type: any, key: string): Loader;
    /**
     * TBD.
     * @param type
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
     * @param abnormal
     */
    finishedLoading(abnormal: any): void;
    /**
     * TBD.
     * @param file
     * @param errorMessage
     */
    asyncComplete(file: any, errorMessage?: string): void;
    /**
     * TBD.
     * @param pack
     */
    processPack(pack: any): void;
    /**
     * TBD.
     * @param url
     * @param file
     */
    transformUrl(url: any, file: any): any;
    /**
     * TBD.
     * @param file
     */
    loadFile(file: any): void;
    /**
     * TBD.
     * @param file
     */
    loadImageTag(file: any): void;
    /**
     * TBD.
     * @param file
     * @param url
     * @param type
     * @param onload
     * @param onerror
     */
    xhrLoad(file: any, url: any, type: any, onload: any, onerror: any): void;
    /**
     * TBD.
     */
    xhrLoadWithXDR(): void;
    /**
     * TBD.
     * @param urls
     */
    getAudioURL(urls: any): any;
    /**
     * TBD.
     * @param file
     * @param xhr
     * @param reason
     */
    fileError(file: any, xhr: any, reason: any): void;
    /**
     * TBD.
     * @param file
     * @param xhr
     */
    fileComplete(file: any, xhr: any): void;
    /**
     * TBD.
     * @param file
     * @param xhr
     */
    jsonLoadComplete(file: any, xhr: any): void;
    /**
     * TBD.
     */
    csvLoadComplete(): void;
    /**
     * TBD.
     * @param file
     * @param xhr
     */
    xmlLoadComplete(file: any, xhr: any): void;
    /**
     * TBD.
     * @param data
     */
    parseXml(data: any): any;
    /**
     * TBD.
     */
    updateProgress(): void;
    /**
     * TBD.
     * @param message
     * @param data
     */
    log(message: any, data?: string): void;
    /**
     * TBD.
     */
    totalLoadedFiles(): number;
    /**
     * TBD.
     */
    totalQueuedFiles(): number;
    /**
     * TBD.
     */
    totalLoadedPacks(): number;
    /**
     * TBD.
     */
    totalQueuedPacks(): number;
    /**
     * TBD.
     */
    get progressFloat(): number;
    /**
     * TBD.
     */
    get progress(): number;
}
import { Signal } from './signal';
//# sourceMappingURL=loader.d.ts.map