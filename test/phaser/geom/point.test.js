/**
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 */
import { describe, it } from 'mocha';
import { assert } from 'chai';
import Point from '../../../src/phaser/geom/point';

describe('Point', () => {
  it('get()', () => {
    assert.equal(new Point().x, 0);
    assert.equal(new Point().y, 0);
  });
});
