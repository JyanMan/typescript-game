import { Vector2 } from "../../utils/vector2.js";
import { Scene } from "../../utils/scene/Scene.js";
import { resources } from "../../utils/resources.js";
import { tileRenderer } from "../../utils/tileRenderer.js";
import Player from "../../entities/player/player.js";
import Sprite from "../../utils/Sprite.js";
import Camera from "../../utils/camera.js";

const firstMap: Array<Array<number>> = [
    [0,1,1,1,1,1,1,1,1,1,1,1,2],
    [3,4,4,4,4,4,4,4,4,4,4,4,5],
    [3,4,4,4,4,4,4,4,4,4,4,4,5],
    [3,4,4,4,4,4,4,4,4,4,4,4,5],
    [3,4,4,4,4,4,4,4,4,4,4,4,5],
    [3,4,4,4,4,4,4,4,4,4,4,4,5],
]

class GameScene extends Scene {
    private player: Player;
    private sprites: Record<string, HTMLImageElement>;
    private loaded: boolean;
    private col: number;
    private row: number;
    private ctx: CanvasRenderingContext2D;
    public camera: Camera;
    
    constructor(ctx: CanvasRenderingContext2D) {
        super();
        this.player = new Player(new Vector2(100, 100), 200)
        this.sprites = {};
        this.loaded = false;
        this.col = 0;
        this.row = 0;
        this.ctx = ctx;
        this.camera = new Camera(ctx.canvas.width, ctx.canvas.height);
    }
    
    load() {
        this.player.loadPlayer();
    }

    unload() {

    }

    update(deltaTime: number): void {
        this.player.update(deltaTime);
        const offset = new Vector2(this.player.width/2, this.player.height/2);
        this.camera.setTarget(this.player.pos, offset);
    }
    fixedUpdate(fixedDeltaTime: number): void {
        this.player.fixedUpdate(fixedDeltaTime);
    }

    render(ctx: CanvasRenderingContext2D): void {
        const camPos = this.camera.pos;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        tileRenderer.renderTiles(ctx, resources.sprites["cliffTile"], firstMap, this.camera);
        this.player.renderPlayer(ctx, this.player.pos.sub(camPos));
    }
}


export default GameScene;