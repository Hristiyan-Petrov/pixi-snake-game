import './App.css'
import { Stage, } from '@pixi/react'
import { GAME_COLOR, GAME_HEIGHT, GAME_WIDTH, GAME_STATES } from './config';
import Game from './components/Game';
import { use, useEffect, useState } from 'react';
import GameUI from './components/UI/GameUI';

function App() {
    const [score, setScore] = useState(0);
    const [highScore, setHightScore] = useState(0);
    const [isNewHighScore, setIsNewHighScore] = useState(false);
    const [gameState, setGameState] = useState(GAME_STATES.READY);
    const [gameKey, setGameKey] = useState(Date.now()); // Add a key to the Game component to force a full remount on restart

    useEffect(() => {
        const storedHighScore = localStorage.getItem('HIGH_SCORE_KEY');
        if (storedHighScore) {
            setHightScore(parseInt(storedHighScore, 10));
        }
    }, []);

    const handleEatFood = () => {
        setScore(prevScore => prevScore + 1);
    };

    const handleGameOver = () => {
        setGameState(GAME_STATES.GAME_OVER);
        if (score > highScore) {
            setHightScore(score);
            localStorage.setItem('HIGH_SCORE_KEY', score.toString());
            setIsNewHighScore(true);
        }
    };

    const handleGameStart = () => {
        setGameState(GAME_STATES.PLAYING);
    };
    
    const handleRestart = () => {
        setScore(0);
        setGameState(GAME_STATES.READY);
        setGameKey(Date.now());
        setIsNewHighScore(false);
    };

    return (
        <>
            <Stage
                width={GAME_WIDTH}
                height={GAME_HEIGHT}
                options={{ backgroundColor: GAME_COLOR }}
            >
                <Game
                    key={gameKey}
                    gameState={gameState}
                    onEatFood={handleEatFood}
                    onGameStart={handleGameStart}
                    onGameOver={handleGameOver}
                />
            </Stage>
            <GameUI
                gameState={gameState}
                score={score}
                highScore={highScore}
                isNewHighScore={isNewHighScore}
                onRestart={handleRestart}
            />
        </>
    )
}

export default App;
