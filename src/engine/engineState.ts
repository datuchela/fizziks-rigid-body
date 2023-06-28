import { Circle, Square } from "./objects";
import { circleIntersect } from "./utils/circleIntersect";
import type { Vector } from "./types";
import { oppositeVector } from "./utils/oppositeVector";

const square = (num: number) => Math.pow(num, 2);

const vecDistance = (vec1: Vector, vec2: Vector) => {
  return Math.sqrt(square(vec2[0] - vec1[0]) + square(vec2[1] - vec1[1]));
};

export type EngineObject = Square | Circle;

export enum EngineStateValue {
  Paused,
  Running,
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
    this.value = EngineStateValue.Running;
    this.objects = objects ?? [];
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  updateObjects = (dt: number) => {
    this.objects.forEach((obj) => {
      obj.updateCoordinates(dt);
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
    const restitution = 0.9;
    const vCollision: Vector = [obj2.x - obj1.x, obj2.y - obj1.y];
    const distance = vecDistance([obj1.x, obj1.y], [obj2.x, obj2.y]);

    // Prevent NaN
    const vCollisionNorm: Vector = [
      vCollision[0] / distance || 0,
      vCollision[1] / distance || 0,
    ];

    const vRelative: Vector = [obj1.vx - obj2.vx, obj1.vy - obj2.vy];
    const speed =
      vRelative[0] * vCollisionNorm[0] + vRelative[1] * vCollisionNorm[1];

    if (speed < 0) return;

    const impulse = (2 * speed) / (obj1.mass + obj2.mass);

    obj1.updateVelocityOnCollision({
      oppositeObjectMass: obj2.mass,
      collisionVectorNorm: vCollisionNorm,
      impulse,
      restitution,
    });

    obj2.updateVelocityOnCollision({
      oppositeObjectMass: obj2.mass,
      collisionVectorNorm: oppositeVector(vCollisionNorm),
      impulse,
      restitution,
    });
  };

  detectCollisions = () => {
    let obj1;
    let obj2;

    this.resetCollisions();

    for (let i = 0; i < this.objects.length; i++) {
      obj1 = this.objects[i];
      for (let j = i + 1; j < this.objects.length; j++) {
        obj2 = this.objects[j];
        if (circleIntersect(obj1 as Circle, obj2 as Circle)) {
          this.handleCollisions(obj1, obj2);
        }
      }
    }
  };

  private handleEdgeCollisions = (obj: Circle, wall: Wall) => {
    const restitution = 0.9;
    obj.updateVelocityOnEdgeCollision({ wall, restitution });
    obj.updateCoordinatesOnEdgeCollision({
      wall,
      canvasWidth: this.canvasWidth,
      canvasHeight: this.canvasHeight,
    });
  };

  detectEdgeCollisions = () => {
    let obj;

    for (let i = 0; i < this.objects.length; i++) {
      obj = this.objects[i] as Circle;

      // Check for left and right
      if (obj.x < obj.radius) {
        this.handleEdgeCollisions(obj, Wall.Left);
      } else if (obj.x > this.canvasWidth - obj.radius) {
        this.handleEdgeCollisions(obj, Wall.Right);
      }

      // Check for bottom and top
      if (obj.y < obj.radius) {
        this.handleEdgeCollisions(obj, Wall.Top);
      } else if (obj.y > this.canvasHeight - obj.radius) {
        this.handleEdgeCollisions(obj, Wall.Bottom);
      }
    }
  };
}
