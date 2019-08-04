class Arrow {
    constructor(base, vec, speed) {
        this.base = base;
        this.vec = vec;
        this.speed = speed === undefined ? Arrow.DEFAULT_SPEED : speed;
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

    bounce() {}

    update() {
        const dir = this.vec.copy().normalize();
        const mag = this.vec.mag();

        this.base = p5.Vector.add(this.base, p5.Vector.mult(dir, this.speed));
    }

    static Fire(e_x, e_y, offset_scalar, to_x, to_y) {
        const vec = p5.Vector.sub(
            createVector(to_x, to_y),
            createVector(e_x, e_y)
        ).normalize();

        const offset = p5.Vector.mult(vec, offset_scalar);
        const base = createVector(e_x, e_y).add(offset);

        const arrow = new Arrow(base, vec.mult(Arrow.DEFAULT_LENGTH));

        return arrow;
    }

    static get DEFAULT_LENGTH() {
        return 20;
    }

    static get HEAD_SIZE() {
        return 2;
    }

    static get DEFAULT_SPEED() {
        return 20;
    }
}
