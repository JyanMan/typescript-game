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
        this.player.loadPlayer();
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
        this.player.renderPlayer(ctx);
        // const playerSprite: Sprite | undefined = resources.sprites['player'];
        // //console.log(resources.loadComplete());
        // if (playerSprite && playerSprite.image.complete) {
        //     playerSprite.draw(ctx, this.player.pos);
        // }
    }
}


export default GameScene;