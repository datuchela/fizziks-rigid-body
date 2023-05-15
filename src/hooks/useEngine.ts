import { useEffect, useRef } from "react";
import { init, type Engine } from "../engine/init";
import { relativePoint } from "../utils/relativePoint";
import { EngineObject } from "../engine/engineState";

const drawFn = (objects: EngineObject[], ctx: CanvasRenderingContext2D) => {
  for (let i = 0; i < objects.length; ++i) {
    objects[i].draw(ctx);
  }
};

export const useEngine = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineState = useRef<Engine>();

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;

      const engine = init({
        canvasWidth: canvasRef.current.width,
        canvasHeight: canvasRef.current.height,
        drawFn: (objects) => drawFn(objects, ctx),
        clearFn: () => {
          if (canvasRef.current) {
            ctx.clearRect(
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height
            );
          }
        },
      });

      if (engine) {
        engineState.current = engine;
      }
    }
  }, [canvasRef]);

  const handleClick = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;

    const [x, y] = relativePoint(e.clientX, e.clientY, canvasRef.current);
    engineState.current?.spawnObject(x, y);
  };

  return { canvasRef, handleClick };
};
