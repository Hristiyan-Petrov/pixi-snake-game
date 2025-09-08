import * as PIXI from 'pixi.js';
import { GRID_SIZE, COLORS} from "./constants";

export class Snake {
    constructor(stage) {
        // The "stage" is the root container of the entire PixiJS scene.
        this.stage = stage;

        // 1. The State: An array of grid coordinates
        // The head is at index 0
        this.body = [
            { x: 10, y: 15 },
            { x: 9, y: 15 },
            { x: 8, y: 15 },
        ];
        this.direction = 'rigth';

        // 2. The View: A container for the graphic objects
        this.container = new PIXI.Container();
        this.stage.addChild(this.container);

        // This will hold the PIXI.Graphics objects
        this.graphics = [];

        // Draw the initial snake
        this.render();
    };

    render() {
        // CLear any previous graphics
        this.container.removeChildren();
        this.graphics = [];

        // Draw each segment of the snake
        this.body.forEach(segment => {
            const segmentGraphic = new PIXI.Graphics();
            segmentGraphic.rect(0, 0, GRID_SIZE, GRID_SIZE); // Draw a square
            segmentGraphic.fill(COLORS.SNAKE);

            // Position the square on the grid
            segmentGraphic.x = segment.x * GRID_SIZE;
            segmentGraphic.y = segment.y * GRID_SIZE;

            this.graphics.push(segmentGraphic);
            this.container.addChild(segmentGraphic);
        });
    };
};