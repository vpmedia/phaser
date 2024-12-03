import { TOP_LEFT } from '../core/const.js';
import { Point } from './point.js';
import { Rectangle } from './rectangle.js';

describe('Rectangle', () => {
  describe('offset()', () => {
    it('should update x and y properties when dx and dy are provided', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      rect.offset(10, 20);
      expect(rect.x).toBe(10);
      expect(rect.y).toBe(20);
    });
  });

  describe('offsetPoint()', () => {
    it('should call offset() with point.x and point.y as arguments when a Point object is provided', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      const point = new Point(15, 25);
      rect.offsetPoint(point);
      expect(rect.x).toBe(15);
      expect(rect.y).toBe(25);
    });
  });

  describe('setTo()', () => {
    it('should update x, y, width and height properties when all arguments are provided', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      rect.setTo(100, 200, 300, 400);
      expect(rect.x).toBe(100);
      expect(rect.y).toBe(200);
      expect(rect.width).toBe(300);
      expect(rect.height).toBe(400);
    });
  });

  describe('scale()', () => {
    it('should update width and height properties when x is provided', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      rect.scale(2);
      expect(rect.width).toBe(20);
      expect(rect.height).toBe(20);
    });

    it('should update width and height properties when both x and y are provided', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      const point = new Point(3, 4);
      rect.scale(point.x, point.y);
      expect(rect.width).toBe(30);
      expect(rect.height).toBe(40);
    });
  });

  describe('centerOn()', () => {
    it('should update centerX and centerY properties when both x and y are provided', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      const point = new Point(150, 250);
      rect.centerOn(point.x, point.y);
      expect(rect.centerX).toBe(point.x);
      expect(rect.centerY).toBe(point.y);
    });
  });

  describe('floor()', () => {
    it('should update x and y properties by rounding down', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      rect.floor();
      expect(rect.x).toBe(Math.floor(rect.x));
      expect(rect.y).toBe(Math.floor(rect.y));
    });
  });

  describe('floorAll()', () => {
    it('should update x, y, width and height properties by rounding down', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      rect.floorAll();
      expect(rect.x).toBe(Math.floor(rect.x));
      expect(rect.y).toBe(Math.floor(rect.y));
      expect(rect.width).toBe(Math.floor(rect.width));
      expect(rect.height).toBe(Math.floor(rect.height));
    });
  });

  describe('ceil()', () => {
    it('should update x and y properties by rounding up', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      rect.ceil();
      expect(rect.x).toBe(Math.ceil(rect.x));
      expect(rect.y).toBe(Math.ceil(rect.y));
    });
  });

  describe('ceilAll()', () => {
    it('should update x, y, width and height properties by rounding up', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      rect.ceilAll();
      expect(rect.x).toBe(Math.ceil(rect.x));
      expect(rect.y).toBe(Math.ceil(rect.y));
      expect(rect.width).toBe(Math.ceil(rect.width));
      expect(rect.height).toBe(Math.ceil(rect.height));
    });
  });

  describe('copyFrom()', () => {
    it('should return a new Rectangle object with the same properties as the provided rectangle', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      const source = new Rectangle();
      source.setTo(500, 600, 700, 800);
      const copy = rect.copyFrom(source);
      expect(copy.x).toBe(source.x);
      expect(copy.y).toBe(source.y);
      expect(copy.width).toBe(source.width);
      expect(copy.height).toBe(source.height);
    });
  });

  describe('copyTo()', () => {
    it('should update the provided rectangle with the same properties as this rectangle', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      const dest = new Rectangle();
      rect.setTo(50, 60, 70, 80);
      rect.copyTo(dest);
      expect(dest.x).toBe(rect.x);
      expect(dest.y).toBe(rect.y);
      expect(dest.width).toBe(rect.width);
      expect(dest.height).toBe(rect.height);
    });
  });

  describe('inflate()', () => {
    it('should call the inflate() function from another module with this rectangle and dx and dy as arguments', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      const inflated = rect.inflate(10, 20);
      expect(inflated.x).toBe(-10);
      expect(inflated.y).toBe(-20);
    });
  });

  describe('size()', () => {
    it('should call the size() function from another module with this rectangle and an output point as arguments', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      const point = new Point();
      const sized = rect.size(point);
      expect(sized.x).toBe(rect.width);
      expect(sized.y).toBe(rect.height);
    });
  });

  describe('resize()', () => {
    it('should update width and height properties when both x and y are provided', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      rect.resize(120, 140);
      expect(rect.width).toBe(120);
      expect(rect.height).toBe(140);
    });
  });

  describe('clone()', () => {
    it('should return a new Rectangle object with the same properties as this rectangle', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      const clone = rect.clone();
      expect(clone.x).toBe(rect.x);
      expect(clone.y).toBe(rect.y);
      expect(clone.width).toBe(rect.width);
      expect(clone.height).toBe(rect.height);
    });
  });

  describe('contains()', () => {
    it('should return true if the point x, y is within this rectangle', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      rect.setTo(100, 200, 300, 400);
      const contains = rect.contains(150, 250);
      expect(contains).toBe(true);
    });

    it('should return false if the point x, y is outside this rectangle', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      rect.setTo(100, 200, 300, 400);
      const contains = rect.contains(500, 600);
      expect(contains).toBe(false);
    });
  });

  describe('containsRect()', () => {
    it('should return true if the rectangle b is within this rectangle', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      const source = new Rectangle();
      source.setTo(100, 200, 300, 400);
      const contains = rect.containsRect(source);
      expect(contains).toBe(false);
    });

    it('should return false if the rectangle b is outside this rectangle', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      const source = new Rectangle();
      source.setTo(-500, -600, 700, 800);
      const contains = rect.containsRect(source);
      expect(contains).toBe(false);
    });
  });

  describe('equals()', () => {
    it('should return true if the rectangle b has the same properties as this rectangle', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      const source = new Rectangle();
      source.setTo(100, 200, 300, 400);
      const equals = rect.equals(source);
      expect(equals).toBe(false);
    });

    it('should return false if the rectangle b does not have the same properties as this rectangle', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      const source = new Rectangle();
      source.setTo(-500, -600, 700, 800);
      const equals = rect.equals(source);
      expect(equals).toBe(false);
    });
  });

  describe('intersection()', () => {
    it('should return a new Rectangle object that represents the intersection of this rectangle and b', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      const source = new Rectangle();
      source.setTo(100, 200, 300, 400);
      const intersection = rect.intersection(source);
      expect(intersection.x).toBe(0);
      expect(intersection.y).toBe(0);
      expect(intersection.width).toBe(0);
      expect(intersection.height).toBe(0);
    });
  });

  describe('intersects()', () => {
    it('should return true if the rectangle b intersects with this rectangle', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      const source = new Rectangle();
      source.setTo(100, 200, 300, 400);
      const intersects = rect.intersects(source);
      expect(intersects).toBe(false);
    });

    it('should return false if the rectangle b does not intersect with this rectangle', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      const source = new Rectangle();
      source.setTo(-500, -600, 700, 800);
      const intersects = rect.intersects(source);
      expect(intersects).toBe(true);
    });
  });

  describe('intersectsRaw()', () => {
    it('should return true if the rectangle b intersects with this rectangle at left, right, top and bottom', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      const source = new Rectangle();
      source.setTo(100, 200, 300, 400);
      const intersects = rect.intersectsRaw(-500, -600, -700, -800, 0.1);
      expect(intersects).toBe(false);
    });

    it('should return false if the rectangle b does not intersect with this rectangle at left, right, top and bottom', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      const source = new Rectangle();
      source.setTo(-500, -600, 700, 800);
      const intersects = rect.intersectsRaw(0, 10, -1000, 1500, 0.1);
      expect(intersects).toBe(true);
    });
  });

  describe('union()', () => {
    it('should return a new Rectangle object that represents the union of this rectangle and b', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      const source = new Rectangle();
      source.setTo(100, 200, 300, 400);
      const union = rect.union(source);
      expect(union.x).toBe(Math.min(rect.left, source.left));
      expect(union.y).toBe(Math.min(rect.top, source.top));
      expect(union.width).toBe(Math.max(rect.right, source.right) - Math.min(rect.left, source.left));
      expect(union.height).toBe(Math.max(rect.bottom, source.bottom) - Math.min(rect.top, source.top));
    });
  });

  describe('random()', () => {
    it('should return a new Point object with x and y coordinates within this rectangle', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      const random = rect.random();
      expect(random.x >= rect.left && random.x <= rect.right).toBe(true);
      expect(random.y >= rect.top && random.y <= rect.bottom).toBe(true);
    });
  });

  describe('getPoint()', () => {
    it('should return a new Point object at the specified position within this rectangle', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      const point = rect.getPoint(TOP_LEFT);
      expect(point.x).toBe(rect.left);
      expect(point.y).toBe(rect.top);
    });
  });

  describe('toString()', () => {
    it('should return a string representation of this rectangle', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      const string = rect.toString();
      expect(string).toContain(`x=${rect.x}`);
      expect(string).toContain(`y=${rect.y}`);
      expect(string).toContain(`width=${rect.width}`);
      expect(string).toContain(`height=${rect.height}`);
    });
  });

  describe('halfWidth', () => {
    it('should return half the width of this rectangle', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      const half = rect.halfWidth;
      expect(half).toBe(Math.round(rect.width / 2));
    });
  });

  describe('halfHeight', () => {
    it('should return half the height of this rectangle', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      const half = rect.halfHeight;
      expect(half).toBe(Math.round(rect.height / 2));
    });
  });

  describe('top', () => {
    it('should get and set the top coordinate of this rectangle', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      const top = rect.top;
      expect(top).toBe(rect.y);
      rect.top = 1000;
      expect(rect.top).toBe(1000);
    });
  });

  describe('left', () => {
    it('should get and set the left coordinate of this rectangle', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      const left = rect.left;
      expect(left).toBe(rect.x);
      rect.left = 1500;
      expect(rect.left).toBe(1500);
    });
  });

  describe('right', () => {
    it('should get and set the right coordinate of this rectangle', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      const right = rect.right;
      expect(right).toBe(rect.x + rect.width);
      rect.right = 1600;
      expect(rect.right).toBe(1600);
    });
  });

  describe('bottom', () => {
    it('should get and set the bottom coordinate of this rectangle', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      const bottom = rect.bottom;
      expect(bottom).toBe(rect.y + rect.height);
      rect.bottom = 1700;
      expect(rect.bottom).toBe(1700);
    });
  });

  describe('topLeft', () => {
    it('should get and set the top-left coordinates of this rectangle', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      const topLeft = rect.topLeft;
      expect(topLeft.x).toBe(rect.left);
      expect(topLeft.y).toBe(rect.top);
      rect.topLeft = new Point(1800, 1900);
      expect(rect.left).toBe(1800);
      expect(rect.top).toBe(1900);
    });
  });

  describe('topRight', () => {
    it('should get and set the top-right coordinates of this rectangle', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      const topRight = rect.topRight;
      expect(topRight.x).toBe(rect.right);
      expect(topRight.y).toBe(rect.top);
      rect.topRight = new Point(2000, 2100);
      expect(rect.right).toBe(2000);
      expect(rect.top).toBe(2100);
    });
  });

  describe('bottomLeft', () => {
    it('should get and set the bottom-left coordinates of this rectangle', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      const bottomLeft = rect.bottomLeft;
      expect(bottomLeft.x).toBe(rect.left);
      expect(bottomLeft.y).toBe(rect.bottom);
      rect.bottomLeft = new Point(2200, 2300);
      expect(rect.left).toBe(2200);
      expect(rect.bottom).toBe(2300);
    });
  });

  describe('bottomRight', () => {
    it('should get and set the bottom-right coordinates of this rectangle', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      const bottomRight = rect.bottomRight;
      expect(bottomRight.x).toBe(rect.right);
      expect(bottomRight.y).toBe(rect.bottom);
      rect.bottomRight = new Point(2400, 2500);
      expect(rect.right).toBe(2400);
      expect(rect.bottom).toBe(2500);
    });
  });

  describe('centerX', () => {
    it('should get and set the center x coordinate of this rectangle', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      const centerX = rect.centerX;
      expect(centerX).toBe(rect.x + rect.halfWidth);
      rect.centerX = 2600;
      expect(rect.centerX).toBe(2600);
    });
  });

  describe('centerY', () => {
    it('should get and set the center y coordinate of this rectangle', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      const centerY = rect.centerY;
      expect(centerY).toBe(rect.y + rect.halfHeight);
      rect.centerY = 2700;
      expect(rect.centerY).toBe(2700);
    });
  });

  describe('randomX', () => {
    it('should return a random x coordinate within this rectangle', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      const randomX = rect.randomX;
      expect(randomX >= rect.left && randomX <= rect.right).toBe(true);
    });
  });

  describe('randomY', () => {
    it('should return a random y coordinate within this rectangle', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      const randomY = rect.randomY;
      expect(randomY >= rect.top && randomY <= rect.bottom).toBe(true);
    });
  });

  describe('empty', () => {
    it('should get and set whether this rectangle is empty or not', () => {
      const rect = new Rectangle(0, 0, 10, 10);
      const empty = rect.empty;
      expect(empty).toBe(!rect.width || !rect.height);
      rect.empty = true;
      expect(rect.empty).toBe(true);
    });
  });
});
