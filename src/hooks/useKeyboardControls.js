import { useEffect } from "react";
import { DIRECTIONS, GAME_STATES } from "../config";

export const useKeyboardControls = (
    gameState,
    direction,
    setDirection,
    onGameStart,
    canChangeDirection
) => {
    useEffect(() => {
        const handleKeyDown = e => {
            if (gameState === GAME_STATES.READY) {
                onGameStart();
                return;
            }

            if (gameState !== GAME_STATES.PLAYING || !canChangeDirection.current) return;

            const currentDirectionVector = Object
                .values(DIRECTIONS)
                .find(dir => dir.x === direction.x && dir.y === direction.y);

            let newDirection = null;

            switch (e.key) {
                case 'ArrowUp':
                    if (currentDirectionVector !== DIRECTIONS.DOWN) {
                        setDirection(DIRECTIONS.UP);
                        newDirection = DIRECTIONS.UP;
                    }
                    break;
                case 'ArrowDown':
                    if (currentDirectionVector !== DIRECTIONS.UP) {
                        setDirection(DIRECTIONS.DOWN);
                        newDirection = DIRECTIONS.DOWN;
                    }
                    break;
                case 'ArrowLeft':
                    if (currentDirectionVector !== DIRECTIONS.RIGHT) {
                        setDirection(DIRECTIONS.LEFT);
                        newDirection = DIRECTIONS.LEFT;
                    }
                    break;
                case 'ArrowRight':
                    if (currentDirectionVector !== DIRECTIONS.LEFT) {
                        setDirection(DIRECTIONS.RIGHT);
                        newDirection = DIRECTIONS.RIGHT;
                    }
                    break;

                default:
                    break;
            }

            if (newDirection) {
                canChangeDirection.current = false;
                setDirection(newDirection);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [direction, gameState, onGameStart]); // Re-run effect if direction changes to get the latest value

};