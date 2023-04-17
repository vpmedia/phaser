/**
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @author       Mat Groves http://matgroves.com/ @Doormat23
 */
export class GraphicsData {
    constructor(gl: any);
    gl: any;
    color: number[];
    points: any[];
    indices: any[];
    buffer: any;
    indexBuffer: any;
    mode: number;
    alpha: number;
    dirty: boolean;
    reset(): void;
    glPoints: Float32Array | null | undefined;
    glIndicies: Uint16Array | null | undefined;
    upload(): void;
}
//# sourceMappingURL=graphics_data.d.ts.map