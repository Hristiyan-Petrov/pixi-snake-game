import './App.css'
import { Stage, } from '@pixi/react'
import { GAME_COLOR, GAME_HEIGHT, GAME_WIDTH } from './config';
import Game from './components/Game';
import { useState } from 'react';
import GameUI from './components/UI/GameUI';

function App() {
    const [score, setScore] = useState(0);
    const [gameState, setGameState] = useState('PLAYING');

    // Add a key to the Game component to force a full remount on restart
    const [gameKey, setGameKey] = useState(Date.now());

    const handleEatFood = () => {
        setScore(prevScore => prevScore + 1);
    };

    const handleGameOver = () => {
        setGameState('GAME_OVER');
    };

    const handleRestart = () => {
        setScore(0);
        setGameState('PLAYING');
        setGameKey(Date.now());
    };

    return (
        <>
            <Stage
                width={GAME_WIDTH}
                height={GAME_HEIGHT}
                options={{ backgroundColor: GAME_COLOR }}
            >
                <Game
                    onGameOver={handleGameOver}
                    onEatFood={handleEatFood}
                    gameState={gameState}
                    key={gameKey}
                />
            </Stage>
            <GameUI
                gameState={gameState}
                score={score}
                onRestart={handleRestart}
            />
        </>
    )
}

export default App;
