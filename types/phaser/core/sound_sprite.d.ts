export class SoundSprite {
    /**
     * TBD.
     * @param {import('./game.js').Game} game - TBD.
     * @param {string} key - TBD.
     */
    constructor(game: import('./game.js').Game, key: string);
    game: import("./game.js").Game;
    key: string;
    config: any;
    autoplayKey: any;
    autoplay: any;
    sounds: {};
    /**
     * TBD.
     * @param {string} marker - TBD.
     * @param {number} volume - TBD.
     * @returns {import('./sound').Sound} TBD.
     */
    play(marker: string, volume?: number): import('./sound').Sound;
    /**
     * TBD.
     * @param {string} marker - TBD.
     */
    stop(marker: string): void;
    /**
     * TBD.
     * @param {string} marker - TBD.
     * @returns {import('./sound').Sound} TBD.
     */
    get(marker: string): import('./sound').Sound;
}
//# sourceMappingURL=sound_sprite.d.ts.map