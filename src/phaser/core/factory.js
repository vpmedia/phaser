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
   * @param frame
   * @param group
   */
  image(x, y, key, frame, group = null) {
    if (!group) {
      group = this.game.world;
    }
    return group.add(new Image(this.game, x, y, key, frame));
  }

  /**
   * TBD.
   * @param parent
   * @param name
   * @param addToStage
   */
  group(parent, name, addToStage) {
    return new Group(this.game, parent, name, addToStage);
  }

  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   * @param text
   * @param style
   * @param group
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
   * @param callback
   * @param callbackContext
   * @param overFrame
   * @param outFrame
   * @param downFrame
   * @param upFrame
   * @param group
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
   * @param group
   */
  graphics(x, y, group = null) {
    const parent = group || this.game.world;
    return parent.add(new Graphics(this.game, x, y));
  }

  /**
   * TBD.
   * @param {number} x - TBD.
   * @param {number} y - TBD.
   * @param font
   * @param text
   * @param size
   * @param group
   * @param align
   */
  bitmapText(x, y, font, text, size, group = null, align = 'left') {
    const parent = group || this.game.world;
    return parent.add(new BitmapText(this.game, x, y, font, text, size, align));
  }
}
