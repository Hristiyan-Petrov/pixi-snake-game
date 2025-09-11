import gsap from "gsap";
import { useEffect, useRef } from "react";
import { GAME_STATES } from '../../config';

function GameUI({
    gameState,
    score,
    onRestart
}) {
    const scoreRef = useRef(0);

    useEffect(() => {
        if (scoreRef.current) {
            gsap.fromTo(
                scoreRef.current,
                { scale: 1.5 },
                { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.3)' }
            );
        }
    }, [score]);

    return (
        <div className="game-ui">
            <div ref={scoreRef} className="score">
                SCORE: {score}
            </div>

            {gameState === GAME_STATES.READY && (
                <div className="game-over-overlay"> {/* <-- FIX: Was "gameover-overlay" */}
                    <div className="game-over-text" style={{ fontSize: '2.5rem' }}>
                        PRESS ANY KEY TO START
                    </div>
                </div>
            )}

            {gameState === GAME_STATES.GAME_OVER && (
                <div className="game-over-overlay">
                    <div className="game-over-text">GAME OVER</div>
                    <button className="restart-button" onClick={onRestart}>
                        RESTART
                    </button>
                </div>
            )}
        </div>
    );
};

export default GameUI;