/**
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 */
import Point from '../geom/point';

class VisualBoundsDesktopRectangle {
  get x() {
    return window && 'pageXOffset' in window
      ? window.pageXOffset
      : document.documentElement.scrollLeft;
  }

  get y() {
    return window && 'pageYOffset' in window
      ? window.pageYOffset
      : document.documentElement.scrollTop;
  }

  get width() {
    return Math.max(window.innerWidth, document.documentElement.clientWidth);
  }

  get height() {
    return Math.max(window.innerHeight, document.documentElement.clientHeight);
  }
}

class LayoutBoundsDesktopRectangle {
  get x() {
    return 0;
  }

  get y() {
    return 0;
  }

  get width() {
    return Math.max(window.innerWidth, document.documentElement.clientWidth);
  }

  get height() {
    return Math.max(window.innerHeight, document.documentElement.clientHeight);
  }
}

class VisualBoundsRectangle {
  get x() {
    return window && 'pageXOffset' in window
      ? window.pageXOffset
      : document.documentElement.scrollLeft;
  }

  get y() {
    return window && 'pageYOffset' in window
      ? window.pageYOffset
      : document.documentElement.scrollTop;
  }

  get width() {
    return window.innerWidth;
  }

  get height() {
    return window.innerHeight;
  }
}

class LayoutBoundsRectangle {
  get x() {
    return 0;
  }

  get y() {
    return 0;
  }

  get width() {
    const a = document.documentElement.clientWidth;
    const b = window.innerWidth;
    return a < b ? b : a; // max
  }

  get height() {
    const a = document.documentElement.clientHeight;
    const b = window.innerHeight;
    return a < b ? b : a; // max
  }
}

// For documentBounds
// Ref. http://www.quirksmode.org/mobile/tableViewport_desktop.html

class DocumentBoundsRectangle {
  get x() {
    return 0;
  }

  get y() {
    return 0;
  }

  get width() {
    const d = document.documentElement;
    return Math.max(d.clientWidth, d.offsetWidth, d.scrollWidth);
  }

  get height() {
    const d = document.documentElement;
    return Math.max(d.clientHeight, d.offsetHeight, d.scrollHeight);
  }
}

export default class {
  constructor(device) {
    this.treatAsDesktop =
      device.desktop &&
      document.documentElement.clientWidth <= window.innerWidth &&
      document.documentElement.clientHeight <= window.innerHeight;
    this.visualBounds = this.treatAsDesktop
      ? new VisualBoundsDesktopRectangle()
      : new VisualBoundsRectangle();
    this.layoutBounds = this.treatAsDesktop
      ? new LayoutBoundsDesktopRectangle()
      : new LayoutBoundsRectangle();
    this.documentBounds = new DocumentBoundsRectangle();
    this.scrollXProvider =
      window && 'pageXOffset' in window
        ? () => window.pageXOffset
        : () => document.documentElement.scrollLeft;
    this.scrollYProvider =
      window && 'pageYOffset' in window
        ? () => window.pageYOffset
        : () => document.documentElement.scrollTop;
  }

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

  getBounds(element, cushion = 0) {
    element = element && !element.nodeType ? element[0] : element;
    if (!element || element.nodeType !== 1) {
      return false;
    }
    return this.calibrate(element.getBoundingClientRect(), cushion);
  }

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

  getScreenOrientation(primaryFallback) {
    const screen = window.screen;
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

  get scrollX() {
    return this.scrollXProvider();
  }

  get scrollY() {
    return this.scrollYProvider();
  }

  get clientWidth() {
    return Math.max(window.innerWidth, document.documentElement.clientWidth);
  }

  get clientHeight() {
    return Math.max(window.innerHeight, document.documentElement.clientHeight);
  }
}
