import { useMemo, useRef, useState } from 'react'
import { BOARD_HEIGHT, BOARD_WIDTH, INITIAL_SNAKE_SPEED, SPEED_INCREMENT, GAME_STATES, PARTICLES_COUNT_ON_FOOD_EAT, GRID_SIZE, DIRECTIONS } from '../config';
import Food from '../components/Food';
import Snake from '../components/Snake';
import PropTypes from 'prop-types';
import Particle from './Effects/Particle';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { useGameLoop } from '../hooks/useGameLoop';

const getRandomSafePosition = (snake) => {
    let position;
    let isOnSnake = true;

    while (isOnSnake) {
        position = {
            x: Math.floor(Math.random() * BOARD_WIDTH),
            y: Math.floor(Math.random() * BOARD_HEIGHT),
        };
        isOnSnake = snake.some(segment => segment.x === position.x && segment.y === position.y);
    }
    return position
};

function Game({
    gameState,
    onDeath,
    onGameStart,
    onEatFood,
    isMuted,
    onPause
}) {
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [foodPosition, setFoodPosition] = useState(getRandomSafePosition(snake));
    const [direction, setDirection] = useState(DIRECTIONS.RIGHT);
    const [speed, setSpeed] = useState(INITIAL_SNAKE_SPEED - 100);
    const [effects, setEffects] = useState([]);

    const soundEat = useMemo(() => new Audio('/sounds/eat.mp3'));
    const soundCrash = useMemo(() => new Audio('/sounds/crash.mp3'));

    const timeSinceLastMove = useRef(0);
    const canChangeDirection = useRef(true);

    const createBurst = (x, y) => {
        const newParticles = [];
        const numParticles = PARTICLES_COUNT_ON_FOOD_EAT;

        for (let i = 0; i < numParticles; i++) {
            console.log(i);

            const angle = Math.random() * 2 * Math.PI;
            const speed = 50 + Math.random() * 50 // Random speed
            newParticles.push({
                id: Date.now() + i,
                x: x,
                y: y,
                velocityX: Math.cos(angle) * speed,
                velocityY: Math.sin(angle) * speed,
            });
        }
        setEffects(currEffects => [...currEffects, ...newParticles]);
    };

    useGameLoop(
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
    );
    useKeyboardControls(gameState, direction, setDirection, onGameStart, canChangeDirection, onPause);

    const handleEffectComplete = id => {
        setEffects(currEffects => currEffects.filter(effect => effect.id !== id));
    }

    return (
        <>
            <Snake
                segments={snake}
                direction={direction}
                gameState={gameState}
            />
            <Food
                x={foodPosition.x}
                y={foodPosition.y}
            />

            {effects.map(particle => (

                <Particle
                    key={particle.id}
                    initialX={particle.x}
                    initialY={particle.y}
                    velocityX={particle.velocityX}
                    velocityY={particle.velocityY}
                    onComplete={() => handleEffectComplete(particle.id)}
                />
            ))}
        </>
    );
};

Game.propTypes = {
    gameState: PropTypes.string.isRequired,
    onEatFood: PropTypes.func.isRequired,
    onDeath: PropTypes.func.isRequired,
    onGameStart: PropTypes.func.isRequired,
    onGameOver: PropTypes.func.isRequired,
    isMuted: PropTypes.bool.isRequired,
    onPause: PropTypes.func.isRequired,
};

export default Game;
