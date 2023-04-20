import { BitmapText } from '../display/bitmap_text';
import { Button } from '../display/button';
import { Group } from '../display/group';
import { Graphics } from '../display/graphics';
import { Image } from '../display/image';
import { Text } from '../display/text';

export class GameObjectFactory {
  /**
   * TBD.
   * @param {object} game - TBD.
   */
  constructor(game) {
    this.game = game;
  }

  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   * @param {string} key - TBD.
   * @param frame - TBD.
   * @param group - TBD.
   * @returns {Image} TBD.
   */
  image(x, y, key, frame, group = null) {
    if (!group) {
      group = this.game.world;
    }
    return group.add(new Image(this.game, x, y, key, frame));
  }

  /**
   * TBD.
   * @param parent - TBD.
   * @param name - TBD.
   * @param addToStage - TBD.
   * @returns {Group} TBD.
   */
  group(parent, name, addToStage) {
    return new Group(this.game, parent, name, addToStage);
  }

  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   * @param text - TBD.
   * @param style - TBD.
   * @param group - TBD.
   * @returns {Text} TBD.
   */
  text(x, y, text, style, group = null) {
    const parent = group || this.game.world;
    return parent.add(new Text(this.game, x, y, text, style));
  }

  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   * @param {string} key - TBD.
   * @param callback - TBD.
   * @param callbackContext - TBD.
   * @param overFrame - TBD.
   * @param outFrame - TBD.
   * @param downFrame - TBD.
   * @param upFrame - TBD.
   * @param group - TBD.
   * @returns {Button} TBD.
   */
  button(x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame, group = null) {
    const parent = group || this.game.world;
    return parent.add(
      new Button(this.game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame)
    );
  }

  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   * @param group - TBD.
   * @returns {Graphics} TBD.
   */
  graphics(x, y, group = null) {
    const parent = group || this.game.world;
    return parent.add(new Graphics(this.game, x, y));
  }

  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   * @param font - TBD.
   * @param text - TBD.
   * @param size - TBD.
   * @param group - TBD.
   * @param align - TBD.
   * @returns {BitmapText} TBD.
   */
  bitmapText(x, y, font, text, size, group = null, align = 'left') {
    const parent = group || this.game.world;
    return parent.add(new BitmapText(this.game, x, y, font, text, size, align));
  }
}
