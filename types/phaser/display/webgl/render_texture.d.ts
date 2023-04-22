export class RenderTexture extends Texture {
    /**
     * TBD.
     * @param {number} width - TBD.
     * @param {number} height - TBD.
     * @param renderer - TBD.
     * @param scaleMode - TBD.
     * @param resolution - TBD.
     */
    constructor(width: number, height: number, renderer: any, scaleMode: any, resolution?: number);
    resolution: number;
    renderer: any;
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
     */
    getImage(): HTMLImageElement;
    /**
     * TBD.
     */
    getBase64(): any;
    /**
     * TBD.
     */
    getCanvas(): void;
}
import { Texture } from './texture';
import { CanvasBuffer } from '../canvas/buffer';
import { FilterTexture } from './filter_texture';
import { Point } from '../../geom/point';
//# sourceMappingURL=render_texture.d.ts.map