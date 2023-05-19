import { g } from "../utils/constants";

export interface EngineObjectConstructorProps {
  id?: string;
  x: number;
  y: number;
  vx?: number;
  vy?: number;
  mass?: number;
}

export interface EngineObject {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
  update: (dt: number) => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

export class EngineObject {
  constructor({
    id,
    x,
    y,
    vx = 0,
    vy = 0,
    mass = 10,
  }: EngineObjectConstructorProps) {
    this.id = id ?? crypto.randomUUID();
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.mass = mass;
  }

  update = (dt: number) => {
    this.fall(dt);
    this.x += this.vx * dt;
    this.y += this.vy * dt;
  };

  private fall = (dt: number) => {
    this.vy += dt * g;
  };
}
