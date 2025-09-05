import * as PIXI from 'pixi.js';
import { COLORS, GRID_HEIGHT, GRID_SIZE, GRID_WIDTH } from './constants';

export class Game {
    constructor() {
        this.app = new PIXI.Application();
        this.init();
    }

    async init() {
        // Calculate the screen dimensions based on our grid
        const screenWidth = GRID_WIDTH * GRID_SIZE;
        const screenHeigth = GRID_HEIGHT * GRID_SIZE;

        // Create the PixiJS Application
        await this.app.init({
            width: screenWidth,
            height: screenHeigth,
            backgroundColor: COLORS.BACKGROUND,
            canvas: document.getElementById('game-canvas'), // Link to our canvas
            resolution: window.devicePixelRatio || 1, // Handle high-DPI screens
            autoDensity: true
        });

        console.log("PixiJS Application Initialized!");
    }
}