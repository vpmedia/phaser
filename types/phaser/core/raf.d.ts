export class RequestAnimationFrame {
    /**
     * TBD.
     * @param {Game} game - TBD.
     */
    constructor(game: Game);
    game: Game;
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
import { Game } from './game';
//# sourceMappingURL=raf.d.ts.map