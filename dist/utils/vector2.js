export class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(addend) {
        return new Vector2(this.x + addend.x, this.y + addend.y);
    }
    sub(subtrahend) {
        return new Vector2(this.x - subtrahend.x, this.y - subtrahend.y);
    }
    multiply(multiplier) {
        return new Vector2(this.x * multiplier, this.y * multiplier);
    }
    isZero() {
        return (this.x === 0 && this.y === 0);
    }
    len() {
        return (Math.sqrt(this.x * this.x + this.y * this.y));
    }
    normalized() {
        const len = this.len();
        this.x = this.x / len;
        this.y = this.y / len;
        //return new Vector2(this.x/len, this.y/len);
    }
}
//# sourceMappingURL=vector2.js.map