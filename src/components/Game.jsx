import { useEffect, useMemo, useRef, useState } from 'react'
import { useTick } from '@pixi/react'
import { BOARD_HEIGHT, BOARD_WIDTH, INITIAL_SNAKE_SPEED, SPEED_INCREMENT, GAME_STATES } from '../config';
import Food from '../components/Food';
import Snake from '../components/Snake';
import PropTypes from 'prop-types';

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

function Game({
    key,
    onGameOver,
    onEatFood,
    gameState,
    onGameStart
}) {
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [foodPosition, setFoodPosition] = useState(getRandomPosition());
    const [direction, setDirection] = useState(DIRECTIONS.RIGHT);
    const [speed, setSpeed] = useState(INITIAL_SNAKE_SPEED - 100);

    const soundEat = useMemo(() => new Audio('/sounds/eat.mp3'));
    const soundCrash = useMemo(() => new Audio('/sounds/crash.mp3'));

    const timeSinceLastMove = useRef(0);

    // Game loop
    useTick(delta => { // delta represents the time passed since the last frame
        if (gameState !== GAME_STATES.PLAYING) return;

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

            // 4.1. Calculate the new head position based on the current direction
            setSnake(prevSnake => {
                let newHead = {
                    x: prevSnake[0].x + direction.x,
                    y: prevSnake[0].y + direction.y
                };

                // 4.2. Wraparound Logic
                if (newHead.x >= BOARD_WIDTH) newHead.x = 0;
                if (newHead.x < 0) newHead.x = BOARD_WIDTH - 1;
                if (newHead.y >= BOARD_HEIGHT) newHead.y = 0;
                if (newHead.y < 0) newHead.y = BOARD_HEIGHT - 1;

                // 4.3. Self-collision check
                const hitBody = prevSnake
                    .slice(1)
                    .some(segment => segment.x === newHead.x && segment.y === newHead.y);

                if (hitBody) {
                    soundCrash.play();
                    onGameOver();
                    return prevSnake; // Stop moving
                }

                // 4.4. Check for Food Collision
                const hasEatenFood = newHead.x === foodPosition.x && newHead.y === foodPosition.y;
                if (hasEatenFood) {
                    soundEat.play();
                    setFoodPosition(getRandomPosition());
                    setSpeed(prevSpeed => prevSpeed - SPEED_INCREMENT);
                    onEatFood();
                    // Grow the snake by adding the new head without remving the tail
                    return [newHead, ...prevSnake];
                }

                // 4.5 Default Movement (no growth)
                // render the new head (which is segment) and remove the tail (unmount last segment)
                const newSnake = [newHead, ...prevSnake.slice(0, -1)];
                return newSnake;
            });
        }
    });

    // Keyboard Input Handler
    useEffect(() => {
        const handleKeyDown = e => {
            if (gameState === GAME_STATES.READY) {
                onGameStart();
                return;
            }

            if (gameState !== GAME_STATES.PLAYING) return;

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
    }, [direction, gameState, onGameStart]); // Re-run effect if direction changes to get the latest value

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
    );
};

Game.propTypes = {
  gameState: PropTypes.string.isRequired,
  onEatFood: PropTypes.func.isRequired,
  onGameOver: PropTypes.func.isRequired,
};

export default Game;
