import type { Game } from './game.js';
export class SoundSprite {
  public game!: Game;
  public key!: any;
  public config!: any;
  public autoplayKey!: any;
  public autoplay!: any;
  public sounds!: any;
  /**
   * TBD.
   * @param {Game} game - TBD.
   * @param {string} key - TBD.
   */
  public constructor(game: Game, key: string) {
    this.game = game;
    this.key = key;
    this.config = this.game.cache.getJSON(`${key}-audioatlas`);
    this.autoplayKey = null;
    this.autoplay = false;
    /** @type {{[key: string]: Sound}} */
    this.sounds = {};
    for (const k in this.config.spritemap) {
      const marker = this.config.spritemap[k];
      const sound = this.game.sound.add(this.key);
      sound.addMarker(k, marker.start, marker.end - marker.start, undefined, marker.loop);
      this.sounds[k] = sound;
    }
    if (this.config.autoplay) {
      this.autoplayKey = this.config.autoplay;
      this.play(this.autoplayKey);
      this.autoplay = this.sounds[this.autoplayKey];
    }
  }

  /**
   * TBD.
   * @param {string} marker - TBD.
   * @param {number} volume - TBD.
   * @returns {Sound} TBD.
   */
  public play(marker: string, volume = 1) {
    return this.sounds[marker].play(marker, null, volume);
  }

  /**
   * TBD.
   * @param {string} marker - TBD.
   */
  public stop(marker: string): void {
    if (!marker) {
      for (const key in this.sounds) {
        this.sounds[key].stop();
      }
    } else {
      this.sounds[marker].stop();
    }
  }

  /**
   * TBD.
   * @param {string} marker - TBD.
   * @returns {Sound} TBD.
   */
  public get(marker: string) {
    return this.sounds[marker];
  }
}
