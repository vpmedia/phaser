export const CANVAS: 0;
export const IMAGE: 1;
export const TEXTURE: 2;
export const SOUND: 3;
export const TEXT: 4;
export const BITMAPDATA: 5;
export const BITMAPFONT: 6;
export const JSONDATA: 7;
export const XML: 8;
export const RENDER_TEXTURE: 9;
export class Cache {
    /**
     * Creates a new Cache instance.
     * @param {import('./game.js').Game} game - The game instance.
     */
    constructor(game: import("./game.js").Game);
    game: import("./game.js").Game;
    autoResolveURL: boolean;
    _cache: {
        canvas: {};
        image: {};
        texture: {};
        sound: {};
        text: {};
        json: {};
        xml: {};
        bitmapData: {};
        bitmapFont: {};
        renderTexture: {};
    };
    _urlMap: {};
    _urlResolver: HTMLImageElement;
    _urlTemp: string;
    onSoundUnlock: Signal;
    _cacheMap: {}[];
    /**
     * Adds the default image to the cache.
     */
    addDefaultImage(): void;
    /**
     * Adds the missing image to the cache.
     */
    addMissingImage(): void;
    /**
     * Adds an image to the cache.
     * @param {string} key - The unique key for this cache entry.
     * @param {string} url - The URL the image was loaded from.
     * @param {HTMLImageElement} data - The image data to cache.
     * @returns {object} The cached image object.
     */
    addImage(key: string, url: string, data: HTMLImageElement): object;
    /**
     * Adds a texture atlas to the cache.
     * @param {string} key - The unique key for this cache entry.
     * @param {string} url - The URL the atlas was loaded from.
     * @param {HTMLCanvasElement} data - The canvas data for the atlas.
     * @param {object} atlasData - The atlas data to cache.
     */
    addTextureAtlas(key: string, url: string, data: HTMLCanvasElement, atlasData: object): void;
    /**
     * Adds sound data to the cache.
     * @param {string} key - The unique key for this cache entry.
     * @param {string} url - The URL the sound was loaded from.
     * @param {object} data - The sound data to cache.
     */
    addSound(key: string, url: string, data: object): void;
    /**
     * Adds text data to the cache.
     * @param {string} key - The unique key for this cache entry.
     * @param {string} url - The URL the text was loaded from.
     * @param {string} data - The text data to cache.
     */
    addText(key: string, url: string, data: string): void;
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
    addBitmapFont(key: string, url: string, data: HTMLCanvasElement, atlasData: object, atlasType: string, xSpacing?: number, ySpacing?: number): void;
    /**
     * Adds JSON data to the cache.
     * @param {string} key - The unique key for this cache entry.
     * @param {string} url - The URL the JSON was loaded from.
     * @param {object} data - The JSON data to cache.
     */
    addJSON(key: string, url: string, data: object): void;
    /**
     * Adds XML data to the cache.
     * @param {string} key - The unique key for this cache entry.
     * @param {string} url - The URL the XML was loaded from.
     * @param {XMLDocument} data - The XML data to cache.
     */
    addXML(key: string, url: string, data: XMLDocument): void;
    /**
     * Updates a sound property in the cache.
     * @param {string} key - The unique key for the cached sound.
     * @param {string} property - The property to update.
     * @param {any} value - The new value for the property.
     */
    updateSound(key: string, property: string, value: any): void;
    /**
     * Marks a sound as decoded in the cache.
     * @param {string} key - The unique key for the cached sound.
     * @param {AudioBuffer} data - The decoded audio buffer.
     */
    decodedSound(key: string, data: AudioBuffer): void;
    /**
     * Checks if a sound has been decoded in the cache.
     * @param {string} key - The unique key for the cached sound.
     * @returns {boolean} True if the sound is decoded, false otherwise.
     */
    isSoundDecoded(key: string): boolean;
    /**
     * Checks if a sound is ready to play (decoded and not locked).
     * @param {string} key - The unique key for the cached sound.
     * @returns {boolean} True if the sound is ready, false otherwise.
     */
    isSoundReady(key: string): boolean;
    /**
     * Checks if a cache entry exists.
     * @param {number} cache - The cache type (CANVAS, IMAGE, etc.).
     * @param {string} key - The unique key for the cache entry.
     * @returns {boolean} True if the entry exists, false otherwise.
     */
    checkKey(cache: number, key: string): boolean;
    /**
     * Checks if a URL has been resolved and cached.
     * @param {string} url - The URL to check.
     * @returns {boolean} True if the URL has been resolved and cached, false otherwise.
     */
    checkURL(url: string): boolean;
    /**
     * Checks if a canvas cache entry exists.
     * @param {string} key - The unique key for the cache entry.
     * @returns {boolean} True if the entry exists, false otherwise.
     */
    checkCanvasKey(key: string): boolean;
    /**
     * Checks if an image cache entry exists.
     * @param {string} key - The unique key for the cache entry.
     * @returns {boolean} True if the entry exists, false otherwise.
     */
    checkImageKey(key: string): boolean;
    /**
     * Checks if a texture cache entry exists.
     * @param {string} key - The unique key for the cache entry.
     * @returns {boolean} True if the entry exists, false otherwise.
     */
    checkTextureKey(key: string): boolean;
    /**
     * Checks if a sound cache entry exists.
     * @param {string} key - The unique key for the cache entry.
     * @returns {boolean} True if the entry exists, false otherwise.
     */
    checkSoundKey(key: string): boolean;
    /**
     * Checks if a text cache entry exists.
     * @param {string} key - The unique key for the cache entry.
     * @returns {boolean} True if the entry exists, false otherwise.
     */
    checkTextKey(key: string): boolean;
    /**
     * Checks if a bitmap data cache entry exists.
     * @param {string} key - The unique key for the cache entry.
     * @returns {boolean} True if the entry exists, false otherwise.
     */
    checkBitmapDataKey(key: string): boolean;
    /**
     * Checks if a bitmap font cache entry exists.
     * @param {string} key - The unique key for the cache entry.
     * @returns {boolean} True if the entry exists, false otherwise.
     */
    checkBitmapFontKey(key: string): boolean;
    /**
     * Checks if a JSON cache entry exists.
     * @param {string} key - The unique key for the cache entry.
     * @returns {boolean} True if the entry exists, false otherwise.
     */
    checkJSONKey(key: string): boolean;
    /**
     * Checks if an XML cache entry exists.
     * @param {string} key - The unique key for the cache entry.
     * @returns {boolean} True if the entry exists, false otherwise.
     */
    checkXMLKey(key: string): boolean;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param {number} cache - TBD.
     * @param {string} method - TBD.
     * @param {string} property - TBD.
     * @returns {*} TBD.
     */
    getItem(key: string, cache: number, method: string, property?: string): any;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @returns {HTMLCanvasElement} TBD.
     */
    getCanvas(key: string): HTMLCanvasElement;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param {boolean} full - TBD.
     * @returns {HTMLImageElement} TBD.
     */
    getImage(key?: string, full?: boolean): HTMLImageElement;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @returns {object} TBD.
     */
    getTextureFrame(key: string): object;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @returns {object} TBD.
     */
    getSound(key: string): object;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @returns {object} TBD.
     */
    getSoundData(key: string): object;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @returns {object} TBD.
     */
    getText(key: string): object;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @returns {object} TBD.
     */
    getBitmapData(key: string): object;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @returns {object} TBD.
     */
    getBitmapFont(key: string): object;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param {boolean} isClone - TBD.
     * @returns {object} TBD.
     */
    getJSON(key: string, isClone?: boolean): object;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @returns {XMLDocument} TBD.
     */
    getXML(key: string): XMLDocument;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @returns {import('../display/webgl/render_texture.js').RenderTexture} TBD.
     */
    getRenderTexture(key: string): import("../display/webgl/render_texture.js").RenderTexture;
    /**
     * Gets the base texture of a cache entry.
     * @param {string} key - The unique key for the cache entry.
     * @param {number} cache - The cache type (CANVAS, IMAGE, etc.).
     * @returns {BaseTexture} The base texture.
     */
    getBaseTexture(key: string, cache?: number): BaseTexture;
    /**
     * Gets a frame from the cache.
     * @param {string} key - The unique key for the cache entry.
     * @param {number} cache - The cache type (CANVAS, IMAGE, etc.).
     * @returns {Frame} The frame.
     */
    getFrame(key: string, cache?: number): Frame;
    /**
     * Gets the frame count of a cache entry.
     * @param {string} key - The unique key for the cache entry.
     * @param {number} cache - The cache type (CANVAS, IMAGE, etc.).
     * @returns {number} The number of frames.
     */
    getFrameCount(key: string, cache?: number): number;
    /**
     * Gets the frame data of a cache entry.
     * @param {string} key - The unique key for the cache entry.
     * @param {number} cache - The cache type (CANVAS, IMAGE, etc.).
     * @returns {FrameData} The frame data.
     */
    getFrameData(key: string, cache?: number): FrameData;
    /**
     * Checks if a cache entry has frame data.
     * @param {string} key - The unique key for the cache entry.
     * @param {number} cache - The cache type (CANVAS, IMAGE, etc.).
     * @returns {boolean} True if the entry has frame data, false otherwise.
     */
    hasFrameData(key: string, cache?: number): boolean;
    /**
     * Updates the frame data of a cache entry.
     * @param {string} key - The unique key for the cache entry.
     * @param {FrameData} frameData - The new frame data.
     * @param {number} cache - The cache type (CANVAS, IMAGE, etc.).
     */
    updateFrameData(key: string, frameData: FrameData, cache?: number): void;
    /**
     * Gets a frame by index from the cache.
     * @param {string} key - The unique key for the cache entry.
     * @param {number} index - The index of the frame to get.
     * @param {number} cache - The cache type (CANVAS, IMAGE, etc.).
     * @returns {Frame} The frame at the specified index.
     */
    getFrameByIndex(key: string, index: number, cache?: number): Frame;
    /**
     * Gets a frame by name from the cache.
     * @param {string} key - The unique key for the cache entry.
     * @param {string} name - The name of the frame to get.
     * @param {number} cache - The cache type (CANVAS, IMAGE, etc.).
     * @returns {Frame} The frame with the specified name.
     */
    getFrameByName(key: string, name: string, cache?: number): Frame;
    /**
     * Gets the resolved URL from cache.
     * @param {string} url - The original URL to resolve.
     * @returns {string} The resolved URL or null if not found.
     */
    getURL(url: string): string;
    /**
     * Gets all keys from a cache type.
     * @param {object} cache - The cache type (CANVAS, IMAGE, etc.).
     * @returns {string[]} An array of cache keys.
     */
    getKeys(cache?: object): string[];
    /**
     * Removes a canvas cache entry.
     * @param {string} key - The unique key for the cache entry to remove.
     */
    removeCanvas(key: string): void;
    /**
     * Removes an image cache entry.
     * @param {string} key - The unique key for the cache entry to remove.
     * @param {boolean} destroyBaseTexture - Whether to destroy the base texture (default: true).
     */
    removeImage(key: string, destroyBaseTexture?: boolean): void;
    /**
     * Removes a sound cache entry.
     * @param {string} key - The unique key for the cache entry to remove.
     */
    removeSound(key: string): void;
    /**
     * Removes a text cache entry.
     * @param {string} key - The unique key for the cache entry to remove.
     */
    removeText(key: string): void;
    /**
     * Removes a bitmap data cache entry.
     * @param {string} key - The unique key for the cache entry to remove.
     */
    removeBitmapData(key: string): void;
    /**
     * Removes a bitmap font cache entry.
     * @param {string} key - The unique key for the cache entry to remove.
     */
    removeBitmapFont(key: string): void;
    /**
     * Removes a JSON cache entry.
     * @param {string} key - The unique key for the cache entry to remove.
     */
    removeJSON(key: string): void;
    /**
     * Removes an XML cache entry.
     * @param {string} key - The unique key for the cache entry to remove.
     */
    removeXML(key: string): void;
    /**
     * Removes a render texture cache entry.
     * @param {string} key - The unique key for the cache entry to remove.
     */
    removeRenderTexture(key: string): void;
    /**
     * Removes a sprite sheet cache entry.
     * @param {string} key - The unique key for the cache entry to remove.
     */
    removeSpriteSheet(key: string): void;
    /**
     * Removes a texture atlas cache entry.
     * @param {string} key - The unique key for the cache entry to remove.
     */
    removeTextureAtlas(key: string): void;
    /**
     * Clears all GL textures from the cache.
     */
    clearGLTextures(): void;
    /**
     * Resolves a URL and stores it in the cache.
     * @param {string} url - The URL to resolve.
     * @param {object} data - The data to associate with the resolved URL.
     * @returns {string} The resolved URL or null if not enabled.
     */
    _resolveURL(url: string, data: object): string;
    /**
     * Destroys the cache and cleans up resources.
     */
    destroy(): void;
}
import { Signal } from './signal.js';
import { BaseTexture } from '../display/webgl/base_texture.js';
import { Frame } from './frame.js';
import { FrameData } from './frame_data.js';
//# sourceMappingURL=cache.d.ts.map