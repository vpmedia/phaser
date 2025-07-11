import { BITMAP_TEXT, SCALE_LINEAR, SCALE_NEAREST } from '../core/const.js';
import { Point } from '../geom/point.js';
import { DisplayObject } from './display_object.js';
import { Image } from './image.js';

export class BitmapText extends DisplayObject {
  /**
   * TBD.
   * @param {import('../core/game.js').Game} game - TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   * @param {string} font - TBD.
   * @param {string} text - TBD.
   * @param {number} size - TBD.
   * @param {string} align - TBD.
   */
  constructor(game, x = 0, y = 0, font = '', text = '', size = 32, align = 'left') {
    super();
    this.game = game;
    this.type = BITMAP_TEXT;
    this.position.set(x, y);
    this.textWidth = 0;
    this.textHeight = 0;
    this._prevAnchor = new Point();
    this._glyphs = [];
    this._maxWidth = 0;
    this._text = text.toString() || '';
    this._data = game.cache.getBitmapFont(font);
    this._font = font;
    this._fontSize = size;
    this._align = align;
    this._tint = 0xffffff;
    this.updateText();
    this.dirty = false;
  }

  /**
   * TBD.
   */
  destroy() {
    this._prevAnchor = null;
    this._glyphs = null;
    this._text = null;
    this._data = null;
    super.destroy();
  }

  /**
   * TBD.
   */
  preUpdate() {
    if (this.pendingDestroy) {
      this.destroy();
      return;
    }

    if (!this.exists || !this.parent.exists) {
      this.renderOrderID = -1;
      return;
    }
    if (this.visible) {
      this.game.stage.currentRenderOrderID += 1;
      this.renderOrderID = this.game.stage.currentRenderOrderID;
    }
    for (let i = 0; i < this.children.length; i += 1) {
      this.children[i].preUpdate();
    }
  }

  /**
   * TBD.
   * @param {string} text - TBD.
   */
  setText(text) {
    this.text = text;
  }

  /**
   * TBD.
   * @param {object} data - TBD.
   * @param {number} scale - TBD.
   * @param {string} text - TBD.
   * @returns {object} TBD.
   */
  scanLine(data, scale, text) {
    let x = 0;
    let w = 0;
    let lastSpace = -1;
    let wrappedWidth = 0;
    let prevCharCode = null;
    const maxWidth = this._maxWidth > 0 ? this._maxWidth : null;
    const chars = [];
    //  Let's scan the text and work out if any of the lines are > maxWidth
    let end = true;
    for (let i = 0; i < text.length; i += 1) {
      end = i === text.length - 1;
      if (/(?:\r\n|\r|\n)/.test(text.charAt(i))) {
        return {
          width: w,
          text: text.substr(0, i),
          end,
          chars,
        };
      }
      let charCode = text.charCodeAt(i);
      let charData = data.chars[charCode];
      let c = 0;
      //  If the character data isn't found in the data array
      //  then we replace it with a blank space
      if (charData === undefined) {
        charCode = 32;
        charData = data.chars[charCode];
      }
      //  Adjust for kerning from previous character to this one
      const kerning = prevCharCode && charData.kerning[prevCharCode] ? charData.kerning[prevCharCode] : 0;
      //  Record the last space in the string and the current width
      if (/(\s)/.test(text.charAt(i))) {
        lastSpace = i;
        wrappedWidth = w;
      }
      //  What will the line width be if we add this character to it?
      c = (kerning + charData.texture.width + charData.xOffset) * scale;
      //  Do we need to line-wrap?
      if (maxWidth && w + c >= maxWidth && lastSpace > -1) {
        //  The last space was at "lastSpace" which was "i - lastSpace" characters ago
        return {
          width: wrappedWidth || w,
          text: text.substr(0, i - (i - lastSpace)),
          end,
          chars,
        };
      }
      w += (charData.xAdvance + kerning) * scale;
      chars.push(x + (charData.xOffset + kerning) * scale);
      x += (charData.xAdvance + kerning) * scale;
      prevCharCode = charCode;
    }
    return {
      width: w,
      text,
      end,
      chars,
    };
  }

  /**
   * TBD.
   * @param {string} text - TBD.
   * @param {string} replace - TBD.
   * @returns {string} TBD.
   */
  cleanText(text, replace = '') {
    const data = this._data.font;
    if (!data) {
      return '';
    }
    const re = /\r\n|\n\r|\n|\r/g;
    const lines = text.replace(re, '\n').split('\n');
    for (let i = 0; i < lines.length; i += 1) {
      let output = '';
      const line = lines[i];
      for (let c = 0; c < line.length; c += 1) {
        if (data.chars[line.charCodeAt(c)]) {
          output = output.concat(line[c]);
        } else {
          output = output.concat(replace);
        }
      }
      lines[i] = output;
    }
    return lines.join('\n');
  }

  /**
   * TBD.
   */
  updateText() {
    const data = this._data.font;
    if (!data) {
      return;
    }
    let text = this.text;
    const scale = this._fontSize / data.size;
    const lines = [];
    let y = 0;
    this.textWidth = 0;
    let line = { end: text.length === 0 };
    do {
      line = this.scanLine(data, scale, text);
      line.y = y;
      lines.push(line);
      if (line.width > this.textWidth) {
        this.textWidth = line.width;
      }
      y += data.lineHeight * scale;
      text = text.substr(line.text.length + 1);
    } while (line.end === false);
    this.textHeight = y;
    let t = 0;
    let align = 0;
    const ax = this.textWidth * this.anchor.x;
    const ay = this.textHeight * this.anchor.y;
    for (let i = 0; i < lines.length; i += 1) {
      const currentLine = lines[i];
      if (this._align === 'right') {
        align = this.textWidth - currentLine.width;
      } else if (this._align === 'center') {
        align = (this.textWidth - currentLine.width) / 2;
      }
      for (let c = 0; c < currentLine.text.length; c += 1) {
        let charCode = currentLine.text.charCodeAt(c);
        let charData = data.chars[charCode];
        if (charData === undefined) {
          charCode = 32;
          charData = data.chars[charCode];
        }
        let g = this._glyphs[t];
        if (g) {
          // Sprite already exists in the glyphs pool, so we'll reuse it for this letter
          g.texture = charData.texture;
        } else {
          // We need a new sprite as the pool is empty or exhausted
          g = new Image(this.game, 0, 0, charData.texture);
          g.name = currentLine.text[c];
          this._glyphs.push(g);
        }
        g.position.x = currentLine.chars[c] + align - ax;
        g.position.y = currentLine.y + charData.yOffset * scale - ay;
        g.scale.set(scale);
        g.tint = this.tint;
        g.texture.requiresReTint = true;
        if (!g.parent) {
          this.addChild(g);
        }
        t += 1;
      }
    }
    //  Remove unnecessary children
    //  This moves them from the display list (children array) but retains them in the _glyphs pool
    for (let i = t; i < this._glyphs.length; i += 1) {
      this.removeChild(this._glyphs[i]);
    }
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  purgeGlyphs() {
    const len = this._glyphs.length;
    const kept = [];
    for (let i = 0; i < this._glyphs.length; i += 1) {
      if (this._glyphs[i].parent !== this) {
        this._glyphs[i].destroy();
      } else {
        kept.push(this._glyphs[i]);
      }
    }
    /** @type {Image[]} */
    this._glyphs = [];
    this._glyphs = kept;
    this.updateText();
    return len - kept.length;
  }

  /**
   * TBD.
   */
  updateTransform() {
    if (this.dirty || !this.anchor.equals(this._prevAnchor)) {
      this.updateText();
      this.dirty = false;
      this._prevAnchor.copyFrom(this.anchor);
    }
    super.updateTransform();
  }

  /**
   * TBD.
   * @param {string} value - TBD.
   * @param {number} position - TBD.
   * @returns {BitmapText} TBD.
   */
  addColor(value, position) {
    const color = typeof value === 'string' ? Number.parseInt(value.replace('#', ''), 16) : value;
    if (color !== this._tint) {
      this._tint = color;
      this.updateText();
    }
    return this;
  }

  /**
   * TBD.
   * @returns {string} TBD.
   */
  get align() {
    return this._align;
  }

  /**
   * TBD.
   */
  set align(value) {
    if (value !== this._align && (value === 'left' || value === 'center' || value === 'right')) {
      this._align = value;
      this.updateText();
    }
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get tint() {
    return this._tint;
  }

  /**
   * TBD.
   */
  set tint(value) {
    if (value !== this._tint) {
      this._tint = value;
      this.updateText();
    }
  }

  /**
   * TBD.
   * @returns {string} TBD.
   */
  get fill() {
    if (typeof this.tint === 'number') {
      let colorStr = this.tint.toString(16);
      while (colorStr.length < 6) {
        colorStr = `0${colorStr}`;
      }
      return `#${colorStr.toUpperCase()}`;
    }
    return this.tint;
  }

  /**
   * TBD.
   */
  set fill(value) {
    this.tint = typeof value === 'string' ? Number.parseInt(value.replace('#', ''), 16) : value;
  }

  /**
   * TBD.
   * @returns {string} TBD.
   */
  get font() {
    return this._font;
  }

  /**
   * TBD.
   */
  set font(value) {
    const trimmedValue = value.trim();
    if (trimmedValue !== this._font) {
      this._font = trimmedValue;
      this._data = this.game.cache.getBitmapFont(this._font);
      this.updateText();
    }
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get fontSize() {
    return this._fontSize;
  }

  /**
   * TBD.
   */
  set fontSize(value) {
    value = Number.parseInt(value, 10);
    if (value !== this._fontSize && value > 0) {
      this._fontSize = value;
      this.updateText();
    }
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
   * @param {string | number | boolean | Date} value - TBD.
   */
  set text(value) {
    const typedValue = value.toString();
    if (typedValue !== this._text) {
      this._text = typedValue || '';
      this.updateText();
    }
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get maxWidth() {
    return this._maxWidth;
  }

  /**
   * TBD.
   */
  set maxWidth(value) {
    if (value !== this._maxWidth) {
      this._maxWidth = value;
      this.updateText();
    }
  }

  /**
   * TBD.
   * @returns {boolean} TBD.
   */
  get smoothed() {
    return !this._data.base.scaleMode;
  }

  /**
   * TBD.
   */
  set smoothed(value) {
    if (value) {
      this._data.base.scaleMode = SCALE_LINEAR;
    } else {
      this._data.base.scaleMode = SCALE_NEAREST;
    }
  }
}
