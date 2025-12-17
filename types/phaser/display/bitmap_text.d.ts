export class BitmapText extends DisplayObject {
    /**
     * Creates a new BitmapText instance.
     * @param {import('../core/game.js').Game} game - The game instance this bitmap text belongs to.
     * @param {number} x - The x position of the bitmap text.
     * @param {number} y - The y position of the bitmap text.
     * @param {string} font - The key of the bitmap font to use.
     * @param {string} text - The text to display.
     * @param {number} size - The font size.
     * @param {string} align - The text alignment (left, center, right).
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
     * Sets the text to display.
     * @param {string} text - The new text to display.
     */
    setText(text: string): void;
    /**
     * Sets the text content of this bitmap text.
     * @param {string | number | boolean | Date} value - The new text content to set.
     */
    set text(value: string | number | boolean | Date);
    /**
     * Gets the text content of this bitmap text.
     * @returns {string} The current text content.
     */
    get text(): string;
    /**
     * Scans a line of text to calculate its width and other properties.
     * @param {object} data - The font data for this bitmap text.
     * @param {number} scale - The scaling factor to apply to the font size.
     * @param {string} text - The text to scan.
     * @returns {{width: number, text: string, end: boolean, chars: number[]}} An object containing the width, processed text, end status, and character positions.
     */
    scanLine(data: object, scale: number, text: string): {
        width: number;
        text: string;
        end: boolean;
        chars: number[];
    };
    /**
     * Cleans the provided text by removing invalid characters and replacing them with a specified character.
     * @param {string} text - The text to clean.
     * @param {string} replace - The character to use for replacement of invalid characters (default: '').
     * @returns {string} The cleaned text.
     */
    cleanText(text: string, replace?: string): string;
    /**
     * Updates the internal text rendering based on current properties and content.
     */
    updateText(): void;
    /**
     * Removes unused glyphs from the pool and returns the number removed.
     * @returns {number} The number of glyphs that were removed from the pool.
     */
    purgeGlyphs(): number;
    /**
     * Updates the transform of this bitmap text, updating its text if needed.
     */
    updateTransform(): void;
    /**
     * Adds a color to a specific position in the text.
     * @param {string} value - The color to apply (in hex format or CSS color name).
     * @param {number} position - The character position to apply the color to.
     * @returns {BitmapText} This bitmap text instance for chaining.
     */
    addColor(value: string, position: number): BitmapText;
    /**
     * Sets the text alignment property.
     * @param {string} value - The new text alignment (left, center, right).
     */
    set align(value: string);
    /**
     * Gets the text alignment property.
     * @returns {string} The current text alignment (left, center, right).
     */
    get align(): string;
    /**
     * Sets the tint color of this bitmap text.
     * @param {number} value - The new tint color in RGB format.
     */
    set tint(value: number);
    /**
     * Gets the tint color of this bitmap text.
     * @returns {number} The current tint color in RGB format.
     */
    get tint(): number;
    /**
     * Sets the fill color of this bitmap text.
     * @param {string} value - The new fill color in hex format or CSS color name.
     */
    set fill(value: string);
    /**
     * Gets the fill color of this bitmap text as a hex string.
     * @returns {string} The current fill color in hex format.
     */
    get fill(): string;
    /**
     * Sets the font key used by this bitmap text.
     * @param {string} value - The new font key to use.
     */
    set font(value: string);
    /**
     * Gets the font key used by this bitmap text.
     * @returns {string} The current font key.
     */
    get font(): string;
    /**
     * Sets the font size of this bitmap text.
     * @param {number} value - The new font size to use.
     */
    set fontSize(value: number);
    /**
     * Gets the font size of this bitmap text.
     * @returns {number} The current font size.
     */
    get fontSize(): number;
    /**
     * Sets the maximum width of this bitmap text.
     * @param {number} value - The new maximum width to set.
     */
    set maxWidth(value: number);
    /**
     * Gets the maximum width of this bitmap text.
     * @returns {number} The current maximum width.
     */
    get maxWidth(): number;
    /**
     * Sets whether smoothing is enabled for this bitmap text's font.
     * @param {boolean} value - Whether to enable smoothing (true) or not (false).
     */
    set smoothed(value: boolean);
    /**
     * Gets whether smoothing is enabled for this bitmap text's font.
     * @returns {boolean} True if smoothing is enabled, false otherwise.
     */
    get smoothed(): boolean;
}
import { DisplayObject } from './display_object.js';
import { Point } from '../geom/point.js';
import { Image } from './image.js';
//# sourceMappingURL=bitmap_text.d.ts.map