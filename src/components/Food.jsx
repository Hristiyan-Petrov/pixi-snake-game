import { useCallback } from "react";
import { FOOD_COLOR, GRID_SIZE } from "../config";
import { Graphics, Sprite } from "@pixi/react";
import PropTypes from 'prop-types';

function Food({ x, y }) {
    // useCallback is used for performance optimization. It ensures the draw function
    // is not recreated on every render, as its logic is static.
    const draw = useCallback(g => {
        g.clear();
        g.beginFill(FOOD_COLOR);
        g.drawRect(0, 0, GRID_SIZE, GRID_SIZE);  // Draws a square for the food
        g.endFill();
    }, []);

    return (
        <Sprite
            image='/assets/food.svg'
            width={GRID_SIZE}
            height={GRID_SIZE}
            x={x * GRID_SIZE}
            y={y * GRID_SIZE}
        />
        // <Graphics
        //     draw={draw}
        //     x={x * GRID_SIZE}
        //     y={y * GRID_SIZE}
        // />
    );
};

// Using PropTypes for type-checking is a good practice in professional React projects.
Food.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
};

export default Food;