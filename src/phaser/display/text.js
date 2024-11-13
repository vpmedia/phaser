import { TEXT } from '../core/const.js';
import { Point } from '../geom/point.js';
import { Rectangle } from '../geom/rectangle.js';
import { snapToCeil } from '../util/math.js';
import { create, remove } from './canvas/pool.js';
import { Image } from './image.js';
import { getBounds, renderCanvas, renderWebGL } from './sprite_util.js';
import { textureFromCanvas } from './webgl/texture_util.js';

export class Text extends Image {
  /**
   * TBD.
   * @param {import('../core/game.js').Game} game - TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   * @param {string} text - TBD.
   * @param {object} style - TBD.
   */
  constructor(game, x, y, text = '', style = {}) {
    super(game, x, y, null);
    this.game = game;
    this.type = TEXT;
    this.canvas = create(this);
    this.context = this.canvas.getContext('2d');
    this.padding = new Point();
    this.textBounds = null;
    this.style = null;
    this.colors = [];
    this.strokeColors = [];
    this.fontStyles = [];
    this.fontWeights = [];
    this.autoRound = false;
    this.useAdvancedWrap = false;
    this._res = game.renderer.resolution;
    this._text = text.toString();
    this._fontComponents = null;
    this._lineSpacing = 0;
    this._charCount = 0;
    this._width = 0;
    this._height = 0;
    this.loadTexture(textureFromCanvas(this.canvas));
    this.setStyle(style);
    if (this._text !== '') {
      this.updateText();
    }
  }

  /**
   * TBD.
   */
  destroy() {
    this.texture.destroy(true);
    remove(this);
    this.canvas = null;
    this.context = null;
    this.textBounds = null;
    this.style = null;
    this.colors = null;
    this.strokeColors = null;
    this.fontStyles = null;
    this.fontWeights = null;
    this.padding = null;
    this._text = null;
    this._fontComponents = null;
    super.destroy();
  }

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
  setShadow(x = 0, y = 0, color = 'rgba(0, 0, 0, 1)', blur = 0, shadowStroke = true, shadowFill = true) {
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
   * TBD.
   * @param {object} style - TBD.
   * @param {boolean} update - TBD.
   * @returns {Text} TBD.
   */
  setStyle(style = null, update = false) {
    style = JSON.parse(JSON.stringify(style)) || {};
    style.font = style.font || 'bold 20pt Arial';
    style.backgroundColor = style.backgroundColor || null;
    style.fill = style.fill || 'black';
    style.align = style.align || 'left';
    style.boundsAlignH = style.boundsAlignH || 'left';
    style.boundsAlignV = style.boundsAlignV || 'top';
    style.stroke = style.stroke || 'black'; // provide a default, see: https://github.com/GoodBoyDigital/pixi.js/issues/136
    style.strokeThickness = style.strokeThickness || 0;
    style.wordWrap = style.wordWrap || false;
    style.wordWrapWidth = style.wordWrapWidth || 100;
    style.maxLines = style.maxLines || 0;
    style.shadowOffsetX = style.shadowOffsetX || 0;
    style.shadowOffsetY = style.shadowOffsetY || 0;
    style.shadowColor = style.shadowColor || 'rgba(0,0,0,0)';
    style.shadowBlur = style.shadowBlur || 0;
    style.tabs = style.tabs || 0;
    const components = this.fontToComponents(style.font);
    if (style.fontStyle) {
      components.fontStyle = style.fontStyle;
    }
    if (style.fontVariant) {
      components.fontVariant = style.fontVariant;
    }
    if (style.fontWeight) {
      components.fontWeight = style.fontWeight;
    }
    if (style.fontSize) {
      if (typeof style.fontSize === 'number') {
        style.fontSize += 'px';
      }
      components.fontSize = style.fontSize;
    }
    this._fontComponents = components;
    style.font = this.componentsToFont(this._fontComponents);
    this.style = style;
    this.dirty = true;
    if (update) {
      this.updateText();
    }
    return this;
  }

  /**
   * TBD.
   */
  updateText() {
    this.texture.baseTexture.resolution = this._res;
    this.context.font = this.style.font;
    let outputText = this.text;
    if (this.style.wordWrap) {
      outputText = this.runWordWrap(this.text);
    }
    // Split text into lines
    const lines = outputText.split(/(?:\r\n|\r|\n)/);
    // Calculate text width
    const tabs = this.style.tabs;
    const lineWidths = [];
    let lineWidth = 0;
    let maxLineWidth = 0;
    const fontProperties = this.determineFontProperties(this.style.font);
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
              tab += tabs[c - 1];
            }
            lineWidth = tab + section;
          }
        } else {
          for (let c = 0; c < line.length; c += 1) {
            //  How far to the next tab?
            if (
              this.colors.length > 0 ||
              this.strokeColors.length > 0 ||
              this.fontWeights.length > 0 ||
              this.fontStyles.length > 0
            ) {
              lineWidth += this.measureLine(line[c]);
            } else {
              lineWidth += Math.ceil(this.context.measureText(line[c]).width);
            }
            const diff = snapToCeil(lineWidth, tabs) - lineWidth;
            lineWidth += diff;
          }
        }
      }
      lineWidths[i] = Math.ceil(lineWidth);
      maxLineWidth = Math.max(maxLineWidth, lineWidths[i]);
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
        linePositionX += maxLineWidth - lineWidths[i];
      } else if (this.style.align === 'center') {
        linePositionX += (maxLineWidth - lineWidths[i]) / 2;
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
          this.updateShadow(this.style.shadowStroke);
          if (tabs === 0) {
            this.context.strokeText(lines[i], linePositionX, linePositionY);
          } else {
            this.renderTabLine(lines[i], linePositionX, linePositionY, false);
          }
        }
        if (this.style.fill) {
          this.updateShadow(this.style.shadowFill);
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
   * TBD.
   * @param {string} line - TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   * @param {boolean} fill - TBD.
   */
  renderTabLine(line, x, y, fill) {
    const text = line.split(/(?:\t)/);
    const tabs = this.style.tabs;
    let snap = 0;
    if (Array.isArray(tabs)) {
      let tab = 0;
      for (let c = 0; c < text.length; c += 1) {
        if (c > 0) {
          tab += tabs[c - 1];
        }
        snap = x + tab;
        if (fill) {
          this.context.fillText(text[c], snap, y);
        } else {
          this.context.strokeText(text[c], snap, y);
        }
      }
    } else {
      for (let c = 0; c < text.length; c += 1) {
        const section = Math.ceil(this.context.measureText(text[c]).width);
        //  How far to the next tab?
        snap = snapToCeil(x, tabs);
        if (fill) {
          this.context.fillText(text[c], snap, y);
        } else {
          this.context.strokeText(text[c], snap, y);
        }
        x = snap + section;
      }
    }
  }

  /**
   * TBD.
   * @param {string} state - TBD.
   */
  updateShadow(state) {
    if (state) {
      this.context.shadowOffsetX = this.style.shadowOffsetX;
      this.context.shadowOffsetY = this.style.shadowOffsetY;
      this.context.shadowColor = this.style.shadowColor;
      this.context.shadowBlur = this.style.shadowBlur;
    } else {
      this.context.shadowOffsetX = 0;
      this.context.shadowOffsetY = 0;
      this.context.shadowColor = 0;
      this.context.shadowBlur = 0;
    }
  }

  /**
   * TBD.
   * @param {string} line - TBD.
   * @returns {number} TBD.
   */
  measureLine(line) {
    let lineLength = 0;
    for (let i = 0; i < line.length; i += 1) {
      const letter = line[i];
      if (this.fontWeights.length > 0 || this.fontStyles.length > 0) {
        const components = this.fontToComponents(this.context.font);
        if (this.fontStyles[this._charCount]) {
          components.fontStyle = this.fontStyles[this._charCount];
        }
        if (this.fontWeights[this._charCount]) {
          components.fontWeight = this.fontWeights[this._charCount];
        }
        this.context.font = this.componentsToFont(components);
      }
      if (this.style.stroke && this.style.strokeThickness) {
        if (this.strokeColors[this._charCount]) {
          this.context.strokeStyle = this.strokeColors[this._charCount];
        }
        this.updateShadow(this.style.shadowStroke);
      }
      if (this.style.fill) {
        if (this.colors[this._charCount]) {
          this.context.fillStyle = this.colors[this._charCount];
        }
        this.updateShadow(this.style.shadowFill);
      }
      lineLength += this.context.measureText(letter).width;
      this._charCount += 1;
    }
    return Math.ceil(lineLength);
  }

  /**
   * TBD.
   * @param {string} line - TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   */
  updateLine(line, x, y) {
    for (let i = 0; i < line.length; i += 1) {
      const letter = line[i];
      if (this.fontWeights.length > 0 || this.fontStyles.length > 0) {
        const components = this.fontToComponents(this.context.font);
        if (this.fontStyles[this._charCount]) {
          components.fontStyle = this.fontStyles[this._charCount];
        }
        if (this.fontWeights[this._charCount]) {
          components.fontWeight = this.fontWeights[this._charCount];
        }
        this.context.font = this.componentsToFont(components);
      }
      if (this.style.stroke && this.style.strokeThickness) {
        if (this.strokeColors[this._charCount]) {
          this.context.strokeStyle = this.strokeColors[this._charCount];
        }
        this.updateShadow(this.style.shadowStroke);
        this.context.strokeText(letter, x, y);
      }
      if (this.style.fill) {
        if (this.colors[this._charCount]) {
          this.context.fillStyle = this.colors[this._charCount];
        }
        this.updateShadow(this.style.shadowFill);
        this.context.fillText(letter, x, y);
      }
      x += this.context.measureText(letter).width;
      this._charCount += 1;
    }
  }

  /**
   * TBD.
   * @returns {Text} TBD.
   */
  clearColors() {
    this.colors = [];
    this.strokeColors = [];
    this.dirty = true;
    return this;
  }

  /**
   * TBD.
   * @returns {Text} TBD.
   */
  clearFontValues() {
    this.fontStyles = [];
    this.fontWeights = [];
    this.dirty = true;
    return this;
  }

  /**
   * TBD.
   * @param {number} color - TBD.
   * @param {number} position - TBD.
   * @returns {Text} TBD.
   */
  addColor(color, position) {
    this.colors[position] = color;
    this.dirty = true;
    return this;
  }

  /**
   * TBD.
   * @param {number} color - TBD.
   * @param {number} position - TBD.
   * @returns {Text} TBD.
   */
  addStrokeColor(color, position) {
    this.strokeColors[position] = color;
    this.dirty = true;
    return this;
  }

  /**
   * TBD.
   * @param {object} style - TBD.
   * @param {number} position - TBD.
   * @returns {Text} TBD.
   */
  addFontStyle(style, position) {
    this.fontStyles[position] = style;
    this.dirty = true;
    return this;
  }

  /**
   * TBD.
   * @param {number} weight - TBD.
   * @param {number} position - TBD.
   * @returns {Text} TBD.
   */
  addFontWeight(weight, position) {
    this.fontWeights[position] = weight;
    this.dirty = true;
    return this;
  }

  /**
   * TBD.
   * @param {string} text - TBD.
   * @returns {string[]} TBD.
   */
  precalculateWordWrap(text) {
    this.texture.baseTexture.resolution = this._res;
    this.context.font = this.style.font;
    const wrappedLines = this.runWordWrap(text);
    return wrappedLines.split(/(?:\r\n|\r|\n)/);
  }

  /**
   * TBD.
   * @param {string} text - TBD.
   * @returns {string} TBD.
   */
  runWordWrap(text) {
    if (this.useAdvancedWrap) {
      return this.advancedWordWrap(text);
    }
    return this.basicWordWrap(text);
  }

  /**
   * TBD.
   * @param {string} text - TBD.
   * @returns {string} TBD.
   * @throws Error.
   */
  advancedWordWrap(text) {
    const context = this.context;
    const wordWrapWidth = this.style.wordWrapWidth;
    let output = '';
    // (1) condense whitespace
    // (2) split into lines
    const lines = text.replace(/ +/gi, ' ').split(/\r?\n/gi);
    let linesCount = lines.length;
    for (let i = 0; i < linesCount; i += 1) {
      let line = lines[i];
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
              while (newWord.length) {
                newWord = newWord.slice(0, -1);
                wordWidth = context.measureText(newWord).width;
                if (wordWidth <= currentLineWidth) {
                  break;
                }
              }
              // if wordWrapWidth is too small for even a single
              // letter, shame user failure with a fatal error
              if (!newWord.length) {
                throw new Error("This text's wordWrapWidth setting is less than a single character!");
              }
              // replace current word in array with remainder
              const secondPart = word.substr(newWord.length);
              words[j] = secondPart;
              // append first piece to output
              out += newWord;
            }
            // if existing word length is 0, don't include it
            const offset = words[j].length ? j : j + 1;
            // collapse rest of sentence
            // remove any trailing white space
            const remainder = words
              .slice(offset)
              .join(' ')
              .replace(/[ \n]*$/gi, '');
            // prepend remainder to next line
            lines[i + 1] = `${remainder} ${lines[i + 1] || ''}`;
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
   * TBD.
   * @param {string} text - TBD.
   * @returns {string} TBD.
   */
  basicWordWrap(text) {
    let result = '';
    const lines = text.split('\n');
    for (let i = 0; i < lines.length; i += 1) {
      let spaceLeft = this.style.wordWrapWidth;
      const words = lines[i].split(' ');
      for (let j = 0; j < words.length; j += 1) {
        const wordWidth = this.context.measureText(words[j]).width;
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
   * TBD.
   * @param {object} components - TBD.
   */
  updateFont(components) {
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
   * TBD.
   * @param {string} font - TBD.
   * @returns {object} TBD.
   */
  fontToComponents(font) {
    // The format is specified in http://www.w3.org/TR/CSS2/fonts.html#font-shorthand:
    // style - normal | italic | oblique | inherit
    // variant - normal | small-caps | inherit
    // weight - normal | bold | bolder | lighter | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | inherit
    // size - xx-small | x-small | small | medium | large | x-large | xx-large,
    //        larger | smaller
    //        {number} (em | ex | ch | rem | vh | vw | vmin | vmax | px | mm | cm | in | pt | pc | %)
    // font-family - rest (but identifiers or quoted with comma separation)
    const m = font.match(
      /^\s*(?:\b(normal|italic|oblique|inherit)?\b)\s*(?:\b(normal|small-caps|inherit)?\b)\s*(?:\b(normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900|inherit)?\b)\s*(?:\b(xx-small|x-small|small|medium|large|x-large|xx-large|larger|smaller|0|\d*(?:[.]\d*)?(?:%|[a-z]{2,5}))?\b)\s*(.*)\s*$/
    );
    if (m) {
      let family = m[5].trim();
      // If it looks like the value should be quoted, but isn't, then quote it.
      if (!/^(?:inherit|serif|sans-serif|cursive|fantasy|monospace)$/.exec(family) && !/['",]/.exec(family)) {
        family = `'${family}'`;
      }
      return {
        font,
        fontStyle: m[1] || 'normal',
        fontVariant: m[2] || 'normal',
        fontWeight: m[3] || 'normal',
        fontSize: m[4] || 'medium',
        fontFamily: family,
      };
    }
    this.game.logger.warn(`[Text] Error parsing CSS font: ${font}`);
    return { font };
  }

  /**
   * TBD.
   * @param {object} components - TBD.
   * @returns {string} TBD.
   */
  componentsToFont(components) {
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
    if (!parts.length) {
      // Fallback to whatever value the 'font' was
      parts.push(components.font);
    }
    return parts.join(' ');
  }

  /**
   * TBD.
   * @param {string} text - TBD.
   * @param {boolean} immediate - TBD.
   * @returns {Text} TBD.
   */
  setText(text, immediate = false) {
    this.text = text.toString() || '';
    if (immediate) {
      this.updateText();
    } else {
      this.dirty = true;
    }
    return this;
  }

  /**
   * TBD.
   * @param {string[]|string[][]} list - TBD.
   * @returns {Text} TBD.
   */
  parseList(list) {
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
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   * @param {number} width - TBD.
   * @param {number} height - TBD.
   * @returns {Text} TBD.
   */
  setTextBounds(x, y, width, height) {
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
   * TBD.
   */
  updateTexture() {
    const base = this.texture.baseTexture;
    const crop = this.texture.crop;
    const frame = this.texture.frame;
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
      let x = this.textBounds.x;
      let y = this.textBounds.y;
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
   * TBD.
   * @param {object} renderSession - TBD.
   */
  renderWebGL(renderSession) {
    if (this.dirty) {
      this.updateText();
      this.dirty = false;
    }
    renderWebGL(this, renderSession);
  }

  /**
   * TBD.
   * @param {object} renderSession - TBD.
   */
  renderCanvas(renderSession) {
    if (this.dirty) {
      this.updateText();
      this.dirty = false;
    }
    renderCanvas(this, renderSession);
  }

  /**
   * TBD.
   * @returns {object} TBD.
   */
  getFontPropertiesCache() {
    if (!window.PhaserRegistry.fontPropertiesCache) {
      window.PhaserRegistry.fontPropertiesCache = {};
    }
    return window.PhaserRegistry.fontPropertiesCache;
  }

  /**
   * TBD.
   * @returns {HTMLCanvasElement} TBD.
   */
  getFontPropertiesCanvas() {
    if (!window.PhaserRegistry.fontPropertiesCanvas) {
      window.PhaserRegistry.fontPropertiesCanvas = document.createElement('canvas');
    }
    return window.PhaserRegistry.fontPropertiesCanvas;
  }

  /**
   * TBD.
   * @returns {CanvasRenderingContext2D} TBD.
   */
  getFontPropertiesContext() {
    if (!window.PhaserRegistry.fontPropertiesContext) {
      window.PhaserRegistry.fontPropertiesContext = this.getFontPropertiesCanvas().getContext('2d', {
        willReadFrequently: true,
      });
    }
    return window.PhaserRegistry.fontPropertiesContext;
  }

  /**
   * TBD.
   * @param {string} fontStyle - TBD.
   * @returns {object} TBD.
   */
  determineFontProperties(fontStyle) {
    const fontPropertiesCache = this.getFontPropertiesCache();
    let properties = fontPropertiesCache[fontStyle];
    if (!properties) {
      properties = {};
      const canvas = this.getFontPropertiesCanvas();
      const context = this.getFontPropertiesContext();
      context.font = fontStyle;
      const width = Math.ceil(context.measureText('|MÉq').width);
      let baseline = Math.ceil(context.measureText('|MÉq').width);
      const height = 2 * baseline;
      baseline = (baseline * 1.4) | 0;
      canvas.width = width;
      canvas.height = height;
      context.fillStyle = '#f00';
      context.fillRect(0, 0, width, height);
      context.font = fontStyle;
      context.textBaseline = 'alphabetic';
      context.fillStyle = '#000';
      context.fillText('|MÉq', 0, baseline);
      if (!context.getImageData(0, 0, width, height)) {
        properties.ascent = baseline;
        properties.descent = baseline + 6;
        properties.fontSize = properties.ascent + properties.descent;
        fontPropertiesCache[fontStyle] = properties;
        return properties;
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
          if (imagedata[idx + j] !== 255) {
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
      properties.ascent = baseline - i;
      idx = pixels - line;
      stop = false;
      // descent. scan from bottom to top until we find a non red pixel
      for (i = height; i > baseline; i -= 1) {
        for (j = 0; j < line; j += 4) {
          if (imagedata[idx + j] !== 255) {
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
      properties.descent = i - baseline;
      // TODO might need a tweak. kind of a temp fix!
      properties.descent += 6;
      properties.fontSize = properties.ascent + properties.descent;
      fontPropertiesCache[fontStyle] = properties;
    }
    return properties;
  }

  /**
   * TBD.
   * @param {import('../geom/matrix.js').Matrix} matrix - TBD.
   * @returns {Rectangle} TBD.
   */
  getBounds(matrix = null) {
    if (this.dirty) {
      this.updateText();
      this.dirty = false;
    }
    return getBounds(this, matrix);
  }

  /**
   * TBD.
   * @returns {string} TBD.
   */
  get text() {
    return this._text;
  }

  /**
   * TBD.
   */
  set text(value) {
    if (value !== this._text) {
      this._text = value.toString() || '';
      this.dirty = true;
      if (this.parent) {
        this.updateTransform();
      }
    }
  }

  /**
   * TBD.
   * @returns {string} TBD.
   */
  get cssFont() {
    return this.componentsToFont(this._fontComponents);
  }

  /**
   * TBD.
   */
  set cssFont(value) {
    this._fontComponents = this.fontToComponents(value || 'bold 20pt Arial');
    this.updateFont(this._fontComponents);
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get font() {
    return this._fontComponents.fontFamily;
  }

  /**
   * TBD.
   */
  set font(value) {
    let mutatedValue = value || 'Arial';
    mutatedValue = mutatedValue.trim();
    // If it looks like the value should be quoted, but isn't, then quote it.
    if (!/^(?:inherit|serif|sans-serif|cursive|fantasy|monospace)$/.exec(mutatedValue) && !/['",]/.exec(mutatedValue)) {
      mutatedValue = `'${mutatedValue}'`;
    }

    this._fontComponents.fontFamily = mutatedValue;
    this.updateFont(this._fontComponents);
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get fontSize() {
    const size = this._fontComponents.fontSize;
    if (size && /(?:^0$|px$)/.exec(size)) {
      return parseInt(size, 10);
    }
    return size;
  }

  /**
   * TBD.
   */
  set fontSize(value) {
    let mutatedValue = value || '0';
    if (typeof mutatedValue === 'number') {
      mutatedValue += 'px';
    }
    this._fontComponents.fontSize = mutatedValue;
    this.updateFont(this._fontComponents);
  }

  /**
   * TBD.
   * @returns {string} TBD.
   */
  get fontWeight() {
    return this._fontComponents.fontWeight || 'normal';
  }

  /**
   * TBD.
   */
  set fontWeight(value) {
    this._fontComponents.fontWeight = value || 'normal';
    this.updateFont(this._fontComponents);
  }

  /**
   * TBD.
   * @returns {string} TBD.
   */
  get fontStyle() {
    return this._fontComponents.fontStyle || 'normal';
  }

  /**
   * TBD.
   */
  set fontStyle(value) {
    this._fontComponents.fontStyle = value || 'normal';
    this.updateFont(this._fontComponents);
  }

  /**
   * TBD.
   * @returns {string} TBD.
   */
  get fontVariant() {
    return this._fontComponents.fontVariant || 'normal';
  }

  /**
   * TBD.
   */
  set fontVariant(value) {
    this._fontComponents.fontVariant = value || 'normal';
    this.updateFont(this._fontComponents);
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get fill() {
    return this.style.fill;
  }

  /**
   * TBD.
   */
  set fill(value) {
    if (value !== this.style.fill) {
      this.style.fill = value;
      this.dirty = true;
    }
  }

  /**
   * TBD.
   * @returns {string} TBD.
   */
  get align() {
    return this.style.align;
  }

  /**
   * TBD.
   */
  set align(value) {
    if (value !== this.style.align) {
      this.style.align = value;
      this.dirty = true;
    }
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get resolution() {
    return this._res;
  }

  /**
   * TBD.
   */
  set resolution(value) {
    if (value !== this._res) {
      this._res = value;
      this.dirty = true;
    }
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get tabs() {
    return this.style.tabs;
  }

  /**
   * TBD.
   */
  set tabs(value) {
    if (value !== this.style.tabs) {
      this.style.tabs = value;
      this.dirty = true;
    }
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get boundsAlignH() {
    return this.style.boundsAlignH;
  }

  /**
   * TBD.
   */
  set boundsAlignH(value) {
    if (value !== this.style.boundsAlignH) {
      this.style.boundsAlignH = value;
      this.dirty = true;
    }
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get boundsAlignV() {
    return this.style.boundsAlignV;
  }

  /**
   * TBD.
   */
  set boundsAlignV(value) {
    if (value !== this.style.boundsAlignV) {
      this.style.boundsAlignV = value;
      this.dirty = true;
    }
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get stroke() {
    return this.style.stroke;
  }

  /**
   * TBD.
   */
  set stroke(value) {
    if (value !== this.style.stroke) {
      this.style.stroke = value;
      this.dirty = true;
    }
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get strokeThickness() {
    return this.style.strokeThickness;
  }

  /**
   * TBD.
   */
  set strokeThickness(value) {
    if (value !== this.style.strokeThickness) {
      this.style.strokeThickness = value;
      this.dirty = true;
    }
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get wordWrap() {
    return this.style.wordWrap;
  }

  /**
   * TBD.
   */
  set wordWrap(value) {
    if (value !== this.style.wordWrap) {
      this.style.wordWrap = value;
      this.dirty = true;
    }
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get wordWrapWidth() {
    return this.style.wordWrapWidth;
  }

  /**
   * TBD.
   */
  set wordWrapWidth(value) {
    if (value !== this.style.wordWrapWidth) {
      this.style.wordWrapWidth = value;
      this.dirty = true;
    }
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get lineSpacing() {
    return this._lineSpacing;
  }

  /**
   * TBD.
   */
  set lineSpacing(value) {
    if (value !== this._lineSpacing) {
      this._lineSpacing = parseFloat(value);
      this.dirty = true;
      if (this.parent) {
        this.updateTransform();
      }
    }
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get shadowOffsetX() {
    return this.style.shadowOffsetX;
  }

  /**
   * TBD.
   */
  set shadowOffsetX(value) {
    if (value !== this.style.shadowOffsetX) {
      this.style.shadowOffsetX = value;
      this.dirty = true;
    }
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get shadowOffsetY() {
    return this.style.shadowOffsetY;
  }

  /**
   * TBD.
   */
  set shadowOffsetY(value) {
    if (value !== this.style.shadowOffsetY) {
      this.style.shadowOffsetY = value;
      this.dirty = true;
    }
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get shadowColor() {
    return this.style.shadowColor;
  }

  /**
   * TBD.
   */
  set shadowColor(value) {
    if (value !== this.style.shadowColor) {
      this.style.shadowColor = value;
      this.dirty = true;
    }
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get shadowBlur() {
    return this.style.shadowBlur;
  }

  /**
   * TBD.
   */
  set shadowBlur(value) {
    if (value !== this.style.shadowBlur) {
      this.style.shadowBlur = value;
      this.dirty = true;
    }
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get shadowStroke() {
    return this.style.shadowStroke;
  }

  /**
   * TBD.
   */
  set shadowStroke(value) {
    if (value !== this.style.shadowStroke) {
      this.style.shadowStroke = value;
      this.dirty = true;
    }
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get shadowFill() {
    return this.style.shadowFill;
  }

  /**
   * TBD.
   */
  set shadowFill(value) {
    if (value !== this.style.shadowFill) {
      this.style.shadowFill = value;
      this.dirty = true;
    }
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get width() {
    if (this.dirty) {
      this.updateText();
      this.dirty = false;
    }
    return this.scale.x * this.texture.frame.width;
  }

  /**
   * TBD.
   */
  set width(value) {
    this.scale.x = value / this.texture.frame.width;
    this._width = value;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get height() {
    if (this.dirty) {
      this.updateText();
      this.dirty = false;
    }
    return this.scale.y * this.texture.frame.height;
  }

  /**
   * TBD.
   */
  set height(value) {
    this.scale.y = value / this.texture.frame.height;
    this._height = value;
  }
}
