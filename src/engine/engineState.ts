import { Square } from "../objects/Square";

export type EngineState = {
  objects: Square[];
  value: string;
  updateObjects: (dt: number) => void;
  drawObjects: (ctx: CanvasRenderingContext2D) => void;
  addObject: (object: Square) => void;
};

export const engineState: EngineState = {
  value: "",
  objects: [],

  updateObjects: function (dt) {
    this.objects.forEach((obj) => {
      obj.update(dt);
    });
  },

  drawObjects: function (ctx) {
    this.objects.forEach((obj) => {
      obj.draw(ctx);
    });
  },

  addObject: function (object) {
    this.objects.push(object);
  },
};
