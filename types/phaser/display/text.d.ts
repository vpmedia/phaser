export class Text extends Image {
    /**
     * TBD.
     * @param {Game} game - TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {string} text - TBD.
     * @param {object} style - TBD.
     */
    constructor(game: Game, x: number, y: number, text?: string, style?: object);
    canvas: any;
    context: any;
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
    _fontComponents: {
        font: any;
        fontStyle: any;
        fontVariant: any;
        fontWeight: any;
        fontSize: any;
        fontFamily: any;
    } | {
        font: any;
        fontStyle?: undefined;
        fontVariant?: undefined;
        fontWeight?: undefined;
        fontSize?: undefined;
        fontFamily?: undefined;
    };
    _lineSpacing: number;
    _charCount: number;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param color - TBD.
     * @param blur
     * @param shadowStroke
     * @param shadowFill
     */
    setShadow(x?: number, y?: number, color?: string, blur?: number, shadowStroke?: boolean, shadowFill?: boolean): Text;
    dirty: boolean;
    /**
     * TBD.
     * @param style
     * @param update
     */
    setStyle(style?: any, update?: boolean): Text;
    /**
     * TBD.
     */
    updateText(): void;
    /**
     * TBD.
     * @param line
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param fill
     */
    renderTabLine(line: any, x: number, y: number, fill: any): void;
    /**
     * TBD.
     * @param state
     */
    updateShadow(state: any): void;
    /**
     * TBD.
     * @param line
     */
    measureLine(line: any): number;
    /**
     * TBD.
     * @param line
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     */
    updateLine(line: any, x: number, y: number): void;
    /**
     * TBD.
     */
    clearColors(): Text;
    /**
     * TBD.
     */
    clearFontValues(): Text;
    /**
     * TBD.
     * @param color - TBD.
     * @param position - TBD.
     */
    addColor(color: any, position: any): Text;
    /**
     * TBD.
     * @param color - TBD.
     * @param position - TBD.
     */
    addStrokeColor(color: any, position: any): Text;
    /**
     * TBD.
     * @param style
     * @param position - TBD.
     */
    addFontStyle(style: any, position: any): Text;
    /**
     * TBD.
     * @param weight
     * @param position - TBD.
     */
    addFontWeight(weight: any, position: any): Text;
    /**
     * TBD.
     * @param text - TBD.
     */
    precalculateWordWrap(text: any): string[];
    /**
     * TBD.
     * @param text - TBD.
     */
    runWordWrap(text: any): string;
    /**
     * TBD.
     * @param text - TBD.
     */
    advancedWordWrap(text: any): string;
    /**
     * TBD.
     * @param text - TBD.
     */
    basicWordWrap(text: any): string;
    /**
     * TBD.
     * @param components
     */
    updateFont(components: any): void;
    /**
     * TBD.
     * @param font - TBD.
     */
    fontToComponents(font: any): {
        font: any;
        fontStyle: any;
        fontVariant: any;
        fontWeight: any;
        fontSize: any;
        fontFamily: any;
    } | {
        font: any;
        fontStyle?: undefined;
        fontVariant?: undefined;
        fontWeight?: undefined;
        fontSize?: undefined;
        fontFamily?: undefined;
    };
    /**
     * TBD.
     * @param components
     */
    componentsToFont(components: any): string;
    /**
     * TBD.
     * @param text - TBD.
     * @param immediate
     */
    setText(text: any, immediate?: boolean): Text;
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
     * @param list
     */
    parseList(list: any): Text;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     */
    setTextBounds(x: number, y: number, width: number, height: number): Text;
    /**
     * TBD.
     */
    updateTexture(): void;
    /**
     * TBD.
     * @param renderSession - TBD.
     */
    renderWebGL(renderSession: any): void;
    /**
     * TBD.
     * @param renderSession - TBD.
     */
    renderCanvas(renderSession: any): void;
    /**
     * TBD.
     */
    getFontPropertiesCache(): any;
    /**
     * TBD.
     */
    getFontPropertiesCanvas(): any;
    /**
     * TBD.
     */
    getFontPropertiesContext(): any;
    /**
     * TBD.
     * @param fontStyle
     */
    determineFontProperties(fontStyle: any): any;
    /**
     * TBD.
     * @param matrix - TBD.
     * @returns {Rectangle} TBD.
     */
    getBounds(matrix?: any): Rectangle;
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
import { Image } from './image';
import { Point } from '../geom/point';
import { Rectangle } from '../geom/rectangle';
import { Game } from '../core/game';
//# sourceMappingURL=text.d.ts.map