export class RequestAnimationFrame {
    /**
     * TBD.
     * @param {Game} game - TBD.
     */
    constructor(game: Game);
    game: Game;
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
import { Game } from './game';
//# sourceMappingURL=raf.d.ts.map