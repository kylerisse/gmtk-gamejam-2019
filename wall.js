
class Wall {

    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }

    draw() {
        noStroke()
        fill(64)
        rect(this.x, this.y, this.w, this)
    }

    // check if a vector collides with this
    collision(v) {
        if (v.x < this.x || v.x > this.x + w) {
            return false
        }
        if (v.y < this.y || v.y > this.y + h ) {
            return false
        }
        return true
    }

}