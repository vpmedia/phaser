export default class _default extends Texture {
    constructor(width: any, height: any, renderer: any, scaleMode: any, resolution?: number);
    width: any;
    height: any;
    resolution: number;
    frame: Rectangle;
    crop: Rectangle;
    renderer: any;
    textureBuffer: CanvasBuffer | FilterTexture;
    render: () => void;
    projection: Point | undefined;
    resize(): void;
    clear(): void;
    renderWebGL(): void;
    renderCanvas(): void;
    getImage(): HTMLImageElement;
    getBase64(): any;
    getCanvas(): void;
}
import Texture from './texture';
import Rectangle from '../../geom/rectangle';
import CanvasBuffer from '../canvas/buffer';
import FilterTexture from './filter_texture';
import Point from '../../geom/point';
//# sourceMappingURL=render_texture.d.ts.map