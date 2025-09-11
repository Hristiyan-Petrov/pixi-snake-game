import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import PropTypes from 'prop-types';
import './GameUI.css';
import { GAME_STATES } from '../../config';

const GameUI = ({ score, gameState, onRestart }) => {
    const scoreRef = useRef(null);

    // Animate the score whenever it changes
    useEffect(() => {
        if (scoreRef.current) {
            // Only animate if the score is increasing (not on reset)
            if (score > 0) {
                gsap.fromTo(
                    scoreRef.current,
                    { scale: 1.5, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.5, ease: 'elastic.out(1, 0.3)' }
                );
            }
        }
    }, [score]);

    return (
        <div className="game-ui">
            {/* Score is always visible */}
            <div className="score-container">
                <div ref={scoreRef} className="score">
                    Score: {score}
                </div>
            </div>

            {/* Ready State Overlay */}
            {gameState === GAME_STATES.READY && (
                <div className="overlay">
                    <div className="overlay-panel">
                        <div className="overlay-title" style={{ fontSize: '1.5rem' }}>Press Any Key To Start</div>
                    </div>
                </div>
            )}

            {/* Game Over State Overlay */}
            {gameState === GAME_STATES.GAME_OVER && (
                <div className="overlay">
                    <div className="overlay-panel">
                        <div className="overlay-title">Game Over</div>
                        <div className="overlay-text">Your Score: {score}</div>
                        <button className="restart-button" onClick={onRestart}>
                            Restart
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

GameUI.propTypes = {
    score: PropTypes.number.isRequired,
    gameState: PropTypes.string.isRequired,
    onRestart: PropTypes.func.isRequired,
};

export default GameUI;