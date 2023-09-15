export class RenderTexture extends Texture {
    /**
     * TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     * @param {import('./renderer').WebGLRenderer|import('../canvas/renderer').CanvasRenderer} renderer - TBD.
     * @param {number} scaleMode - TBD.
     * @param {number} resolution - TBD.
     */
    constructor(width: number, height: number, renderer: import('./renderer').WebGLRenderer | import('../canvas/renderer').CanvasRenderer, scaleMode: number, resolution?: number);
    resolution: number;
    renderer: import("../canvas/renderer").CanvasRenderer | import("./renderer").WebGLRenderer;
    textureBuffer: CanvasBuffer | FilterTexture;
    render: () => void;
    projection: Point;
    /**
     * TBD.
     */
    resize(): void;
    /**
     * TBD.
     */
    clear(): void;
    /**
     * TBD.
     */
    renderWebGL(): void;
    /**
     * TBD.
     */
    renderCanvas(): void;
    /**
     * TBD.
     * @returns {HTMLImageElement} TBD.
     */
    getImage(): HTMLImageElement;
    /**
     * TBD.
     * @returns {string} TBD.
     */
    getBase64(): string;
    /**
     * TBD.
     * @returns {HTMLCanvasElement} TBD.
     */
    getCanvas(): HTMLCanvasElement;
}
import { Texture } from './texture.js';
import { CanvasBuffer } from '../canvas/buffer.js';
import { FilterTexture } from './filter_texture.js';
import { Point } from '../../geom/point.js';
//# sourceMappingURL=render_texture.d.ts.map