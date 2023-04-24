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
     * @param {import('./base_texture').BaseTexture} baseTexture - TBD.
     * @param {Rectangle} frame - TBD.
     * @param {Rectangle} crop - TBD.
     * @param {Rectangle} trim - TBD.
     */
    constructor(baseTexture: import('./base_texture').BaseTexture, frame: Rectangle, crop: Rectangle, trim: Rectangle);
    noFrame: boolean;
    baseTexture: import("./base_texture").BaseTexture;
    frame: Rectangle;
    trim: Rectangle;
    valid: boolean;
    isTiling: boolean;
    requiresUpdate: boolean;
    requiresReTint: boolean;
    _uvs: TextureUvs;
    width: number;
    height: number;
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
     * @throws Error.
     */
    setFrame(frame: Rectangle): void;
    /**
     * TBD.
     */
    _updateUvs(): void;
}
import { Rectangle } from '../../geom/rectangle';
//# sourceMappingURL=texture.d.ts.map