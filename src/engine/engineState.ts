import { Square } from "./objects/Square";
import { rectIntersect } from "../utils/rectIntersect";

export type EngineObject = Square;

export enum EngineStateValue {
  paused,
  running,
}

export enum Wall {
  Top,
  Right,
  Bottom,
  Left,
}

export interface EngineState {
  value: EngineStateValue;
  objects: EngineObject[];
  canvasWidth: number;
  canvasHeight: number;

  updateObjects: (dt: number) => void;
  drawObjects: (ctx: CanvasRenderingContext2D) => void;
  addObject: (object: EngineObject) => void;
  detectCollisions: () => void;
  detectEdgeCollisions: () => void;
}

export class EngineState {
  value;
  objects;

  canvasWidth;
  canvasHeight;

  constructor(
    canvasWidth: number,
    canvasHeight: number,
    objects?: EngineObject[]
  ) {
    this.value = EngineStateValue.running;
    this.objects = objects ?? [];
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  updateObjects = (dt: number) => {
    this.objects.forEach((obj) => {
      obj.update(dt);
    });
  };

  drawObjects = (ctx: CanvasRenderingContext2D) => {
    this.objects.forEach((obj) => {
      obj.draw(ctx);
    });
  };

  addObject = (object: EngineObject) => {
    this.objects.push(object);
  };

  private resetCollisions = () => {
    for (let i = 0; i < this.objects.length; ++i) {
      this.objects[i].isColliding = false;
    }
  };

  private handleCollisions = (obj1: EngineObject, obj2: EngineObject) => {
    obj1.isColliding = true;
    obj2.isColliding = true;
  };

  detectCollisions = () => {
    let obj1;
    let obj2;

    this.resetCollisions();

    for (let i = 0; i < this.objects.length; i++) {
      obj1 = this.objects[i];
      for (let j = i + 1; j < this.objects.length; j++) {
        obj2 = this.objects[j];
        if (rectIntersect(obj1, obj2)) {
          this.handleCollisions(obj1, obj2);
        }
      }
    }
  };

  private handleEdgeCollisions = (obj: EngineObject, wall: Wall) => {
    const restitution = 0.9;

    obj.vx = Math.abs(obj.vx) * restitution;

    switch (wall) {
      case Wall.Top:
        obj.vy = Math.abs(obj.vy) * restitution;
        obj.y = obj.length;
        break;
      case Wall.Right:
        obj.vx = -Math.abs(obj.vx) * restitution;
        obj.x = this.canvasWidth - obj.length;
        break;
      case Wall.Bottom:
        obj.vy = -Math.abs(obj.vy) * restitution;
        obj.y = this.canvasHeight - obj.length / 2;
        break;
      case Wall.Left:
        obj.vx = Math.abs(obj.vx) * restitution;
        obj.x = obj.length;
        break;

      default:
        throw new Error("Invalid Wall Type");
    }
  };

  detectEdgeCollisions = () => {
    let obj;

    for (let i = 0; i < this.objects.length; i++) {
      obj = this.objects[i];

      // Check for left and right
      if (obj.x < obj.length) {
        this.handleEdgeCollisions(obj, Wall.Left);
      } else if (obj.x > this.canvasWidth - obj.length) {
        this.handleEdgeCollisions(obj, Wall.Right);
      }

      // Check for bottom and top
      if (obj.y < obj.length) {
        this.handleEdgeCollisions(obj, Wall.Top);
      } else if (obj.y > this.canvasHeight - obj.length / 2) {
        this.handleEdgeCollisions(obj, Wall.Bottom);
      }
    }
  };
}
