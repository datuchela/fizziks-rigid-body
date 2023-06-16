import { Circle } from "../objects/Circle";
import { square } from "./square";

export const circleIntersect = (circle1: Circle, circle2: Circle) => {
  // Calculate the distance between the two circles
  const squareDistance =
    square(circle1.x - circle2.x) + square(circle1.y - circle2.y);

  // When the distance is smaller or equal to the sum
  // of the two radius, the circles touch or overlap
  return squareDistance <= square(circle1.radius + circle2.radius);
};
