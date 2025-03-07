export class Vector2 {
    x: number;
    y: number;
    
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(addend: Vector2): Vector2 {
        return new Vector2(this.x+addend.x, this.y+addend.y)
    }

    sub(subtrahend: Vector2): Vector2 {
        return new Vector2(this.x-subtrahend.x, this.y-subtrahend.y);
    }

    multiply(multiplier: number): Vector2 {
        return new Vector2(this.x*multiplier, this.y*multiplier);
    }

    isZero(): boolean {
        return (this.x === 0 && this.y === 0);
    }

    len(): number {
        return (Math.sqrt(this.x*this.x + this.y*this.y))
    }

    normalized() {
        const len = this.len();
        this.x = this.x/len;
        this.y = this.y/len;
        //return new Vector2(this.x/len, this.y/len);
    }
}