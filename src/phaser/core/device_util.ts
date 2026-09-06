import { getLogger } from '@logtape/logtape';
import { Device } from './device.js';

const logger = getLogger(['phaser', 'device']);

/**
 * Check if the device can play a specific audio format.
 * @param {Device} device - The device instance to check.
 * @param {string} type - The audio format type to check.
 * @returns {boolean} True if the device can play this audio format, false otherwise.
 */
export const canPlayAudio = (device: Device, type: string): boolean => device.supportedAudioFormats[type] === true;

/**
 * Detect the operating system of the device.
 * @param {Device} device - The device instance to update.
 */
export const checkOS = (device: Device): void => {
  const ua = navigator.userAgent;
  if (ua.includes('Android')) {
    device.android = true;
  } else if (ua.includes('CrOS')) {
    device.chromeOS = true;
  } else if (/iP[ao]d|iPhone/i.test(ua)) {
    device.iOS = true;
  } else if (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) {
    device.iOS = true;
  } else if (ua.includes('Mac OS')) {
    device.macOS = true;
  } else if (ua.includes('Linux')) {
    device.linux = true;
  } else if (ua.includes('Windows')) {
    device.windows = true;
  }
  if (/Windows Phone/i.test(ua) || /IEMobile/i.test(ua)) {
    device.android = false;
    device.iOS = false;
    device.macOS = false;
    device.windows = true;
    device.windowsPhone = true;
  }
  if (device.windows || device.macOS || device.linux || device.chromeOS) {
    device.desktop = true;
  }
  // iOS / Windows Phone / Tablet reset
  if (device.android || device.iOS || device.windowsPhone || (/Windows NT/i.test(ua) && /Touch/i.test(ua))) {
    device.desktop = false;
  }
};

/**
 * Detect input capabilities of the device.
 * @param {Device} device - The device instance to update.
 */
export const checkInput = (device: Device): void => {
  if (
    'ontouchstart' in document.documentElement ||
    (globalThis.navigator.maxTouchPoints && globalThis.navigator.maxTouchPoints >= 1)
  ) {
    device.touch = true;
  }
  // if (window.navigator.msPointerEnabled || window.navigator.pointerEnabled) {
  //   device.mspointer = true;
  // }
  // See https://developer.mozilla.org/en-US/docs/Web/Events/wheel
  if ('onwheel' in globalThis || 'WheelEvent' in globalThis) {
    device.wheelEvent = 'wheel';
  }
};

/**
 * Check for fullscreen support capabilities.
 * @param {Device} device - The device instance to update.
 */
export const checkFullScreenSupport = (device: Device): void => {
  const fs = [
    'requestFullscreen',
    'requestFullScreen',
    'webkitRequestFullscreen',
    'webkitRequestFullScreen',
    'msRequestFullscreen',
    'msRequestFullScreen',
    'mozRequestFullScreen',
    'mozRequestFullscreen',
  ];
  const cfs = [
    'cancelFullScreen',
    'exitFullscreen',
    'webkitCancelFullScreen',
    'webkitExitFullscreen',
    'msCancelFullScreen',
    'msExitFullscreen',
    'mozCancelFullScreen',
    'mozExitFullscreen',
  ];
  const element = document.createElement('div');
  const elementApi = element as unknown as Record<string, unknown>;
  for (const name of fs) {
    if (elementApi[name]) {
      device.fullscreen = true;
      device.requestFullscreen = name;
      break;
    }
  }
  if (device.fullscreen) {
    const documentApi = document as unknown as Record<string, unknown>;
    for (const name of cfs) {
      if (documentApi[name]) {
        device.cancelFullscreen = name;
        break;
      }
    }
    // @ts-expect-error
    if (globalThis.Element && Element.ALLOW_KEYBOARD_INPUT) {
      device.fullscreenKeyboard = true;
    }
  }
};

/**
 * Detect the browser type.
 * @param {Device} device - The device instance to update.
 */
export const checkBrowser = (device: Device): void => {
  const ua = navigator.userAgent;
  if (/Edge\/\d+/.test(ua)) {
    device.edge = true;
  } else if (/Chrome\/(\d+)/.test(ua) && !device.windowsPhone) {
    device.chrome = true;
  } else if (/Firefox\D+(\d+)/.test(ua)) {
    device.firefox = true;
  } else if (/Safari\/(\d+)/.test(ua) && !device.windowsPhone) {
    device.safari = true;
  }
};

/**
 * Check if an audio element can play a specific codec.
 * @param {HTMLAudioElement} audioElement - The audio element to test.
 * @param {string} type - The codec type to check.
 * @returns {boolean} True if the codec is supported, false otherwise.
 */
export const canPlayType = (audioElement: HTMLAudioElement, type: string): boolean => {
  try {
    const canPlayResult = audioElement.canPlayType(type);
    return canPlayResult === 'maybe' || canPlayResult === 'probably';
  } catch (error) {
    const typedError = error instanceof Error ? error : new Error(String(error));
    logger.fatal('canPlayType error', { error: typedError, type });
    return false;
  }
};

/**
 * Check if a media source type is supported by the browser.
 * @param {string} type - The media source type to check.
 * @returns {boolean} True if the media source type is supported, false otherwise.
 */
export const isMediaSourceTypeSupported = (type: string): boolean => {
  if ('MediaSource' in globalThis) {
    try {
      return MediaSource.isTypeSupported(type);
    } catch (error) {
      const typedError = error instanceof Error ? error : new Error(String(error));
      logger.fatal('MediaSource.isTypeSupported error', { error: typedError, type });
      return false;
    }
  }
  return false;
};

/**
 * Check for supported audio formats on the device.
 * @param {Device} device - The device instance to update with audio format support.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/MIME_types/Common_types
 * @see https://developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements
 * @see https://bit.ly/iphoneoscodecs
 */
export const checkAudio = (device: Device): void => {
  const audioElement = document.createElement('audio');
  const formats = [
    { type: 'ogg', codecs: ['audio/ogg; codecs="vorbis"'] },
    { type: 'opus', codecs: ['audio/opus', 'audio/ogg; codecs="opus"'] },
    { type: 'mp3', codecs: ['audio/mpeg', 'audio/mp3', 'audio/x-mp3', 'audio/mpeg3', 'audio/x-mpeg3'] },
    { type: 'wav', codecs: ['audio/wav', 'audio/x-wav'] },
    { type: 'm4a', codecs: ['audio/aac', 'audio/x-m4a'] },
    { type: 'webm', codecs: ['audio/webm'] },
    { type: 'mp4', codecs: ['audio/mp4'] },
  ];
  for (const format of formats) {
    const { type, codecs } = format;
    for (const codec of codecs) {
      if (!device.supportedAudioFormats[type]) {
        const isSupported = isMediaSourceTypeSupported(codec) || canPlayType(audioElement, codec);
        if (isSupported) {
          device.supportedAudioFormats[type] = isSupported;
        }
      }
    }
  }
  if (Object.keys(device.supportedAudioFormats).length === 0) {
    logger.warn('No audio format support detected');
    device.noAudioFormat = true;
  }
};

/**
 * Check for supported image formats on the device.
 * @param {Device} device - The device instance to update with image format support.
 */
export const checkImage = (device: Device): void => {
  try {
    const avif = new Image();
    avif.src =
      'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';
    avif.onload = function onload(): void {
      device.supportedImageFormats['avif'] = true;
    };
  } catch (error) {
    const typedError = error instanceof Error ? error : new Error(String(error));
    logger.fatal('checkImage error with avif', { error: typedError });
  }
  try {
    const webp = new Image();
    webp.src = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
    webp.onload = function onload(): void {
      device.supportedImageFormats['webp'] = true;
    };
  } catch (error) {
    const typedError = error instanceof Error ? error : new Error(String(error));
    logger.fatal('checkImage error with webp', { error: typedError });
  }
};

/**
 * Initialize device capabilities detection.
 * @param {Device} device - The device instance to initialize.
 */
export const initialize = (device: Device): void => {
  logger.info('initialize');
  checkOS(device);
  checkBrowser(device);
  checkAudio(device);
  // checkImage(device);
  checkFullScreenSupport(device);
  checkInput(device);
};

/**
 * Create a new Device instance.
 * @returns {Device} A new Device instance.
 */
export const createDevice = (): Device => new Device();
