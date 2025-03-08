import { Vector2 } from "./vector2.js";

interface Animation {
    from: number,
    to: number,
    loop: boolean,
    speed?: number,
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
    anims: Record<string, Animation>;
    animID: number | null;
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
        this.anims = {};
        this.animID = null;
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
        Object.assign(this.anims, anims);
    }

    play(anim: Animation) {
        this.stop();
        this.frame = anim.from;
        this.playing = true;

        let interval = 300;
        if (anim.speed) { //if speed is set
            if (anim.speed < 0) {
                console.error('speed cannot be less than 0');
            }
            interval = Math.abs(anim.speed*20);
        }
        let lastTime = performance.now();
        const loop = (currentTime: number) => {
            //play at certain speed
            const deltaTime = currentTime - lastTime;
            if (deltaTime < interval) {
                this.animID = requestAnimationFrame(loop);
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
            
            if (anim.loop) {
                this.animID = requestAnimationFrame(loop);
            }
            else {
                this.playing = false;
            }
        }
        requestAnimationFrame(loop);
    }

    stop() {
        if (this.animID !== null) {
            cancelAnimationFrame(this.animID);
        }
    }
}

export default Sprite;