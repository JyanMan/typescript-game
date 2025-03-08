import { resources } from "./utils/resources.js";
import GameScene from "./content/gameScenes/GameScene.js";
import SceneManager from "./utils/scene/SceneManager.js";

let canvas = document.getElementById('canvas') as HTMLCanvasElement;
let ctx: CanvasRenderingContext2D | null = canvas?.getContext('2d');



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