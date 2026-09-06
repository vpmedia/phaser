import { Point } from '../geom/point.js';
import type { Device } from './device.js';

class VisualBoundsDesktopRectangle {
  /**
   * Gets the horizontal scroll position of the window.
   * @returns {number} The horizontal scroll position in pixels.
   */
  public get x() {
    return globalThis && 'pageXOffset' in globalThis ? window.pageXOffset : document.documentElement.scrollLeft;
  }

  /**
   * Gets the vertical scroll position of the window.
   * @returns {number} The vertical scroll position in pixels.
   */
  public get y() {
    return globalThis && 'pageYOffset' in globalThis ? window.pageYOffset : document.documentElement.scrollTop;
  }

  /**
   * Gets the width of the window.
   * @returns {number} The width of the window in pixels.
   */
  public get width() {
    return Math.max(window.innerWidth, document.documentElement.clientWidth);
  }

  /**
   * Gets the height of the window.
   * @returns {number} The height of the window in pixels.
   */
  public get height() {
    return Math.max(window.innerHeight, document.documentElement.clientHeight);
  }
}

class LayoutBoundsDesktopRectangle {
  /**
   * Gets the horizontal scroll position of the window.
   * @returns {number} The horizontal scroll position in pixels.
   */
  public readonly x = 0;

  /**
   * Gets the vertical scroll position of the window.
   * @returns {number} The vertical scroll position in pixels.
   */
  public readonly y = 0;

  /**
   * Gets the width of the window.
   * @returns {number} The width of the window in pixels.
   */
  public get width() {
    return Math.max(window.innerWidth, document.documentElement.clientWidth);
  }

  /**
   * Gets the height of the window.
   * @returns {number} The height of the window in pixels.
   */
  public get height() {
    return Math.max(window.innerHeight, document.documentElement.clientHeight);
  }
}

class VisualBoundsRectangle {
  /**
   * Gets the horizontal scroll position of the document.
   * @returns {number} The horizontal scroll position in pixels.
   */
  public get x() {
    return globalThis && 'pageXOffset' in globalThis ? window.pageXOffset : document.documentElement.scrollLeft;
  }

  /**
   * Gets the vertical scroll position of the document.
   * @returns {number} The vertical scroll position in pixels.
   */
  public get y() {
    return globalThis && 'pageYOffset' in globalThis ? window.pageYOffset : document.documentElement.scrollTop;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  public get width() {
    return window.innerWidth;
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  public get height() {
    return window.innerHeight;
  }
}

class LayoutBoundsRectangle {
  /**
   * TBD.
   * @returns {number} TBD.
   */
  public readonly x = 0;

  /**
   * TBD.
   * @returns {number} TBD.
   */
  public readonly y = 0;

  /**
   * TBD.
   * @returns {number} TBD.
   */
  public get width() {
    const a = document.documentElement.clientWidth;
    const b = window.innerWidth;
    return a < b ? b : a; // max
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  public get height() {
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
  public readonly x = 0;

  /**
   * TBD.
   * @returns {number} TBD.
   */
  public readonly y = 0;

  /**
   * TBD.
   * @returns {number} TBD.
   */
  public get width() {
    const d = document.documentElement;
    return Math.max(d.clientWidth, d.offsetWidth, d.scrollWidth);
  }

  /**
   * TBD.
   * @returns {number} TBD.
   */
  public get height() {
    const d = document.documentElement;
    return Math.max(d.clientHeight, d.offsetHeight, d.scrollHeight);
  }
}

export class DOM {
  public treatAsDesktop: boolean;
  public visualBounds: any;
  public layoutBounds: any;
  public documentBounds: any;
  public scrollXProvider: () => number;
  public scrollYProvider: () => number;

  /**
   * TBD.
   * @param {Device} device - TBD.
   */
  public constructor(device: Device) {
    this.treatAsDesktop =
      device.desktop &&
      document.documentElement.clientWidth <= window.innerWidth &&
      document.documentElement.clientHeight <= window.innerHeight;
    this.visualBounds = this.treatAsDesktop ? new VisualBoundsDesktopRectangle() : new VisualBoundsRectangle();
    this.layoutBounds = this.treatAsDesktop ? new LayoutBoundsDesktopRectangle() : new LayoutBoundsRectangle();
    this.documentBounds = new DocumentBoundsRectangle();
    this.scrollXProvider =
      globalThis && 'pageXOffset' in globalThis ? () => window.pageXOffset : () => document.documentElement.scrollLeft;
    this.scrollYProvider =
      globalThis && 'pageYOffset' in globalThis ? () => window.pageYOffset : () => document.documentElement.scrollTop;
  }

  /**
   * Gets the offset position of an element relative to the document.
   * @param {HTMLCanvasElement} element - The element to get the offset for.
   * @param {Point} point - Optional Point object to store the result.
   * @returns {Point} The offset position of the element.
   */
  public getOffset(element: HTMLCanvasElement, point: Point | null = null) {
    point = point ?? new Point();
    const box = element.getBoundingClientRect();
    const scrollTop = this.scrollY;
    const scrollLeft = this.scrollX;
    const { clientTop } = document.documentElement;
    const { clientLeft } = document.documentElement;
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
  public getBounds(element: HTMLCanvasElement, cushion = 0) {
    element = element && !element.nodeType ? (element as unknown as HTMLCanvasElement[])[0]! : element;
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
  public calibrate(coords: DOMRect, cushion = 0) {
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
  public getScreenOrientation(primaryFallback: string | null = null) {
    const { screen } = globalThis;
    // @ts-expect-error
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
    } else if (primaryFallback === 'window.orientation' && typeof globalThis.orientation === 'number') {
      // This may change by device based on "natural" orientation.
      return globalThis.orientation === 0 || globalThis.orientation === 180 ? PORTRAIT : LANDSCAPE;
    } else if (globalThis.matchMedia) {
      if (globalThis.matchMedia('(orientation: portrait)').matches) {
        return PORTRAIT;
      } else if (globalThis.matchMedia('(orientation: landscape)').matches) {
        return LANDSCAPE;
      }
    }
    return this.visualBounds.height > this.visualBounds.width ? PORTRAIT : LANDSCAPE;
  }

  /**
   * Gets the horizontal scroll position of the window.
   * @returns {number} The horizontal scroll position in pixels.
   */
  public get scrollX() {
    return this.scrollXProvider();
  }

  /**
   * Gets the vertical scroll position of the window.
   * @returns {number} The vertical scroll position in pixels.
   */
  public get scrollY() {
    return this.scrollYProvider();
  }

  /**
   * Gets the width of the window's client area.
   * @returns {number} The width of the client area in pixels.
   */
  public get clientWidth() {
    return Math.max(window.innerWidth, document.documentElement.clientWidth);
  }

  /**
   * Gets the height of the window's client area.
   * @returns {number} The height of the client area in pixels.
   */
  public get clientHeight() {
    return Math.max(window.innerHeight, document.documentElement.clientHeight);
  }
}
