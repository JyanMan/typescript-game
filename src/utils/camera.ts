import { Vector2 } from "./vector2.js";

class Camera {
    pos: Vector2;
    offset: Vector2;
    width: number;
    height: number;

    constructor(width: number, height: number) {

        this.pos = new Vector2(0, 0);
        this.offset = new Vector2(0, 0);
        this.width = width;
        this.height = height;

    }

    setTarget(targetPos: Vector2, offset: Vector2) {
        this.offset = offset;
        this.pos.x = targetPos.x - this.width/2 + offset.x;
        this.pos.y = targetPos.y - this.height/2 + offset.y;
    }

    getCenter() {
        return this.pos.add(new Vector2(this.width/2, this.height/2)).sub(this.offset.multiply(0.5));
    }
}

export default Camera;