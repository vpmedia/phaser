export default class _default extends DisplayObject {
    /**
     * TBD.
     *
     * @param {object} game - TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {string} font - TBD.
     * @param {string} text - TBD.
     * @param {number} size - TBD.
     * @param {string} align - TBD.
     */
    constructor(game: object, x?: number, y?: number, font?: string, text?: string, size?: number, align?: string);
    game: object;
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
    renderOrderID: any;
    setText(text: any): void;
    set text(arg: string);
    get text(): string;
    scanLine(data: any, scale: any, text: any): {
        width: number;
        text: any;
        end: boolean;
        chars: number[];
    };
    cleanText(text: any, replace?: string): any;
    updateText(): void;
    purgeGlyphs(): number;
    updateTransform(): void;
    set align(arg: string);
    get align(): string;
    set tint(arg: number);
    get tint(): number;
    set fill(arg: string);
    get fill(): string;
    set font(arg: string);
    get font(): string;
    set fontSize(arg: number);
    get fontSize(): number;
    set maxWidth(arg: number);
    get maxWidth(): number;
    set smoothed(arg: boolean);
    get smoothed(): boolean;
}
import DisplayObject from './display_object';
import Point from '../geom/point';
//# sourceMappingURL=bitmap_text.d.ts.map