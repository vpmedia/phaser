import { BitmapText } from '../display/bitmap_text.js';
import { Button } from '../display/button.js';
import { Graphics } from '../display/graphics.js';
import { Group } from '../display/group.js';
import { Image } from '../display/image.js';
import { Text } from '../display/text.js';

export class GameObjectFactory {
  /**
   * Creates a new GameObjectFactory instance.
   * @param {import('./game.js').Game} game - The game instance this factory belongs to.
   */
  constructor(game) {
    this.game = game;
  }

  /**
   * Creates a new Image object.
   * @param {number} x - The x coordinate of the image.
   * @param {number} y - The y coordinate of the image.
   * @param {string} key - The texture key for the image.
   * @param {string|number} frame - The frame to display.
   * @param {Group} group - The parent group for the image.
   * @returns {Image} The created Image object.
   */
  image(x, y, key, frame, group = null) {
    if (!group) {
      group = this.game.world;
    }
    return group.add(new Image(this.game, x, y, key, frame));
  }

  /**
   * Creates a new Group object.
   * @param {Group | null} parent - The parent group for the new group.
   * @param {string | null} name - The name of the group.
   * @param {boolean} addToStage - Whether to add the group to the stage.
   * @returns {Group} The created Group object.
   */
  group(parent = null, name = null, addToStage = false) {
    return new Group(this.game, parent, name, addToStage);
  }

  /**
   * Creates a new Text object.
   * @param {number} x - The x coordinate of the text.
   * @param {number} y - The y coordinate of the text.
   * @param {string} text - The text content to display.
   * @param {object} style - The style configuration for the text.
   * @param {Group | null} group - The parent group for the text.
   * @returns {Text} The created Text object.
   */
  text(x, y, text, style, group = null) {
    const parent = group || this.game.world;
    return parent.add(new Text(this.game, x, y, text, style));
  }

  /**
   * Creates a new Button object.
   * @param {number} x - The x coordinate of the button.
   * @param {number} y - The y coordinate of the button.
   * @param {string} key - The texture key for the button.
   * @param {Function | null} callback - The function to call when the button is clicked.
   * @param {object | null} callbackContext - The context to apply when calling the callback.
   * @param {string | null} overFrame - The frame to display when the mouse is over the button.
   * @param {string | null} outFrame - The frame to display when the mouse is not over the button.
   * @param {string | null} downFrame - The frame to display when the button is pressed.
   * @param {string | null} upFrame - The frame to display when the button is released.
   * @param {Group | null} group - The parent group for the button.
   * @returns {Button} The created Button object.
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
    group = null
  ) {
    const parent = group || this.game.world;
    return parent.add(
      new Button(this.game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame)
    );
  }

  /**
   * Creates a new Graphics object.
   * @param {number} x - The x coordinate of the graphics object.
   * @param {number} y - The y coordinate of the graphics object.
   * @param {Group | null} group - The parent group for the graphics object.
   * @returns {Graphics} The created Graphics object.
   */
  graphics(x = 0, y = 0, group = null) {
    const parent = group || this.game.world;
    return parent.add(new Graphics(this.game, x, y));
  }

  /**
   * Creates a new BitmapText object.
   * @param {number} x - The x coordinate of the bitmap text.
   * @param {number} y - The y coordinate of the bitmap text.
   * @param {string} font - The font key for the bitmap text.
   * @param {string} text - The text content to display.
   * @param {number} size - The font size.
   * @param {Group | null} group - The parent group for the bitmap text.
   * @param {string} align - The alignment of the text.
   * @returns {BitmapText} The created BitmapText object.
   */
  bitmapText(x, y, font, text, size, group = null, align = 'left') {
    const parent = group || this.game.world;
    return parent.add(new BitmapText(this.game, x, y, font, text, size, align));
  }
}
