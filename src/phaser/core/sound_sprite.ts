export class SoundSprite {
game!: any;
key!: any;
config!: any;
autoplayKey!: any;
autoplay!: any;
sounds!: any;
  /**
   * TBD.
   * @param {import('./game.js').Game} game - TBD.
   * @param {string} key - TBD.
   */
  constructor(game: import('./game.js').Game, key: string) {
    this.game = game;
    this.key = key;
    this.config = this.game.cache.getJSON(`${key}-audioatlas`);
    this.autoplayKey = null;
    this.autoplay = false;
    /** @type {{[key: string]: import('./sound.js').Sound}} */
    this.sounds = {};
    for (let k in this.config.spritemap) {
      const marker = this.config.spritemap[k];
      const sound = this.game.sound.add(this.key);
      sound.addMarker(k, marker.start, marker.end - marker.start, null, marker.loop);
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
   * @returns {import('./sound.js').Sound} TBD.
   */
  play(marker: string, volume: number = 1) {
    return this.sounds[marker].play(marker, null, volume);
  }

  /**
   * TBD.
   * @param {string} marker - TBD.
   */
  stop(marker: string) {
    if (!marker) {
      for (let key in this.sounds) {
        this.sounds[key].stop();
      }
    } else {
      this.sounds[marker].stop();
    }
  }

  /**
   * TBD.
   * @param {string} marker - TBD.
   * @returns {import('./sound.js').Sound} TBD.
   */
  get(marker: string) {
    return this.sounds[marker];
  }
}