export class BitmapText extends DisplayObject {
    /**
     * TBD.
     * @param {import('../core/game.js').Game} game - TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {string} font - TBD.
     * @param {string} text - TBD.
     * @param {number} size - TBD.
     * @param {string} align - TBD.
     */
    constructor(game: import("../core/game.js").Game, x?: number, y?: number, font?: string, text?: string, size?: number, align?: string);
    /** @type {number} */
    type: number;
    /** @type {number} */
    textWidth: number;
    /** @type {number} */
    textHeight: number;
    /** @type {Point} */
    _prevAnchor: Point;
    _glyphs: Image[];
    /** @type {number} */
    _maxWidth: number;
    /** @type {string} */
    _text: string;
    _data: any;
    /** @type {string} */
    _font: string;
    /** @type {number} */
    _fontSize: number;
    /** @type {string} */
    _align: string;
    /** @type {number} */
    _tint: number;
    /** @type {boolean} */
    dirty: boolean;
    renderOrderID: number;
    /**
     * TBD.
     * @param {string} text - TBD.
     */
    setText(text: string): void;
    /**
     * TBD.
     * @param {string | number | boolean | Date} value - TBD.
     */
    set text(value: string | number | boolean | Date);
    /**
     * TBD.
     * @returns {string} TBD.
     */
    get text(): string;
    /**
     * TBD.
     * @param {object} data - TBD.
     * @param {number} scale - TBD.
     * @param {string} text - TBD.
     * @returns {{width: number, text: string, end: boolean, chars: number[]}} TBD.
     */
    scanLine(data: object, scale: number, text: string): {
        width: number;
        text: string;
        end: boolean;
        chars: number[];
    };
    /**
     * TBD.
     * @param {string} text - TBD.
     * @param {string} replace - TBD.
     * @returns {string} TBD.
     */
    cleanText(text: string, replace?: string): string;
    /**
     * TBD.
     */
    updateText(): void;
    /**
     * TBD.
     * @returns {number} TBD.
     */
    purgeGlyphs(): number;
    /**
     * TBD.
     */
    updateTransform(): void;
    /**
     * TBD.
     * @param {string} value - TBD.
     * @param {number} position - TBD.
     * @returns {BitmapText} TBD.
     */
    addColor(value: string, position: number): BitmapText;
    /**
     * TBD.
     */
    set align(value: string);
    /**
     * TBD.
     * @returns {string} TBD.
     */
    get align(): string;
    /**
     * TBD.
     */
    set tint(value: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get tint(): number;
    /**
     * TBD.
     */
    set fill(value: string);
    /**
     * TBD.
     * @returns {string} TBD.
     */
    get fill(): string;
    /**
     * TBD.
     */
    set font(value: string);
    /**
     * TBD.
     * @returns {string} TBD.
     */
    get font(): string;
    /**
     * TBD.
     */
    set fontSize(value: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get fontSize(): number;
    /**
     * TBD.
     */
    set maxWidth(value: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get maxWidth(): number;
    /**
     * TBD.
     */
    set smoothed(value: boolean);
    /**
     * TBD.
     * @returns {boolean} TBD.
     */
    get smoothed(): boolean;
}
import { DisplayObject } from './display_object.js';
import { Point } from '../geom/point.js';
import { Image } from './image.js';
//# sourceMappingURL=bitmap_text.d.ts.map