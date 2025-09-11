import { useCallback, useEffect, useState } from "react";
import { GAME_STATES, GRID_SIZE, SNAKE_COLOR } from "../config";
import { Graphics, Sprite, useTick } from "@pixi/react";
import PropTypes from 'prop-types';

const getDirectionRotation = direction => {
    if (!direction) return 0;
    if (direction.x === 1) return 0; // Right
    if (direction.x === -1) return Math.PI; // Left
    if (direction.y === 1) return Math.PI / 2; // Down
    if (direction.y === -1) return -Math.PI / 2; // Up
};

function Snake({ segments, direction, gameState }) {
    const [alpha, setAlpha] = useState(1);

    useTick((delta, ticker) => {
        if (gameState === GAME_STATES.DYING) {
            const elapsed = ticker.elapsedMS / 1000;
            setAlpha(Math.sin(elapsed * 20) * 0.5 + 0.5);
        }
    });

    useEffect(() => {
        if (gameState!== GAME_STATES.DYING) {
            setAlpha(1);
        }
    }, [gameState]);

    const headRotation = getDirectionRotation(direction);


    const draw = useCallback(g => {
        g.clear();
        g.beginFill(SNAKE_COLOR);
        g.drawRect(0, 0, GRID_SIZE, GRID_SIZE);  // Draws a square for the food
        g.endFill();
    }, []);

    return (
        <>
            {segments.map((segment, index) => {
                const isHead = index === 0;
                return (
                    <Sprite
                        key={index}
                        image={isHead ? '/assets/snake-head.svg' : '/assets/snake-segment.svg'}
                        x={(segment.x * GRID_SIZE) + GRID_SIZE / 2}
                        y={(segment.y * GRID_SIZE) + GRID_SIZE / 2}
                        width={GRID_SIZE}
                        height={GRID_SIZE}
                        anchor={0.5}
                        rotation={isHead ? headRotation : 0}
                        alpha={alpha}
                    />
                )
            })}
        </>
    );
};

Snake.propTypes = {
    segments: PropTypes.arrayOf(
        PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
        })
    ).isRequired,
    direction: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }),
    gameState: PropTypes.string.isRequired
};

export default Snake;