/**
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 */
export class RequestAnimationFrame {
    constructor(game: any);
    game: any;
    rafId: number;
    updateBinded: (rafTime: any) => void;
    start(): void;
    stop(): void;
    update(rafTime: any): void;
}
//# sourceMappingURL=raf.d.ts.map