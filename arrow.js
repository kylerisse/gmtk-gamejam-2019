class Arrow {
    constructor(base, vec) {
        this.base = base;
        this.vec = vec;
    }

    draw(color) {
        push();
        stroke(color);
        strokeWeight(3);
        fill(color);
        translate(this.base.x, this.base.y);
        line(0, 0, this.vec.x, this.vec.y);
        rotate(this.vec.heading());
        let arrowSize = 5;
        translate(this.vec.mag() - Arrow.HEAD_SIZE, 0);
        triangle(
            0,
            Arrow.HEAD_SIZE / 2,
            0,
            -Arrow.HEAD_SIZE / 2,
            Arrow.HEAD_SIZE,
            0
        );
        pop();
    }

    check_collision(e) {}

    get_bounce(e) {}

    update() {}

    static Fire(x, y, dir) {
        const arrow = Arrow(createVector(x, y), dir);
    }

    static get LENGTH() {
        return 20;
    }

    static get HEAD_SIZE() {
        return 5;
    }
}
