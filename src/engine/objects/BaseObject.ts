import type { Vector } from "../types";
import { GRAVITY_EARTH } from "../utils/constants";

export interface BaseObjectConstructorProps {
	id?: string;
	x: number;
	y: number;
	vx?: number;
	vy?: number;
	mass?: number;
}

export interface BaseObject {
	id: string;
	x: number;
	y: number;
	vx: number;
	vy: number;
	mass: number;
	setCoordinates: (setterFn: ([x, y]: Vector) => Vector) => void;
	setVelocity: (setterFn: ([vx, vy]: Vector) => Vector) => void;
	update: (dt: number) => void;
	draw: (ctx: CanvasRenderingContext2D) => void;
}

export class BaseObject {
	constructor({
		id,
		x,
		y,
		vx = 0,
		vy = 0,
		mass = 10,
	}: BaseObjectConstructorProps) {
		this.id = id ?? crypto.randomUUID();
		this.x = x;
		this.y = y;
		this.vx = vx;
		this.vy = vy;
		this.mass = mass;
	}

	setCoordinates = (setterFn: ([x, y]: Vector) => Vector) => {
		const [newX, newY] = setterFn([this.x, this.y]);
		this.x = newX;
		this.y = newY;
	};

	setVelocity = (setterFn: ([vx, vy]: Vector) => Vector) => {
		const [newVx, newVy] = setterFn([this.vx, this.vy]);
		this.vx = newVx;
		this.vy = newVy;
	};

	update = (dt: number) => {
		this.fall(dt);
		this.setCoordinates(([x, y]) => [x + this.vx * dt, y + this.vy * dt]);
	};

	private fall = (dt: number) => {
		this.setVelocity(([vx, vy]) => [vx, vy + dt * GRAVITY_EARTH]);
	};
}
