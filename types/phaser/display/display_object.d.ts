export class DisplayObject {
    /**
     * Creates a new DisplayObject instance.
     * @param {import('../core/game.js').Game} game - The game instance this display object belongs to.
     */
    constructor(game: import("../core/game.js").Game);
    /** @type {boolean} */
    exists: boolean;
    /** @type {boolean} */
    renderable: boolean;
    /** @type {boolean} */
    visible: boolean;
    /** @type {Point} */
    position: Point;
    /** @type {Point} */
    scale: Point;
    /** @type {Point} */
    pivot: Point;
    /** @type {Point} */
    anchor: Point;
    /** @type {number} */
    rotation: number;
    /** @type {number} */
    alpha: number;
    /** @type {Rectangle} */
    hitArea: Rectangle;
    /** @type {DisplayObject} */
    parent: DisplayObject;
    /** @type {number} */
    worldAlpha: number;
    /** @type {Matrix} */
    worldTransform: Matrix;
    /** @type {Point} */
    worldScale: Point;
    /** @type {Rectangle} */
    filterArea: Rectangle;
    /** @type {number} */
    _sr: number;
    /** @type {number} */
    _cr: number;
    /** @type {Rectangle} */
    cachedBounds: Rectangle;
    /** @type {Rectangle} */
    currentBounds: Rectangle;
    /** @type {import('./graphics.js').Graphics} */
    _mask: import("./graphics.js").Graphics;
    /** @type {object[]} */
    _filters: object[];
    /** @type {object} */
    _filterBlock: object;
    children: any[];
    /** @type {boolean} */
    ignoreChildInput: boolean;
    /** @type {string | null } */
    name: string | null;
    /** @type {object | null } */
    data: object | null;
    /** @type {import('../core/game.js').Game } */
    game: import("../core/game.js").Game;
    /**
     * Destroys this display object and cleans up resources.
     */
    destroy(): void;
    /**
     * Adds a child display object to this container.
     * @param {DisplayObject} child - The child display object to add.
     * @returns {DisplayObject} The added child display object.
     */
    addChild(child: DisplayObject): DisplayObject;
    /**
     * Adds a child display object at a specific index in the children list.
     * @param {DisplayObject} child - The child display object to add.
     * @param {number} index - The index to insert the child at.
     * @returns {DisplayObject} The added child display object.
     * @throws {Error} If the index is out of bounds.
     */
    addChildAt(child: DisplayObject, index: number): DisplayObject;
    /**
     * Swaps the positions of two child display objects.
     * @param {DisplayObject} child - The first child display object.
     * @param {DisplayObject} child2 - The second child display object.
     * @throws {Error} If either child is not a child of this container.
     */
    swapChildren(child: DisplayObject, child2: DisplayObject): void;
    /**
     * Gets the index of a child display object in the children list.
     * @param {DisplayObject} child - The child display object to find.
     * @returns {number} The index of the child in the children list.
     * @throws {Error} If the child is not a child of this container.
     */
    getChildIndex(child: DisplayObject): number;
    /**
     * Sets the index of a child display object in the children list.
     * @param {DisplayObject} child - The child display object to move.
     * @param {number} index - The new index for the child.
     * @throws {Error} If the index is out of bounds.
     */
    setChildIndex(child: DisplayObject, index: number): void;
    /**
     * Gets a child display object at a specific index.
     * @param {number} index - The index of the child to get.
     * @returns {DisplayObject} The child display object at the specified index.
     * @throws {Error} If the index is out of bounds.
     */
    getChildAt(index: number): DisplayObject;
    /**
     * Removes a child display object from this container.
     * @param {DisplayObject} child - The child display object to remove.
     * @returns {DisplayObject} The removed child display object.
     */
    removeChild(child: DisplayObject): DisplayObject;
    /**
     * Removes a child display object at a specific index.
     * @param {number} index - The index of the child to remove.
     * @returns {DisplayObject} The removed child display object.
     */
    removeChildAt(index: number): DisplayObject;
    /**
     * Removes a range of child display objects from this container.
     * @param {number} beginIndex - The starting index of the range to remove.
     * @param {number} endIndex - The ending index (exclusive) of the range to remove.
     * @returns {DisplayObject[]} The array of removed child display objects.
     * @throws {Error} If the range is invalid.
     */
    removeChildren(beginIndex: number, endIndex: number): DisplayObject[];
    /**
     * Updates the world transform of this display object and its children.
     * @param {DisplayObject | null | undefined} parent - The parent display object to use for the world transform calculation.
     * @returns {DisplayObject} This DisplayObject instance for chaining.
     */
    updateTransform(parent?: DisplayObject | null | undefined): DisplayObject;
    rotationCache: any;
    worldRotation: number;
    /**
     * Gets the bounds of this display object in world coordinates.
     * @param {DisplayObject} targetCoordinateSpace - The coordinate space to calculate bounds in.
     * @returns {Rectangle} The bounds rectangle of this display object.
     */
    getBounds(targetCoordinateSpace: DisplayObject): Rectangle;
    /**
     * Gets the bounds of this display object in local coordinates.
     * @returns {Rectangle} The bounds rectangle of this display object in local space.
     */
    getLocalBounds(): Rectangle;
    /**
     * Checks if a child display object is contained within this container.
     * @param {DisplayObject} child - The child display object to check.
     * @returns {boolean} True if the child is contained within this container, false otherwise.
     */
    contains(child: DisplayObject): boolean;
    /**
     * Renders this display object using WebGL.
     * @param {object} renderSession - The WebGL rendering session.
     */
    renderWebGL(renderSession: object): void;
    /**
     * Renders this display object using Canvas.
     * @param {object} renderSession - The Canvas rendering session.
     */
    renderCanvas(renderSession: object): void;
    /**
     * Called before the update cycle for this display object.
     */
    preUpdate(): void;
    /**
     * Called during the update cycle for this display object.
     */
    update(): void;
    /**
     * Called after the update cycle for this display object.
     */
    postUpdate(): void;
    /**
     * Generates a texture for this display object.
     * @throws {Error} This method is not implemented yet.
     */
    generateTexture(): void;
    /**
     * Converts a local position to global (world) coordinates.
     * @param {Point} position - The local position to convert.
     * @returns {Point} The converted global position.
     */
    toGlobal(position: Point): Point;
    /**
     * Converts a global (world) position to local coordinates.
     * @param {Point} position - The global position to convert.
     * @param {DisplayObject} from - The display object to convert from (defaults to this).
     * @returns {Point} The converted local position.
     */
    toLocal(position: Point, from: DisplayObject): Point;
    /**
     * Renders a cached sprite for this display object.
     * @param {object} renderSession - The rendering session.
     */
    renderCachedSprite(renderSession: object): void;
    /**
     * Generates a cached sprite for this display object.
     */
    generateCachedSprite(): void;
    /**
     * Destroys the cached sprite for this display object.
     */
    destroyCachedSprite(): void;
    _cachedSprite: any;
    /**
     * Sets the width of this display object.
     * @param {number} value - The new width in pixels.
     */
    set width(value: number);
    /**
     * Gets the width of this display object.
     * @returns {number} The width in pixels.
     */
    get width(): number;
    _width: number;
    /**
     * Sets the height of this display object.
     * @param {number} value - The new height in pixels.
     */
    set height(value: number);
    /**
     * Gets the height of this display object.
     * @returns {number} The height in pixels.
     */
    get height(): number;
    _height: number;
    /**
     * Sets the x position of this display object.
     * @param {number} value - The new x position in pixels.
     */
    set x(value: number);
    /**
     * Gets the x position of this display object.
     * @returns {number} The x position in pixels.
     */
    get x(): number;
    /**
     * Sets the y position of this display object.
     * @param {number} value - The new y position in pixels.
     */
    set y(value: number);
    /**
     * Gets the y position of this display object.
     * @returns {number} The y position in pixels.
     */
    get y(): number;
    /**
     * Gets whether this display object is visible in the world.
     * @returns {boolean} True if the object is visible, false otherwise.
     */
    get worldVisible(): boolean;
    /**
     * Sets the mask for this display object.
     * @param {import('./graphics.js').Graphics} value - The mask object to set, or null to remove the mask.
     */
    set mask(value: import("./graphics.js").Graphics);
    /**
     * Gets the mask for this display object.
     * @returns {import('./graphics.js').Graphics} The mask object or null if none is set.
     */
    get mask(): import("./graphics.js").Graphics;
    /**
     * Gets the x offset for this display object (based on anchor point).
     * @returns {number} The x offset in pixels.
     */
    get offsetX(): number;
    /**
     * Gets the y offset for this display object (based on anchor point).
     * @returns {number} The y offset in pixels.
     */
    get offsetY(): number;
    /**
     * Sets the center x position of this display object.
     * @param {number} value - The new center x position in pixels.
     */
    set centerX(value: number);
    /**
     * Gets the center x position of this display object.
     * @returns {number} The center x position in pixels.
     */
    get centerX(): number;
    /**
     * Sets the center y position of this display object.
     * @param {number} value - The new center y position in pixels.
     */
    set centerY(value: number);
    /**
     * Gets the center y position of this display object.
     * @returns {number} The center y position in pixels.
     */
    get centerY(): number;
    /**
     * Sets the left x position of this display object.
     * @param {number} value - The new left x position in pixels.
     */
    set left(value: number);
    /**
     * Gets the left x position of this display object.
     * @returns {number} The left x position in pixels.
     */
    get left(): number;
    /**
     * Sets the right x position of this display object.
     * @param {number} value - The new right x position in pixels.
     */
    set right(value: number);
    /**
     * Gets the right x position of this display object.
     * @returns {number} The right x position in pixels.
     */
    get right(): number;
    /**
     * Sets the top y position of this display object.
     * @param {number} value - The new top y position in pixels.
     */
    set top(value: number);
    /**
     * Gets the top y position of this display object.
     * @returns {number} The top y position in pixels.
     */
    get top(): number;
    /**
     * Sets the bottom y position of this display object.
     * @param {number} value - The new bottom y position in pixels.
     */
    set bottom(value: number);
    /**
     * Gets the bottom y position of this display object.
     * @returns {number} The bottom y position in pixels.
     */
    get bottom(): number;
}
import { Point } from '../geom/point.js';
import { Rectangle } from '../geom/rectangle.js';
import { Matrix } from '../geom/matrix.js';
//# sourceMappingURL=display_object.d.ts.map