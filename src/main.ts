import GameScene from "./content/gameScenes/GameScene.js";
import SceneManager from "./utils/scene/SceneManager.js";

let canvas = document.getElementById('canvas') as HTMLCanvasElement;
let ctx: CanvasRenderingContext2D | null = canvas?.getContext('2d');

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