/**
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 */
import { Group } from  '../display/group';

export class World extends Group {
  constructor(game) {
    super(game, null, '__world', false);
  }

  boot() {
    this.game.stage.addChild(this);
  }
}
