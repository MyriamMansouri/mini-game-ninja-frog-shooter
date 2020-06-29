// In this file we have some data that the other source files will use.
// Most of this data is stored in constants.
// Constants are just variables that never change. By convention,
// We write constants with upper case letters.

// The GAME_WIDTH and GAME_HEIGHT constants denote the size
// of the game area in pixels and is used in engine-utilities.js.

// These constants represent the width and height of an enemy in pixels
// as well as the maximum number of enemies on screen at any given time.
const ENEMY_WIDTH = 72;
const ENEMY_HEIGHT = 60;
const MAX_ENEMIES = 3;

// These constants represent the player width and height.
const PLAYER_WIDTH = 64;
const PLAYER_HEIGHT = 64;

// These constants represent the bonus items width and height.
const BONUS_WIDTH = 64;
const BONUS_HEIGHT = 64;
const MAX_BONUS = 2;

const GAME_WIDTH =
  Math.floor(document.body.clientWidth / PLAYER_WIDTH) * PLAYER_WIDTH;
const GAME_HEIGHT = document.body.clientHeight;

const MAX_LIFES = 3
