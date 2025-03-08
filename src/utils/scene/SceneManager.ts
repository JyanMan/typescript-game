import { Scene } from "./Scene.js";

class SceneManager {
    private canvas: HTMLCanvasElement;
    private currentScene: Scene | null;
    private ctx: CanvasRenderingContext2D | null;
    private lastTime: number;
    private accumulatedTime: number;

    constructor(canvas: HTMLCanvasElement, initScene: Scene) {
        this.canvas = canvas;
        this.currentScene = initScene;
        this.ctx = canvas?.getContext('2d');
        this.lastTime = performance.now();
        this.accumulatedTime = 0;

        this.loadScene(initScene);
        requestAnimationFrame(this.loop.bind(this))
    }

    loop(currentTime: number): void {
        if (!this.currentScene) {
            console.error('scene manager load scene was given a null scene');
            return;
        }
        if (!this.ctx) {
            console.error('canvas has no context');
            return;
        }

        const deltaTime = (currentTime - this.lastTime)/1000;
        this.lastTime = currentTime;

        //fixed time step implementation
        const fixedDeltaTime = 1/60;
        this.accumulatedTime += deltaTime;
        while (this.accumulatedTime >= fixedDeltaTime) {
            this.accumulatedTime -= fixedDeltaTime;
            this.currentScene.fixedUpdate(fixedDeltaTime);
        }

        this.currentScene.render(this.ctx);
        this.currentScene.update(deltaTime);
        requestAnimationFrame(this.loop.bind(this));
    }
    
    loadScene(newScene: Scene): void {
        this.currentScene?.unload();
        this.currentScene = newScene;
        this.currentScene.load();
    }
}

export default SceneManager;