export class Text extends Image {
    /**
     * Creates a new Text object.
     * @param {import('../core/game.js').Game} game - The game instance this text belongs to.
     * @param {number} x - The x position of the text.
     * @param {number} y - The y position of the text.
     * @param {string} text - The text content to display.
     * @param {object} style - The style settings for the text.
     */
    constructor(game: import("../core/game.js").Game, x: number, y: number, text?: string, style?: object);
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    padding: Point;
    textBounds: Rectangle;
    style: any;
    /** @type {string[]} */
    colors: string[];
    /** @type {string[]} */
    strokeColors: string[];
    /** @type {string[]} */
    fontStyles: string[];
    /** @type {number[]} */
    fontWeights: number[];
    autoRound: boolean;
    useAdvancedWrap: boolean;
    _res: any;
    _text: string;
    _fontComponents: {
        font: string;
        fontStyle?: string;
        fontVariant?: string;
        fontWeight?: string;
        fontSize?: string;
        fontFamily?: string;
    };
    /** @type {number} */
    _lineSpacing: number;
    /** @type {number} */
    _charCount: number;
    /**
     * Sets the drop shadow properties for this text.
     * @param {number} x - The horizontal offset of the shadow.
     * @param {number} y - The vertical offset of the shadow.
     * @param {string} color - The color of the shadow.
     * @param {number} blur - The blur radius of the shadow.
     * @param {boolean} shadowStroke - Whether to apply the shadow to the stroke.
     * @param {boolean} shadowFill - Whether to apply the shadow to the fill.
     * @returns {Text} This Text object for chaining.
     */
    setShadow(x?: number, y?: number, color?: string, blur?: number, shadowStroke?: boolean, shadowFill?: boolean): Text;
    dirty: boolean;
    /**
     * Sets the style properties for this text.
     * @param {object} style - The style settings to apply.
     * @param {boolean} update - Whether to update the text immediately.
     * @returns {Text} This Text object for chaining.
     */
    setStyle(style?: object, update?: boolean): Text;
    /**
     * Updates the text content and renders it to the canvas.
     */
    updateText(): void;
    /**
     * Renders a tabbed line of text to the canvas.
     * @param {string} line - The line of text to render.
     * @param {number} x - The x position to start rendering from.
     * @param {number} y - The y position to start rendering from.
     * @param {boolean} fill - True to fill the text, false to stroke it.
     */
    renderTabLine(line: string, x: number, y: number, fill: boolean): void;
    /**
     * Updates the shadow properties for this text.
     * @param {string} state - The shadow state to update ('stroke' or 'fill').
     */
    updateShadow(state: string): void;
    /**
     * Measures the width of a line of text.
     * @param {string} line - The line of text to measure.
     * @returns {number} The width of the line in pixels.
     */
    measureLine(line: string): number;
    /**
     * Updates a line of text to the canvas.
     * @param {string} line - The line of text to update.
     * @param {number} x - The x position to start updating from.
     * @param {number} y - The y position to start updating from.
     */
    updateLine(line: string, x: number, y: number): void;
    /**
     * Clears all color values from this text object.
     * @returns {Text} This Text object for chaining.
     */
    clearColors(): Text;
    /**
     * Clears all font style values from this text object.
     * @returns {Text} This Text object for chaining.
     */
    clearFontValues(): Text;
    /**
     * Adds a color to this text object at the specified position.
     * @param {string} color - The color to apply.
     * @param {number} position - The character position to apply the color at.
     * @returns {Text} This Text object for chaining.
     */
    addColor(color: string, position: number): Text;
    /**
     * Adds a stroke color to this text object at the specified position.
     * @param {number} color - The stroke color to apply.
     * @param {number} position - The character position to apply the stroke color at.
     * @returns {Text} This Text object for chaining.
     */
    addStrokeColor(color: number, position: number): Text;
    /**
     * Adds a font style to this text object at the specified position.
     * @param {object} style - The font style to apply.
     * @param {number} position - The character position to apply the font style at.
     * @returns {Text} This Text object for chaining.
     */
    addFontStyle(style: object, position: number): Text;
    /**
     * Adds a font weight to this text object at the specified position.
     * @param {number} weight - The font weight to apply.
     * @param {number} position - The character position to apply the font weight at.
     * @returns {Text} This Text object for chaining.
     */
    addFontWeight(weight: number, position: number): Text;
    /**
     * Precalculates word wrap for the given text.
     * @param {string} text - The text to precalculate word wrap for.
     * @returns {string[]} The wrapped lines of text.
     */
    precalculateWordWrap(text: string): string[];
    /**
     * Runs word wrap on the given text.
     * @param {string} text - The text to run word wrap on.
     * @returns {string} The wrapped text.
     */
    runWordWrap(text: string): string;
    /**
     * Runs advanced word wrap on the given text.
     * @param {string} text - The text to run advanced word wrap on.
     * @returns {string} The wrapped text.
     * @throws {Error} If the wordWrapWidth setting is less than a single character.
     */
    advancedWordWrap(text: string): string;
    /**
     * Runs basic word wrap on the given text.
     * @param {string} text - The text to run basic word wrap on.
     * @returns {string} The wrapped text.
     */
    basicWordWrap(text: string): string;
    /**
     * Updates the font properties based on the given components.
     * @param {object} components - The font components to update from.
     */
    updateFont(components: object): void;
    /**
     * Converts a font string to components.
     * @param {string} font - The font string to convert.
     * @returns {{ font: string, fontStyle?: string, fontVariant?: string, fontWeight?: string, fontSize?: string, fontFamily?: string }} The font components.
     */
    fontToComponents(font: string): {
        font: string;
        fontStyle?: string;
        fontVariant?: string;
        fontWeight?: string;
        fontSize?: string;
        fontFamily?: string;
    };
    /**
     * Converts font components to a font string.
     * @param {object} components - The font components to convert.
     * @returns {string} The font string.
     */
    componentsToFont(components: object): string;
    /**
     * Sets the text content of this object.
     * @param {string} text - The new text to set.
     * @param {boolean} immediate - If true, updates the text immediately.
     * @returns {Text} This Text object for chaining.
     */
    setText(text: string, immediate?: boolean): Text;
    /**
     * Sets the text content of this object.
     * @param {string | number | boolean | Date} value - The new text content to set.
     */
    set text(value: string | number | boolean | Date);
    /**
     * Gets the text content of this object.
     * @returns {string} The current text content.
     */
    get text(): string;
    /**
     * Parses a list of text into this object.
     * @param {string[]|string[][]} list - The list of text to parse.
     * @returns {Text} This Text object for chaining.
     */
    parseList(list: string[] | string[][]): Text;
    /**
     * Sets the text bounds for this object.
     * @param {number} x - The x position of the bounds.
     * @param {number} y - The y position of the bounds.
     * @param {number} width - The width of the bounds.
     * @param {number} height - The height of the bounds.
     * @returns {Text} This Text object for chaining.
     */
    setTextBounds(x: number, y: number, width: number, height: number): Text;
    /**
     * Updates the texture of this object.
     */
    updateTexture(): void;
    /**
     * Renders this text object using WebGL.
     * @param {object} renderSession - The render session to use.
     */
    renderWebGL(renderSession: object): void;
    /**
     * Renders this text object using Canvas.
     * @param {object} renderSession - The render session to use.
     */
    renderCanvas(renderSession: object): void;
    /**
     * Gets the font properties cache object.
     * @returns {{[key: string]: {ascent: number, descent: number, fontSize: number}}} The font properties cache.
     */
    getFontPropertiesCache(): {
        [key: string]: {
            ascent: number;
            descent: number;
            fontSize: number;
        };
    };
    /**
     * Gets the font properties canvas element.
     * @returns {HTMLCanvasElement} The font properties canvas element.
     */
    getFontPropertiesCanvas(): HTMLCanvasElement;
    /**
     * Gets the font properties canvas context.
     * @returns {CanvasRenderingContext2D} The font properties canvas context.
     */
    getFontPropertiesContext(): CanvasRenderingContext2D;
    /**
     * Determines the font properties for a given font.
     * @param {string} font - The font to determine properties for.
     * @returns {object} The font properties.
     */
    determineFontProperties(font: string): object;
    /**
     * Determines font properties using a fallback method.
     * @param {string} fontStyle - The font style to determine properties for.
     * @returns {{ascent: number, descent: number, fontSize: number}} The font properties.
     */
    determineFontPropertiesFallback(fontStyle: string): {
        ascent: number;
        descent: number;
        fontSize: number;
    };
    /**
     * Sets the CSS font string for this object.
     * @param {string} value - The new CSS font string to set.
     */
    set cssFont(value: string);
    /**
     * Gets the CSS font string for this object.
     * @returns {string} The CSS font string.
     */
    get cssFont(): string;
    /**
     * Sets the font family of this object.
     * @param {string} value - The new font family to set.
     */
    set font(value: string);
    /**
     * Gets the font family of this object.
     * @returns {number} The font family.
     */
    get font(): number;
    /**
     * Sets the font size of this object.
     * @param {number} value - The new font size to set.
     */
    set fontSize(value: number);
    /**
     * Gets the font size of this object.
     * @returns {number} The font size.
     */
    get fontSize(): number;
    /**
     * Sets the font weight of this object.
     * @param {string} value - The new font weight to set.
     */
    set fontWeight(value: string);
    /**
     * Gets the font weight of this object.
     * @returns {string} The font weight.
     */
    get fontWeight(): string;
    /**
     * Sets the font style of this object.
     * @param {string} value - The new font style to set.
     */
    set fontStyle(value: string);
    /**
     * Gets the font style of this object.
     * @returns {string} The font style.
     */
    get fontStyle(): string;
    /**
     * Sets the font variant of this object.
     * @param {string} value - The new font variant to set.
     */
    set fontVariant(value: string);
    /**
     * Gets the font variant of this object.
     * @returns {string} The font variant.
     */
    get fontVariant(): string;
    /**
     * Sets the fill color of this object.
     * @param {string} value - The new fill color to set.
     */
    set fill(value: string);
    /**
     * Gets the fill color of this object.
     * @returns {number} The fill color.
     */
    get fill(): number;
    /**
     * Sets the alignment of this object.
     * @param {string} value - The new text alignment to set.
     */
    set align(value: string);
    /**
     * Gets the alignment of this object.
     * @returns {string} The text alignment.
     */
    get align(): string;
    /**
     * Sets the resolution of this object.
     * @param {number} value - The new resolution to set.
     */
    set resolution(value: number);
    /**
     * Gets the resolution of this object.
     * @returns {number} The resolution.
     */
    get resolution(): number;
    /**
     * Sets the tabs setting of this object.
     * @param {number} value - The new tabs setting to set.
     */
    set tabs(value: number);
    /**
     * Gets the tabs setting of this object.
     * @returns {number} The tabs setting.
     */
    get tabs(): number;
    /**
     * Sets the horizontal bounds alignment of this object.
     * @param {number} value - The new horizontal bounds alignment to set.
     */
    set boundsAlignH(value: number);
    /**
     * Gets the horizontal bounds alignment of this object.
     * @returns {number} The horizontal bounds alignment.
     */
    get boundsAlignH(): number;
    /**
     * Sets the vertical bounds alignment of this object.
     * @param {number} value - The new vertical bounds alignment to set.
     */
    set boundsAlignV(value: number);
    /**
     * Gets the vertical bounds alignment of this object.
     * @returns {number} The vertical bounds alignment.
     */
    get boundsAlignV(): number;
    /**
     * Sets the stroke color of this object.
     * @param {string} value - The new stroke color to set.
     */
    set stroke(value: string);
    /**
     * Gets the stroke color of this object.
     * @returns {number} The stroke color.
     */
    get stroke(): number;
    /**
     * Sets the stroke thickness of this object.
     * @param {number} value - The new stroke thickness to set.
     */
    set strokeThickness(value: number);
    /**
     * Gets the stroke thickness of this object.
     * @returns {number} The stroke thickness.
     */
    get strokeThickness(): number;
    /**
     * Sets the word wrap setting of this object.
     * @param {boolean} value - The new word wrap setting to set.
     */
    set wordWrap(value: boolean);
    /**
     * Gets the word wrap setting of this object.
     * @returns {number} The word wrap setting.
     */
    get wordWrap(): number;
    /**
     * Sets the word wrap width of this object.
     * @param {number} value - The new word wrap width to set.
     */
    set wordWrapWidth(value: number);
    /**
     * Gets the word wrap width of this object.
     * @returns {number} The word wrap width.
     */
    get wordWrapWidth(): number;
    /**
     * Sets the line spacing of this object.
     * @param {number} value - The new line spacing to set.
     */
    set lineSpacing(value: number);
    /**
     * Gets the line spacing of this object.
     * @returns {number} The line spacing.
     */
    get lineSpacing(): number;
    /**
     * Sets the shadow offset X of this object.
     * @param {number} value - The new shadow offset X to set.
     */
    set shadowOffsetX(value: number);
    /**
     * Gets the shadow offset X of this object.
     * @returns {number} The shadow offset X.
     */
    get shadowOffsetX(): number;
    /**
     * Sets the shadow offset Y of this object.
     * @param {number} value - The new shadow offset Y to set.
     */
    set shadowOffsetY(value: number);
    /**
     * Gets the shadow offset Y of this object.
     * @returns {number} The shadow offset Y.
     */
    get shadowOffsetY(): number;
    /**
     * Sets the shadow color of this object.
     * @param {string} value - The new shadow color to set.
     */
    set shadowColor(value: string);
    /**
     * Gets the shadow color of this object.
     * @returns {number} The shadow color.
     */
    get shadowColor(): number;
    /**
     * Sets the shadow blur of this object.
     * @param {number} value - The new shadow blur to set.
     */
    set shadowBlur(value: number);
    /**
     * Gets the shadow blur of this object.
     * @returns {number} The shadow blur.
     */
    get shadowBlur(): number;
    /**
     * Sets the shadow stroke setting of this object.
     * @param {boolean} value - The new shadow stroke setting to set.
     */
    set shadowStroke(value: boolean);
    /**
     * Gets the shadow stroke setting of this object.
     * @returns {number} The shadow stroke setting.
     */
    get shadowStroke(): number;
    /**
     * Sets the shadow fill setting of this object.
     * @param {boolean} value - The new shadow fill setting to set.
     */
    set shadowFill(value: boolean);
    /**
     * Gets the shadow fill setting of this object.
     * @returns {number} The shadow fill setting.
     */
    get shadowFill(): number;
}
import { Image } from './image.js';
import { Point } from '../geom/point.js';
import { Rectangle } from '../geom/rectangle.js';
//# sourceMappingURL=text.d.ts.map