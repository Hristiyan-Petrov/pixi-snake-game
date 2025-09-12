import { Sprite, useTick } from '@pixi/react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { GAME_STATES, GRID_SIZE } from '../config';

const getDirectionRotation = direction => {
    if (!direction) return 0;
    if (direction.x === 1) return 0; // Right
    if (direction.x === -1) return Math.PI; // Left
    if (direction.y === 1) return Math.PI / 2; // Down
    if (direction.y === -1) return -Math.PI / 2; // Up
    return 0;
};

const VisualSegment = ({ targetX, targetY, image, rotation, alpha }) => {
    const [x, setX] = useState(targetX);
    const [y, setY] = useState(targetY);
    const [rot, setRot] = useState(rotation);

    useTick(delta => {
        const smoothing = 0.2;
        setX(prevX => prevX + (targetX - prevX) * smoothing * delta);
        setY(prevY => prevY + (targetY - prevY) * smoothing * delta);

        let rotDiff = rotation - rot;
        while (rotDiff < -Math.PI) rotDiff += 2 * Math.PI;
        while (rotDiff > Math.PI) rotDiff -= 2 * Math.PI;
        setRot(prevRot => prevRot + rotDiff * smoothing * delta);
    });

    return (
        <Sprite
            image={image}
            x={x}
            y={y}
            width={GRID_SIZE}
            height={GRID_SIZE}
            anchor={0.5}
            rotation={rot}
            alpha={alpha}
        />
    );
};

VisualSegment.propTypes = {
    targetX: PropTypes.number.isRequired,
    targetY: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    rotation: PropTypes.number.isRequired,
    alpha: PropTypes.number.isRequired,
};

function Snake({ segments, direction, gameState }) {
    const [alpha, setAlpha] = useState(1);

    // Effect for the death animation flash
    useTick((delta, ticker) => {
        if (gameState === GAME_STATES.DYING) {
            const elapsed = ticker.elapsedMS / 1000;
            setAlpha(Math.sin(elapsed * 20) * 0.5 + 0.5);
        }
    });

    // Effect to reset the alpha when the game restarts
    useEffect(() => {
        if (gameState !== GAME_STATES.DYING) {
            setAlpha(1);
        }
    }, [gameState]);

    const headRotation = getDirectionRotation(direction);

    return (
        <>
            {segments.map((logicalSegment, index) => {
                const isHead = index === 0;
                return (
                    <VisualSegment
                        key={index}
                        targetX={(logicalSegment.x * GRID_SIZE) + GRID_SIZE / 2}
                        targetY={(logicalSegment.y * GRID_SIZE) + GRID_SIZE / 2}
                        image={isHead ? '/assets/snake-head.svg' : '/assets/snake-segment.svg'}
                        rotation={isHead ? headRotation : 0}
                        alpha={alpha}
                    />
                );
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
        x: PropTypes.number,
        y: PropTypes.number,
    }).isRequired,
    gameState: PropTypes.string.isRequired,
};

export default Snake;