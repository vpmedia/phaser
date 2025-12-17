import { Point } from '../geom/point.js';

class VisualBoundsDesktopRectangle {
  /**
   * Gets the horizontal scroll position of the window.
   * @returns {number} The horizontal scroll position in pixels.
   */
  get x() {
    return window && 'pageXOffset' in window ? window.pageXOffset : document.documentElement.scrollLeft;
  }

  /**
   * Gets the vertical scroll position of the window.
   * @returns {number} The vertical scroll position in pixels.
   */
  get y() {
    return window && 'pageYOffset' in window ? window.pageYOffset : document.documentElement.scrollTop;
  }

  /**
   * Gets the width of the window.
   * @returns {number} The width of the window in pixels.
   */
  get width() {
    return Math.max(window.innerWidth, document.documentElement.clientWidth);
  }

  /**
   * Gets the height of the window.
   * @returns {number} The height of the window in pixels.
   */
  get height() {
    return Math.max(window.innerHeight, document.documentElement.clientHeight);
  }
}

class LayoutBoundsDesktopRectangle {
  /**
   * Gets the horizontal scroll position of the window.
   * @returns {number} The horizontal scroll position in pixels.
   */
  get x() {
    return 0;
  }

  /**
   * Gets the vertical scroll position of the window.
   * @returns {number} The vertical scroll position in pixels.
   */
  get y() {
    return 0;
  }

  /**
   * Gets the width of the window.
   * @returns {number} The width of the window in pixels.
   */
  get width() {
    return Math.max(window.innerWidth, document.documentElement.clientWidth);
  }

  /**
   * Gets the height of the window.
   * @returns {number} The height of the window in pixels.
   */
  get height() {
    return Math.max(window.innerHeight, document.documentElement.clientHeight);
  }
}

class VisualBoundsRectangle {
  /**
   * Gets the horizontal scroll position of the document.
   * @returns {number} The horizontal scroll position in pixels.
   */
  get x() {
    return window && 'pageXOffset' in window ? window.pageXOffset : document.documentElement.scrollLeft;
  }

  /**
   * Gets the vertical scroll position of the document.
   * @returns {number} The vertical scroll position in pixels.
   */
  get y() {
    return window && 'pageYOffset' in window ? window.pageYOffset : document.documentElement.scrollTop;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get width() {
    return window.innerWidth;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get height() {
    return window.innerHeight;
  }
}

class LayoutBoundsRectangle {
  /**
   * TBD.
   * @returns {number} TBD.
   */
  get x() {
    return 0;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get y() {
    return 0;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get width() {
    const a = document.documentElement.clientWidth;
    const b = window.innerWidth;
    return a < b ? b : a; // max
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get height() {
    const a = document.documentElement.clientHeight;
    const b = window.innerHeight;
    return a < b ? b : a; // max
  }
}

// For documentBounds
// Ref. http://www.quirksmode.org/mobile/tableViewport_desktop.html

class DocumentBoundsRectangle {
  /**
   * TBD.
   * @returns {number} TBD.
   */
  get x() {
    return 0;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get y() {
    return 0;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get width() {
    const d = document.documentElement;
    return Math.max(d.clientWidth, d.offsetWidth, d.scrollWidth);
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  get height() {
    const d = document.documentElement;
    return Math.max(d.clientHeight, d.offsetHeight, d.scrollHeight);
  }
}

export class DOM {
  /**
   * TBD.
   * @param {import('./device.js').Device} device - TBD.
   */
  constructor(device) {
    this.treatAsDesktop =
      device.desktop &&
      document.documentElement.clientWidth <= window.innerWidth &&
      document.documentElement.clientHeight <= window.innerHeight;
    this.visualBounds = this.treatAsDesktop ? new VisualBoundsDesktopRectangle() : new VisualBoundsRectangle();
    this.layoutBounds = this.treatAsDesktop ? new LayoutBoundsDesktopRectangle() : new LayoutBoundsRectangle();
    this.documentBounds = new DocumentBoundsRectangle();
    this.scrollXProvider =
      window && 'pageXOffset' in window ? () => window.pageXOffset : () => document.documentElement.scrollLeft;
    this.scrollYProvider =
      window && 'pageYOffset' in window ? () => window.pageYOffset : () => document.documentElement.scrollTop;
  }

  /**
   * Gets the offset position of an element relative to the document.
   * @param {HTMLCanvasElement} element - The element to get the offset for.
   * @param {Point} point - Optional Point object to store the result.
   * @returns {Point} The offset position of the element.
   */
  getOffset(element, point = null) {
    point = point || new Point();
    const box = element.getBoundingClientRect();
    const scrollTop = this.scrollY;
    const scrollLeft = this.scrollX;
    const clientTop = document.documentElement.clientTop;
    const clientLeft = document.documentElement.clientLeft;
    point.x = box.left + scrollLeft - clientLeft;
    point.y = box.top + scrollTop - clientTop;
    return point;
  }

  /**
   * Gets the bounding rectangle of an element with optional cushion.
   * @param {HTMLCanvasElement} element - The element to get bounds for.
   * @param {number} cushion - Optional padding to add around the element.
   * @returns {boolean} True if bounds were successfully retrieved, false otherwise.
   */
  getBounds(element, cushion = 0) {
    element = element && !element.nodeType ? element[0] : element;
    if (!element || element.nodeType !== 1) {
      return false;
    }
    return this.calibrate(element.getBoundingClientRect(), cushion);
  }

  /**
   * Calibrates DOM rectangle coordinates with optional cushion.
   * @param {DOMRect} coords - The DOM rectangle coordinates to calibrate.
   * @param {number} cushion - Optional padding to add around the rectangle.
   * @returns {{width: number, height: number, left: number, right: number, top: number, bottom: number}} The calibrated rectangle.
   */
  calibrate(coords, cushion = 0) {
    const output = {
      width: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    };
    output.width = (output.right = coords.right + cushion) - (output.left = coords.left - cushion);
    output.height = (output.bottom = coords.bottom + cushion) - (output.top = coords.top - cushion);
    return output;
  }

  /**
   * Gets the screen orientation.
   * @param {string} primaryFallback - The fallback method to use if screen orientation API is not available.
   * @returns {string} The screen orientation ('portrait-primary', 'landscape-primary', etc.).
   */
  getScreenOrientation(primaryFallback) {
    const screen = window.screen;
    // @ts-ignore
    const orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;
    if (orientation && typeof orientation.type === 'string') {
      // Screen Orientation API specification
      return orientation.type;
    } else if (typeof orientation === 'string') {
      // moz/ms-orientation are strings
      return orientation;
    }
    const PORTRAIT = 'portrait-primary';
    const LANDSCAPE = 'landscape-primary';
    if (primaryFallback === 'screen') {
      return screen.height > screen.width ? PORTRAIT : LANDSCAPE;
    } else if (primaryFallback === 'viewport') {
      return this.visualBounds.height > this.visualBounds.width ? PORTRAIT : LANDSCAPE;
    } else if (primaryFallback === 'window.orientation' && typeof window.orientation === 'number') {
      // This may change by device based on "natural" orientation.
      return window.orientation === 0 || window.orientation === 180 ? PORTRAIT : LANDSCAPE;
    } else if (window.matchMedia) {
      if (window.matchMedia('(orientation: portrait)').matches) {
        return PORTRAIT;
      } else if (window.matchMedia('(orientation: landscape)').matches) {
        return LANDSCAPE;
      }
    }
    return this.visualBounds.height > this.visualBounds.width ? PORTRAIT : LANDSCAPE;
  }

  /**
   * Gets the horizontal scroll position of the window.
   * @returns {number} The horizontal scroll position in pixels.
   */
  get scrollX() {
    return this.scrollXProvider();
  }

  /**
   * Gets the vertical scroll position of the window.
   * @returns {number} The vertical scroll position in pixels.
   */
  get scrollY() {
    return this.scrollYProvider();
  }

  /**
   * Gets the width of the window's client area.
   * @returns {number} The width of the client area in pixels.
   */
  get clientWidth() {
    return Math.max(window.innerWidth, document.documentElement.clientWidth);
  }

  /**
   * Gets the height of the window's client area.
   * @returns {number} The height of the client area in pixels.
   */
  get clientHeight() {
    return Math.max(window.innerHeight, document.documentElement.clientHeight);
  }
}
