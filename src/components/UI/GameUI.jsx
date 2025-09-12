import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import PropTypes from 'prop-types'
import './GameUI.css';
import { GAME_STATES } from '../../config';

const SoundOnIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
    </svg>
);

const SoundOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
    </svg>
);

const GameUI = ({
    score,
    gameState,
    onRestart,
    highScore,
    isNewHighScore,
    isMuted,
    onMuteToggle,
}) => {
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
                <div className="score" style={{ opacity: 0.7, fontSize: '1rem', paddingLeft: '2px' }}>
                    High Score: {highScore}
                </div>
                <div ref={scoreRef} className="score">
                    Score: {score}
                </div>
            </div>

            {/* Mute Button */}
            <button className="mute-button" onClick={onMuteToggle}>
                {isMuted ? <SoundOffIcon /> : <SoundOnIcon />}
            </button>

            {/* Ready State Overlay */}
            {gameState === GAME_STATES.READY && (
                <div className="overlay">
                    <div className="overlay-panel">
                        <div className="overlay-title" style={{ fontSize: '1.5rem' }}>Press Any Key To Start</div>
                    </div>
                </div>
            )}

            {gameState === GAME_STATES.PAUSED && (
                <div className="overlay">
                    <div className="overlay-panel">
                        <div className="overlay-title" style={{ fontSize: '1.5rem' }}>PAUSED</div>
                    </div>
                </div>
            )}

            {/* Game Over State Overlay */}
            {gameState === GAME_STATES.GAME_OVER && (
                <div className="overlay">
                    <div className="overlay-panel">
                        <div className="overlay-title">Game Over</div>
                        <div className="overlay-text">Your Score: {score}</div>
                        {isNewHighScore && (
                            <div className="overlay-text" style={{ opacity: 0.8, lineHeight: '2rem' }}>
                                Congratulations! You set a new High Score: {highScore}
                            </div>
                        )}
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
    highScore: PropTypes.number.isRequired,
    gameState: PropTypes.string.isRequired,
    onRestart: PropTypes.func.isRequired,
};

export default GameUI;