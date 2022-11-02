/**
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 */
import { describe, it } from 'mocha';
import { assert } from 'chai';
import Matrix from '../../../src/phaser/geom/matrix';

describe('Matrix', () => {
  it('get()', () => {
    assert.equal(new Matrix().a, 1);
  });
});
