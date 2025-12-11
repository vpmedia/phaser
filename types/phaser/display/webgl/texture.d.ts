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
     * TBD.
     * @param {import('./base_texture.js').BaseTexture} baseTexture - TBD.
     * @param {Rectangle | null | undefined} frame - TBD.
     * @param {Rectangle | null | undefined} crop - TBD.
     * @param {Rectangle | null | undefined} trim - TBD.
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
     * TBD.
     */
    onBaseTextureLoaded(): void;
    /**
     * TBD.
     * @param {boolean} destroyBase - TBD.
     */
    destroy(destroyBase?: boolean): void;
    /**
     * TBD.
     * @param {Rectangle} frame - TBD.
     * @throws {Error}.
     */
    setFrame(frame: Rectangle): void;
    /**
     * TBD.
     */
    _updateUvs(): void;
}
import { Rectangle } from '../../geom/rectangle.js';
//# sourceMappingURL=texture.d.ts.map