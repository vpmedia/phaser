export class SoundSprite {
  /**
   * TBD.
   * @param {import('./game.js').Game} game - TBD.
   * @param {string} key - TBD.
   */
  constructor(game, key) {
    this.game = game;
    this.key = key;
    this.config = this.game.cache.getJSON(key + '-audioatlas');
    this.autoplayKey = null;
    this.autoplay = false;
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
   * @returns {import('./sound').Sound} TBD.
   */
  play(marker, volume = 1) {
    return this.sounds[marker].play(marker, null, volume);
  }

  /**
   * TBD.
   * @param {string} marker - TBD.
   */
  stop(marker) {
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
   * @returns {import('./sound').Sound} TBD.
   */
  get(marker) {
    return this.sounds[marker];
  }
}
