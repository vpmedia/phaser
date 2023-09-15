export class RequestAnimationFrame {
    /**
     * TBD.
     * @param {import('./game.js').Game} game - TBD.
     */
    constructor(game: import('./game').Game);
    game: import("./game").Game;
    rafId: number;
    updateBinded: (rafTime: number) => void;
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
     * @param {number} rafTime - TBD.
     */
    update(rafTime: number): void;
}
//# sourceMappingURL=raf.d.ts.map
