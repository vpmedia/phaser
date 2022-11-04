/**
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 */
import { describe, it } from 'mocha';
import { expect } from 'chai';
import * as Utils from '../../../src/phaser/util/math';

describe('Utils', () => {
  it('valueToColor()', () => {
    const result = {};
    expect(Utils.valueToColor(0xffffff, result)).to.be.a('object');
    expect(result).to.be.a('object');
  });
});
