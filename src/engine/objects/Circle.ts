import { spawnCircle } from "../utils";
import { BaseObject, BaseObjectConstructorProps } from "./BaseObject";

interface CircleConstructorProps extends BaseObjectConstructorProps {
	radius?: number;
}

export class Circle extends BaseObject {
	radius;
	isColliding = false;

	constructor({ radius = 30, ...baseObjectProps }: CircleConstructorProps) {
		super(baseObjectProps);
		this.radius = radius;
	}

	draw = (ctx: CanvasRenderingContext2D) => {
		spawnCircle(this.x, this.y, ctx, { radius: this.radius });
	};
}
