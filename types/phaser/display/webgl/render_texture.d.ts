export class RenderTexture extends Texture {
    /**
     * Creates a new RenderTexture instance.
     * @param {number} width - The width of the render texture.
     * @param {number} height - The height of the render texture.
     * @param {import('./renderer.js').WebGLRenderer|import('../canvas/renderer.js').CanvasRenderer} renderer - The renderer to use.
     * @param {number} scaleMode - The scale mode to use.
     * @param {number} resolution - The resolution to use.
     */
    constructor(width: number, height: number, renderer: import("./renderer.js").WebGLRenderer | import("../canvas/renderer.js").CanvasRenderer, scaleMode: number, resolution?: number);
    resolution: number;
    renderer: import("../canvas/renderer.js").CanvasRenderer | import("./renderer.js").WebGLRenderer;
    textureBuffer: CanvasBuffer | FilterTexture;
    render: () => void;
    projection: Point;
    /**
     * Destroys this render texture and cleans up resources.
     */
    resize(): void;
    /**
     * Updates the size of this render texture.
     */
    clear(): void;
    /**
     * Updates the resolution of this render texture.
     */
    renderWebGL(): void;
    /**
     * Updates the scale mode of this render texture.
     */
    renderCanvas(): void;
    /**
     * Gets the HTML image element for this render texture.
     * @returns {HTMLImageElement} The HTML image element.
     */
    getImage(): HTMLImageElement;
    /**
     * Gets the base64 string representation of this render texture.
     * @returns {string} The base64 string representation.
     */
    getBase64(): string;
    /**
     * Gets the canvas element for this render texture.
     * @returns {HTMLCanvasElement} The canvas element.
     */
    getCanvas(): HTMLCanvasElement;
}
import { Texture } from './texture.js';
import { CanvasBuffer } from '../canvas/buffer.js';
import { FilterTexture } from './filter_texture.js';
import { Point } from '../../geom/point.js';
//# sourceMappingURL=render_texture.d.ts.map