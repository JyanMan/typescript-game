import Sprite from "./Sprite.js";
import { Vector2 } from "./vector2.js";

interface Sprite2 {
    src: string,
    isLoaded: boolean
}

class Resources {
    toLoad: Record<string, Sprite2>;
    images: Record<string, HTMLImageElement>;
    sprites: Record<string, Sprite>;
    constructor() {
        this.toLoad = {
            player: {
                src: "assets/Cute_Fantasy_Free/Player/Player.png",
                isLoaded: false
            }
        }
        this.images = {};
        this.sprites = {};
        this.loadAssets();
    }
    loadAssets() {
        for (const key of Object.keys(this.toLoad)) {
            const image = new Image();
            image.src = this.toLoad[key].src;
            image.onload = () => {
                this.toLoad[key].isLoaded = true;
            }
            
            this.images[key] = image;
            const sprite = new Sprite(image, 10, 10, 6, 0)
            this.sprites[key] = sprite;
        }
    }
}

export const resources = new Resources();