import type { Vector } from "../types";

export const oppositeVector = (vector: Vector): Vector => {
  return [-vector[0], -vector[1]];
};
