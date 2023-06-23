import { EngineObject, EngineState } from "./engineState";
import { Material } from "./objects/materials.types";
import { Circle } from "./objects/Circle";

export type Engine = {
  spawnObject: ({
    x,
    y,
    mass,
    material,
  }: {
    x: number;
    y: number;
    mass: number;
    material: Material;
  }) => void;
};

const addObject =
  (engineState: EngineState) =>
  ({
    x,
    y,
    mass,
    material,
  }: {
    x: number;
    y: number;
    mass: number;
    material: Material;
  }) => {
    const circle = new Circle({
      x,
      y,
      mass,
      material,
    });
    engineState.addObject(circle);
  };

export type EngineInitParams = {
  canvasWidth: number;
  canvasHeight: number;
  onBeforeUpdate?: () => void;
  onUpdate?: (objects: EngineObject[]) => void;
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
  canvasWidth,
  canvasHeight,
  onBeforeUpdate,
  onUpdate,
}: EngineInitParams) => {
  const engineState = new EngineState(canvasWidth, canvasHeight);
  const engineState = new EngineState(canvasWidth, canvasHeight);

  let elapsed = 0;
  let oldTimeStamp = 0;
  let elapsed = 0;
  let oldTimeStamp = 0;

  const tick = (timeStamp: number) => {
    elapsed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;
    elapsed = Math.min(elapsed, 0.1);

    onBeforeUpdate && onBeforeUpdate();

    engineState.detectCollisions();
    engineState.detectEdgeCollisions();

    engineState.updateObjects(elapsed);

    onUpdate && onUpdate(engineState.objects);

    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);

  return {
    spawnObject: addObject(engineState),
  };
};
