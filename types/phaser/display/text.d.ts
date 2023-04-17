export class Text extends Image {
    /**
     * TBD.
     *
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
    setShadow(x?: number, y?: number, color?: string, blur?: number, shadowStroke?: boolean, shadowFill?: boolean): Text;
    dirty: boolean;
    setStyle(style?: any, update?: boolean): Text;
    updateText(): void;
    renderTabLine(line: any, x: any, y: any, fill: any): void;
    updateShadow(state: any): void;
    measureLine(line: any): number;
    updateLine(line: any, x: any, y: any): void;
    clearColors(): Text;
    clearFontValues(): Text;
    addColor(color: any, position: any): Text;
    addStrokeColor(color: any, position: any): Text;
    addFontStyle(style: any, position: any): Text;
    addFontWeight(weight: any, position: any): Text;
    precalculateWordWrap(text: any): string[];
    runWordWrap(text: any): string;
    advancedWordWrap(text: any): string;
    basicWordWrap(text: any): string;
    updateFont(components: any): void;
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
    componentsToFont(components: any): string;
    setText(text: any, immediate?: boolean): Text;
    set text(arg: string);
    get text(): string;
    parseList(list: any): Text;
    setTextBounds(x: any, y: any, width: any, height: any): Text;
    updateTexture(): void;
    renderWebGL(renderSession: any): void;
    renderCanvas(renderSession: any): void;
    getFontPropertiesCache(): any;
    getFontPropertiesCanvas(): any;
    getFontPropertiesContext(): any;
    determineFontProperties(fontStyle: any): any;
    set cssFont(arg: string);
    get cssFont(): string;
    set font(arg: any);
    get font(): any;
    set fontSize(arg: any);
    get fontSize(): any;
    set fontWeight(arg: any);
    get fontWeight(): any;
    set fontStyle(arg: any);
    get fontStyle(): any;
    set fontVariant(arg: any);
    get fontVariant(): any;
    set fill(arg: any);
    get fill(): any;
    set align(arg: any);
    get align(): any;
    set resolution(arg: any);
    get resolution(): any;
    set tabs(arg: any);
    get tabs(): any;
    set boundsAlignH(arg: any);
    get boundsAlignH(): any;
    set boundsAlignV(arg: any);
    get boundsAlignV(): any;
    set stroke(arg: any);
    get stroke(): any;
    set strokeThickness(arg: any);
    get strokeThickness(): any;
    set wordWrap(arg: any);
    get wordWrap(): any;
    set wordWrapWidth(arg: any);
    get wordWrapWidth(): any;
    set lineSpacing(arg: number);
    get lineSpacing(): number;
    set shadowOffsetX(arg: any);
    get shadowOffsetX(): any;
    set shadowOffsetY(arg: any);
    get shadowOffsetY(): any;
    set shadowColor(arg: any);
    get shadowColor(): any;
    set shadowBlur(arg: any);
    get shadowBlur(): any;
    set shadowStroke(arg: any);
    get shadowStroke(): any;
    set shadowFill(arg: any);
    get shadowFill(): any;
}
import { Image } from './image';
import { Point } from '../geom/point';
import { Rectangle } from '../geom/rectangle';
import { Game } from '../core/game';
//# sourceMappingURL=text.d.ts.map