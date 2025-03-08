import { Vector2 } from "./vector2.js";

interface Animation {
    from: number,
    to: number,
    loop: boolean
}

class Sprite {
    image: HTMLImageElement;
    rows: number;
    cols: number;
    scale: number;
    frame: number;
    maxFrames: number;
    frameWidth: number;
    frameHeight: number;
    playing: boolean;
    stopPlay: boolean;
    constructor
    (
        image: HTMLImageElement,
        scale: number,
        rows: number,
        cols: number,
        frame: number
    )   {
        this.image = image;
        this.rows = rows;
        this.cols = cols;
        this.scale = scale;
        this.frame = frame;
        this.maxFrames = (rows*cols)-1;

        this.frameWidth = this.image.width/cols;
        this.frameHeight = this.image.height/rows;
        this.playing = false;
        this.stopPlay = false;
    }

    draw(ctx: CanvasRenderingContext2D, pos: Vector2) {
        if (this.frame > this.maxFrames) {
            console.error('sprite frame is out of bounds');
            return;
        }
        const frameX = this.frame%this.cols;
        const frameY = Math.floor(this.frame/this.rows);
        ctx.drawImage(
            this.image, frameX*this.frameWidth, frameY*this.frameHeight,
            this.frameWidth, this.frameHeight, pos.x, 
            pos.y, this.image.width, this.image.height,  
        );
    }

    animations(anims: Record<string, Animation>) {
        for (const key of Object.keys(anims)) {

        }
    }

    play(anim: Animation) {
        this.frame = anim.from;
        this.playing = true;

        const interval = 300;
        let lastTime = performance.now();
        const loop = (currentTime: number) => {            
            //stops anim when stop() function is invoked
            if (this.stopPlay) {
                this.stopPlay = false;
                return;
            }

            //play at certain speed
            const deltaTime = currentTime - lastTime;
            if (deltaTime < interval) {
                requestAnimationFrame(loop);
                return;
            }
            lastTime = currentTime;

            //update frame
            if (this.frame >= anim.to) {
                this.frame = anim.from;
            }
            else {
                this.frame++;
            }

            //loop frame if loop is set to true
            if (anim.loop) {
                requestAnimationFrame(loop.bind(this));
            }
            else {
                this.playing = false;
            }
        }
        requestAnimationFrame(loop);
    }

    stop() {
        this.stopPlay = true;
    }
}

export default Sprite;