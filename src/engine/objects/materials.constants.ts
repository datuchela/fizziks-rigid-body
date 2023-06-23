import { Material } from "./materials.types";

// Since given density units are in kg/m^3,
// and our engine only cares about 2D space we need to convert densities into kg/m^2.
const convertTo2d = (density: number) => Math.pow(Math.cbrt(density), 2);

export const densities = new Map([
  [Material.Silicon, convertTo2d(2330)],
  [Material.Aluminium, convertTo2d(2700)],
  [Material.Platinum, convertTo2d(21450)],
]);
