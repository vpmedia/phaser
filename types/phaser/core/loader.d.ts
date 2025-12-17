export class Loader {
    /**
     * Creates a new Loader instance.
     * @param {import('./game.js').Game} game - Reference to the Phaser Game instance.
     */
    constructor(game: import("./game.js").Game);
    game: import("./game.js").Game;
    cache: import("./cache.js").Cache;
    isLoading: boolean;
    isUseLog: boolean;
    isUseRetry: boolean;
    maxRetry: number;
    hasLoaded: boolean;
    preloadSprite: {
        sprite: import("../display/image.js").Image;
        direction: number;
        width: number;
        height: number;
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
     * Sets the preload sprite for displaying loading progress.
     * @param {import('../display/image.js').Image} sprite - The image to use as the preload sprite.
     * @param {number} direction - The direction of the progress (0 = horizontal, 1 = vertical).
     */
    setPreloadSprite(sprite: import("../display/image.js").Image, direction?: number): void;
    /**
     * Resizes the preload sprite when the window is resized.
     */
    resize(): void;
    /**
     * Checks if a file with the given type and key already exists in the file list.
     * @param {string} type - The type of file to check for.
     * @param {string} key - The key of the file to check for.
     * @returns {boolean} True if the file exists, false otherwise.
     */
    checkKeyExists(type: string, key: string): boolean;
    /**
     * Gets the index of a file in the file list by type and key.
     * @param {string} type - The type of file to find.
     * @param {string} key - The key of the file to find.
     * @returns {number} The index of the file in the list, or -1 if not found.
     */
    getAssetIndex(type: string, key: string): number;
    /**
     * Gets a file from the file list by type and key.
     * @param {string} type - The type of file to get.
     * @param {string} key - The key of the file to get.
     * @returns {{index: number, file: object} | null} The file and its index, or null if not found.
     */
    getAsset(type: string, key: string): {
        index: number;
        file: object;
    } | null;
    /**
     * Resets the loader state, optionally clearing event listeners.
     * @param {boolean} hard - Whether to perform a hard reset (clears preload sprite).
     * @param {boolean} clearEvents - Whether to clear event listeners.
     */
    reset(hard?: boolean, clearEvents?: boolean): void;
    /**
     * Adds a file to the file list for loading.
     * @param {string} type - The type of file to add.
     * @param {string} key - The key to identify the file.
     * @param {string} url - The URL of the file to load.
     * @param {object} properties - Additional properties for the file.
     * @param {boolean} overwrite - Whether to overwrite an existing file with the same key.
     * @param {string} extension - The file extension to use if URL is not provided.
     * @returns {Loader} This Loader instance for chaining.
     */
    addToFileList(type: string, key?: string, url?: string, properties?: object, overwrite?: boolean, extension?: string): Loader;
    /**
     * Replaces a file in the file list with new properties.
     * @param {string} type - The type of file to replace.
     * @param {string} key - The key of the file to replace.
     * @param {string} url - The new URL for the file.
     * @param {object} properties - The new properties for the file.
     * @returns {Loader} This Loader instance for chaining.
     */
    replaceInFileList(type: string, key: string, url: string, properties: object): Loader;
    /**
     * Adds a pack file to the file list.
     * @param {string} key - The key to identify the pack file.
     * @param {string} url - The URL of the pack file to load.
     * @param {object} data - The parsed pack data.
     * @param {object} callbackContext - The context in which to call the callback.
     * @returns {Loader} This Loader instance for chaining.
     */
    pack(key: string, url: string, data: object, callbackContext: object): Loader;
    /**
     * Adds an image file to the file list.
     * @param {string} key - The key to identify the image file.
     * @param {string} url - The URL of the image file to load.
     * @param {boolean} overwrite - Whether to overwrite an existing file with the same key.
     * @returns {Loader} This Loader instance for chaining.
     */
    image(key: string, url: string, overwrite?: boolean): Loader;
    /**
     * Adds multiple image files to the file list.
     * @param {string[]} keys - The keys to identify the image files.
     * @param {string[]} urls - The URLs of the image files to load.
     * @returns {Loader} This Loader instance for chaining.
     */
    images(keys: string[], urls: string[]): Loader;
    /**
     * Adds a text file to the file list.
     * @param {string} key - The key to identify the text file.
     * @param {string} url - The URL of the text file to load.
     * @param {boolean} overwrite - Whether to overwrite an existing file with the same key.
     * @returns {Loader} This Loader instance for chaining.
     */
    text(key: string, url: string, overwrite?: boolean): Loader;
    /**
     * Adds a JSON file to the file list.
     * @param {string} key - The key to identify the JSON file.
     * @param {string} url - The URL of the JSON file to load.
     * @param {boolean} overwrite - Whether to overwrite an existing file with the same key.
     * @returns {Loader} This Loader instance for chaining.
     */
    json(key: string, url: string, overwrite?: boolean): Loader;
    /**
     * Adds an XML file to the file list.
     * @param {string} key - The key to identify the XML file.
     * @param {string} url - The URL of the XML file to load.
     * @param {boolean} overwrite - Whether to overwrite an existing file with the same key.
     * @returns {Loader} This Loader instance for chaining.
     */
    xml(key: string, url: string, overwrite?: boolean): Loader;
    /**
     * Adds a spritesheet file to the file list.
     * @param {string} key - The key to identify the spritesheet file.
     * @param {string} url - The URL of the spritesheet file to load.
     * @param {number} frameWidth - The width of each frame in the spritesheet.
     * @param {number} frameHeight - The height of each frame in the spritesheet.
     * @param {number} frameMax - The maximum number of frames to load (-1 for all).
     * @param {number} margin - The margin around each frame in pixels.
     * @param {number} spacing - The spacing between frames in pixels.
     * @returns {Loader} This Loader instance for chaining.
     */
    spritesheet(key: string, url: string, frameWidth: number, frameHeight: number, frameMax?: number, margin?: number, spacing?: number): Loader;
    /**
     * Adds an audio file to the file list.
     * @param {string} key - The key to identify the audio file.
     * @param {string[]} urls - The URLs of the audio files to load.
     * @param {boolean} autoDecode - Whether to automatically decode the audio file.
     * @returns {Loader} This Loader instance for chaining.
     */
    audio(key: string, urls: string[], autoDecode?: boolean): Loader;
    /**
     * Adds an audio sprite file to the file list.
     * @param {string} key - The key to identify the audio sprite file.
     * @param {string} urls - The URLs of the audio files to load.
     * @param {string} jsonURL - The URL of the JSON file containing audio sprite data.
     * @param {object} jsonData - The parsed JSON data containing audio sprite data.
     * @param {boolean} autoDecode - Whether to automatically decode the audio file.
     * @returns {Loader} This Loader instance for chaining.
     */
    audioSprite(key: string, urls: string, jsonURL: string, jsonData: object, autoDecode?: boolean): Loader;
    /**
     * Adds a bitmap font file to the file list.
     * @param {string} key - The key to identify the bitmap font file.
     * @param {string} textureURL - The URL of the font texture image.
     * @param {string} atlasURL - The URL of the XML or JSON file containing font data.
     * @param {object} atlasData - The parsed data containing font information.
     * @param {number} xSpacing - The horizontal spacing between characters in pixels.
     * @param {number} ySpacing - The vertical spacing between characters in pixels.
     * @returns {Loader} This Loader instance for chaining.
     * @throws {Error} If the bitmap font atlas data is invalid.
     */
    bitmapFont(key: string, textureURL?: string, atlasURL?: string, atlasData?: object, xSpacing?: number, ySpacing?: number): Loader;
    /**
     * Adds a texture atlas file to the file list.
     * @param {string} key - The key to identify the texture atlas file.
     * @param {string} textureURL - The URL of the texture image file.
     * @param {string} atlasURL - The URL of the JSON or XML file containing atlas data.
     * @param {object} atlasData - The parsed data containing atlas information.
     * @param {number} format - The format of the atlas file (JSON or XML).
     * @returns {Loader} This Loader instance for chaining.
     */
    atlas(key: string, textureURL: string, atlasURL?: string, atlasData?: object, format?: number): Loader;
    /**
     * Creates a sync point for loading files, ensuring all files in the block are loaded before continuing.
     * @param {Function} callback - The callback function to execute within the sync point.
     * @param {object} callbackContext - The context in which to call the callback.
     * @returns {Loader} This Loader instance for chaining.
     */
    withSyncPoint(callback: Function, callbackContext: object): Loader;
    /**
     * Adds a sync point to a specific file, preventing other files from loading until this one is processed.
     * @param {string} type - The type of file to add a sync point to.
     * @param {string} key - The key of the file to add a sync point to.
     * @returns {Loader} This Loader instance for chaining.
     */
    addSyncPoint(type: string, key: string): Loader;
    /**
     * Removes a file from the file list if it's not currently loading or loaded.
     * @param {string} type - The type of file to remove.
     * @param {string} key - The key of the file to remove.
     */
    removeFile(type: string, key: string): void;
    /**
     * Removes all files from the file list.
     */
    removeAll(): void;
    /**
     * Starts the loading process for all queued files.
     */
    start(): void;
    /**
     * Processes the loading queue, loading files as appropriate.
     */
    processLoadQueue(): void;
    /**
     * Finishes the loading process, optionally reporting an abnormal termination.
     * @param {boolean} abnormal - Whether the loading was terminated abnormally.
     */
    finishedLoading(abnormal?: boolean): void;
    /**
     * Marks a file as complete or failed, updating the loading state.
     * @param {object} file - The file to complete or mark as failed.
     * @param {string} errorMessage - An error message if the file failed to load.
     */
    asyncComplete(file: object, errorMessage?: string): void;
    /**
     * Processes a pack file, adding its contained files to the loader.
     * @param {object} pack - The pack file object to process.
     */
    processPack(pack: object): void;
    /**
     * Transforms a URL by adding the base URL and path prefix if needed.
     * @param {string} url - The original URL to transform.
     * @param {object} file - The file object containing path information.
     * @returns {string} The transformed URL.
     */
    transformUrl(url: string, file: object): string;
    /**
     * Loads a file using XMLHttpRequest, handling image files specially.
     * @param {object} file - The file object to load.
     */
    loadFile(file: object): void;
    /**
     * Loads an image file using the Image DOM element.
     * @param {object} file - The file object to load.
     */
    loadImageTag(file: object): void;
    /**
     * Loads a file using XMLHttpRequest with the specified parameters.
     * @param {object} file - The file object to load.
     * @param {string} url - The URL of the file to load.
     * @param {string} type - The expected response type (e.g., 'text', 'arraybuffer').
     * @param {Function} onload - The function to call when the file loads successfully.
     * @param {Function} onerror - The function to call if the file fails to load.
     */
    xhrLoad(file: object, url: string, type: string, onload: Function, onerror?: Function): void;
    /**
     * Placeholder for XDomainRequest loading (not implemented).
     */
    xhrLoadWithXDR(): void;
    /**
     * Gets the first supported audio URL from a list of URLs.
     * @param {object[]} urls - The array of URLs to check for supported audio formats.
     * @returns {string} The first URL with a supported audio format, or null if none found.
     */
    getAudioURL(urls: object[]): string;
    /**
     * Handles file loading errors, optionally retrying or marking the file as failed.
     * @param {object} file - The file object that failed to load.
     * @param {XMLHttpRequest} xhr - The XMLHttpRequest object that failed.
     * @param {number | string} reason - The error code or message explaining the failure.
     */
    fileError(file: object, xhr?: XMLHttpRequest, reason?: number | string): void;
    /**
     * TBD.
     * @param {object} file - TBD.
     * @param {XMLHttpRequest} xhr - TBD.
     * @throws {Error}
     */
    fileComplete(file: object, xhr: XMLHttpRequest): void;
    /**
     * Handles successful file loading, processing the file content appropriately.
     * @param {object} file - The file object that was loaded successfully.
     * @param {XMLHttpRequest} xhr - The XMLHttpRequest object containing the file data.
     */
    jsonLoadComplete(file: object, xhr: XMLHttpRequest): void;
    /**
     * TBD.
     */
    csvLoadComplete(): void;
    /**
     * Processes JSON file data after loading.
     * @param {object} file - The file object containing the JSON data.
     * @param {XMLHttpRequest} xhr - The XMLHttpRequest object containing the file data.
     */
    xmlLoadComplete(file: object, xhr: XMLHttpRequest): void;
    /**
     * Parses XML string data into a DOM Document object.
     * @param {object} data - The XML string data to parse.
     * @returns {Document} The parsed DOM Document, or null if parsing failed.
     */
    parseXml(data: object): Document;
    /**
     * Updates the preload sprite's progress indicator.
     */
    updateProgress(): void;
    /**
     * Logs a message to the console if logging is enabled.
     * @param {string} message - The message to log.
     * @param {string|object} data - Additional data to log with the message.
     */
    log(message: string, data?: string | object): void;
    /**
     * Gets the number of files that have been loaded.
     * @returns {number} The total number of loaded files.
     */
    totalLoadedFiles(): number;
    /**
     * Gets the number of files that are still queued for loading.
     * @returns {number} The total number of queued files.
     */
    totalQueuedFiles(): number;
    /**
     * Gets the number of pack files that have been loaded.
     * @returns {number} The total number of loaded pack files.
     */
    totalLoadedPacks(): number;
    /**
     * Gets the number of pack files that are still queued for loading.
     * @returns {number} The total number of queued pack files.
     */
    totalQueuedPacks(): number;
    /**
     * Gets the loading progress as a percentage (0-100).
     * @returns {number} The current loading progress as a percentage.
     */
    get progressFloat(): number;
    /**
     * Gets the loading progress as a rounded percentage (0-100).
     * @returns {number} The current loading progress as a rounded percentage.
     */
    get progress(): number;
}
import { Signal } from './signal.js';
//# sourceMappingURL=loader.d.ts.map