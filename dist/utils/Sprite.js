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
        this.stopPlay = false;
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
        for (const key of Object.keys(anims)) {
        }
    }
    play(anim) {
        this.frame = anim.from;
        this.playing = true;
        const interval = 300;
        let lastTime = performance.now();
        const loop = (currentTime) => {
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
        };
        requestAnimationFrame(loop);
    }
    stop() {
        this.stopPlay = true;
    }
}
export default Sprite;
//# sourceMappingURL=Sprite.js.map