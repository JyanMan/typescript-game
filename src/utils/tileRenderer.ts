import Camera from "./camera.js";
import Sprite from "./Sprite.js";
import { Vector2 } from "./vector2.js";

class TileRenderer {
    
    renderTiles(
        ctx: CanvasRenderingContext2D, tileAtlas: Sprite, mapLayout: Array<Array<number>>, 
        camera: Camera, //renderWidth: number, renderHeight: number
    ) {
        if (!tileAtlas.image.complete) {
            return;
        }
        
        for (let i = 0; i < mapLayout.length; i++) {
            for (let j = 0; j < mapLayout[i].length; j++) {
                const tilePos = new Vector2(tileAtlas.imageSize*j, tileAtlas.imageSize*i);
                if (!isWithinRenderView(tilePos, camera, camera.width*1.2, camera.height*1.5)) {
                    continue;
                }
                const value = mapLayout[i][j];
                tileAtlas.frame = value;
                tileAtlas.draw(ctx, tilePos.sub(camera.pos));
            }
        }
    }

}

function isWithinRenderView(tilePos: Vector2, camera: Camera, renderWidth: number, renderHeight: number): boolean {
    const camCenter = camera.getCenter();
    return (
        tilePos.x > camCenter.x-renderWidth/2 &&
        tilePos.x < camCenter.x+renderWidth/2  &&
        tilePos.y > camCenter.y-renderHeight/2 &&
        tilePos.y < camCenter.y+renderHeight/2
    )
}

export const tileRenderer = new TileRenderer();