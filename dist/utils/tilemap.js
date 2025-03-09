import { Vector2 } from "./vector2.js";
class TileRenderer {
    // tileAtlas: Sprite;
    // mapLayout: Array<Array<number>>; 
    // constructor(tileAtlas: Sprite, mapLayout: Array<Array<number>>) {
    //     //for testingg purposes
    //     this.tileAtlas = tileAtlas;
    //     this.mapLayout = mapLayout;
    // }
    renderTiles(ctx, tileAtlas, mapLayout) {
        if (!tileAtlas.image.complete) {
            return;
        }
        for (let i = 0; i < mapLayout.length; i++) {
            for (let j = 0; j < mapLayout[i].length; j++) {
                const value = mapLayout[i][j];
                tileAtlas.frame = value;
                tileAtlas.draw(ctx, new Vector2(tileAtlas.imageSize * j, tileAtlas.imageSize * i));
            }
        }
    }
}
export const tileRenderer = new TileRenderer();
//# sourceMappingURL=Tilemap.js.map