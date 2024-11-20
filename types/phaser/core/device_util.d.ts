/**
 * TBD.
 * @param {Device} device - TBD.
 * @param {string} type - TBD.
 * @returns {boolean} TBD.
 */
export function canPlayAudio(device: Device, type: string): boolean;
/**
 * TBD.
 * @param {Device} device - TBD.
 */
export function checkOS(device: Device): void;
/**
 * TBD.
 * @param {Device} device - TBD.
 */
export function checkInput(device: Device): void;
/**
 * TBD.
 * @param {Device} device - TBD.
 */
export function checkFullScreenSupport(device: Device): void;
/**
 * TBD.
 * @param {Device} device - TBD.
 */
export function checkBrowser(device: Device): void;
/**
 * TBD.
 * @param {Device} device - TBD.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/MIME_types/Common_types
 * @see https://developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements
 * @see https://bit.ly/iphoneoscodecs
 */
export function checkAudio(device: Device): void;
/**
 * TBD.
 * @param {Device} device - TBD.
 */
export function checkImage(device: Device): void;
/**
 * TBD.
 * @param {Device} device - TBD.
 */
export function initialize(device: Device): void;
/**
 * TBD.
 * @returns {Device} TBD.
 */
export function createDevice(): Device;
export function canPlayType(audioElement: HTMLAudioElement, type: string): boolean;
export function isMediaSourceTypeSupported(type: string): boolean;
import { Device } from './device.js';
//# sourceMappingURL=device_util.d.ts.map