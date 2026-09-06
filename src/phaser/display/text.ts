import { TEXT } from '../core/const.js';
import { ENGINE_ERROR_CREATING_CANVAS_2D_CONTEXT } from '../core/error_code.js';
import { Point } from '../geom/point.js';
import { Rectangle } from '../geom/rectangle.js';
import { snapToCeil } from '../util/math.js';
import { create, remove } from './canvas/pool.js';
import { Image } from './image.js';
import { getBounds, renderCanvas, renderWebGL } from './sprite_util.js';
import { textureFromCanvas } from './webgl/texture_util.js';
import type { Game } from '../core/game.js';
import type { Matrix } from '../geom/matrix.js';
import type { RenderSession } from './render_session.js';

/** The font shorthand split into its CSS parts. */
export type FontComponents = {
  font?: string;
  fontStyle?: string;
  fontVariant?: string;
  fontWeight?: string | number;
  fontSize?: string | number;
  fontFamily?: string;
};

/** Style accepted by Text, as supplied by callers; setStyle fills in every default. */
export type TextStyle = FontComponents & {
  align?: string;
  backgroundColor?: string | null;
  boundsAlignH?: string;
  boundsAlignV?: string;
  fill?: string;
  maxLines?: number;
  shadowBlur?: number;
  shadowColor?: string;
  shadowFill?: boolean;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  shadowStroke?: boolean;
  stroke?: string;
  strokeThickness?: number;
  tabs?: number | number[];
  wordWrap?: boolean;
  wordWrapWidth?: number;
};

/** The same style once setStyle has applied every default. */
export type ResolvedTextStyle = Required<
  Pick<
    TextStyle,
    | 'align'
    | 'boundsAlignH'
    | 'boundsAlignV'
    | 'fill'
    | 'font'
    | 'maxLines'
    | 'shadowBlur'
    | 'shadowColor'
    | 'shadowOffsetX'
    | 'shadowOffsetY'
    | 'stroke'
    | 'strokeThickness'
    | 'tabs'
    | 'wordWrap'
    | 'wordWrapWidth'
  >
> &
  TextStyle & { backgroundColor: string | null };

export class Text extends Image {
  declare public type: number;
  public canvas!: HTMLCanvasElement;
  public context!: CanvasRenderingContext2D;
  public padding!: Point;
  public textBounds!: Rectangle | null;
  public style!: ResolvedTextStyle;
  public colors!: (string | null)[];
  public strokeColors!: (string | null)[];
  public fontStyles!: (string | null)[];
  public fontWeights!: (string | null)[];
  public autoRound!: boolean;
  public useAdvancedWrap!: boolean;
  public _res!: number;
  public _text!: string;
  public _fontComponents!: FontComponents;
  public _lineSpacing!: number;
  public _charCount!: number;
  declare public _width: number;
  declare public _height: number;
  public dirty!: boolean;
  /**
   * Creates a new Text object.
   * @param {Game} game - The game instance this text belongs to.
   * @param {number} x - The x position of the text.
   * @param {number} y - The y position of the text.
   * @param {string | number} text - The text content to display.
   * @param {object} style - The style settings for the text.
   */
  public constructor(game: Game, x: number, y: number, text: string | number = '', style: TextStyle = {}) {
    super(game, x, y, null);
    this.game = game;
    /** @type {number} */
    this.type = TEXT;
    this.canvas = create(this);
    const context = this.canvas.getContext('2d', { willReadFrequently: false });
    if (!context) {
      throw new Error(ENGINE_ERROR_CREATING_CANVAS_2D_CONTEXT);
    }
    this.context = context;
    this.padding = new Point();
    this.textBounds = null;
    /** @type {string[]} */
    this.colors = [];
    /** @type {string[]} */
    this.strokeColors = [];
    /** @type {string[]} */
    this.fontStyles = [];
    /** @type {number[]} */
    this.fontWeights = [];
    this.autoRound = false;
    this.useAdvancedWrap = false;
    this._res = game.renderer.resolution;
    this._text = text.toString();
    /** @type {number} */
    this._lineSpacing = 0;
    /** @type {number} */
    this._charCount = 0;
    /** @type {number} */
    this._width = 0;
    /** @type {number} */
    this._height = 0;
    this.loadTexture(textureFromCanvas(this.canvas));
    this.setStyle(style);
    if (this._text !== '') {
      this.updateText();
    }
  }

  /**
   * Destroys this text object and cleans up resources.
   */
  public override destroy(): void {
    this.texture.destroy(true);
    remove(this);
    this.textBounds = null;
    this.colors = [];
    this.strokeColors = [];
    this.fontStyles = [];
    this.fontWeights = [];
    this._text = '';
    super.destroy();
  }

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
  public setShadow(x = 0, y = 0, color = 'rgba(0, 0, 0, 1)', blur = 0, shadowStroke = true, shadowFill = true): this {
    this.style.shadowOffsetX = x;
    this.style.shadowOffsetY = y;
    this.style.shadowColor = color;
    this.style.shadowBlur = blur;
    this.style.shadowStroke = shadowStroke;
    this.style.shadowFill = shadowFill;
    this.dirty = true;
    return this;
  }

  /**
   * Sets the style properties for this text.
   * @param {object} style - The style settings to apply.
   * @param {boolean} update - Whether to update the text immediately.
   * @returns {Text} This Text object for chaining.
   */
  public setStyle(style: TextStyle | null = null, update = false): this {
    const source: TextStyle = structuredClone(style) ?? {};
    const resolved: ResolvedTextStyle = {
      ...source,
      font: source.font ?? 'bold 20pt Arial',
      backgroundColor: source.backgroundColor ?? null,
      fill: source.fill ?? 'black',
      align: source.align ?? 'left',
      boundsAlignH: source.boundsAlignH ?? 'left',
      boundsAlignV: source.boundsAlignV ?? 'top',
      // provide a default, see: https://github.com/GoodBoyDigital/pixi.js/issues/136
      stroke: source.stroke ?? 'black',
      strokeThickness: source.strokeThickness ?? 0,
      wordWrap: source.wordWrap ?? false,
      wordWrapWidth: source.wordWrapWidth ?? 100,
      maxLines: source.maxLines ?? 0,
      shadowOffsetX: source.shadowOffsetX ?? 0,
      shadowOffsetY: source.shadowOffsetY ?? 0,
      shadowColor: source.shadowColor ?? 'rgba(0,0,0,0)',
      shadowBlur: source.shadowBlur ?? 0,
      tabs: source.tabs ?? 0,
    };
    const components = this.fontToComponents(resolved.font);
    if (resolved.fontStyle) {
      components.fontStyle = resolved.fontStyle;
    }
    if (resolved.fontVariant) {
      components.fontVariant = resolved.fontVariant;
    }
    if (resolved.fontWeight) {
      components.fontWeight = String(resolved.fontWeight);
    }
    if (resolved.fontSize) {
      const fontSize = typeof resolved.fontSize === 'number' ? `${resolved.fontSize}px` : resolved.fontSize;
      resolved.fontSize = fontSize;
      components.fontSize = fontSize;
    }
    this._fontComponents = components;
    resolved.font = this.componentsToFont(components);
    this.style = resolved;
    this.dirty = true;
    if (update) {
      this.updateText();
    }
    return this;
  }

  /**
   * Updates the text content and renders it to the canvas.
   */
  public updateText(): void {
    this.texture.baseTexture.resolution = this._res;
    this.context.font = this.style.font;
    let outputText: any = this.text;
    if (this.style.wordWrap) {
      outputText = this.runWordWrap(this.text);
    }
    // Split text into lines
    const lines = outputText.split(/(?:\r\n|\r|\n)/);
    // Calculate text width
    const { tabs } = this.style;
    const lineWidths = [];
    let lineWidth = 0;
    let maxLineWidth = 0;
    let fontProperties = this.determineFontProperties(this.style.font);
    if (!fontProperties.fontSize) {
      fontProperties = this.determineFontPropertiesFallback(this.style.font);
    }
    let drawnLines = lines.length;
    if (this.style.maxLines > 0 && this.style.maxLines < lines.length) {
      drawnLines = this.style.maxLines;
    }
    this._charCount = 0;
    for (let i = 0; i < drawnLines; i += 1) {
      if (tabs === 0) {
        //  Simple layout (no tabs)
        lineWidth = this.style.strokeThickness + this.padding.x;
        if (
          this.colors.length > 0 ||
          this.strokeColors.length > 0 ||
          this.fontWeights.length > 0 ||
          this.fontStyles.length > 0
        ) {
          lineWidth += this.measureLine(lines[i]);
        } else {
          lineWidth += this.context.measureText(lines[i]).width;
        }
        // Adjust for wrapped text
        if (this.style.wordWrap) {
          lineWidth -= this.context.measureText(' ').width;
        }
      } else {
        // Complex layout (tabs)
        const line = lines[i].split(/(?:\t)/);
        lineWidth = this.padding.x + this.style.strokeThickness;
        if (Array.isArray(tabs)) {
          let tab = 0;
          for (let c = 0; c < line.length; c += 1) {
            let section = 0;
            if (
              this.colors.length > 0 ||
              this.strokeColors.length > 0 ||
              this.fontWeights.length > 0 ||
              this.fontStyles.length > 0
            ) {
              section = this.measureLine(line[c]);
            } else {
              section = Math.ceil(this.context.measureText(line[c]).width);
            }
            if (c > 0) {
              tab += tabs[c - 1]!;
            }
            lineWidth = tab + section;
          }
        } else {
          for (const section of line) {
            //  How far to the next tab?
            if (
              this.colors.length > 0 ||
              this.strokeColors.length > 0 ||
              this.fontWeights.length > 0 ||
              this.fontStyles.length > 0
            ) {
              lineWidth += this.measureLine(section);
            } else {
              lineWidth += Math.ceil(this.context.measureText(section).width);
            }
            const diff = snapToCeil(lineWidth, tabs) - lineWidth;
            lineWidth += diff;
          }
        }
      }
      lineWidths[i] = Math.ceil(lineWidth);
      maxLineWidth = Math.max(maxLineWidth, lineWidths[i]!);
    }
    this.canvas.width = maxLineWidth * this._res;
    // Calculate text height
    const lineHeight = fontProperties.fontSize + this.style.strokeThickness + this.padding.y;
    let height = lineHeight * drawnLines;
    let lineSpacing = this._lineSpacing;
    if (lineSpacing < 0 && Math.abs(lineSpacing) > lineHeight) {
      lineSpacing = -lineHeight;
    }
    // Adjust for line spacing
    if (lineSpacing !== 0) {
      height += lineSpacing > 0 ? lineSpacing * lines.length : lineSpacing * (lines.length - 1);
    }
    this.canvas.height = height * this._res;
    this.context.scale(this._res, this._res);
    if (this.style.backgroundColor) {
      this.context.fillStyle = this.style.backgroundColor;
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    this.context.fillStyle = this.style.fill;
    this.context.font = this.style.font;
    this.context.strokeStyle = this.style.stroke;
    this.context.textBaseline = 'alphabetic';
    this.context.lineWidth = this.style.strokeThickness;
    this.context.lineCap = 'round';
    this.context.lineJoin = 'round';
    let linePositionX;
    let linePositionY;
    this._charCount = 0;
    // Draw text line by line
    for (let i = 0; i < drawnLines; i += 1) {
      // Split the line by
      linePositionX = this.style.strokeThickness / 2;
      linePositionY = this.style.strokeThickness / 2 + i * lineHeight + fontProperties.ascent;
      if (i > 0) {
        linePositionY += lineSpacing * i;
      }
      if (this.style.align === 'right') {
        linePositionX += maxLineWidth - lineWidths[i]!;
      } else if (this.style.align === 'center') {
        linePositionX += (maxLineWidth - lineWidths[i]!) / 2;
      }
      if (this.autoRound) {
        linePositionX = Math.round(linePositionX);
        linePositionY = Math.round(linePositionY);
      }
      if (
        this.colors.length > 0 ||
        this.strokeColors.length > 0 ||
        this.fontWeights.length > 0 ||
        this.fontStyles.length > 0
      ) {
        this.updateLine(lines[i], linePositionX, linePositionY);
      } else {
        if (this.style.stroke && this.style.strokeThickness) {
          this.updateShadow(this.style.shadowStroke ?? false);
          if (tabs === 0) {
            this.context.strokeText(lines[i], linePositionX, linePositionY);
          } else {
            this.renderTabLine(lines[i], linePositionX, linePositionY, false);
          }
        }
        if (this.style.fill) {
          this.updateShadow(this.style.shadowFill ?? false);
          if (tabs === 0) {
            this.context.fillText(lines[i], linePositionX, linePositionY);
          } else {
            this.renderTabLine(lines[i], linePositionX, linePositionY, true);
          }
        }
      }
    }
    this.updateTexture();
    this.dirty = false;
  }

  /**
   * Renders a tabbed line of text to the canvas.
   * @param {string} line - The line of text to render.
   * @param {number} x - The x position to start rendering from.
   * @param {number} y - The y position to start rendering from.
   * @param {boolean} fill - True to fill the text, false to stroke it.
   */
  public renderTabLine(line: string, x: number, y: number, fill: boolean): void {
    const text = line.split(/(?:\t)/);
    const { tabs } = this.style;
    let snap = 0;
    if (Array.isArray(tabs)) {
      let tab = 0;
      for (let c = 0; c < text.length; c += 1) {
        if (c > 0) {
          tab += tabs[c - 1]!;
        }
        snap = x + tab;
        if (fill) {
          this.context.fillText(text[c]!, snap, y);
        } else {
          this.context.strokeText(text[c]!, snap, y);
        }
      }
    } else {
      for (const part of text) {
        const section = Math.ceil(this.context.measureText(part).width);
        //  How far to the next tab?
        snap = snapToCeil(x, tabs);
        if (fill) {
          this.context.fillText(part, snap, y);
        } else {
          this.context.strokeText(part, snap, y);
        }
        x = snap + section;
      }
    }
  }

  /**
   * Updates the shadow properties for this text.
   * @param {string} state - The shadow state to update ('stroke' or 'fill').
   */
  public updateShadow(state: boolean): void {
    if (state) {
      this.context.shadowOffsetX = this.style.shadowOffsetX;
      this.context.shadowOffsetY = this.style.shadowOffsetY;
      this.context.shadowColor = this.style.shadowColor;
      this.context.shadowBlur = this.style.shadowBlur;
    } else {
      this.context.shadowOffsetX = 0;
      this.context.shadowOffsetY = 0;
      this.context.shadowColor = 'rgba(0,0,0,0)';
      this.context.shadowBlur = 0;
    }
  }

  /**
   * Measures the width of a line of text.
   * @param {string} line - The line of text to measure.
   * @returns {number} The width of the line in pixels.
   */
  public measureLine(line: string): number {
    let lineLength = 0;
    for (const letter of line) {
      if (this.fontWeights.length > 0 || this.fontStyles.length > 0) {
        const components = this.fontToComponents(this.context.font);
        const charFontStyle = this.fontStyles[this._charCount];
        const charFontWeight = this.fontWeights[this._charCount];
        if (charFontStyle) {
          components.fontStyle = charFontStyle;
        }
        if (charFontWeight) {
          components.fontWeight = charFontWeight;
        }
        this.context.font = this.componentsToFont(components);
      }
      if (this.style.stroke && this.style.strokeThickness) {
        const charStrokeColor = this.strokeColors[this._charCount];
        if (charStrokeColor) {
          this.context.strokeStyle = charStrokeColor;
        }
        this.updateShadow(this.style.shadowStroke ?? false);
      }
      if (this.style.fill) {
        const charFillColor = this.colors[this._charCount];
        if (charFillColor) {
          this.context.fillStyle = charFillColor;
        }
        this.updateShadow(this.style.shadowFill ?? false);
      }
      lineLength += this.context.measureText(letter).width;
      this._charCount += 1;
    }
    return Math.ceil(lineLength);
  }

  /**
   * Updates a line of text to the canvas.
   * @param {string} line - The line of text to update.
   * @param {number} x - The x position to start updating from.
   * @param {number} y - The y position to start updating from.
   */
  public updateLine(line: string, x: number, y: number): void {
    for (const letter of line) {
      if (this.fontWeights.length > 0 || this.fontStyles.length > 0) {
        const components = this.fontToComponents(this.context.font);
        const charFontStyle = this.fontStyles[this._charCount];
        const charFontWeight = this.fontWeights[this._charCount];
        if (charFontStyle) {
          components.fontStyle = charFontStyle;
        }
        if (charFontWeight) {
          components.fontWeight = charFontWeight;
        }
        this.context.font = this.componentsToFont(components);
      }
      if (this.style.stroke && this.style.strokeThickness) {
        const charStrokeColor = this.strokeColors[this._charCount];
        if (charStrokeColor) {
          this.context.strokeStyle = charStrokeColor;
        }
        this.updateShadow(this.style.shadowStroke ?? false);
        this.context.strokeText(letter, x, y);
      }
      if (this.style.fill) {
        const charFillColor = this.colors[this._charCount];
        if (charFillColor) {
          this.context.fillStyle = charFillColor;
        }
        this.updateShadow(this.style.shadowFill ?? false);
        this.context.fillText(letter, x, y);
      }
      x += this.context.measureText(letter).width;
      this._charCount += 1;
    }
  }

  /**
   * Clears all color values from this text object.
   * @returns {Text} This Text object for chaining.
   */
  public clearColors(): this {
    this.colors = [];
    this.strokeColors = [];
    this.dirty = true;
    return this;
  }

  /**
   * Clears all font style values from this text object.
   * @returns {Text} This Text object for chaining.
   */
  public clearFontValues(): this {
    this.fontStyles = [];
    this.fontWeights = [];
    this.dirty = true;
    return this;
  }

  /**
   * Adds a color to this text object at the specified position.
   * @param {string} color - The color to apply.
   * @param {number} position - The character position to apply the color at.
   * @returns {Text} This Text object for chaining.
   */
  public addColor(color: string, position: number): this {
    this.colors[position] = color;
    this.dirty = true;
    return this;
  }

  /**
   * Adds a stroke color to this text object at the specified position.
   * @param {number} color - The stroke color to apply.
   * @param {number} position - The character position to apply the stroke color at.
   * @returns {Text} This Text object for chaining.
   */
  public addStrokeColor(color: string, position: number): this {
    this.strokeColors[position] = color;
    this.dirty = true;
    return this;
  }

  /**
   * Adds a font style to this text object at the specified position.
   * @param {object} style - The font style to apply.
   * @param {number} position - The character position to apply the font style at.
   * @returns {Text} This Text object for chaining.
   */
  public addFontStyle(style: string, position: number): this {
    this.fontStyles[position] = style;
    this.dirty = true;
    return this;
  }

  /**
   * Adds a font weight to this text object at the specified position.
   * @param {number} weight - The font weight to apply.
   * @param {number} position - The character position to apply the font weight at.
   * @returns {Text} This Text object for chaining.
   */
  public addFontWeight(weight: string, position: number): this {
    this.fontWeights[position] = weight;
    this.dirty = true;
    return this;
  }

  /**
   * Precalculates word wrap for the given text.
   * @param {string} text - The text to precalculate word wrap for.
   * @returns {string[]} The wrapped lines of text.
   */
  public precalculateWordWrap(text: string): string[] {
    this.texture.baseTexture.resolution = this._res;
    this.context.font = this.style.font;
    const wrappedLines = this.runWordWrap(text);
    return wrappedLines.split(/(?:\r\n|\r|\n)/);
  }

  /**
   * Runs word wrap on the given text.
   * @param {string} text - The text to run word wrap on.
   * @returns {string} The wrapped text.
   */
  public runWordWrap(text: string): string {
    if (this.useAdvancedWrap) {
      return this.advancedWordWrap(text);
    }
    return this.basicWordWrap(text);
  }

  /**
   * Runs advanced word wrap on the given text.
   * @param {string} text - The text to run advanced word wrap on.
   * @returns {string} The wrapped text.
   * @throws {Error} If the wordWrapWidth setting is less than a single character.
   */
  public advancedWordWrap(text: string): string {
    const { context } = this;
    const { wordWrapWidth } = this.style;
    let output = '';
    // (1) condense whitespace
    // (2) split into lines
    const lines = text.replace(/ +/gi, ' ').split(/\r?\n/gi);
    let linesCount = lines.length;
    for (let i = 0; i < linesCount; i += 1) {
      let line = lines[i]!;
      let out = '';
      // trim whitespace
      line = line.replace(/^ *|\s*$/gi, '');
      // if entire line is less than wordWrapWidth
      // append the entire line and exit early
      const lineWidth = context.measureText(line).width;
      if (lineWidth < wordWrapWidth) {
        output += `${line}\n`;
      } else {
        // otherwise, calculate new lines
        let currentLineWidth = wordWrapWidth;
        // split into words
        const words = line.split(' ');
        for (let j = 0; j < words.length; j += 1) {
          const word = words[j];
          const wordWithSpace = `${word} `;
          let wordWidth = context.measureText(wordWithSpace).width;
          if (wordWidth > currentLineWidth) {
            // break word
            if (j === 0) {
              // shave off letters from word until it's small enough
              let newWord = wordWithSpace;
              while (newWord.length > 0) {
                newWord = newWord.slice(0, -1);
                wordWidth = context.measureText(newWord).width;
                if (wordWidth <= currentLineWidth) {
                  break;
                }
              }
              // if wordWrapWidth is too small for even a single
              // letter, shame user failure with a fatal error
              if (newWord.length === 0) {
                throw new Error("This text's wordWrapWidth setting is less than a single character!");
              }
              // replace current word in array with remainder
              const secondPart = word!.slice(newWord.length);
              words[j] = secondPart;
              // append first piece to output
              out += newWord;
            }
            // if existing word length is 0, don't include it
            const offset = words[j]!.length > 0 ? j : j + 1;
            // collapse rest of sentence
            // remove any trailing white space
            const remainder = words
              .slice(offset)
              .join(' ')
              .replace(/[ \n]*$/gi, '');
            // prepend remainder to next line
            lines[i + 1] = `${remainder} ${lines[i + 1] ?? ''}`;
            linesCount = lines.length;
            break; // processing on this line
            // append word with space to output
          } else {
            out += wordWithSpace;
            currentLineWidth -= wordWidth;
          }
        }
        // append processed line to output
        output += `${out.replace(/[ \n]*$/gi, '')}\n`;
      }
    }
    // trim the end of the string
    output = output.replace(/[\s|\n]*$/gi, '');
    return output;
  }

  /**
   * Runs basic word wrap on the given text.
   * @param {string} text - The text to run basic word wrap on.
   * @returns {string} The wrapped text.
   */
  public basicWordWrap(text: string): string {
    let result = '';
    const lines = text.split('\n');
    for (let i = 0; i < lines.length; i += 1) {
      let spaceLeft = this.style.wordWrapWidth;
      const words = lines[i]!.split(' ');
      for (let j = 0; j < words.length; j += 1) {
        const wordWidth = this.context.measureText(words[j]!).width;
        const wordWidthWithSpace = wordWidth + this.context.measureText(' ').width;
        if (wordWidthWithSpace > spaceLeft) {
          // Skip printing the newline if it's the first word of the line that is greater than the word wrap width.
          if (j > 0) {
            result += '\n';
          }
          result += `${words[j]} `;
          spaceLeft = this.style.wordWrapWidth - wordWidth;
        } else {
          spaceLeft -= wordWidthWithSpace;
          result += `${words[j]} `;
        }
      }
      if (i < lines.length - 1) {
        result += '\n';
      }
    }
    return result;
  }

  /**
   * Updates the font properties based on the given components.
   * @param {object} components - The font components to update from.
   */
  public updateFont(components: FontComponents): void {
    const font = this.componentsToFont(components);
    if (this.style.font !== font) {
      this.style.font = font;
      this.dirty = true;
      if (this.parent) {
        this.updateTransform();
      }
    }
  }

  /**
   * Converts a font string to components.
   * @param {string} font - The font string to convert.
   * @returns {{ font: string, fontStyle?: string, fontVariant?: string, fontWeight?: string, fontSize?: string, fontFamily?: string }} The font components.
   */
  public fontToComponents(font: string) {
    // The format is specified in http://www.w3.org/TR/CSS2/fonts.html#font-shorthand:
    // style - normal | italic | oblique | inherit
    // variant - normal | small-caps | inherit
    // weight - normal | bold | bolder | lighter | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | inherit
    // size - xx-small | x-small | small | medium | large | x-large | xx-large,
    //        larger | smaller
    //        {number} (em | ex | ch | rem | vh | vw | vmin | vmax | px | mm | cm | in | pt | pc | %)
    // font-family - rest (but identifiers or quoted with comma separation)
    const m =
      /^\s*(?:\b(normal|italic|oblique|inherit)?\b)\s*(?:\b(normal|small-caps|inherit)?\b)\s*(?:\b(normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900|inherit)?\b)\s*(?:\b(xx-small|x-small|small|medium|large|x-large|xx-large|larger|smaller|0|\d*(?:[.]\d*)?(?:%|[a-z]{2,5}))?\b)\s*(.*)\s*$/.exec(
        font
      );
    if (m) {
      let family = m[5]!.trim();
      // If it looks like the value should be quoted, but isn't, then quote it.
      if (!/^(?:inherit|serif|sans-serif|cursive|fantasy|monospace)$/.test(family) && !/['",]/.test(family)) {
        family = `'${family}'`;
      }
      return {
        font,
        fontStyle: m[1] ?? 'normal',
        fontVariant: m[2] ?? 'normal',
        fontWeight: m[3] ?? 'normal',
        fontSize: m[4] ?? 'medium',
        fontFamily: family,
      };
    }
    this.game.logger.warn(`[Text] Error parsing CSS font: ${font}`);
    return { font };
  }

  /**
   * Converts font components to a font string.
   * @param {object} components - The font components to convert.
   * @returns {string} The font string.
   */
  public componentsToFont(components: FontComponents): string {
    const parts = [];
    let v;
    v = components.fontStyle;
    if (v && v !== 'normal') {
      parts.push(v);
    }
    v = components.fontVariant;
    if (v && v !== 'normal') {
      parts.push(v);
    }
    v = components.fontWeight;
    if (v && v !== 'normal') {
      parts.push(v);
    }
    v = components.fontSize;
    if (v && v !== 'medium') {
      parts.push(v);
    }
    v = components.fontFamily;
    if (v) {
      parts.push(v);
    }
    if (parts.length === 0) {
      // Fallback to whatever value the 'font' was
      parts.push(components.font);
    }
    return parts.join(' ');
  }

  /**
   * Sets the text content of this object.
   * @param {string} text - The new text to set.
   * @param {boolean} immediate - If true, updates the text immediately.
   * @returns {Text} This Text object for chaining.
   */
  public setText(text: string | number, immediate = false): this {
    this.text = text.toString() ?? '';
    if (immediate) {
      this.updateText();
    } else {
      this.dirty = true;
    }
    return this;
  }

  /**
   * Parses a list of text into this object.
   * @param {string[]|string[][]} list - The list of text to parse.
   * @returns {Text} This Text object for chaining.
   */
  public parseList(list: any): this {
    if (!Array.isArray(list)) {
      return this;
    }
    let s = '';
    for (let i = 0; i < list.length; i += 1) {
      if (Array.isArray(list[i])) {
        s += list[i].join('\t');
        if (i < list.length - 1) {
          s += '\n';
        }
      } else {
        s += list[i];
        if (i < list.length - 1) {
          s += '\t';
        }
      }
    }
    this.text = s;
    this.dirty = true;
    return this;
  }

  /**
   * Sets the text bounds for this object.
   * @param {number} x - The x position of the bounds.
   * @param {number} y - The y position of the bounds.
   * @param {number} width - The width of the bounds.
   * @param {number} height - The height of the bounds.
   * @returns {Text} This Text object for chaining.
   */
  public setTextBounds(x: number, y: number, width: number, height: number): this {
    if (x === undefined) {
      this.textBounds = null;
    } else {
      if (!this.textBounds) {
        this.textBounds = new Rectangle(x, y, width, height);
      } else {
        this.textBounds.setTo(x, y, width, height);
      }
      if (this.style.wordWrapWidth > width) {
        this.style.wordWrapWidth = width;
      }
    }
    this.updateTexture();
    return this;
  }

  /**
   * Updates the texture of this object.
   */
  public updateTexture(): void {
    const base = this.texture.baseTexture;
    const { crop } = this.texture;
    const { frame } = this.texture;
    const w = this.canvas.width;
    const h = this.canvas.height;
    base.width = w;
    base.height = h;
    crop.width = w;
    crop.height = h;
    frame.width = w;
    frame.height = h;
    this.texture.width = w;
    this.texture.height = h;
    this._width = w;
    this._height = h;
    if (this.textBounds) {
      let { x } = this.textBounds;
      let { y } = this.textBounds;
      //  Align the canvas based on the bounds
      if (this.style.boundsAlignH === 'right') {
        x += this.textBounds.width - this.canvas.width / this.resolution;
      } else if (this.style.boundsAlignH === 'center') {
        x += this.textBounds.halfWidth - this.canvas.width / this.resolution / 2;
      }
      if (this.style.boundsAlignV === 'bottom') {
        y += this.textBounds.height - this.canvas.height / this.resolution;
      } else if (this.style.boundsAlignV === 'middle') {
        y += this.textBounds.halfHeight - this.canvas.height / this.resolution / 2;
      }
      this.pivot.x = -x;
      this.pivot.y = -y;
    }
    // Can't render something with a zero sized dimension
    this.renderable = w !== 0 && h !== 0;
    this.texture.requiresReTint = true;
    this.texture.baseTexture.dirty();
  }

  /**
   * Renders this text object using WebGL.
   * @param {object} renderSession - The render session to use.
   */
  public override renderWebGL(renderSession: RenderSession): void {
    if (this.dirty) {
      this.updateText();
      this.dirty = false;
    }
    renderWebGL(this, renderSession);
  }

  /**
   * Renders this text object using Canvas.
   * @param {object} renderSession - The render session to use.
   */
  public override renderCanvas(renderSession: RenderSession): void {
    if (this.dirty) {
      this.updateText();
      this.dirty = false;
    }
    renderCanvas(this, renderSession);
  }

  /**
   * Gets the font properties cache object.
   * @returns {{[key: string]: {ascent: number, descent: number, fontSize: number}}} The font properties cache.
   */
  public getFontPropertiesCache(): Record<string, FontProperties> {
    globalThis.PhaserRegistry.fontPropertiesCache ??= {};
    return globalThis.PhaserRegistry.fontPropertiesCache;
  }

  /**
   * Gets the font properties canvas element.
   * @returns {HTMLCanvasElement} The font properties canvas element.
   */
  public getFontPropertiesCanvas(): HTMLCanvasElement {
    globalThis.PhaserRegistry.fontPropertiesCanvas ??= document.createElement('canvas');
    return globalThis.PhaserRegistry.fontPropertiesCanvas;
  }

  /**
   * Gets the font properties canvas context.
   * @returns {CanvasRenderingContext2D} The font properties canvas context.
   */
  public getFontPropertiesContext(): CanvasRenderingContext2D {
    if (!globalThis.PhaserRegistry.fontPropertiesContext) {
      const canvas = this.getFontPropertiesCanvas();
      const context = canvas.getContext('2d', { willReadFrequently: true });
      if (!context) {
        throw new Error(ENGINE_ERROR_CREATING_CANVAS_2D_CONTEXT);
      }
      globalThis.PhaserRegistry.fontPropertiesContext = context;
    }
    return globalThis.PhaserRegistry.fontPropertiesContext;
  }

  /**
   * Determines the font properties for a given font.
   * @param {string} font - The font to determine properties for.
   * @returns {object} The font properties.
   */
  public determineFontProperties(font: string): FontProperties {
    const fontPropertiesCache = this.getFontPropertiesCache();
    const cached = fontPropertiesCache[font];
    if (cached) {
      return cached;
    }
    const METRICS_STRING = '|ÉqÅ';
    const BASELINE_SYMBOL = 'M';
    /** @type {CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D} */
    const context = this.getFontPropertiesContext();
    context.font = font;
    const metrics = context.measureText(METRICS_STRING + BASELINE_SYMBOL);
    const properties: FontProperties = {
      ascent: Math.ceil(metrics.actualBoundingBoxAscent),
      descent: Math.ceil(metrics.actualBoundingBoxDescent),
      fontSize: Math.ceil(metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent),
    };
    return properties;
  }

  /**
   * Determines font properties using a fallback method.
   * @param {string} fontStyle - The font style to determine properties for.
   * @returns {{ascent: number, descent: number, fontSize: number}} The font properties.
   */
  public determineFontPropertiesFallback(fontStyle: string): FontProperties {
    const fontPropertiesCache = this.getFontPropertiesCache();
    const cached = fontPropertiesCache[fontStyle];
    if (!cached) {
      const canvas = this.getFontPropertiesCanvas();
      const context = this.getFontPropertiesContext();
      context.font = fontStyle;
      const width = Math.ceil(context.measureText('|MÉq').width);
      let baseline = Math.ceil(context.measureText('|MÉq').width);
      const height = 2 * baseline;
      baseline = Math.trunc(baseline * 1.4);
      canvas.width = width;
      canvas.height = height;
      context.fillStyle = '#f00';
      context.fillRect(0, 0, width, height);
      context.font = fontStyle;
      context.textBaseline = 'alphabetic';
      context.fillStyle = '#000';
      context.fillText('|MÉq', 0, baseline);
      if (!context.getImageData(0, 0, width, height)) {
        const fallback: FontProperties = {
          ascent: baseline,
          descent: baseline + 6,
          fontSize: baseline + baseline + 6,
        };
        fontPropertiesCache[fontStyle] = fallback;
        return fallback;
      }
      const imagedata = context.getImageData(0, 0, width, height).data;
      const pixels = imagedata.length;
      const line = width * 4;
      let i;
      let j;
      let idx = 0;
      let stop = false;
      // ascent. scan from top to bottom until we find a non red pixel
      for (i = 0; i < baseline; i += 1) {
        for (j = 0; j < line; j += 4) {
          // firefox returns 253 for red pixel
          if (imagedata[idx + j]! < 253) {
            stop = true;
            break;
          }
        }
        if (!stop) {
          idx += line;
        } else {
          break;
        }
      }
      const ascent = baseline - i;
      idx = pixels - line;
      stop = false;
      // descent. scan from bottom to top until we find a non red pixel
      for (i = height; i > baseline; i -= 1) {
        for (j = 0; j < line; j += 4) {
          // firefox returns 253 for red pixel
          if (imagedata[idx + j]! < 253) {
            stop = true;
            break;
          }
        }
        if (!stop) {
          idx -= line;
        } else {
          break;
        }
      }
      // TODO might need a tweak. kind of a temp fix!
      const descent = i - baseline + 6;
      const properties: FontProperties = { ascent, descent, fontSize: ascent + descent };
      fontPropertiesCache[fontStyle] = properties;
      return properties;
    }
    return cached;
  }

  /**
   * Gets the bounds of this text object.
   * @param {Matrix} matrix - The transformation matrix to use.
   * @returns {Rectangle} The bounds of this text object.
   */
  public override getBounds(matrix: Matrix | null = null): Rectangle {
    if (this.dirty) {
      this.updateText();
      this.dirty = false;
    }
    return getBounds(this, matrix);
  }

  /**
   * Gets the text content of this object.
   * @returns {string} The current text content.
   */
  public get text(): string {
    return this._text;
  }

  /**
   * Sets the text content of this object.
   * @param {string | number | boolean | Date} value - The new text content to set.
   */
  public set text(value: string | number) {
    if (value !== this._text) {
      this._text = value.toString() || '';
      this.dirty = true;
      if (this.parent) {
        this.updateTransform();
      }
    }
  }

  /**
   * Gets the CSS font string for this object.
   * @returns {string} The CSS font string.
   */
  public get cssFont(): string {
    return this.componentsToFont(this._fontComponents);
  }

  /**
   * Sets the CSS font string for this object.
   * @param {string} value - The new CSS font string to set.
   */
  public set cssFont(value: string) {
    this._fontComponents = this.fontToComponents(value || 'bold 20pt Arial');
    this.updateFont(this._fontComponents);
  }

  /**
   * Gets the font family of this object.
   * @returns {number} The font family.
   */
  public get font(): string {
    return this._fontComponents.fontFamily ?? '';
  }

  /**
   * Sets the font family of this object.
   * @param {string} value - The new font family to set.
   */
  public set font(value: string) {
    let mutatedValue = value || 'Arial';
    mutatedValue = mutatedValue.trim();
    // If it looks like the value should be quoted, but isn't, then quote it.
    if (!/^(?:inherit|serif|sans-serif|cursive|fantasy|monospace)$/.test(mutatedValue) && !/['",]/.test(mutatedValue)) {
      mutatedValue = `'${mutatedValue}'`;
    }

    this._fontComponents.fontFamily = mutatedValue;
    this.updateFont(this._fontComponents);
  }

  /**
   * Gets the font size of this object.
   * @returns {number} The font size.
   */
  public get fontSize(): number {
    const size = this._fontComponents.fontSize;
    if (typeof size === 'number') {
      return size;
    }
    if (size && /(?:^0$|px$)/.exec(size)) {
      // Number() cannot read the value here: the string carries a px suffix.
      // eslint-disable-next-line unicorn/prefer-number-coercion
      return Number.parseInt(size, 10);
    }
    return 0;
  }

  /**
   * Sets the font size of this object.
   * @param {number} value - The new font size to set.
   */
  public set fontSize(value: number) {
    this._fontComponents.fontSize = value ? `${value}px` : '0';
    this.updateFont(this._fontComponents);
  }

  /**
   * Gets the font weight of this object.
   * @returns {string} The font weight.
   */
  public get fontWeight(): string {
    return String(this._fontComponents.fontWeight ?? 'normal');
  }

  /**
   * Sets the font weight of this object.
   * @param {string} value - The new font weight to set.
   */
  public set fontWeight(value: string) {
    this._fontComponents.fontWeight = value || 'normal';
    this.updateFont(this._fontComponents);
  }

  /**
   * Gets the font style of this object.
   * @returns {string} The font style.
   */
  public get fontStyle(): string {
    return this._fontComponents.fontStyle ?? 'normal';
  }

  /**
   * Sets the font style of this object.
   * @param {string} value - The new font style to set.
   */
  public set fontStyle(value: string) {
    this._fontComponents.fontStyle = value || 'normal';
    this.updateFont(this._fontComponents);
  }

  /**
   * Gets the font variant of this object.
   * @returns {string} The font variant.
   */
  public get fontVariant(): string {
    return this._fontComponents.fontVariant ?? 'normal';
  }

  /**
   * Sets the font variant of this object.
   * @param {string} value - The new font variant to set.
   */
  public set fontVariant(value: string) {
    this._fontComponents.fontVariant = value || 'normal';
    this.updateFont(this._fontComponents);
  }

  /**
   * Gets the fill color of this object.
   * @returns {number} The fill color.
   */
  public get fill(): string {
    return this.style.fill;
  }

  /**
   * Sets the fill color of this object.
   * @param {string} value - The new fill color to set.
   */
  public set fill(value: string) {
    if (value !== this.style.fill) {
      this.style.fill = value;
      this.dirty = true;
    }
  }

  /**
   * Gets the alignment of this object.
   * @returns {string} The text alignment.
   */
  public get align(): string {
    return this.style.align;
  }

  /**
   * Sets the alignment of this object.
   * @param {string} value - The new text alignment to set.
   */
  public set align(value: string) {
    if (value !== this.style.align) {
      this.style.align = value;
      this.dirty = true;
    }
  }

  /**
   * Gets the resolution of this object.
   * @returns {number} The resolution.
   */
  public get resolution(): number {
    return this._res;
  }

  /**
   * Sets the resolution of this object.
   * @param {number} value - The new resolution to set.
   */
  public set resolution(value: number) {
    if (value !== this._res) {
      this._res = value;
      this.dirty = true;
    }
  }

  /**
   * Gets the tabs setting of this object.
   * @returns {number} The tabs setting.
   */
  public get tabs(): number | number[] {
    return this.style.tabs;
  }

  /**
   * Sets the tabs setting of this object.
   * @param {number} value - The new tabs setting to set.
   */
  public set tabs(value: number | number[]) {
    if (value !== this.style.tabs) {
      this.style.tabs = value;
      this.dirty = true;
    }
  }

  /**
   * Gets the horizontal bounds alignment of this object.
   * @returns {number} The horizontal bounds alignment.
   */
  public get boundsAlignH(): string {
    return this.style.boundsAlignH;
  }

  /**
   * Sets the horizontal bounds alignment of this object.
   * @param {number} value - The new horizontal bounds alignment to set.
   */
  public set boundsAlignH(value: string) {
    if (value !== this.style.boundsAlignH) {
      this.style.boundsAlignH = value;
      this.dirty = true;
    }
  }

  /**
   * Gets the vertical bounds alignment of this object.
   * @returns {number} The vertical bounds alignment.
   */
  public get boundsAlignV(): string {
    return this.style.boundsAlignV;
  }

  /**
   * Sets the vertical bounds alignment of this object.
   * @param {number} value - The new vertical bounds alignment to set.
   */
  public set boundsAlignV(value: string) {
    if (value !== this.style.boundsAlignV) {
      this.style.boundsAlignV = value;
      this.dirty = true;
    }
  }

  /**
   * Gets the stroke color of this object.
   * @returns {number} The stroke color.
   */
  public get stroke(): string {
    return this.style.stroke;
  }

  /**
   * Sets the stroke color of this object.
   * @param {string} value - The new stroke color to set.
   */
  public set stroke(value: string) {
    if (value !== this.style.stroke) {
      this.style.stroke = value;
      this.dirty = true;
    }
  }

  /**
   * Gets the stroke thickness of this object.
   * @returns {number} The stroke thickness.
   */
  public get strokeThickness(): number {
    return this.style.strokeThickness;
  }

  /**
   * Sets the stroke thickness of this object.
   * @param {number} value - The new stroke thickness to set.
   */
  public set strokeThickness(value: number) {
    if (value !== this.style.strokeThickness) {
      this.style.strokeThickness = value;
      this.dirty = true;
    }
  }

  /**
   * Gets the word wrap setting of this object.
   * @returns {number} The word wrap setting.
   */
  public get wordWrap(): boolean {
    return this.style.wordWrap;
  }

  /**
   * Sets the word wrap setting of this object.
   * @param {boolean} value - The new word wrap setting to set.
   */
  public set wordWrap(value: boolean) {
    if (value !== this.style.wordWrap) {
      this.style.wordWrap = value;
      this.dirty = true;
    }
  }

  /**
   * Gets the word wrap width of this object.
   * @returns {number} The word wrap width.
   */
  public get wordWrapWidth(): number {
    return this.style.wordWrapWidth;
  }

  /**
   * Sets the word wrap width of this object.
   * @param {number} value - The new word wrap width to set.
   */
  public set wordWrapWidth(value: number) {
    if (value !== this.style.wordWrapWidth) {
      this.style.wordWrapWidth = value;
      this.dirty = true;
    }
  }

  /**
   * Gets the line spacing of this object.
   * @returns {number} The line spacing.
   */
  public get lineSpacing(): number {
    return this._lineSpacing;
  }

  /**
   * Sets the line spacing of this object.
   * @param {number} value - The new line spacing to set.
   */
  public set lineSpacing(value: number) {
    if (value !== this._lineSpacing) {
      this._lineSpacing = value;
      this.dirty = true;
      if (this.parent) {
        this.updateTransform();
      }
    }
  }

  /**
   * Gets the shadow offset X of this object.
   * @returns {number} The shadow offset X.
   */
  public get shadowOffsetX(): number {
    return this.style.shadowOffsetX;
  }

  /**
   * Sets the shadow offset X of this object.
   * @param {number} value - The new shadow offset X to set.
   */
  public set shadowOffsetX(value: number) {
    if (value !== this.style.shadowOffsetX) {
      this.style.shadowOffsetX = value;
      this.dirty = true;
    }
  }

  /**
   * Gets the shadow offset Y of this object.
   * @returns {number} The shadow offset Y.
   */
  public get shadowOffsetY(): number {
    return this.style.shadowOffsetY;
  }

  /**
   * Sets the shadow offset Y of this object.
   * @param {number} value - The new shadow offset Y to set.
   */
  public set shadowOffsetY(value: number) {
    if (value !== this.style.shadowOffsetY) {
      this.style.shadowOffsetY = value;
      this.dirty = true;
    }
  }

  /**
   * Gets the shadow color of this object.
   * @returns {number} The shadow color.
   */
  public get shadowColor(): string {
    return this.style.shadowColor;
  }

  /**
   * Sets the shadow color of this object.
   * @param {string} value - The new shadow color to set.
   */
  public set shadowColor(value: string) {
    if (value !== this.style.shadowColor) {
      this.style.shadowColor = value;
      this.dirty = true;
    }
  }

  /**
   * Gets the shadow blur of this object.
   * @returns {number} The shadow blur.
   */
  public get shadowBlur(): number {
    return this.style.shadowBlur;
  }

  /**
   * Sets the shadow blur of this object.
   * @param {number} value - The new shadow blur to set.
   */
  public set shadowBlur(value: number) {
    if (value !== this.style.shadowBlur) {
      this.style.shadowBlur = value;
      this.dirty = true;
    }
  }

  /**
   * Gets the shadow stroke setting of this object.
   * @returns {number} The shadow stroke setting.
   */
  public get shadowStroke(): boolean {
    return this.style.shadowStroke ?? false;
  }

  /**
   * Sets the shadow stroke setting of this object.
   * @param {boolean} value - The new shadow stroke setting to set.
   */
  public set shadowStroke(value: boolean) {
    if (value !== this.style.shadowStroke) {
      this.style.shadowStroke = value;
      this.dirty = true;
    }
  }

  /**
   * Gets the shadow fill setting of this object.
   * @returns {number} The shadow fill setting.
   */
  public get shadowFill(): boolean {
    return this.style.shadowFill ?? false;
  }

  /**
   * Sets the shadow fill setting of this object.
   * @param {boolean} value - The new shadow fill setting to set.
   */
  public set shadowFill(value: boolean) {
    if (value !== this.style.shadowFill) {
      this.style.shadowFill = value;
      this.dirty = true;
    }
  }

  /**
   * Gets the width of this object.
   * @returns {number} The width in pixels.
   */
  public override get width(): number {
    if (this.dirty) {
      this.updateText();
      this.dirty = false;
    }
    return this.scale.x * this.texture.frame.width;
  }

  /**
   * Sets the width of this object.
   * @param {number} value - The new width to set in pixels.
   */
  public override set width(value: number) {
    this.scale.x = value / this.texture.frame.width;
    this._width = value;
  }

  /**
   * Gets the height of this object.
   * @returns {number} The height in pixels.
   */
  public override get height(): number {
    if (this.dirty) {
      this.updateText();
      this.dirty = false;
    }
    return this.scale.y * this.texture.frame.height;
  }

  /**
   * Sets the height of this object.
   * @param {number} value - The new height to set in pixels.
   */
  public override set height(value: number) {
    this.scale.y = value / this.texture.frame.height;
    this._height = value;
  }
}
