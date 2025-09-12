import './App.css'
import { Stage, } from '@pixi/react'
import { GAME_COLOR, GAME_HEIGHT, GAME_WIDTH, GAME_STATES, HIGH_SCORE_KEY } from './config';
import Game from './components/Game';
import { use, useEffect, useMemo, useState } from 'react';
import GameUI from './components/UI/GameUI';

function App() {
    const [score, setScore] = useState(0);
    const [highScore, setHightScore] = useState(0);
    const [isNewHighScore, setIsNewHighScore] = useState(false);
    const [gameState, setGameState] = useState(GAME_STATES.READY);
    const [gameKey, setGameKey] = useState(Date.now()); // Add a key to the Game component to force a full remount on restart
    const [isMuted, setIsMuted] = useState(false); // \u003c-- NEW: Mute state


    const gameMusic = useMemo(() => new Audio('/sounds/music.mp3'), []);
    gameMusic.loop = true;
    gameMusic.volume = 0.2;

    // Music
    useEffect(() => {
        gameMusic.muted = isMuted;
        if (gameState === GAME_STATES.PLAYING) {
            gameMusic.play()
        } else {
            gameMusic.pause();
            gameMusic.currentTime = 0;
        }
    }, [gameState, gameMusic, isMuted]);

    // High score
    useEffect(() => {
        const storedHighScore = localStorage.getItem(HIGH_SCORE_KEY);
        if (storedHighScore) {
            setHightScore(parseInt(storedHighScore, 10));
        }
    }, []);

    const handleMuteToggle = () => {
        setIsMuted(prevMuted => !prevMuted);
    };

    const handleEatFood = () => {
        setScore(prevScore => prevScore + 1);
    };

    const handleGameOver = () => {
        setGameState(GAME_STATES.GAME_OVER);
        if (score > highScore) {
            setHightScore(score);
            localStorage.setItem(HIGH_SCORE_KEY, score.toString());
            setIsNewHighScore(true);
        }
    };

    const handleDeath = () => {
        setGameState(GAME_STATES.DYING);
        setTimeout(() => {
            handleGameOver();
        }, 2500); // snake dying animation time
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
                    isMuted={isMuted}
                    onEatFood={handleEatFood}
                    onGameStart={handleGameStart}
                    onDeath={handleDeath}
                    onGameOver={handleGameOver}
                />
            </Stage>
            <GameUI
                gameState={gameState}
                score={score}
                highScore={highScore}
                isNewHighScore={isNewHighScore}
                onRestart={handleRestart}
                isMuted={isMuted}
                onMuteToggle={handleMuteToggle}
            />
        </>
    )
}

export default App;
