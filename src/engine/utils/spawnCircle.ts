type SpawnCircleOptions = {
  radius?: number;
  strokeStyle?: string | CanvasGradient | CanvasPattern;
};

export const spawnCircle = (
  x: number,
  y: number,
  ctx: CanvasRenderingContext2D,
  options?: SpawnCircleOptions
): void => {
  const radius = options?.radius ?? 25;
  ctx.strokeStyle = options?.strokeStyle ?? "white";

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.stroke();
};
