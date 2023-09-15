import { BitmapText } from '../display/bitmap_text.js';
import { Button } from '../display/button.js';
import { Graphics } from '../display/graphics.js';
import { Group } from '../display/group.js';
import { Image } from '../display/image.js';
import { Text } from '../display/text.js';

export class GameObjectFactory {
  /**
   * TBD.
   * @param {import('./game.js').Game} game - TBD.
   */
  constructor(game) {
    this.game = game;
  }

  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   * @param {string} key - TBD.
   * @param {string|number} frame - TBD.
   * @param {Group} group - TBD.
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
   * @param {Group} parent - TBD.
   * @param {string} name - TBD.
   * @param {boolean} addToStage - TBD.
   * @returns {Group} TBD.
   */
  group(parent, name, addToStage) {
    return new Group(this.game, parent, name, addToStage);
  }

  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   * @param {string} text - TBD.
   * @param {object} style - TBD.
   * @param {Group} group - TBD.
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
   * @param {Function} callback - TBD.
   * @param {object} callbackContext - TBD.
   * @param {string} overFrame - TBD.
   * @param {string} outFrame - TBD.
   * @param {string} downFrame - TBD.
   * @param {string} upFrame - TBD.
   * @param {Group} group - TBD.
   * @returns {Button} TBD.
   */
  button(
    x,
    y,
    key,
    callback = null,
    callbackContext = null,
    overFrame = null,
    outFrame = null,
    downFrame = null,
    upFrame = null,
    group = null,
  ) {
    const parent = group || this.game.world;
    return parent.add(
      new Button(this.game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame),
    );
  }

  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   * @param {Group} group - TBD.
   * @returns {Graphics} TBD.
   */
  graphics(x = 0, y = 0, group = null) {
    const parent = group || this.game.world;
    return parent.add(new Graphics(this.game, x, y));
  }

  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   * @param {string} font - TBD.
   * @param {string} text - TBD.
   * @param {number} size - TBD.
   * @param {Group} group - TBD.
   * @param {string} align - TBD.
   * @returns {BitmapText} TBD.
   */
  bitmapText(x, y, font, text, size, group = null, align = 'left') {
    const parent = group || this.game.world;
    return parent.add(new BitmapText(this.game, x, y, font, text, size, align));
  }
}
