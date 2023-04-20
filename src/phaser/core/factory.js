import { BitmapText } from  '../display/bitmap_text';
import { Button } from  '../display/button';
import { Group } from  '../display/group';
import { Graphics } from  '../display/graphics';
import { Image } from '../display/image';
import { Text } from  '../display/text';

export class GameObjectFactory {
  /**
   *
   * @param game
   */
  constructor(game) {
    this.game = game;
  }

  /**
   *
   * @param x
   * @param y
   * @param key
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
   *
   * @param parent
   * @param name
   * @param addToStage
   */
  group(parent, name, addToStage) {
    return new Group(this.game, parent, name, addToStage);
  }

  /**
   *
   * @param x
   * @param y
   * @param text
   * @param style
   * @param group
   */
  text(x, y, text, style, group = null) {
    const parent = group || this.game.world;
    return parent.add(new Text(this.game, x, y, text, style));
  }

  /**
   *
   * @param x
   * @param y
   * @param key
   * @param callback
   * @param callbackContext
   * @param overFrame
   * @param outFrame
   * @param downFrame
   * @param upFrame
   * @param group
   */
  button(
    x,
    y,
    key,
    callback,
    callbackContext,
    overFrame,
    outFrame,
    downFrame,
    upFrame,
    group = null
  ) {
    const parent = group || this.game.world;
    return parent.add(
      new Button(
        this.game,
        x,
        y,
        key,
        callback,
        callbackContext,
        overFrame,
        outFrame,
        downFrame,
        upFrame
      )
    );
  }

  /**
   *
   * @param x
   * @param y
   * @param group
   */
  graphics(x, y, group = null) {
    const parent = group || this.game.world;
    return parent.add(new Graphics(this.game, x, y));
  }

  /**
   *
   * @param x
   * @param y
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
