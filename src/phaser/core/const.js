/**
 * @author       Andras Csizmadia <andras@vpmedia.hu>
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    Copyright (c) 2018-present Richard Davey, Photon Storm Ltd., Andras Csizmadia <andras@vpmedia.hu> (www.vpmedia.hu)
 */
// rectangle
export const TOP_LEFT = 0;
export const TOP_CENTER = 1;
export const TOP_RIGHT = 2;
export const LEFT_TOP = 3;
export const LEFT_CENTER = 4;
export const LEFT_BOTTOM = 5;
export const CENTER = 6;
export const RIGHT_TOP = 7;
export const RIGHT_CENTER = 8;
export const RIGHT_BOTTOM = 9;
export const BOTTOM_LEFT = 10;
export const BOTTOM_CENTER = 11;
export const BOTTOM_RIGHT = 12;
// scale modes
export const SCALE_LINEAR = 0;
export const SCALE_NEAREST = 1;
// scale manager modes
export const SCALE_EXACT_FIT = 0;
export const SCALE_OFF = 1;
export const SCALE_SHOW_ALL = 2;
export const SCALE_RESIZE = 3;
export const SCALE_USER = 4;
// times
export const TIME_MINUTE = 60000;
export const TIME_SECOND = 1000;
export const TIME_HALF = 500;
export const TIME_QUARTER = 250;
// tween statuses
export const TWEEN_PENDING = 0;
export const TWEEN_RUNNING = 1;
export const TWEEN_LOOPED = 2;
export const TWEEN_COMPLETE = 3;
// blend modes
export const BLEND_NORMAL = 0;
export const BLEND_ADD = 1;
export const BLEND_MULTIPLY = 2;
export const BLEND_SCREEN = 3;
export const BLEND_OVERLAY = 4;
export const BLEND_DARKEN = 5;
export const BLEND_LIGHTEN = 6;
export const BLEND_COLOR_DODGE = 7;
export const BLEND_COLOR_BURN = 8;
export const BLEND_HARD_LIGHT = 9;
export const BLEND_SOFT_LIGHT = 10;
export const BLEND_DIFFERENCE = 11;
export const BLEND_EXCLUSION = 12;
export const BLEND_HUE = 13;
export const BLEND_SATURATION = 14;
export const BLEND_COLOR = 15;
export const BLEND_LUMINOSITY = 16;
// render modes
export const RENDER_AUTO = 0;
export const RENDER_CANVAS = 1;
export const RENDER_WEBGL = 2;
export const RENDER_HEADLESS = 3;
// pointer modes
export const POINTER_CURSOR = 1;
export const POINTER_CONTACT = 2;
// input modes
export const MOUSE_OVERRIDES_TOUCH = 0;
export const TOUCH_OVERRIDES_MOUSE = 1;
export const MOUSE_TOUCH_COMBINE = 2;
// game objects
export const GROUP = 7;
export const SPRITE = 0;
export const SPRITE_BATCH = 17;
export const BUTTON = 1;
export const IMAGE = 2;
export const GRAPHICS = 3;
export const TEXT = 4;
export const BITMAP_TEXT = 6;
export const TILE_SPRITE = 5;
export const RENDER_TEXTURE = 8;
export const FILTER_CANVAS = 14;
export const FILTER_WEBGL = 15;
export const POINTER = 19;
export const GEOM_POLYGON = 12;
export const GEOM_RECTANGLE = 22;
export const GEOM_CIRCLE = 21;
export const GEOM_ELLIPSE = 16;
export const GEOM_ROUNDED_RECTANGLE = 26;
export const GEOM_LINE = 23;
export const GEOM_MATRIX = 24;
export const GEOM_POINT = 25;
export const BITMAP_DATA = 13; // deprecated
export const TILEMAP = 9; // deprecated
export const TILEMAP_LAYER = 10; // deprecated
export const EMITTER = 11; // deprecated
export const RETROFONT = 18; // deprecated
export const ROPE = 20; // deprecated
export const CREATURE = 27; // deprecated
export const VIDEO = 28; // deprecated
export const PENDING_ATLAS = -1;
// sprite sheet atlas
export const TEXTURE_ATLAS_JSON_ARRAY = 0;
export const TEXTURE_ATLAS_JSON_HASH = 1;
export const TEXTURE_ATLAS_XML_STARLING = 2;
export const PHYSICS_LIME_CORONA_JSON = 3; // deprecated
export const PHYSICS_PHASER_JSON = 4; // deprecated
export const TEXTURE_ATLAS_JSON_PYXEL = 5;
