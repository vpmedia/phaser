export class SoundSprite {
    /**
     * TBD.
     * @param {import('./game.js').Game} game - TBD.
     * @param {string} key - TBD.
     */
    constructor(game: import("./game.js").Game, key: string);
    game: import("./game.js").Game;
    key: string;
    config: any;
    autoplayKey: any;
    autoplay: boolean | import("./sound.js").Sound;
    /** @type {{[key: string]: import('./sound.js').Sound}} */
    sounds: {
        [key: string]: import("./sound.js").Sound;
    };
    /**
     * TBD.
     * @param {string} marker - TBD.
     * @param {number} volume - TBD.
     * @returns {import('./sound.js').Sound} TBD.
     */
    play(marker: string, volume?: number): import("./sound.js").Sound;
    /**
     * TBD.
     * @param {string} marker - TBD.
     */
    stop(marker: string): void;
    /**
     * TBD.
     * @param {string} marker - TBD.
     * @returns {import('./sound.js').Sound} TBD.
     */
    get(marker: string): import("./sound.js").Sound;
}
//# sourceMappingURL=sound_sprite.d.ts.map