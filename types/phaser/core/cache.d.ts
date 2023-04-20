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
     * @param {object} game - TBD.
     */
    constructor(game: object);
    game: any;
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
     * @param url
     * @param data
     */
    addImage(key: string, url: any, data: any): {
        key: string;
        url: any;
        data: any;
        base: BaseTexture;
        frame: Frame;
        frameData: FrameData;
    };
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param url
     * @param data
     * @param atlasData
     */
    addTextureAtlas(key: string, url: any, data: any, atlasData: any): void;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param url
     * @param data
     */
    addSound(key: string, url: any, data: any): void;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param url
     * @param data
     */
    addText(key: string, url: any, data: any): void;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param url
     * @param data
     * @param atlasData
     * @param atlasType
     * @param xSpacing
     * @param ySpacing
     */
    addBitmapFont(key: string, url: any, data: any, atlasData: any, atlasType: any, xSpacing?: number, ySpacing?: number): void;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param url
     * @param data
     */
    addJSON(key: string, url: any, data: any): void;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param url
     * @param data
     */
    addXML(key: string, url: any, data: any): void;
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
     * @param property
     * @param value
     */
    updateSound(key: string, property: any, value: any): void;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param data
     */
    decodedSound(key: string, data: any): void;
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    isSoundDecoded(key: string): any;
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    isSoundReady(key: string): boolean;
    /**
     * TBD.
     * @param cache
     * @param {string} key - TBD.
     */
    checkKey(cache: any, key: string): boolean;
    /**
     * TBD.
     * @param url
     */
    checkURL(url: any): boolean;
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    checkCanvasKey(key: string): boolean;
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    checkImageKey(key: string): boolean;
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    checkTextureKey(key: string): boolean;
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    checkSoundKey(key: string): boolean;
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    checkTextKey(key: string): boolean;
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    checkBitmapDataKey(key: string): boolean;
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    checkBitmapFontKey(key: string): boolean;
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    checkJSONKey(key: string): boolean;
    /**
     * TBD.
     * @param {string} key - TBD.
     */
    checkXMLKey(key: string): boolean;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param cache
     * @param method
     * @param property
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
     * @param full
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
     * @param cache
     */
    getBaseTexture(key: string, cache?: number): any;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param cache
     */
    getFrame(key: string, cache?: number): any;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param cache
     */
    getFrameCount(key: string, cache?: number): any;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param cache
     */
    getFrameData(key: string, cache?: number): any;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param cache
     */
    hasFrameData(key: string, cache?: number): boolean;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param frameData
     * @param cache
     */
    updateFrameData(key: string, frameData: any, cache?: number): void;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param index
     * @param cache
     */
    getFrameByIndex(key: string, index: any, cache?: number): any;
    /**
     * TBD.
     * @param {string} key - TBD.
     * @param name
     * @param cache
     */
    getFrameByName(key: string, name: any, cache?: number): any;
    /**
     * TBD.
     * @param url
     */
    getURL(url: any): any;
    /**
     * TBD.
     * @param cache
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
     * @param destroyBaseTexture
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
     * @param url
     * @param data
     */
    _resolveURL(url: any, data: any): string;
    /**
     * TBD.
     */
    destroy(): void;
}
import { Signal } from './signal';
import { BaseTexture } from '../display/webgl/base_texture';
import { Frame } from './frame';
import { FrameData } from './frame_data';
//# sourceMappingURL=cache.d.ts.map