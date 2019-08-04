class Arrow {
    constructor(base, vec, length, speed) {
        this.base = base;
        this.vec = vec;
        this.length = length === undefined ? Arrow.DEFAULT_LENGTH : length;
        this.speed = speed === undefined ? Arrow.DEFAULT_SPEED : speed;
    }

    draw(color) {
        const head = this.get_arrow_head();
        push();
        stroke(color);
        strokeWeight(3);
        fill(color);
        translate(this.base.x, this.base.y);
        line(0, 0, head.x, head.y);
        rotate(this.vec.heading());
        translate(this.length - Arrow.HEAD_SIZE, 0);
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

    check_collision(e) {
        const head = p5.Vector.add(
            this.get_next_arrow_base(),
            p5.Vector.mult(this.vec, this.length)
        );

        return collidePointRect(head.x, head.y, e.x, e.y, e.w, e.h);
    }

    get_arrow_head() {
        return p5.Vector.mult(this.vec, this.length);
    }

    get_next_arrow_base() {
        return p5.Vector.add(this.base, p5.Vector.mult(this.vec, this.speed));
    }

    bounce(poly) {}

    update(poly) {
        if (!poly) {
            this.base = this.get_next_arrow_base();
        } else {
            this.vec = createVector(this.vec.x * -1, this.vec.y * -1);
        }
    }

    get_shortest_vector_to_poly(poly) {
        const lines = poly.get_lines;

        let vector = null;

        lines.forEach(line => {});
    }

    static Fire(e_x, e_y, offset_scalar, to_x, to_y) {
        const vec = p5.Vector.sub(
            createVector(to_x, to_y),
            createVector(e_x, e_y)
        ).normalize();

        const offset = p5.Vector.mult(vec, offset_scalar);
        const base = createVector(e_x, e_y).add(offset);

        const arrow = new Arrow(base, vec);

        return arrow;
    }

    static get DEFAULT_LENGTH() {
        return 20;
    }

    static get HEAD_SIZE() {
        return 2;
    }

    static get DEFAULT_SPEED() {
        return 40;
    }
}
