import { load } from "./utils/loader.js";
import GameScene from "./content/gameScenes/GameScene.js";
import SceneManager from "./utils/scene/SceneManager.js";

let canvas = document.getElementById('canvas') as HTMLCanvasElement;
let context: CanvasRenderingContext2D | null = canvas?.getContext('2d');

canvas.width = 854;
canvas.height = 480;

load.assets();

const game = new GameScene();
const sceneManager = new SceneManager(canvas, game);