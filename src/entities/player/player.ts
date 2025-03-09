import { Vector2 } from "../../utils/vector2.js";
import { playerInput } from "./playerInput.js";
import { resources } from "../../utils/resources.js";
import Sprite from "../../utils/Sprite.js";

class Player {
    pos: Vector2;
    speed: number;
    velocity: Vector2;
    moveDirection: Vector2;
    moving: boolean;
    inputKey: Record<string, boolean>;
    animState: string | null;
    state: string;
    sprite: Sprite;
    width: number;
    height: number

    constructor(pos: Vector2, speed: number) {
        this.pos = pos;
        this.speed = speed;
        this.velocity = new Vector2(0,0);
        this.moveDirection = new Vector2(0, 0);
        this.moving = false;
        this.inputKey = {
            a: false, d: false, w: false, s: false
        }
        this.animState = null;
        this.state = "idle";
        this.sprite = resources.sprites["player"];
        this.width = 100;
        this.height = 100;
        this.start();
    }

    start() {
        playerInput(this.inputKey);
    }
    
    public update(deltaTime: number) {
        this.checkInput();
        this.animations();
    }
    
    public fixedUpdate(fixedDeltaTime: number) {
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

    loadPlayer() {
        const playerSprite = resources.sprites["player"];
        playerSprite.animations({
            idle: { from: 0, to: 5, loop: true },
            walkHorizontal: { from: 24, to: 29, loop: true },
            walkSouth: { from: 18, to: 23, loop: true },
            walkNorth: { from: 30, to: 35, loop: true }
        })
    }

    renderPlayer(ctx: CanvasRenderingContext2D, pos: Vector2) {
        //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        const playerSprite: Sprite | undefined = resources.sprites['player'];
        //console.log(resources.loadComplete());
        if (playerSprite && playerSprite.image.complete) {
            playerSprite.draw(ctx, pos);
        }
    }

    animations() {
        const playerSprite = resources.sprites["player"];
        if (this.moving) {
            if (this.moveDirection.y > 0) {
                this.state = "walkSouth"
            }
            else if (this.moveDirection.y < 0) {
                this.state = "walkNorth";
            }
            else if (this.moveDirection.x !== 0) {
                this.state = "walkHorizontal";
                playerSprite.flipX = (this.moveDirection.x >= 0) ? false : true;
            }
        }
        else {
            this.state = "idle";
        }
        if (this.state !== this.animState) {
            //playerSprite.playing = false;
            this.animState = this.state;
            playerSprite.play(this.animState);
        }
    }
}

export default Player;