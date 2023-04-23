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
     * @param {HTMLCanvasElement} data - TBD.
     * @returns {object} TBD.
     */
    addImage(key: string, url: string, data: HTMLCanvasElement): object;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param {string} url - TBD.
     * @param data - TBD.
     * @param {object} atlasData - TBD.
     */
    addTextureAtlas(key: string, url: string, data: any, atlasData: object): void;
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
     * @param {string} data - TBD.
     */
    addText(key: string, url: string, data: string): void;
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
    addBitmapFont(key: string, url: string, data: HTMLCanvasElement, atlasData: object, atlasType: string, xSpacing?: number, ySpacing?: number): void;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param {string} url - TBD.
     * @param {object} data - TBD.
     */
    addJSON(key: string, url: string, data: object): void;
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
     * @param {string} property - TBD.
     * @param {any} value - TBD.
     */
    updateSound(key: string, property: string, value: any): void;
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
     * @param {boolean} isClone - TBD.
     * @returns {object} TBD.
     */
    getJSON(key: string, isClone?: boolean): object;
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    getXML(key: string): any;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @returns {RenderTexture} TBD.
     */
    getRenderTexture(key: string): RenderTexture;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param {number} cache - TBD.
     * @returns {BaseTexture} TBD.
     */
    getBaseTexture(key: string, cache?: number): BaseTexture;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param {number} cache - TBD.
     * @returns {Frame} TBD.
     */
    getFrame(key: string, cache?: number): Frame;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param {number} cache - TBD.
     * @returns {number} TBD.
     */
    getFrameCount(key: string, cache?: number): number;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param {number} cache - TBD.
     * @returns {FrameData} TBD.
     */
    getFrameData(key: string, cache?: number): FrameData;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param {number} cache - TBD.
     * @returns {boolean} TBD.
     */
    hasFrameData(key: string, cache?: number): boolean;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param {FrameData} frameData - TBD.
     * @param {number} cache - TBD.
     */
    updateFrameData(key: string, frameData: FrameData, cache?: number): void;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param {number} index - TBD.
     * @param {number} cache - TBD.
     * @returns {Frame} TBD.
     */
    getFrameByIndex(key: string, index: number, cache?: number): Frame;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param {string} name - TBD.
     * @param {number} cache - TBD.
     * @returns {Frame} TBD.
     */
    getFrameByName(key: string, name: string, cache?: number): Frame;
    /**
     * TBD.
     * @param {string} url - TBD.
     * @returns {string} TBD.
     */
    getURL(url: string): string;
    /**
     * TBD.
     * @param {object} cache - TBD.
     * @returns {string[]} TBD.
     */
    getKeys(cache?: object): string[];
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    removeCanvas(key: string): void;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param {boolean} destroyBaseTexture - TBD.
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
     * @param {object} data - TBD.
     * @returns {string} TBD.
     */
    _resolveURL(url: string, data: object): string;
    /**
     * TBD.
     */
    destroy(): void;
}
import { Game } from './game';
import { Signal } from './signal';
import { RenderTexture } from '../display/webgl/render_texture';
import { BaseTexture } from '../display/webgl/base_texture';
import { Frame } from './frame';
import { FrameData } from './frame_data';
//# sourceMappingURL=cache.d.ts.map