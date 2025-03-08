import { Vector2 } from "../../utils/vector2.js";
import { Scene } from "../../utils/scene/Scene.js";
import { resources } from "../../utils/resources.js";
import Player from "../../entities/player/player.js";
import Sprite from "../../utils/Sprite.js";

class GameScene extends Scene {
    private player: Player;
    private sprites: Record<string, HTMLImageElement>;
    private loaded: boolean;
    private col: number;
    private row: number;
    
    constructor() {
        super();
        this.player = new Player(new Vector2(100, 100), 200)
        this.sprites = {};
        this.loaded = false;
        this.col = 0;
        this.row = 0;
        //this.nextValue();
    }
    
    load() {

        for (const key of Object.keys(resources.toLoad)) {
            if (!resources.toLoad[key].isLoaded) {
                requestAnimationFrame(this.load.bind(this));
                return;
            }
        }
        const playerSprite = resources.sprites["player"].animations({
            idle: { from: 0, to: 5, loop: true },
            walkHorizontal: { from: 24, to: 29, loop: true },
            walkSouth: { from: 18, to: 23, loop: true },
            walkNorth: { from: 30, to: 35, loop: true }
        })
        this.loaded = true;
    }

    unload() {

    }

    update(deltaTime: number): void {
        this.player.update(deltaTime);
    }
    fixedUpdate(fixedDeltaTime: number): void {
        this.player.fixedUpdate(fixedDeltaTime);
    }

    render(ctx: CanvasRenderingContext2D): void {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        if (!this.loaded) {
            return;
        }
        const playerSprite: Sprite | undefined = resources.sprites['player'];
        if (playerSprite) {
            playerSprite.draw(ctx, this.player.pos);
        }
    }
}


export default GameScene;