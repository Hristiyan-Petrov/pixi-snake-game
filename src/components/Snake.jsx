import { useCallback } from "react";
import { GRID_SIZE, SNAKE_COLOR } from "../config";
import { Graphics } from "@pixi/react";
import PropTypes from 'prop-types';

function Snake({ segments }) {
    const draw = useCallback(g => {
        g.clear();
        g.beginFill(SNAKE_COLOR);
        g.drawRect(0, 0, GRID_SIZE, GRID_SIZE);  // Draws a square for the food
        g.endFill();
    }, []);

    return (
        <>
            {segments.map((segment, index) => (
                <Graphics
                    key={index}
                    draw={draw}
                    x={segment.x * GRID_SIZE}
                    y={segment.y * GRID_SIZE}
                />
            ))}
        </>
    );
};

Snake.propTypes = {
    segments: PropTypes.arrayOf(
        PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default Snake;