import { useEffect, useRef, useState } from 'react'
import { useTick } from '@pixi/react'
import { BOARD_HEIGHT, BOARD_WIDTH, INITIAL_SNAKE_SPEED } from '../config';
import Food from '../components/Food';
import Snake from '../components/Snake';

const getRandomPosition = () => ({
    x: Math.floor(Math.random() * BOARD_WIDTH),
    y: Math.floor(Math.random() * BOARD_HEIGHT),
});

const DIRECTIONS = {
    UP: { x: 0, y: -1 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 },
    RIGHT: { x: 1, y: 0 },
};

function Game() {
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [foodPosition, setFoodPosition] = useState(getRandomPosition());
    const [direction, setDirection] = useState(DIRECTIONS.RIGHT);
    const [speed, setSpeed] = useState(INITIAL_SNAKE_SPEED);

    const timeSinceLastMove = useRef(0);

    // Game loop
    useTick(delta => { // delta represents the time passed since the last frame
        // console.log(delta);

        // Step 1: Accumulate time
        // 'delta' is a factor based on the ideal 60fps.
        // We convert it to milliseconds to get the real time elapsed since the last frame.
        timeSinceLastMove.current += delta * (1000 / 120) // Assuming 120 FPS

        // Step 2: Check if enough time has passed
        // This is the gatekeeper. The code inside only runs if our stopwatch
        // has reached the value defined by our 'speed' variable.
        if (timeSinceLastMove.current >= speed) {

            // Step 3: Reset the stopwatch
            // We've met the condition, so we reset our timer back to 0
            // to start counting for the next move.
            timeSinceLastMove.current = 0;

            // Step 4: Execute the game logic - update snake position
            // This is where we actually update the snake's position.
            setSnake(prevSnake => {
                const newHead = {
                    x: prevSnake[0].x + direction.x,
                    y: prevSnake[0].y + direction.y
                };
                // Create new array for the snake's body
                const newSnake = [newHead, ...prevSnake.slice(0, -1)];
                return newSnake;
            });
        }
    });

    // Keyboard Input Handler
    useEffect(() => {
        const handleKeyDown = e => {
            console.log(e);

            const currentDirectionVector = Object
                .values(DIRECTIONS)
                .find(dir => dir.x === direction.x && dir.y === direction.y);

            switch (e.key) {
                case 'ArrowUp':
                    if (currentDirectionVector !== DIRECTIONS.DOWN)
                        setDirection(DIRECTIONS.UP);
                    break;
                case 'ArrowDown':
                    if (currentDirectionVector !== DIRECTIONS.UP)
                        setDirection(DIRECTIONS.DOWN);
                    break;
                case 'ArrowLeft':
                    if (currentDirectionVector !== DIRECTIONS.RIGHT)
                        setDirection(DIRECTIONS.LEFT);
                    break;
                case 'ArrowRight':
                    if (currentDirectionVector !== DIRECTIONS.LEFT)
                        setDirection(DIRECTIONS.RIGHT);
                    break;

                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [direction]); // Re-run effect if direction changes to get the latest value

    return (
        <>
            <Snake
                segments={snake}
            />
            <Food
                x={foodPosition.x}
                y={foodPosition.y}
            />
        </>
    )
}

export default Game;
