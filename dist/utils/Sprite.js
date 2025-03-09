class Sprite {
    constructor(image, scale, rows, cols, frame) {
        this.image = image;
        this.rows = rows;
        this.cols = cols;
        this.scale = scale;
        this.frame = frame;
        this.maxFrames = (rows * cols) - 1;
        this.imageSize = 100 * this.scale; //100 is just preference
        this.frameWidth = this.image.width / cols;
        this.frameHeight = this.image.height / rows;
        this.playing = false;
        this.anims = {};
        this.animID = null;
        this.currentAnim = "none";
        this.flipX = false;
    }
    draw(ctx, pos) {
        if (this.frame > this.maxFrames) {
            console.error('sprite frame is out of bounds');
            return;
        }
        const frameX = this.frame % this.cols;
        const frameY = Math.floor(this.frame / this.cols);
        const frameWidth = this.frameWidth;
        const frameHeight = this.frameHeight;
        const imageSize = this.imageSize;
        const drawImage = (posX, imageSize) => {
            ctx.drawImage(this.image, frameX * this.frameWidth, frameY * this.frameHeight, frameWidth, frameHeight, posX, pos.y, imageSize, Math.abs(imageSize));
        };
        if (this.flipX) {
            ctx.save();
            ctx.scale(-1, 1);
            drawImage(-pos.x, -imageSize);
            ctx.restore();
        }
        else {
            drawImage(pos.x, imageSize);
        }
    }
    animations(anims) {
        Object.assign(this.anims, anims);
    }
    play(animName) {
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
            interval = Math.abs(anim.speed * 20);
        }
        let lastTime = performance.now();
        const loop = (currentTime) => {
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
        };
        requestAnimationFrame(loop);
    }
    stop() {
        if (this.animID !== null) {
            cancelAnimationFrame(this.animID);
        }
    }
}
export default Sprite;
//# sourceMappingURL=Sprite.js.map