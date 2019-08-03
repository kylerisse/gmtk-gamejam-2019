
class Arrow {

    constructor(x, y) {
        this.loc = createVector(x, y)
        this.speed = 10
        this.onPlayer = true
        this.inFlight = false
        this.force = createVector(0, 0) 
    }

    update() {
        if (this.onPlayer) {
            return
        }
        if (this.inFlight) {
            this.loc.add(this.force)
        }
    }

    draw() {
        if (!this.onPlayer) {
            image(arrowImage, this.loc.x, this.loc.y, 63, 15)
        }
    }

    fire() {
        if (this.onPlayer) {
            this.inFlight = true
            this.onPlayer = false
            let mouseVect = createVector(mouseX - this.loc.x, mouseY - this.loc.y)
            console.log(mouseX)
            console.log(mouseY)
            console.log(mouseVect)
            mouseVect.normalize()
            console.log(mouseVect)
            this.force = mouseVect.copy().mult(this.speed)
        }
    }

}