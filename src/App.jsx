import './App.css'
import { Stage, } from '@pixi/react'
import { GAME_COLOR, GAME_HEIGHT, GAME_WIDTH } from './config';
import Game from './components/Game';

function App() {
    return (
        <Stage
            width={GAME_WIDTH}
            height={GAME_HEIGHT}
            options={{ backgroundColor: GAME_COLOR }}
        >
            <Game />
        </Stage>
    )
}

export default App;
