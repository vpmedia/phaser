export class SoundSprite {
    /**
     * TBD.
     * @param {object} game - TBD.
     * @param {string} key - TBD.
     */
    constructor(game: object, key: string);
    game: any;
    key: string;
    config: any;
    autoplayKey: any;
    autoplay: any;
    sounds: {};
    /**
     * TBD.
     * @param marker
     * @param volume
     */
    play(marker: any, volume?: number): any;
    /**
     * TBD.
     * @param marker
     */
    stop(marker: any): void;
    /**
     * TBD.
     * @param marker
     */
    get(marker: any): any;
}
//# sourceMappingURL=sound_sprite.d.ts.map