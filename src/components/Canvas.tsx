import { useEffect, useRef } from "react";
import { socket } from "../App";
import { useObjects } from "../hooks/useObjects";

import { Square } from "../objects/Square";
import { rectIntersect } from "../utils/rectIntersect";
import { relativePoint } from "../utils/relativePoint";

import canvasClasses from "./Canvas.module.css";
import { useGame } from "./useGame";
import { Engine, init } from "../engine/init";
import { EngineState } from "../engine/engineState";

const DEFAULT_CANVAS_WIDTH = 1280;
const DEFAULT_CANVAS_HEIGHT = 720;

export const Canvas = () => {
	const canvasRef = useRef(null)
	const engineState = useRef<Engine>() 
	
	useEffect(() => {
		if(canvasRef.current) {
			const engine = init(canvasRef.current)

			if(engine) {
				engineState.current = engine
			}

		}
	}, [canvasRef])

	const handleClick = (event: React.MouseEvent) => {

		engineState.current?.onClickCanvas(event.clientX, event.clientY)
	}

	return (
		<button onClick={handleClick}  style={{ all: "initial", cursor: "pointer" }}>
		<canvas
			ref={canvasRef}
			className={canvasClasses.canvas}
			width={DEFAULT_CANVAS_WIDTH}
			height={DEFAULT_CANVAS_HEIGHT}
		/>
		</button>
	);
};


