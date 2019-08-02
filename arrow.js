
class Arrow {

    constructor(x, y) {
        this.loc = createVector(x, y)
        this.speed = 5
        this.onPlayer = true
        this.inFlight = false
        this.dir = createVector(0, 0)
    }

    update() {
        if (this.onPlayer) {
            return
        }
        if (this.inFlight) {
            this.loc = createVector
        }
    }

    draw() {

    }

    fire() {
        if (this.onPlayer) {
            this.inFlight = true
            this.onPlayer = false
            // TODO
            // this.dir = no clue
        }
    }

}