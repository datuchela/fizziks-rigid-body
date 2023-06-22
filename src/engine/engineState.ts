import { Circle, Square } from "./objects";
import { circleIntersect } from "./utils/circleIntersect";
import type { Vector } from "./types";

const square = (num: number) => Math.pow(num, 2);

const vecDistance = (vec1: Vector, vec2: Vector) => {
	return Math.sqrt(square(vec2[0] - vec1[0]) + square(vec2[1] - vec1[1]));
};

export type EngineObject = Square | Circle;

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

		const vCollision = [obj2.x - obj1.x, obj2.y - obj1.y];
		const distance = vecDistance([obj1.x, obj1.y], [obj2.x, obj2.y]);
		const vCollisionNorm = [vCollision[0] / distance, vCollision[1] / distance];

		const vRelative = [obj1.vx - obj2.vx, obj1.vy - obj2.vy];
		const speed =
			vRelative[0] * vCollisionNorm[0] + vRelative[1] * vCollisionNorm[1];

		if (speed < 0) return;

		const impulse = (2 * speed) / (obj1.mass + obj2.mass);

		obj1.setVelocity(([vx, vy]) => {
			vx -= impulse * obj2.mass * vCollisionNorm[0] * restitution;
			vy -= impulse * obj2.mass * vCollisionNorm[1] * restitution;
			return [vx, vy];
		});

		obj2.setVelocity(([vx, vy]) => {
			vx += impulse * obj1.mass * vCollisionNorm[0] * restitution;
			vy += impulse * obj1.mass * vCollisionNorm[1] * restitution;
			return [vx, vy];
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

		switch (wall) {
			case Wall.Top:
				obj.setVelocity(([vx, vy]) => [vx, Math.abs(vy) * restitution]);
				obj.setCoordinates(([x, y]) => [x, obj.radius]);
				break;
			case Wall.Right:
				obj.setVelocity(([vx, vy]) => [-Math.abs(obj.vx) * restitution, vy]);
				obj.setCoordinates(([x, y]) => [this.canvasWidth - obj.radius, y]);
				break;
			case Wall.Bottom:
				obj.setVelocity(([vx, vy]) => [vx, -Math.abs(obj.vy) * restitution]);
				obj.setCoordinates(([x, y]) => [x, this.canvasHeight - obj.radius]);
				break;
			case Wall.Left:
				obj.setVelocity(([vx, vy]) => [Math.abs(obj.vx) * restitution, vy]);
				obj.setCoordinates(([x, y]) => [obj.radius, y]);
				break;

			default:
				throw new Error("Invalid Wall Type");
		}
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
