import { Vector2 } from "../../utils/vector2.js";
import { Scene } from "../../utils/scene/Scene.js";
import { resources } from "../../utils/resources.js";
import { tileRenderer } from "../../utils/tileRenderer.js";
import Player from "../../entities/player/player.js";
import Camera from "../../utils/camera.js";
const firstMap = [
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
    [3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
    [3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
    [3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
    [3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
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
        this.camera = new Camera(ctx.canvas.width, ctx.canvas.height);
    }
    load() {
        this.player.loadPlayer();
    }
    unload() {
    }
    update(deltaTime) {
        this.player.update(deltaTime);
        const offset = new Vector2(this.player.width / 2, this.player.height / 2);
        this.camera.setTarget(this.player.pos, offset);
    }
    fixedUpdate(fixedDeltaTime) {
        this.player.fixedUpdate(fixedDeltaTime);
    }
    render(ctx) {
        const camPos = this.camera.pos;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        tileRenderer.renderTiles(ctx, resources.sprites["cliffTile"], firstMap, this.camera);
        this.player.renderPlayer(ctx, this.player.pos.sub(camPos));
    }
}
export default GameScene;
//# sourceMappingURL=GameScene.js.map