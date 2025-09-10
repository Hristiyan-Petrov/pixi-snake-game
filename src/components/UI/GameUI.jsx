import { useRef } from "react";

function GameUI({
    gameState,
    score,
    onRestart
}) {
    const scoreRef = useRef(0);

    return (
        <div className="game-ui">
            <div ref={scoreRef} className="score">
                SCORE: {score}
            </div>

            {gameState === 'GAME_OVER' && (
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