export const GRID_SIZE = 20 // Each cell is 20x20 pixels
export const GAME_WIDTH  = 800;
export const GAME_HEIGHT = 600;

// Derived constants for the grid-based system
export const BOARD_WIDTH = GAME_WIDTH / GRID_SIZE;
export const BOARD_HEIGHT = GAME_HEIGHT / GRID_SIZE;

export const FOOD_COLOR = 0xff0000;
export const GAME_COLOR = 0x1d1d1d;
export const SNAKE_COLOR = 0x00ff00;

export const INITIAL_SNAKE_SPEED = 200; // ms per move
export const SPEED_INCREMENT = 5;