import { Vector2 } from "../../utils/vector2.js";
import { Scene } from "../../utils/scene/Scene.js";
import { resources } from "../../utils/resources.js";
import Player from "../../entities/player/player.js";
class GameScene extends Scene {
    constructor() {
        super();
        this.player = new Player(new Vector2(100, 100), 200);
        this.sprites = {};
        this.loaded = false;
        this.col = 0;
        this.row = 0;
        //this.nextValue();
    }
    load() {
        for (const key of Object.keys(resources.toLoad)) {
            if (!resources.toLoad[key].isLoaded) {
                requestAnimationFrame(this.load.bind(this));
                return;
            }
        }
        this.loaded = true;
        setInterval(() => {
            if (this.col >= 5) {
                this.col = 0;
            }
            else {
                this.col++;
            }
        }, 200);
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
        if (!this.loaded) {
            return;
        }
        const playerSprite = resources.sprites['player'];
        if (playerSprite) {
            playerSprite.draw(ctx, this.player.pos);
            if (!playerSprite.playing) {
                playerSprite.play({
                    from: 0,
                    to: 5,
                    loop: true
                });
            }
        }
    }
}
export default GameScene;
//# sourceMappingURL=GameScene.js.map