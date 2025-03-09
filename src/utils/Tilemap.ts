import Sprite from "./Sprite.js";
import { Vector2 } from "./vector2.js";

class TileRenderer {
    
    renderTiles(ctx: CanvasRenderingContext2D, tileAtlas: Sprite, mapLayout: Array<Array<number>>) {
        if (!tileAtlas.image.complete) {
            return;
        }
        
        for (let i = 0; i < mapLayout.length; i++) {
            for (let j = 0; j < mapLayout[i].length; j++) {
                const value = mapLayout[i][j];
                tileAtlas.frame = value;
                tileAtlas.draw(ctx, new Vector2(tileAtlas.imageSize*j, tileAtlas.imageSize*i));
            }
        }
    }
}

export const tileRenderer = new TileRenderer();