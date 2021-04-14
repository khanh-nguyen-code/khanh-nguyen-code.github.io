class Ball {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.d = 2 * r;
        this.xVelocity = -4;
        this.yVelocity = 3;
    }

    show(instance) {
        instance.color(255);
        instance.ellipse(this.x, this.y, this.d, this.d);
    }

    move(instance) {
        this.x += this.xVelocity;
        this.y += this.yVelocity;
        this.bounce(instance);
    }

    bounce(instance) {
        if (this.x - this.r <= 0 || this.x + this.r >= instance.width) {
            this.xVelocity *= -1;
        }
        if (this.y - this.r <= 0 || this.y + this.r >= instance.height) {
            this.yVelocity *= -1;
        }
    }
}

export {Ball};