import Sprite from "./Sprite.js";
class Resources {
    constructor() {
        this.toLoad = {
            player: {
                src: "assets/Cute_Fantasy_Free/Player/Player.png",
                isLoaded: false,
                scale: 1,
                rows: 10,
                cols: 6,
                frame: 0,
            }
        };
        this.requiredToLoad = 0;
        this.alreadyLoaded = -1;
        this.sprites = {};
        this.loadAssets();
    }
    loadAssets() {
        var _a, _b, _c, _d;
        for (const key of Object.keys(this.toLoad)) {
            this.requiredToLoad++;
            this.alreadyLoaded++;
            const value = this.toLoad[key];
            const image = new Image();
            image.src = value.src;
            const scale = (_a = value.scale) !== null && _a !== void 0 ? _a : 1;
            const rows = (_b = value.rows) !== null && _b !== void 0 ? _b : 1;
            const cols = (_c = value.cols) !== null && _c !== void 0 ? _c : 1;
            const frame = (_d = value.frame) !== null && _d !== void 0 ? _d : 0;
            const sprite = new Sprite(image, scale, rows, cols, frame);
            // image.onload = () => {
            //     this.alreadyLoaded++;
            //     console.log(performance.now());
            //     this.toLoad[key].isLoaded = true;
            // }
            this.sprites[key] = sprite;
        }
    }
    loadComplete() {
        return (this.requiredToLoad === this.alreadyLoaded);
    }
}
export const resources = new Resources();
//# sourceMappingURL=resources.js.map