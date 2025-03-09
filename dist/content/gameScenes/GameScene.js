import { Vector2 } from "../../utils/vector2.js";
import { Scene } from "../../utils/scene/Scene.js";
import { resources } from "../../utils/resources.js";
import { tileRenderer } from "../../utils/Tilemap.js";
import Player from "../../entities/player/player.js";
const firstMap = [
    [0, 1, 1, 1, 1, 1, 1, 2],
    [3, 4, 4, 4, 4, 4, 4, 5],
    [3, 4, 4, 4, 4, 4, 4, 5],
    [3, 4, 4, 4, 4, 4, 4, 5],
    [3, 4, 4, 4, 4, 4, 4, 5],
    [3, 4, 4, 4, 4, 4, 4, 5],
];
class GameScene extends Scene {
    constructor(ctx) {
        super();
        this.player = new Player(new Vector2(100, 100), 200);
        this.sprites = {};
        this.loaded = false;
        this.col = 0;
        this.row = 0;
        this.ctx = ctx;
    }
    load() {
        this.player.loadPlayer();
    }
    unload() {
    }
    update(deltaTime) {
        this.player.update(deltaTime);
    }
    fixedUpdate(fixedDeltaTime) {
        this.player.fixedUpdate(fixedDeltaTime);
    }
    render(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        tileRenderer.renderTiles(ctx, resources.sprites["firstMap"], firstMap);
        this.player.renderPlayer(ctx);
    }
}
export default GameScene;
//# sourceMappingURL=GameScene.js.map