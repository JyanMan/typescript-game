import Sprite from "./Sprite.js";
import { Vector2 } from "./vector2.js";

interface Loader {
    src: string,
    isLoaded: boolean,
    scale?: number,
    rows?: number,
    cols?: number,
    frame?: number,
}

class Resources {
    toLoad: Record<string, Loader>;
    sprites: Record<string, Sprite>;
    requiredToLoad: number;
    alreadyLoaded: number;
    constructor() {
        this.toLoad = {
            player: {
                src: "assets/Cute_Fantasy_Free/Player/Player.png",
                isLoaded: false,
                scale: 1.5,
                rows: 10,
                cols: 6,
                frame: 0,
            },
            firstMap: {
                src: "assets/Cute_Fantasy_Free/Tiles/Cliff_Tile.png",
                isLoaded: false,
                scale: 1,
                rows: 6,
                cols: 3,
                frame: 0
            }
        }
        this.requiredToLoad = 0;
        this.alreadyLoaded = -1;
        this.sprites = {};
        this.loadAssets();
    }
    loadAssets() {
        for (const key of Object.keys(this.toLoad)) {
            this.requiredToLoad++;
            this.alreadyLoaded++;
            const value = this.toLoad[key];
            const image = new Image();
            image.src = value.src;

            const scale = value.scale ?? 1;
            const rows = value.rows ?? 1;
            const cols = value.cols ?? 1;
            const frame = value.frame ?? 0;
            
            const sprite = new Sprite(image, scale, rows, cols, frame)
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