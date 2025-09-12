import { useTick } from "@pixi/react";
import { BOARD_HEIGHT, BOARD_WIDTH, GAME_STATES, GRID_SIZE, SPEED_INCREMENT } from "../config";

export const useGameLoop = (
    gameState,
    direction,
    speed,
    setSpeed,
    foodPosition,
    setFoodPosition,
    setSnake,
    isMuted,
    soundCrash,
    soundEat,
    onDeath,
    onEatFood,
    createBurst,
    getRandomSafePosition,
    timeSinceLastMove,
    canChangeDirection
) => {


    // Game loop
    useTick(delta => { // delta represents the time passed since the last frame
        if (gameState !== GAME_STATES.PLAYING) return;

        // Step 1: Accumulate time
        // 'delta' is a factor based on the ideal 60fps.
        // We convert it to milliseconds to get the real time elapsed since the last frame.
        timeSinceLastMove.current += delta * (1000 / 60) // Assuming 60FPS

        // Step 2: Check if enough time has passed
        // This is the gatekeeper. The code inside only runs if our stopwatch
        // has reached the value defined by our 'speed' variable.
        if (timeSinceLastMove.current >= speed) {

            // Step 3: Reset the stopwatch
            // We've met the condition, so we reset our timer back to 0
            // to start counting for the next move.
            timeSinceLastMove.current = 0;

            // Allow a new direction change now
            canChangeDirection.current = true;

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
                    if (!isMuted) soundCrash.play();
                    onDeath();
                    return prevSnake; // Stop moving
                }

                // 4.4. Check for Food Collision
                const hasEatenFood = newHead.x === foodPosition.x && newHead.y === foodPosition.y;
                if (hasEatenFood) {
                    if (!isMuted) soundEat.play();

                    // Create the particle burst at the food's location
                    createBurst(
                        (foodPosition.x * GRID_SIZE),
                        (foodPosition.y * GRID_SIZE),
                    )

                    const newSnake = [newHead, ...prevSnake];
                    setFoodPosition(getRandomSafePosition(newSnake));
                    setSpeed(prevSpeed => prevSpeed - SPEED_INCREMENT);
                    onEatFood();
                    // Grow the snake by adding the new head without remving the tail
                    return newSnake;
                }

                // 4.5 Default Movement (no growth)
                // render the new head (which is segment) and remove the tail (unmount last segment)
                const newSnake = [newHead, ...prevSnake.slice(0, -1)];
                return newSnake;
            });
        }
    });






};