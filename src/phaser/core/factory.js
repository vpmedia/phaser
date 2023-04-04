/**
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 */
import BitmapText from '../display/bitmap_text';
import Button from '../display/button';
import Group from '../display/group';
import Graphics from '../display/graphics';
import Image from '../display/image';
import Text from '../display/text';

export default class {
  constructor(game) {
    this.game = game;
  }

  image(x, y, key, frame, group = null) {
    if (!group) {
      group = this.game.world;
    }
    return group.add(new Image(this.game, x, y, key, frame));
  }

  group(parent, name, addToStage) {
    return new Group(this.game, parent, name, addToStage);
  }

  text(x, y, text, style, group = null) {
    const parent = group || this.game.world;
    return parent.add(new Text(this.game, x, y, text, style));
  }

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

  graphics(x, y, group = null) {
    const parent = group || this.game.world;
    return parent.add(new Graphics(this.game, x, y));
  }

  bitmapText(x, y, font, text, size, group = null, align = 'left') {
    const parent = group || this.game.world;
    return parent.add(new BitmapText(this.game, x, y, font, text, size, align));
  }
}
