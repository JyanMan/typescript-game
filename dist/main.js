import GameScene from "./content/gameScenes/GameScene.js";
import SceneManager from "./utils/scene/SceneManager.js";
let canvas = document.getElementById('canvas');
let ctx = canvas === null || canvas === void 0 ? void 0 : canvas.getContext('2d');
canvas.width = 854;
canvas.height = 480;
const game = new GameScene();
const sceneManager = new SceneManager(canvas, game);
function removeAntiAliasing() {
    if (!ctx) {
        console.error('context is not defined');
        return;
    }
    ctx.imageSmoothingEnabled = false;
}
removeAntiAliasing();
console.log(ctx === null || ctx === void 0 ? void 0 : ctx.imageSmoothingEnabled);
//# sourceMappingURL=main.js.map