import { spawnRect } from "../utils/spawnRect";
import { EngineObject, EngineObjectConstructorProps } from "./EngineObject";

interface SquareConstructorProps extends EngineObjectConstructorProps {
  length?: number;
}

export class Square extends EngineObject {
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
