import GameScene from "./content/gameScenes/GameScene.js";
import SceneManager from "./utils/scene/SceneManager.js";
let canvas = document.getElementById('canvas');
let ctx = canvas === null || canvas === void 0 ? void 0 : canvas.getContext('2d');
canvas.width = 854;
canvas.height = 480;
function start() {
    if (!ctx) {
        console.error('context is not defined');
        return;
    }
    const game = new GameScene(ctx);
    const sceneManager = new SceneManager(canvas, game);
    //remove antialiasing
    ctx.imageSmoothingEnabled = false;
}
start();
//# sourceMappingURL=main.js.map