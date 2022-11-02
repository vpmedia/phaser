/**
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 */
import { describe, it } from 'mocha';
import { assert } from 'chai';
import Rectangle from '../../../src/phaser/geom/rectangle';

describe('Rectangle', () => {
  it('get()', () => {
    assert.equal(new Rectangle().x, 0);
    assert.equal(new Rectangle().y, 0);
    assert.equal(new Rectangle().width, 0);
    assert.equal(new Rectangle().height, 0);
  });
});
