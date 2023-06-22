import { GRAVITY_EARTH } from "../utils/constants";
import { Material } from "./materials.types";
import { densities } from "./materials.constants";

export interface BaseObjectConstructorProps {
  id?: string;
  x: number;
  y: number;
  vx?: number;
  vy?: number;
  mass?: number;
  material: Material;
}

export interface BaseObject {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
  material: Material;
  density: number;
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
    material,
  }: BaseObjectConstructorProps) {
    this.id = id ?? crypto.randomUUID();
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.mass = mass;
    this.material = material;

    const density = densities.get(this.material);

    if (!density)
      throw new Error(
        `Couldn't find density based on that material. Material: ${this.material}`
      );

    this.density = density;
  }

  update = (dt: number) => {
    this.fall(dt);
    this.x += this.vx * dt;
    this.y += this.vy * dt;
  };

  private fall = (dt: number) => {
    this.vy += dt * GRAVITY_EARTH;
  };
}
