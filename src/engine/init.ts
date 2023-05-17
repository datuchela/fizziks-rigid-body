import { Square } from "./objects/Square";
import { EngineObject, EngineState } from "./engineState";

export type Engine = {
  spawnObject: (x: number, y: number) => void;
};

const addObject = (engineState: EngineState) => (x: number, y: number) => {
  const square = new Square({ x, y, mass: 50 });
  engineState.addObject(square);
};

export type EngineInitParams = {
  canvasWidth: number;
  canvasHeight: number;
  onBeforeUpdate?: () => void;
  onUpdate?: (objects: EngineObject[]) => void;
};

export const init = ({
  canvasWidth,
  canvasHeight,
  onBeforeUpdate,
  onUpdate,
}: EngineInitParams) => {
  const engineState = new EngineState(canvasWidth, canvasHeight);

  let elapsed = 0;
  let oldTimeStamp = 0;

  const tick = (timeStamp: number) => {
    elapsed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;
    elapsed = Math.min(elapsed, 0.1);

    onBeforeUpdate && onBeforeUpdate();

    engineState.detectAndHandleCollisions();
    engineState.detectAndHandleEdgeCollisions();

    engineState.updateObjects(elapsed);

    onUpdate && onUpdate(engineState.objects);

    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);

  return {
    spawnObject: addObject(engineState),
  };
};
