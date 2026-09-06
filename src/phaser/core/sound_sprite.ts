import type { Game } from './game.js';
import type { Sound } from './sound.js';

/** One region of a sound sprite, as the audio atlas describes it. */
export type SoundSpriteMarker = {
  start: number;
  end: number;
  loop?: boolean;
};

/** An audio atlas: the markers it carries and the one to start on. */
export type SoundSpriteConfig = {
  spritemap: Record<string, SoundSpriteMarker>;
  autoplay?: string;
};

export class SoundSprite {
  public game!: Game;
  public key!: string;
  public config!: SoundSpriteConfig;
  public autoplayKey!: string | null;
  public autoplay!: Sound | boolean;
  public sounds!: Record<string, Sound>;
  /**
   * TBD.
   * @param {Game} game - TBD.
   * @param {string} key - TBD.
   */
  public constructor(game: Game, key: string) {
    this.game = game;
    this.key = key;
    this.config = this.game.cache.getJSON<SoundSpriteConfig>(`${key}-audioatlas`);
    this.autoplayKey = null;
    this.autoplay = false;
    this.sounds = {};
    for (const [markerKey, marker] of Object.entries(this.config.spritemap)) {
      const sound = this.game.sound.add(this.key);
      sound.addMarker(markerKey, marker.start, marker.end - marker.start, undefined, marker.loop);
      this.sounds[markerKey] = sound;
    }
    if (this.config.autoplay) {
      this.autoplayKey = this.config.autoplay;
      this.play(this.autoplayKey);
      this.autoplay = this.sounds[this.autoplayKey]!;
    }
  }

  /**
   * TBD.
   * @param {string} marker - TBD.
   * @param {number} volume - TBD.
   * @returns {Sound} TBD.
   */
  public play(marker: string, volume = 1): Sound | undefined {
    return this.sounds[marker]?.play(marker, undefined, volume);
  }

  /**
   * TBD.
   * @param {string} marker - TBD.
   */
  public stop(marker: string): void {
    if (marker) {
      this.sounds[marker]?.stop();
      return;
    }
    for (const sound of Object.values(this.sounds)) {
      sound.stop();
    }
  }

  /**
   * TBD.
   * @param {string} marker - TBD.
   * @returns {Sound} TBD.
   */
  public get(marker: string): Sound | undefined {
    return this.sounds[marker];
  }
}
