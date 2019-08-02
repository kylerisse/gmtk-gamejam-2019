class Player {

    constructor(x, y, arrow) {
        // player position
        this.loc = createVector(x, y)

        // weapon controls
        this.aiming = false
        this.aimCharge = 0 // 60 to fire

        // movement states
        this.movingUp = false
        this.movingDown = false
        this.movingLeft = false
        this.movingRight = false

        // set initial movement vectors
        this.speed = 3
        this.moveUp = createVector(0, 0)
        this.moveDown = createVector(0, 0)
        this.moveUp = createVector(0, 0)
        this.moveUp = createVector(0, 0)

        // call setSpeed to multiply directions by the speed
        this.setSpeed(this.speed)

        // the player's arrow
        this.arrow = new Arrow(this.loc.x, this.loc.y)
    }

    update() {
        if (this.arrow.onPlayer && this.aiming && this.aimCharge < 60) {
            this.aimCharge += 1 
            console.log("charging: " + this.aimCharge + "/60")
        }
        if (this.movingUp) {
            this.aiming = false
            this.aimCharge = 0
            this.loc.add(this.moveUp)
        }
        if (this.movingDown) {
            this.aiming = false
            this.aimCharge = 0
            this.loc.add(this.moveDown)
        }
        if (this.movingLeft) {
            this.aiming = false
            this.aimCharge = 0
            this.loc.add(this.moveLeft)
        }
        if (this.movingRight) {
            this.aiming = false
            this.aimCharge = 0
            this.loc.add(this.moveRight)
        }
    }

    draw() {
        // draw player
        fill(255, 0, 0)
        ellipse(this.loc.x, this.loc.y, 20)

        // draw arrow
        this.arrow.draw()

        // draw arrow bar
        if (this.aimCharge >= 60) {
            fill(0, 255, 0)
        } else if (this.arrow.onPlayer) {
            fill(128, 128, 0)
        } else {
            fill(128)
        }
        rect(0, height - 20, width, 20)
        if (this.aimCharge > 0 && this.aimCharge < 60) {
            fill(32, 128, 0)
            rect(0, height - 20, this.aimCharge * (width / 60), 20)
        } 
    }

    // call setSpeed whenever player speed changes
    // this way we're not having to create new vectors at every fame
    setSpeed(speed) {
        this.speed = speed
        this.moveUp = createVector(0, -1).mult(this.speed)
        this.moveDown = createVector(0, 1).mult(this.speed)
        this.moveLeft = createVector(-1, 0).mult(this.speed)
        this.moveRight = createVector(1, 0).mult(this.speed)
    }

    fire() {
        if (this.aimCharge === 60) {
            console.log("Fire")
        }
        this.aimCharge = 0
    }

}