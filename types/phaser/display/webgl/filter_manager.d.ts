/**
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @author       Mat Groves http://matgroves.com/ @Doormat23
 */
export default class _default {
    filterStack: any[];
    offsetX: number;
    offsetY: number;
    setContext(gl: any): void;
    gl: any;
    texturePool: any[] | undefined;
    begin(): void;
    pushFilter(): void;
    popFilter(): void;
    applyFilterPass(): void;
    initShaderBuffers(): void;
    destroy(): void;
}
//# sourceMappingURL=filter_manager.d.ts.map