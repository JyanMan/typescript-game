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
    currentAnim: string;
    flipX: boolean;
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
        this.currentAnim = "none";
        this.flipX = false;
    }

    draw(ctx: CanvasRenderingContext2D, pos: Vector2) {
        if (this.frame > this.maxFrames) {
            console.error('sprite frame is out of bounds');
            return;
        }
        ctx.save();
        const frameX = this.frame%this.cols;
        const frameY = Math.floor(this.frame/this.cols);
        const frameWidth = this.frameWidth;
        const frameHeight = this.frameHeight;

        //draww flipped
        if (this.flipX) {
            ctx.scale(-1, 1);
            ctx.drawImage(
                this.image, frameX*this.frameWidth, frameY*this.frameHeight,
                frameWidth, frameHeight, -pos.x, 
                pos.y, -this.image.width, this.image.height  
            ); //flipped is negative posx and image width;
        }   //heck this works somehow, idk man, damn!!!
        else {
            ctx.drawImage(
                this.image, frameX*this.frameWidth, frameY*this.frameHeight,
                frameWidth, frameHeight, pos.x, 
                pos.y, this.image.width, this.image.height  
            );
        }
        ctx.restore();
    }

    drawFlippedImage(ctx: CanvasRenderingContext2D, pos: Vector2) {
        ctx.save();
        ctx.scale(-1, 1);
        ctx.restore();
    }

    animations(anims: Record<string, Animation>) {
        Object.assign(this.anims, anims);
    }

    play(animName: string) {
        const anim = this.anims[animName];
        if (!anim) {
            return;
        }
        this.stop();
        this.frame = anim.from;
        this.playing = true;
        let interval = 200;
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