export class RequestAnimationFrame {
    /**
     * Constructor.
     * @param {import('./game.js').Game} game - Reference to the game instance.
     */
    constructor(game: import("./game.js").Game);
    game: import("./game.js").Game;
    rafId: number;
    /**
     * Starts an animation frame request.
     */
    start: () => void;
    /**
     * Cancels an animation frame request.
     */
    stop: () => void;
    /**
     * Performs an animation frame request.
     * @param {number} rafTime - TBD.
     */
    update: (rafTime: number) => void;
}
//# sourceMappingURL=raf.d.ts.map