import { useState } from 'react'
import './App.css'
import { Stage } from '@pixi/react'

function App() {
  const gameWidth = 800;
  const gameHeight = 600;

  return (
    <Stage
      width={gameWidth}
      height={gameHeight}
      options={{ backgroundColor: 0x1d1d1d }}
    >
      {/* Our game components will go here later */}
    </Stage>
  )
}

export default App;
