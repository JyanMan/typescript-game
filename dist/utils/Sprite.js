class Sprite {
    constructor(image, scale, rows, cols, frame) {
        this.image = image;
        this.rows = rows;
        this.cols = cols;
        this.scale = scale;
        this.frame = frame;
        this.maxFrames = (rows * cols) - 1;
        this.frameWidth = this.image.width / cols;
        this.frameHeight = this.image.height / rows;
        this.playing = false;
        this.anims = {};
        this.animID = null;
    }
    draw(ctx, pos) {
        if (this.frame > this.maxFrames) {
            console.error('sprite frame is out of bounds');
            return;
        }
        const frameX = this.frame % this.cols;
        const frameY = Math.floor(this.frame / this.rows);
        ctx.drawImage(this.image, frameX * this.frameWidth, frameY * this.frameHeight, this.frameWidth, this.frameHeight, pos.x, pos.y, this.image.width, this.image.height);
    }
    animations(anims) {
        Object.assign(this.anims, anims);
    }
    play(anim) {
        this.stop();
        this.frame = anim.from;
        this.playing = true;
        let interval = 300;
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