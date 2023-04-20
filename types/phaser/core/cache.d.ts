export const CANVAS: 0;
export const IMAGE: 1;
export const TEXTURE: 2;
export const SOUND: 3;
export const TEXT: 4;
export const BITMAPDATA: 5;
export const BITMAPFONT: 6;
export const JSON: 7;
export const XML: 8;
export const RENDER_TEXTURE: 9;
export class Cache {
    /**
     * TBD.
     * @param {Game} game - TBD.
     */
    constructor(game: Game);
    game: Game;
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
     * TBD.
     */
    addDefaultImage(): void;
    /**
     * TBD.
     */
    addMissingImage(): void;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param {string} url - TBD.
     * @param data - TBD.
     * @returns {object} TBD.
     */
    addImage(key: string, url: string, data: any): object;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param {string} url - TBD.
     * @param data - TBD.
     * @param atlasData - TBD.
     */
    addTextureAtlas(key: string, url: string, data: any, atlasData: any): void;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param {string} url - TBD.
     * @param data - TBD.
     */
    addSound(key: string, url: string, data: any): void;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param {string} url - TBD.
     * @param data - TBD.
     */
    addText(key: string, url: string, data: any): void;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param {string} url - TBD.
     * @param data - TBD.
     * @param atlasData - TBD.
     * @param atlasType - TBD.
     * @param xSpacing - TBD.
     * @param ySpacing - TBD.
     */
    addBitmapFont(key: string, url: string, data: any, atlasData: any, atlasType: any, xSpacing?: number, ySpacing?: number): void;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param {string} url - TBD.
     * @param data - TBD.
     */
    addJSON(key: string, url: string, data: any): void;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param {string} url - TBD.
     * @param data - TBD.
     */
    addXML(key: string, url: string, data: any): void;
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    reloadSound(key: string): void;
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    reloadSoundComplete(key: string): void;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param property - TBD.
     * @param value - TBD.
     */
    updateSound(key: string, property: any, value: any): void;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param data - TBD.
     */
    decodedSound(key: string, data: any): void;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @returns {boolean} TBD.
     */
    isSoundDecoded(key: string): boolean;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @returns {boolean} TBD.
     */
    isSoundReady(key: string): boolean;
    /**
     * TBD.
     * @param {number} cache - TBD.
     * @param {string} key - TBD.
     * @returns {boolean} TBD.
     */
    checkKey(cache: number, key: string): boolean;
    /**
     * TBD.
     * @param {string} url - TBD.
     * @returns {boolean} TBD.
     */
    checkURL(url: string): boolean;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @returns {boolean} TBD.
     */
    checkCanvasKey(key: string): boolean;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @returns {boolean} TBD.
     */
    checkImageKey(key: string): boolean;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @returns {boolean} TBD.
     */
    checkTextureKey(key: string): boolean;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @returns {boolean} TBD.
     */
    checkSoundKey(key: string): boolean;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @returns {boolean} TBD.
     */
    checkTextKey(key: string): boolean;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @returns {boolean} TBD.
     */
    checkBitmapDataKey(key: string): boolean;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @returns {boolean} TBD.
     */
    checkBitmapFontKey(key: string): boolean;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @returns {boolean} TBD.
     */
    checkJSONKey(key: string): boolean;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @returns {boolean} TBD.
     */
    checkXMLKey(key: string): boolean;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param cache - TBD.
     * @param method - TBD.
     * @param property - TBD.
     */
    getItem(key: string, cache: any, method: any, property?: any): any;
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    getCanvas(key: string): any;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param full - TBD.
     */
    getImage(key?: string, full?: boolean): any;
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    getTextureFrame(key: string): any;
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    getSound(key: string): any;
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    getSoundData(key: string): any;
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    getText(key: string): any;
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    getBitmapData(key: string): any;
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    getBitmapFont(key: string): any;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param isClone
     */
    getJSON(key: string, isClone?: boolean): any;
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    getXML(key: string): any;
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    getRenderTexture(key: string): any;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param cache - TBD.
     */
    getBaseTexture(key: string, cache?: number): any;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param cache - TBD.
     */
    getFrame(key: string, cache?: number): any;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param cache - TBD.
     */
    getFrameCount(key: string, cache?: number): any;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param cache - TBD.
     */
    getFrameData(key: string, cache?: number): any;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param cache - TBD.
     */
    hasFrameData(key: string, cache?: number): boolean;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param frameData - TBD.
     * @param cache - TBD.
     */
    updateFrameData(key: string, frameData: any, cache?: number): void;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param index - TBD.
     * @param cache - TBD.
     */
    getFrameByIndex(key: string, index: any, cache?: number): any;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param name - TBD.
     * @param cache - TBD.
     */
    getFrameByName(key: string, name: any, cache?: number): any;
    /**
     * TBD.
     * @param {string} url - TBD.
     */
    getURL(url: string): any;
    /**
     * TBD.
     * @param cache - TBD.
     */
    getKeys(cache?: number): string[];
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    removeCanvas(key: string): void;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param destroyBaseTexture - TBD.
     */
    removeImage(key: string, destroyBaseTexture?: boolean): void;
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    removeSound(key: string): void;
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    removeText(key: string): void;
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    removeBitmapData(key: string): void;
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    removeBitmapFont(key: string): void;
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    removeJSON(key: string): void;
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    removeXML(key: string): void;
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    removeRenderTexture(key: string): void;
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    removeSpriteSheet(key: string): void;
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    removeTextureAtlas(key: string): void;
    /**
     * TBD.
     */
    clearGLTextures(): void;
    /**
     * TBD.
     * @param {string} url - TBD.
     * @param data - TBD.
     * @returns {string} TBD.
     */
    _resolveURL(url: string, data: any): string;
    /**
     * TBD.
     */
    destroy(): void;
}
import { Game } from './game';
import { Signal } from './signal';
//# sourceMappingURL=cache.d.ts.map