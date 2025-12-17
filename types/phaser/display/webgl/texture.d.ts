export class TextureUvs {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    x3: number;
    y3: number;
}
export class Texture {
    /**
     * Creates a new Texture instance.
     * @param {import('./base_texture.js').BaseTexture} baseTexture - The base texture to use.
     * @param {Rectangle | null | undefined} frame - The frame rectangle.
     * @param {Rectangle | null | undefined} crop - The crop rectangle.
     * @param {Rectangle | null | undefined} trim - The trim rectangle.
     */
    constructor(baseTexture: import("./base_texture.js").BaseTexture, frame?: Rectangle | null | undefined, crop?: Rectangle | null | undefined, trim?: Rectangle | null | undefined);
    noFrame: boolean;
    baseTexture: import("./base_texture.js").BaseTexture;
    /** @type {Rectangle} */
    frame: Rectangle;
    /** @type {Rectangle | null | undefined} */
    trim: Rectangle | null | undefined;
    /** @type {boolean} */
    valid: boolean;
    /** @type {boolean} */
    isTiling: boolean;
    /** @type {boolean} */
    requiresUpdate: boolean;
    /** @type {boolean} */
    requiresReTint: boolean;
    /** @type {TextureUvs} */
    _uvs: TextureUvs;
    /** @type {number} */
    width: number;
    /** @type {number} */
    height: number;
    /** @type {Rectangle} */
    crop: Rectangle;
    /**
     * Destroys this texture and cleans up resources.
     */
    onBaseTextureLoaded(): void;
    /**
     * Destroys this texture and cleans up resources.
     * @param {boolean} destroyBase - Whether to destroy the base texture as well.
     */
    destroy(destroyBase?: boolean): void;
    /**
     * Sets the frame of this texture.
     * @param {Rectangle} frame - The new frame rectangle.
     * @throws {Error} If the operation fails.
     */
    setFrame(frame: Rectangle): void;
    /**
     * TBD.
     */
    _updateUvs(): void;
}
import { Rectangle } from '../../geom/rectangle.js';
//# sourceMappingURL=texture.d.ts.map