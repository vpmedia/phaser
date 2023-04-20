export class RequestAnimationFrame {
    /**
     * TBD.
     * @param {object} game - TBD.
     */
    constructor(game: object);
    game: any;
    rafId: number;
    updateBinded: (rafTime: any) => void;
    /**
     * TBD.
     */
    start(): void;
    /**
     * TBD.
     */
    stop(): void;
    /**
     * TBD.
     * @param rafTime
     */
    update(rafTime: any): void;
}
//# sourceMappingURL=raf.d.ts.map