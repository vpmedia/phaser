export class SoundSprite {
  /**
   * TBD.
   * @param {object} game - TBD.
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
   * @param marker
   * @param volume - TBD.
   */
  play(marker, volume = 1) {
    return this.sounds[marker].play(marker, null, volume);
  }

  /**
   * TBD.
   * @param marker
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
   * @param marker
   */
  get(marker) {
    return this.sounds[marker];
  }
}
