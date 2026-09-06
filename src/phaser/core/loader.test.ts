import { describe, expect, it } from 'vitest';
import type { Game } from './game.js';
import { Loader } from './loader.js';

const createGame = (formats: Record<string, boolean> = {}, noAudio = false): Game =>
  ({
    logger: { warn: (): undefined => undefined, info: (): undefined => undefined, debug: (): undefined => undefined },
    config: { maxParallelDownloads: 4 },
    cache: {},
    sound: { noAudio },
    device: { noAudioFormat: false, supportedAudioFormats: formats },
  }) as unknown as Game;

const createLoader = (formats: Record<string, boolean> = {}, noAudio = false): Loader =>
  new Loader(createGame(formats, noAudio));

describe('Loader', (): void => {
  describe('getAudioURL', (): void => {
    it('returns null when the device has no audio', (): void => {
      expect(createLoader({}, true).getAudioURL(['track.ogg'])).toBeNull();
    });

    it('picks a plain url whose extension the device can play', (): void => {
      expect(createLoader({ ogg: true }).getAudioURL(['track.ogg'])).toBe('track.ogg');
    });

    it('skips an extension the device cannot play', (): void => {
      expect(createLoader({ ogg: false, mp3: true }).getAudioURL(['track.ogg', 'track.mp3'])).toBe('track.mp3');
    });

    it('returns null when no candidate is playable', (): void => {
      expect(createLoader({ ogg: false, mp3: false }).getAudioURL(['track.ogg', 'track.mp3'])).toBeNull();
    });

    it('accepts a bare string as a single candidate', (): void => {
      expect(createLoader({ mp3: true }).getAudioURL('track.mp3')).toBe('track.mp3');
    });

    it('reads the format from a uri and type pair', (): void => {
      expect(createLoader({ ogg: true }).getAudioURL([{ uri: 'track-no-extension', type: 'ogg' }])).toBe(
        'track-no-extension'
      );
    });

    it('skips a pair whose type the device cannot play', (): void => {
      const loader = createLoader({ ogg: false, mp3: true });
      expect(
        loader.getAudioURL([
          { uri: 'a', type: 'ogg' },
          { uri: 'b', type: 'mp3' },
        ])
      ).toBe('b');
    });

    it('takes a blob url without checking the format', (): void => {
      expect(createLoader().getAudioURL(['blob:https://example.test/abc'])).toBe('blob:https://example.test/abc');
    });

    it('takes a data uri without checking the format', (): void => {
      expect(createLoader().getAudioURL(['data:audio/mp3;base64,AAAA'])).toBe('data:audio/mp3;base64,AAAA');
    });

    it('ignores a query string when reading the extension', (): void => {
      expect(createLoader({ mp3: true }).getAudioURL(['track.mp3?v=2'])).toBe('track.mp3?v=2');
    });

    it('returns null for an empty candidate list', (): void => {
      expect(createLoader({ mp3: true }).getAudioURL([])).toBeNull();
    });
  });

  describe('transformUrl', (): void => {
    const file = { path: 'assets/' } as Parameters<Loader['transformUrl']>[1];

    it('returns false for a missing url', (): void => {
      expect(createLoader().transformUrl(null, file)).toBe(false);
    });

    it('returns false for an unresolved candidate list', (): void => {
      expect(createLoader().transformUrl(['a.mp3'], file)).toBe(false);
    });

    it('passes an absolute url through', (): void => {
      expect(createLoader().transformUrl('https://example.test/a.png', file)).toBe('https://example.test/a.png');
    });

    it('passes a protocol relative url through', (): void => {
      expect(createLoader().transformUrl('//example.test/a.png', file)).toBe('//example.test/a.png');
    });

    it('passes a data uri through', (): void => {
      expect(createLoader().transformUrl('data:image/png;base64,AAAA', file)).toBe('data:image/png;base64,AAAA');
    });

    it('prefixes a relative url with the base url and file path', (): void => {
      const loader = createLoader();
      loader.baseURL = 'https://cdn.test/';
      expect(loader.transformUrl('a.png', file)).toBe('https://cdn.test/assets/a.png');
    });
  });

  describe('addToFileList', (): void => {
    it('records the core fields for a queued file', (): void => {
      const loader = createLoader();
      loader.image('logo', 'logo.png');
      const asset = loader.getAsset('image', 'logo');
      expect(asset?.file).toMatchObject({
        type: 'image',
        key: 'logo',
        url: 'logo.png',
        loaded: false,
        loading: false,
        error: false,
      });
    });

    it('folds the per-type extras onto the file', (): void => {
      const loader = createLoader();
      loader.audio('theme', ['theme.mp3']);
      expect(loader.getAsset('audio', 'theme')?.file).toMatchObject({
        type: 'audio',
        autoDecode: true,
        url: ['theme.mp3'],
      });
    });

    it('skips a file with no key', (): void => {
      const loader = createLoader();
      loader.image('', 'logo.png');
      expect(loader.getAsset('image', '')).toBeNull();
    });

    it('derives the url from the key and extension when none is given', (): void => {
      const loader = createLoader();
      loader.image('logo');
      expect(loader.getAsset('image', 'logo')?.file.url).toBe('logo.png');
    });
  });
});
