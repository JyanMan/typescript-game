import { Vector2 } from "../../utils/vector2.js";
import { playerInput } from "./playerInput.js";
import { resources } from "../../utils/resources.js";
class Player {
    constructor(pos, speed) {
        this.pos = pos;
        this.speed = speed;
        this.velocity = new Vector2(0, 0);
        this.moveDirection = new Vector2(0, 0);
        this.moving = false;
        this.inputKey = {
            a: false, d: false, w: false, s: false
        };
        this.animState = "none";
        this.state = "idle";
        this.start();
    }
    start() {
        playerInput(this.inputKey);
    }
    update(deltaTime) {
        this.checkInput();
        this.animations();
    }
    fixedUpdate(fixedDeltaTime) {
        this.move();
        this.pos = this.pos.add(this.velocity.multiply(fixedDeltaTime));
    }
    checkInput() {
        this.moveDirection = new Vector2(0, 0);
        if (this.inputKey["w"]) {
            this.moveDirection = this.moveDirection.add(new Vector2(0, -1));
        }
        if (this.inputKey["a"]) {
            this.moveDirection = this.moveDirection.add(new Vector2(-1, 0));
        }
        if (this.inputKey["s"]) {
            this.moveDirection = this.moveDirection.add(new Vector2(0, 1));
        }
        if (this.inputKey["d"]) {
            this.moveDirection = this.moveDirection.add(new Vector2(1, 0));
        }
        if (!this.moveDirection.isZero()) {
            this.moveDirection.normalized();
            this.moving = true;
        }
        else {
            this.moving = false;
        }
    }
    move() {
        if (this.moving) {
            this.velocity = this.moveDirection.multiply(this.speed);
        }
        else {
            this.velocity = new Vector2(0, 0);
        }
    }
    renderPlayer(ctx) {
    }
    animations() {
        const playerSprite = resources.sprites["player"];
        if (this.moving) {
            this.state = "walk";
        }
        else {
            this.state = "idle";
        }
        if (this.state !== this.animState) {
            //playerSprite.playing = false;
            this.animState = this.state;
            switch (this.animState) {
                case "idle":
                    console.log(this.animState);
                    playerSprite.play({ from: 0, to: 5, loop: true });
                    break;
                case "walk":
                    console.log(this.animState);
                    playerSprite.play({ from: 18, to: 23, loop: true });
                    break;
            }
        }
    }
}
export default Player;
//# sourceMappingURL=player.js.map