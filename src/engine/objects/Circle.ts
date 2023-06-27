import { Wall } from "../engineState";
import { PIXELS_PER_METER, spawnCircle } from "../utils";
import { BaseObject, BaseObjectConstructorProps } from "./BaseObject";

interface CircleConstructorProps extends BaseObjectConstructorProps {
  radius?: number;
}

export class Circle extends BaseObject {
  radius;
  isColliding = false;

  constructor({ radius, ...baseObjectProps }: CircleConstructorProps) {
    super(baseObjectProps);
    this.radius =
      Math.sqrt(this.mass / (this.density * Math.PI)) * PIXELS_PER_METER;
  }

  draw = (ctx: CanvasRenderingContext2D) => {
    spawnCircle(this.x, this.y, ctx, { radius: this.radius });
  };

  updateCoordinatesOnEdgeCollision = ({
    wall,
    canvasWidth,
    canvasHeight,
  }: {
    wall: Wall;
    canvasWidth: number;
    canvasHeight: number;
  }) => {
    switch (wall) {
      case Wall.Top:
        this.y = this.radius;
        break;
      case Wall.Right:
        this.x = canvasWidth - this.radius;
        break;
      case Wall.Bottom:
        this.y = canvasHeight - this.radius;
        break;
      case Wall.Left:
        this.x = this.radius;
        break;

      default:
        throw new Error("Invalid Wall Type");
    }
  };
}
