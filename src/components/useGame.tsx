import { useEffect, useRef, useState } from "react"
// import { socket } from "../App";
import { relativePoint } from "../utils/relativePoint";
import { Square } from "../objects/Square";
import { rectIntersect } from "../utils/rectIntersect";

const DEFAULT_CANVAS_WIDTH = 1280;
const DEFAULT_CANVAS_HEIGHT = 720;

let elapsed = 0;
let oldTimeStamp = 0;

export const useGame = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [objects, setObjects] = useState<Square[]>([]);

    const handleClick = (e: MouseEvent) => {
        if (!canvasRef.current) return
        const [x, y] = relativePoint(e.clientX, e.clientY, canvasRef.current);
        const square = new Square({ x, y, mass: 50 });
        setObjects((prev) => [...prev, square]);
        // socket.emit("spawn-object", { id: square.id, x, y, mass: square.mass });
    };

    const handleObjectSpawn = ({ id, x, y, mass }: { id: string, x: number, y: number, mass: number }) => {
        const square = new Square({ id, x, y, mass });
        setObjects((prev) => [...prev, square]);
    }


    const updateObjects = (dt: number) => {
        setObjects((objs) => {
            return objs.map((obj) => {
                obj.update(dt)

                return obj
            })
        })
    };

    const drawObjects = () => {
        if (!canvasRef.current) return
        const ctx = canvasRef.current.getContext("2d")

        if (ctx) {
            
            // ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

            setObjects((objs) => {
                return objs.map((obj) => {
                    if(canvasRef.current) {
                        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                    }
                    
                    obj.draw(ctx)
    
                    return obj
                })
            })
        }
    };

    const detectCollisions = () => {
        let obj1;
        let obj2;

        // reset collisions
        objects.forEach((obj) => {
            obj.isColliding = false;
        });

        for (let i = 0; i < objects.length; i++) {
            obj1 = objects[i];
            for (let j = i + 1; j < objects.length; j++) {
                obj2 = objects[j];
                if (rectIntersect(obj1, obj2)) {
                    obj1.isColliding = true;
                    obj2.isColliding = true;
                }
            }
        }
    };

    const detectEdgeCollisions = () => {
        const restitution = 0.9;
        let obj;

        for (let i = 0; i < objects.length; i++) {
            obj = objects[i];

            // Check for left and right
            if (obj.x < obj.length) {
                obj.vx = Math.abs(obj.vx) * restitution;
                obj.x = obj.length;
            } else if (obj.x > DEFAULT_CANVAS_WIDTH - obj.length) {
                obj.vx = -Math.abs(obj.vx) * restitution;
                obj.x = DEFAULT_CANVAS_WIDTH - obj.length;
            }

            // Check for bottom and top
            if (obj.y < obj.length) {
                obj.vy = Math.abs(obj.vy) * restitution;
                obj.y = obj.length;
            } else if (obj.y > DEFAULT_CANVAS_HEIGHT - obj.length / 2) {
                obj.vy = -Math.abs(obj.vy) * restitution;
                obj.y = DEFAULT_CANVAS_HEIGHT - obj.length / 2;
            }
        }
    };


    const attachDomEventListeners = () => {
        if (!canvasRef.current) return
        canvasRef.current.addEventListener("click", handleClick)
    }

    const attachSocketListeners = () => {
        // socket.on("spawn-object", handleObjectSpawn)
    }

    const gameLoop = (timeStamp: number) => {
        elapsed = (timeStamp - oldTimeStamp) / 1000;
        oldTimeStamp = timeStamp;
        elapsed = Math.min(elapsed, 0.1);

        updateObjects(elapsed);
        drawObjects();

        requestAnimationFrame(gameLoop)
    }

    useEffect(() => {
        console.log("use Effect")
        attachDomEventListeners()
        attachSocketListeners()

        requestAnimationFrame(gameLoop)
    }, [])

    useEffect(() => {
    }, [objects])
    
    return canvasRef
}