import { spawnRect } from "../utils/spawnRect";
import { BaseObject, BaseObjectConstructorProps } from "./BaseObject";

interface SquareConstructorProps extends BaseObjectConstructorProps {
  length?: number;
}

export class Square extends BaseObject {
  length;
  isColliding = false;

  constructor({ length, ...baseObjectProps }: SquareConstructorProps) {
    super(baseObjectProps);
    this.length = length ?? 50;
  }

  draw = (ctx: CanvasRenderingContext2D) => {
    spawnRect(this.x, this.y, ctx, {
      width: this.length,
      height: this.length,
      strokeStyle: this.isColliding ? "red" : "white",
    });
  };
}
