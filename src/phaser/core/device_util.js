import { Logger } from '@vpmedia/simplify';
import { Device } from './device.js';

const logger = new Logger('device');

/**
 * TBD.
 * @param {Device} device - TBD.
 * @param {string} type - TBD.
 * @returns {boolean} TBD.
 */
export const canPlayAudio = (device, type) => {
  return device.supportedAudioFormats[type] === true;
};

/**
 * TBD.
 * @param {Device} device - TBD.
 */
export const checkOS = (device) => {
  const ua = navigator.userAgent;
  if (/Android/.test(ua)) {
    device.android = true;
  } else if (/CrOS/.test(ua)) {
    device.chromeOS = true;
  } else if (/iP[ao]d|iPhone/i.test(ua)) {
    device.iOS = true;
  } else if (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) {
    device.iOS = true;
  } else if (/Mac OS/.test(ua)) {
    device.macOS = true;
  } else if (/Linux/.test(ua)) {
    device.linux = true;
  } else if (/Windows/.test(ua)) {
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
 * TBD.
 * @param {Device} device - TBD.
 */
export const checkInput = (device) => {
  if (
    'ontouchstart' in document.documentElement ||
    (window.navigator.maxTouchPoints && window.navigator.maxTouchPoints >= 1)
  ) {
    device.touch = true;
  }
  // if (window.navigator.msPointerEnabled || window.navigator.pointerEnabled) {
  //   device.mspointer = true;
  // }
  // See https://developer.mozilla.org/en-US/docs/Web/Events/wheel
  if ('onwheel' in window || 'WheelEvent' in window) {
    device.wheelEvent = 'wheel';
  }
};

/**
 * TBD.
 * @param {Device} device - TBD.
 */
export const checkFullScreenSupport = (device) => {
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
  for (let i = 0; i < fs.length; i += 1) {
    if (element[fs[i]]) {
      device.fullscreen = true;
      device.requestFullscreen = fs[i];
      break;
    }
  }
  if (device.fullscreen) {
    for (let i = 0; i < cfs.length; i += 1) {
      if (document[cfs[i]]) {
        device.cancelFullscreen = cfs[i];
        break;
      }
    }
    // @ts-ignore
    if (window.Element && Element.ALLOW_KEYBOARD_INPUT) {
      device.fullscreenKeyboard = true;
    }
  }
};

/**
 * TBD.
 * @param {Device} device - TBD.
 */
export const checkBrowser = (device) => {
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
 * Check for codec support.
 * @param {HTMLAudioElement} audioElement - TBD.
 * @param {string} type - TBD.
 * @returns {boolean} TBD.
 */
export const canPlayType = (audioElement, type) => {
  try {
    const canPlayResult = audioElement.canPlayType(type);
    return canPlayResult === 'maybe' || canPlayResult === 'probably';
  } catch (error) {
    const typedError = error instanceof Error ? error : new Error(String(error));
    logger.exception(`canPlayType error with type: ${type}`, typedError);
    return false;
  }
};

/**
 * Check for codec support.
 * @param {string} type - TBD.
 * @returns {boolean} TBD.
 */
export const isMediaSourceTypeSupported = (type) => {
  if ('MediaSource' in window) {
    try {
      return MediaSource.isTypeSupported(type);
    } catch (error) {
      const typedError = error instanceof Error ? error : new Error(String(error));
      logger.exception(`MediaSource.isTypeSupported error with type: ${type}`, typedError);
      return false;
    }
  }
  return false;
};

/**
 * TBD.
 * @param {Device} device - TBD.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/MIME_types/Common_types
 * @see https://developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements
 * @see https://bit.ly/iphoneoscodecs
 */
export const checkAudio = (device) => {
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
 * TBD.
 * @param {Device} device - TBD.
 */
export const checkImage = (device) => {
  try {
    const avif = new Image();
    avif.src =
      'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';
    avif.onload = function () {
      device.supportedImageFormats.avif = true;
    };
  } catch (error) {
    const typedError = error instanceof Error ? error : new Error(String(error));
    logger.exception('checkImage error with avif', typedError);
  }
  try {
    const webp = new Image();
    webp.src = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
    webp.onload = function () {
      device.supportedImageFormats.webp = true;
    };
  } catch (error) {
    const typedError = error instanceof Error ? error : new Error(String(error));
    logger.exception('checkImage error with webp', typedError);
  }
};

/**
 * TBD.
 * @param {Device} device - TBD.
 */
export const initialize = (device) => {
  logger.info('initialize');
  checkOS(device);
  checkBrowser(device);
  checkAudio(device);
  // checkImage(device);
  checkFullScreenSupport(device);
  checkInput(device);
};

/**
 * TBD.
 * @returns {Device} TBD.
 */
export const createDevice = () => {
  return new Device();
};
