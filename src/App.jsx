import { useState } from 'react'
import './App.css'
import { Stage } from '@pixi/react'
import { BOARD_HEIGHT, BOARD_WIDTH, GAME_COLOR, GAME_HEIGHT, GAME_WIDTH } from './config';
import Food from './components/Food';
import Snake from './components/Snake';

const getRandomPosition = () => ({
    x: Math.floor(Math.random() * BOARD_WIDTH),
    y: Math.floor(Math.random() * BOARD_HEIGHT),
});

function App() {
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [foodPosition, setFoodPosition] = useState(getRandomPosition());

    return (
        <Stage
            width={GAME_WIDTH}
            height={GAME_HEIGHT}
            options={{ backgroundColor: GAME_COLOR }}
        >
            <Snake
                segments={snake}
            />
            <Food
                x={foodPosition.x}
                y={foodPosition.y}
            />
        </Stage>
    )
}

export default App;
