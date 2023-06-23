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
}
