import { Vector2 } from "../../utils/vector2.js";
import { Scene } from "../../utils/scene/Scene.js";
import Player from "../../entities/player/player.js";

class GameScene extends Scene {
    private player: Player;
    private sprites: Record<string, HTMLImageElement>;
    private loaded: boolean;
    
    constructor() {
        super();
        this.player = new Player(new Vector2(100, 100), 200)
        this.sprites = {};
        this.loaded = false;
    }
    
    load() {
        const playerSprite = new Image();
        playerSprite.onload = () => {
            this.loaded = true;
        }
        playerSprite.src = 'assets/Cute_Fantasy_Free/Player/Player.png';
        this.sprites['player-sprite'] = playerSprite;
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
        const playerSprite: HTMLImageElement | null = this.sprites['player-sprite'];
        if (playerSprite) {
            ctx.drawImage(playerSprite, this.player.pos.x, this.player.pos.y)
        }
    }
}

export default GameScene;