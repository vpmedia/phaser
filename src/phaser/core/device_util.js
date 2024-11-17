import { Device } from './device.js';

/**
 * TBD.
 * @param {Device} device - TBD.
 * @param {string} type - TBD.
 * @returns {boolean} TBD.
 */
export function canPlayAudio(device, type) {
  if (type === 'mp3' && device.mp3) {
    return true;
  } else if (type === 'ogg' && (device.ogg || device.opus)) {
    return true;
  } else if (type === 'm4a' && device.m4a) {
    return true;
  } else if (type === 'opus' && device.opus) {
    return true;
  } else if (type === 'wav' && device.wav) {
    return true;
  } else if (type === 'webm' && device.webm) {
    return true;
  } else if (type === 'mp4' && device.dolby) {
    return true;
  }
  return false;
}

/**
 * TBD.
 * @param {Device} device - TBD.
 */
export function checkOS(device) {
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
  const silk = /Silk/.test(ua); // detected in browsers
  if (device.windows || device.macOS || (device.linux && !silk) || device.chromeOS) {
    device.desktop = true;
  }
  // iOS / Windows Phone / Tablet reset
  if (device.android || device.iOS || device.windowsPhone || (/Windows NT/i.test(ua) && /Touch/i.test(ua))) {
    device.desktop = false;
  }
}

/**
 * TBD.
 * @param {Device} device - TBD.
 */
export function checkInput(device) {
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
}

/**
 * TBD.
 * @param {Device} device - TBD.
 */
export function checkFullScreenSupport(device) {
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
    if (window.Element && Element.ALLOW_KEYBOARD_INPUT) {
      device.fullscreenKeyboard = true;
    }
  }
}

/**
 * TBD.
 * @param {Device} device - TBD.
 */
export function checkBrowser(device) {
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
  //  Silk gets its own if clause because its ua also contains 'Safari'
  if (/Silk/.test(ua)) {
    device.silk = true;
  }
}

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
    console.error(`canPlayType error with type: ${type}`, error);
    return false;
  }
};

/**
 * TBD.
 * @param {Device} device - TBD.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/MIME_types/Common_types
 * @see https://developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements
 * @see https://bit.ly/iphoneoscodecs
 */
export function checkAudio(device) {
  const audioElement = document.createElement('audio');
  if (!audioElement.canPlayType) {
    console.error('checkAudio', new Error('Missing canPlayType method in HTMLAudioElement'));
    return;
  }
  device.ogg = canPlayType(audioElement, 'audio/ogg; codecs="vorbis"');
  device.opus = canPlayType(audioElement, 'audio/ogg; codecs="opus"') || canPlayType(audioElement, 'audio/opus;');
  device.mp3 = canPlayType(audioElement, 'audio/mpeg;') || canPlayType(audioElement, 'audio/mp3;');
  device.wav = canPlayType(audioElement, 'audio/wav; codecs="1"');
  device.m4a = canPlayType(audioElement, 'audio/x-m4a;') || canPlayType(audioElement, 'audio/aac;');
  device.webm = canPlayType(audioElement, 'audio/webm; codecs="vorbis"');
  device.dolby = canPlayType(audioElement, 'audio/mp4; codecs="ec-3"');
}

/**
 * TBD.
 * @param {Device} device - TBD.
 */
export function checkImage(device) {
  device.avif = false;
  device.webp = false;
  try {
    const avif = new Image();
    avif.src =
      'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';
    avif.onload = function () {
      device.avif = true;
    };
  } catch (error) {
    console.error('checkImage error with avif', error);
  }
  try {
    const webp = new Image();
    webp.src = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
    webp.onload = function () {
      device.webp = true;
    };
  } catch (error) {
    console.error('checkImage error with webp', error);
  }
}

/**
 * TBD.
 * @param {Device} device - TBD.
 */
export function initialize(device) {
  checkOS(device);
  checkBrowser(device);
  checkAudio(device);
  // checkImage(device);
  checkFullScreenSupport(device);
  checkInput(device);
}

/**
 * TBD.
 * @returns {Device} TBD.
 */
export function createDevice() {
  return new Device();
}
