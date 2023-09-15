export class Text extends Image {
    /**
     * TBD.
     * @param {import('../core/game.js').Game} game - TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {string} text - TBD.
     * @param {object} style - TBD.
     */
    constructor(game: import('../core/game').Game, x: number, y: number, text?: string, style?: object);
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    padding: Point;
    textBounds: Rectangle;
    style: any;
    colors: any[];
    strokeColors: any[];
    fontStyles: any[];
    fontWeights: any[];
    autoRound: boolean;
    useAdvancedWrap: boolean;
    _res: any;
    _text: string;
    _fontComponents: any;
    _lineSpacing: number;
    _charCount: number;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {string} color - TBD.
     * @param {number} blur - TBD.
     * @param {boolean} shadowStroke - TBD.
     * @param {boolean} shadowFill - TBD.
     * @returns {Text} TBD.
     */
    setShadow(x?: number, y?: number, color?: string, blur?: number, shadowStroke?: boolean, shadowFill?: boolean): Text;
    dirty: boolean;
    /**
     * TBD.
     * @param {object} style - TBD.
     * @param {boolean} update - TBD.
     * @returns {Text} TBD.
     */
    setStyle(style?: object, update?: boolean): Text;
    /**
     * TBD.
     */
    updateText(): void;
    /**
     * TBD.
     * @param {string} line - TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {boolean} fill - TBD.
     */
    renderTabLine(line: string, x: number, y: number, fill: boolean): void;
    /**
     * TBD.
     * @param {string} state - TBD.
     */
    updateShadow(state: string): void;
    /**
     * TBD.
     * @param {string} line - TBD.
     * @returns {number} TBD.
     */
    measureLine(line: string): number;
    /**
     * TBD.
     * @param {string} line - TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     */
    updateLine(line: string, x: number, y: number): void;
    /**
     * TBD.
     * @returns {Text} TBD.
     */
    clearColors(): Text;
    /**
     * TBD.
     * @returns {Text} TBD.
     */
    clearFontValues(): Text;
    /**
     * TBD.
     * @param {number} color - TBD.
     * @param {number} position - TBD.
     * @returns {Text} TBD.
     */
    addColor(color: number, position: number): Text;
    /**
     * TBD.
     * @param {number} color - TBD.
     * @param {number} position - TBD.
     * @returns {Text} TBD.
     */
    addStrokeColor(color: number, position: number): Text;
    /**
     * TBD.
     * @param {object} style - TBD.
     * @param {number} position - TBD.
     * @returns {Text} TBD.
     */
    addFontStyle(style: object, position: number): Text;
    /**
     * TBD.
     * @param {number} weight - TBD.
     * @param {number} position - TBD.
     * @returns {Text} TBD.
     */
    addFontWeight(weight: number, position: number): Text;
    /**
     * TBD.
     * @param {string} text - TBD.
     * @returns {string[]} TBD.
     */
    precalculateWordWrap(text: string): string[];
    /**
     * TBD.
     * @param {string} text - TBD.
     * @returns {string} TBD.
     */
    runWordWrap(text: string): string;
    /**
     * TBD.
     * @param {string} text - TBD.
     * @returns {string} TBD.
     * @throws Error.
     */
    advancedWordWrap(text: string): string;
    /**
     * TBD.
     * @param {string} text - TBD.
     * @returns {string} TBD.
     */
    basicWordWrap(text: string): string;
    /**
     * TBD.
     * @param {object} components - TBD.
     */
    updateFont(components: object): void;
    /**
     * TBD.
     * @param {string} font - TBD.
     * @returns {object} TBD.
     */
    fontToComponents(font: string): object;
    /**
     * TBD.
     * @param {object} components - TBD.
     * @returns {string} TBD.
     */
    componentsToFont(components: object): string;
    /**
     * TBD.
     * @param {string} text - TBD.
     * @param {boolean} immediate - TBD.
     * @returns {Text} TBD.
     */
    setText(text: string, immediate?: boolean): Text;
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
     * @param {string[]|string[][]} list - TBD.
     * @returns {Text} TBD.
     */
    parseList(list: string[] | string[][]): Text;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     * @returns {Text} TBD.
     */
    setTextBounds(x: number, y: number, width: number, height: number): Text;
    /**
     * TBD.
     */
    updateTexture(): void;
    /**
     * TBD.
     * @param {object} renderSession - TBD.
     */
    renderWebGL(renderSession: object): void;
    /**
     * TBD.
     * @param {object} renderSession - TBD.
     */
    renderCanvas(renderSession: object): void;
    /**
     * TBD.
     * @returns {object} TBD.
     */
    getFontPropertiesCache(): object;
    /**
     * TBD.
     * @returns {HTMLCanvasElement} TBD.
     */
    getFontPropertiesCanvas(): HTMLCanvasElement;
    /**
     * TBD.
     * @returns {CanvasRenderingContext2D} TBD.
     */
    getFontPropertiesContext(): CanvasRenderingContext2D;
    /**
     * TBD.
     * @param {string} fontStyle - TBD.
     * @returns {object} TBD.
     */
    determineFontProperties(fontStyle: string): object;
    /**
     * TBD.
     */
    set cssFont(arg: string);
    /**
     * TBD.
     * @returns {string} TBD.
     */
    get cssFont(): string;
    /**
     * TBD.
     */
    set font(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get font(): number;
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
    set fontWeight(arg: string);
    /**
     * TBD.
     * @returns {string} TBD.
     */
    get fontWeight(): string;
    /**
     * TBD.
     */
    set fontStyle(arg: string);
    /**
     * TBD.
     * @returns {string} TBD.
     */
    get fontStyle(): string;
    /**
     * TBD.
     */
    set fontVariant(arg: string);
    /**
     * TBD.
     * @returns {string} TBD.
     */
    get fontVariant(): string;
    /**
     * TBD.
     */
    set fill(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get fill(): number;
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
    set resolution(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get resolution(): number;
    /**
     * TBD.
     */
    set tabs(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get tabs(): number;
    /**
     * TBD.
     */
    set boundsAlignH(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get boundsAlignH(): number;
    /**
     * TBD.
     */
    set boundsAlignV(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get boundsAlignV(): number;
    /**
     * TBD.
     */
    set stroke(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get stroke(): number;
    /**
     * TBD.
     */
    set strokeThickness(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get strokeThickness(): number;
    /**
     * TBD.
     */
    set wordWrap(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get wordWrap(): number;
    /**
     * TBD.
     */
    set wordWrapWidth(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get wordWrapWidth(): number;
    /**
     * TBD.
     */
    set lineSpacing(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get lineSpacing(): number;
    /**
     * TBD.
     */
    set shadowOffsetX(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get shadowOffsetX(): number;
    /**
     * TBD.
     */
    set shadowOffsetY(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get shadowOffsetY(): number;
    /**
     * TBD.
     */
    set shadowColor(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get shadowColor(): number;
    /**
     * TBD.
     */
    set shadowBlur(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get shadowBlur(): number;
    /**
     * TBD.
     */
    set shadowStroke(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get shadowStroke(): number;
    /**
     * TBD.
     */
    set shadowFill(arg: number);
    /**
     * TBD.
     * @returns {number} TBD.
     */
    get shadowFill(): number;
}
import { Point } from '../geom/point';
import { Rectangle } from '../geom/rectangle';
import { Image } from './image';
//# sourceMappingURL=text.d.ts.map
