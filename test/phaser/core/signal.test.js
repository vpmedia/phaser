/**
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 */
import { describe, it } from 'mocha';
import { assert } from 'chai';
import Signal from '../../../src/phaser/core/signal';

describe('Signal', () => {
  it('Signal()', () => {
    const signal = new Signal();
    assert.equal(signal.getNumListeners(), 0);
    const listener = () => {};
    signal.add(listener);
    assert.equal(signal.has(listener), true);
    assert.equal(signal.getNumListeners(), 1);
    signal.add(() => {});
    assert.equal(signal.getNumListeners(), 2);
    signal.addOnce(() => {});
    assert.equal(signal.getNumListeners(), 3);
    signal.dispatch();
    assert.equal(signal.getNumListeners(), 2);
    signal.removeAll();
    assert.equal(signal.getNumListeners(), 0);
  });

  it('dispose()', () => {
    assert.equal(new Signal().getNumListeners(), 0);
    const signal = new Signal();
    signal.add(() => {});
    signal.add(() => {});
    signal.dispose();
    assert.equal(signal.getNumListeners(), 0);
  });

  it('has()', () => {
    const signal = new Signal();
    assert.equal(
      signal.has(() => {}),
      false
    );
  });
});
