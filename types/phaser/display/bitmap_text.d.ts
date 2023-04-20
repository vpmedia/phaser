export class BitmapText extends DisplayObject {
    /**
     * TBD.
     * @param {Game} game - TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {string} font - TBD.
     * @param {string} text - TBD.
     * @param {number} size - TBD.
     * @param {string} align - TBD.
     */
    constructor(game: Game, x?: number, y?: number, font?: string, text?: string, size?: number, align?: string);
    game: Game;
    type: number;
    textWidth: number;
    textHeight: number;
    _prevAnchor: Point;
    _glyphs: any[];
    _maxWidth: number;
    _text: string;
    _data: any;
    _font: string;
    _fontSize: number;
    _align: string;
    _tint: number;
    dirty: boolean;
    renderOrderID: number;
    /**
     * TBD.
     * @param text - TBD.
     */
    setText(text: any): void;
    /**
     * TBD.
     */
    set text(arg: string);
    /**
     * TBD.
     * @returns {string} TBD.
     */
    get text(): string;
    /**
     * TBD.
     * @param data - TBD.
     * @param scale - TBD.
     * @param text - TBD.
     * @returns {object} TBD.
     */
    scanLine(data: any, scale: any, text: any): object;
    /**
     * TBD.
     * @param text - TBD.
     * @param replace - TBD.
     * @returns {string} TBD.
     */
    cleanText(text: any, replace?: string): string;
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
     */
    set align(arg: string);
    /**
     * TBD.
     * @returns {string} TBD.
     */
    get align(): string;
    /**
     * TBD.
     */
    set tint(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get tint(): number;
    /**
     * TBD.
     */
    set fill(arg: string);
    /**
     * TBD.
     * @returns {string} TBD.
     */
    get fill(): string;
    /**
     * TBD.
     */
    set font(arg: string);
    /**
     * TBD.
     * @returns {string} TBD.
     */
    get font(): string;
    /**
     * TBD.
     */
    set fontSize(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get fontSize(): number;
    /**
     * TBD.
     */
    set maxWidth(arg: number);
    /**
     * TBD.
     */
    get maxWidth(): number;
    /**
     * TBD.
     */
    set smoothed(arg: boolean);
    /**
     * TBD.
     * @returns {boolean} TBD.
     */
    get smoothed(): boolean;
}
import { DisplayObject } from './display_object';
import { Game } from '../core/game';
import { Point } from '../geom/point';
//# sourceMappingURL=bitmap_text.d.ts.map