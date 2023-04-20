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
    _fontComponents: any;
    _lineSpacing: number;
    _charCount: number;
    /**
     * TBD.
     * @param {number} x - TBD.
     * @param {number} y - TBD.
     * @param color
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
     * @param color
     * @param position
     */
    addColor(color: any, position: any): Text;
    /**
     * TBD.
     * @param color
     * @param position
     */
    addStrokeColor(color: any, position: any): Text;
    /**
     * TBD.
     * @param style
     * @param position
     */
    addFontStyle(style: any, position: any): Text;
    /**
     * TBD.
     * @param weight
     * @param position
     */
    addFontWeight(weight: any, position: any): Text;
    /**
     * TBD.
     * @param text
     */
    precalculateWordWrap(text: any): string[];
    /**
     * TBD.
     * @param text
     */
    runWordWrap(text: any): string;
    /**
     * TBD.
     * @param text
     */
    advancedWordWrap(text: any): string;
    /**
     * TBD.
     * @param text
     */
    basicWordWrap(text: any): string;
    /**
     * TBD.
     * @param components
     */
    updateFont(components: any): void;
    /**
     * TBD.
     * @param font
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
     * @param text
     * @param immediate
     */
    setText(text: any, immediate?: boolean): Text;
    /**
     * TBD.
     */
    set text(arg: string);
    /**
     * TBD.
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
     * @param renderSession
     */
    renderWebGL(renderSession: any): void;
    /**
     * TBD.
     * @param renderSession
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
     */
    set cssFont(arg: string);
    /**
     * TBD.
     */
    get cssFont(): string;
    /**
     * TBD.
     */
    set font(arg: any);
    /**
     * TBD.
     */
    get font(): any;
    /**
     * TBD.
     */
    set fontSize(arg: any);
    /**
     * TBD.
     */
    get fontSize(): any;
    /**
     * TBD.
     */
    set fontWeight(arg: any);
    /**
     * TBD.
     */
    get fontWeight(): any;
    /**
     * TBD.
     */
    set fontStyle(arg: any);
    /**
     * TBD.
     */
    get fontStyle(): any;
    /**
     * TBD.
     */
    set fontVariant(arg: any);
    /**
     * TBD.
     */
    get fontVariant(): any;
    /**
     * TBD.
     */
    set fill(arg: any);
    /**
     * TBD.
     */
    get fill(): any;
    /**
     * TBD.
     */
    set align(arg: any);
    /**
     * TBD.
     */
    get align(): any;
    /**
     * TBD.
     */
    set resolution(arg: any);
    /**
     * TBD.
     */
    get resolution(): any;
    /**
     * TBD.
     */
    set tabs(arg: any);
    /**
     * TBD.
     */
    get tabs(): any;
    /**
     * TBD.
     */
    set boundsAlignH(arg: any);
    /**
     * TBD.
     */
    get boundsAlignH(): any;
    /**
     * TBD.
     */
    set boundsAlignV(arg: any);
    /**
     * TBD.
     */
    get boundsAlignV(): any;
    /**
     * TBD.
     */
    set stroke(arg: any);
    /**
     * TBD.
     */
    get stroke(): any;
    /**
     * TBD.
     */
    set strokeThickness(arg: any);
    /**
     * TBD.
     */
    get strokeThickness(): any;
    /**
     * TBD.
     */
    set wordWrap(arg: any);
    /**
     * TBD.
     */
    get wordWrap(): any;
    /**
     * TBD.
     */
    set wordWrapWidth(arg: any);
    /**
     * TBD.
     */
    get wordWrapWidth(): any;
    /**
     * TBD.
     */
    set lineSpacing(arg: number);
    /**
     * TBD.
     */
    get lineSpacing(): number;
    /**
     * TBD.
     */
    set shadowOffsetX(arg: any);
    /**
     * TBD.
     */
    get shadowOffsetX(): any;
    /**
     * TBD.
     */
    set shadowOffsetY(arg: any);
    /**
     * TBD.
     */
    get shadowOffsetY(): any;
    /**
     * TBD.
     */
    set shadowColor(arg: any);
    /**
     * TBD.
     */
    get shadowColor(): any;
    /**
     * TBD.
     */
    set shadowBlur(arg: any);
    /**
     * TBD.
     */
    get shadowBlur(): any;
    /**
     * TBD.
     */
    set shadowStroke(arg: any);
    /**
     * TBD.
     */
    get shadowStroke(): any;
    /**
     * TBD.
     */
    set shadowFill(arg: any);
    /**
     * TBD.
     */
    get shadowFill(): any;
}
import { Image } from './image';
import { Point } from '../geom/point';
import { Rectangle } from '../geom/rectangle';
import { Game } from '../core/game';
//# sourceMappingURL=text.d.ts.map