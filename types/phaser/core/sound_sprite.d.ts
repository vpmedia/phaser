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
     * @param {string} marker - TBD.
     * @param {number} volume - TBD.
     * @returns {Sound} TBD.
     */
    play(marker: string, volume?: number): Sound;
    /**
     * TBD.
     * @param {string} marker - TBD.
     */
    stop(marker: string): void;
    /**
     * TBD.
     * @param {string} marker - TBD.
     * @returns {Sound} TBD.
     */
    get(marker: string): Sound;
}
import { Game } from './game';
import { Sound } from './sound';
//# sourceMappingURL=sound_sprite.d.ts.map