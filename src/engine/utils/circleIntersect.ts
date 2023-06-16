import { Circle } from "../objects/Circle";

export const circleIntersect = (circle1: Circle, circle2: Circle) => {
	if (
		circle2.x > circle1.radius * 2 + circle1.x ||
		circle1.x > circle2.radius * 2 + circle2.x ||
		circle2.y > circle1.radius * 2 + circle1.y ||
		circle1.y > circle2.radius * 2 + circle2.y
	) {
		return false;
	}
	return true;
};
