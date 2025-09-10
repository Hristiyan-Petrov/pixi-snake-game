import { useState } from 'react'
import './App.css'
import { Stage } from '@pixi/react'
import { BOARD_HEIGHT, BOARD_WIDTH, GAME_COLOR, GAME_HEIGHT, GAME_WIDTH } from './config';
import Food from './components/Food';

const getRandomPosition = () => ({
    x: Math.floor(Math.random() * BOARD_WIDTH),
    y: Math.floor(Math.random() * BOARD_HEIGHT),
});

function App() {
    const [foodPosition, setFoodPosition] = useState(getRandomPosition());

    return (
        <Stage
            width={GAME_WIDTH}
            height={GAME_HEIGHT}
            options={{ backgroundColor: GAME_COLOR }}
        >
            <Food
                x={foodPosition.x}
                y={foodPosition.y}
            // x={getRandomPosition().x}
            // y={getRandomPosition().y}
            />
        </Stage>
    )
}

export default App;
