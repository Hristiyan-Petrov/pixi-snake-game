import { Sprite, useTick } from '@pixi/react';
import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Texture } from 'pixi.js';

// This component represents a single, self-animating particle.
const Particle = ({ initialX, initialY, velocityX, velocityY, onComplete }) => {
    const [x, setX] = useState(initialX);
    const [y, setY] = useState(initialY);
    const [scale, setScale] = useState(0.5);
    const [alpha, setAlpha] = useState(1);

    const life = useRef(0.5); // Particle lives for 0.5 seconds

    useTick(delta => {
        const elapsed = delta * 0.0166; // Time elapsed in seconds

        // Update particle physics
        setX(prevX => prevX + velocityX * elapsed);
        setY(prevY => prevY + velocityY * elapsed);

        // Update particle visual properties
        life.current -= elapsed;
        setScale(life.current / 0.5); // Scale down as it dies
        setAlpha(life.current / 0.5); // Fade out as it dies

        // If life is over, tell the parent to remove it
        if (life.current <= 0) {
            onComplete();
        }
    });

    return (
        <Sprite
            texture={Texture.WHITE}
            tint={0xFF0000} // Start with a red tint
            x={x}
            y={y}
            anchor={0.5}
            scale={scale}
            alpha={alpha}
        />
    );
};

Particle.propTypes = {
    initialX: PropTypes.number.isRequired,
    initialY: PropTypes.number.isRequired,
    velocityX: PropTypes.number.isRequired,
    velocityY: PropTypes.number.isRequired,
    onComplete: PropTypes.func.isRequired,
};

export default Particle;