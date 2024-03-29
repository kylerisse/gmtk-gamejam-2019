
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
        rect(this.x, this.y, this.w, this.h)
    }

    // check if a vector collides with this
    collides(v, w, h) {
        if (v.x < this.x || v.x + w < this.x || v.x > this.x + this.w || v.x + w > this.x + this.w) {
            return false
        }
        if (v.y < this.y || v.y + h < this.y || v.y > this.y + this.h || v.y + h > this.y + this.h) {
            return false
        }
        return true
    }

}