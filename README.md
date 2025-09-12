# React + PixiJS Snake Game

A classic Snake game built with a modern, declarative approach using React and the high-performance PixiJS rendering engine. This project was developed as a learning journey to explore advanced 2D rendering, state management, and professional animation techniques within the PixiJS and React ecosystem.

---

### **Live Demo**

**[➡️ PLAY THE GAME HERE ⬅️](https://68c4014332ee57733126d421--zippy-fox-55a8fe.netlify.app/)**

## Project Goal

The primary aim of this project was to gain a deep, practical understanding of how to build a fully-featured game with PixiJS in a modern web environment. The focus was not just on the final product, but on the process:
*   **Declarative Rendering:** Understanding how to use a custom renderer like `@pixi/react` to control a high-performance graphics engine with React's component-based, declarative paradigm.
*   **Professional Architecture:** Implementing robust software patterns like state machines, lifting state up, and separating concerns to create a maintainable and scalable codebase.
*   **Animation & "Game Feel":** Exploring various animation techniques, from state-driven logic to imperative "fire-and-forget" effects, to create a "juicy" and satisfying player experience inspired by professional games.

## Key Concepts & Architecture

This project is built on several key architectural patterns and modern web development techniques:

#### 1. **Declarative Rendering with `@pixi/react`**
Instead of manually creating, updating, and destroying PixiJS objects (the imperative approach), this project uses a declarative model. We describe the game scene using React components (`<Snake />`, `<Food />`, `<Particle />`). When our game state changes, React efficiently determines the minimal set of changes, and `@pixi/react` translates those changes into optimized PixiJS rendering commands.

#### 2. **Component-Based Architecture**
Every entity in the game is a self-contained React component. The `Snake` component knows how to render itself based on its segments, and the `Particle` component knows how to animate and destroy itself. This makes the code highly organized, reusable, and easy to debug.

#### 3. **Centralized State Management (`Lifting State Up`)**
The main `App.jsx` component acts as the "conductor." It holds all the critical top-level state, such as the `gameState` (e.g., `READY`, `PLAYING`, `GAME_OVER`), the `score`, and audio settings. This state is passed down to child components as props, and child components communicate events back up via callback functions (`onDeath`, `onEatFood`).

#### 4. **Hybrid Rendering: Canvas for the Game, DOM for the UI**
This is a core professional technique.
*   **PixiJS (Canvas):** Used for what it excels at—rendering thousands of fast-moving objects with high-performance, GPU-accelerated graphics.
*   **React (DOM):** Used for what it's best at—creating a rich, accessible, and easily stylable user interface (the score, menus, and buttons). The two are layered using CSS `position` properties.

#### 5. **Custom Hooks for Code Reusability**
As the game logic grew, complex and reusable logic was extracted from the `Game` component into custom hooks:
*   `useGameLoop`: Encapsulates the core `useTick` logic, managing the game's clock, state updates, and collision detection.
*   `useKeyboardControls`: Isolates all keyboard event listeners, cleanly separating the input source from the game logic.

#### 6. **Animation Techniques**
*   **State-Driven Animation:** The snake's movement is declarative. We update an array in our state, and the visuals follow.
*   **"Fire-and-Forget" Animation:** The custom particle system uses a state-driven approach where each `<Particle />` component manages its own lifecycle with `useTick`, animating its position and alpha before calling a callback to remove itself from the state.
*   **JavaScript-Driven Animation:** The final, robust solution for the snake's tongue uses JavaScript logic (`useTick` and state) to control a `<Graphics />` object, providing frame-perfect control without relying on external assets.

## Technology Stack

*   **Build Tool:** Vite
*   **UI Framework:** React 18
*   **Rendering Engine:** PixiJS v7
*   **PixiJS Integration:** @pixi/react
*   **UI Animation:** GSAP
*   **Code Quality:** ESLint, PropTypes

## How to Run Locally

1.  Clone this repository to your local machine.
2.  Install the required dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open your browser and navigate to `http://localhost:5173` (or the address shown in your terminal).