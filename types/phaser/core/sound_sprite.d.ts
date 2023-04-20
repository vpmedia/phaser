export class SoundSprite {
    /**
     * TBD.
     * @param {Game} game - TBD.
     * @param {string} key - TBD.
     */
    constructor(game: Game, key: string);
    game: Game;
    key: string;
    config: any;
    autoplayKey: any;
    autoplay: any;
    sounds: {};
    /**
     * TBD.
     * @param marker - TBD.
     * @param volume - TBD.
     */
    play(marker: any, volume?: number): any;
    /**
     * TBD.
     * @param marker - TBD.
     */
    stop(marker: any): void;
    /**
     * TBD.
     * @param marker - TBD.
     */
    get(marker: any): any;
}
import { Game } from './game';
//# sourceMappingURL=sound_sprite.d.ts.map