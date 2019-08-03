class Player {

    constructor(x, y, arrow) {
        // player position
        this.loc = createVector(x, y)
        this.w = 20

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
            this.faceLeft = true
            this.aiming = false
            this.aimCharge = 0
            this.loc.add(this.moveLeft)
        }
        if (this.movingRight) {
            this.faceLeft = false
            this.aiming = false
            this.aimCharge = 0
            this.loc.add(this.moveRight)
        }
    }

    draw() {
        // draw player
        image(playerImages[1], this.loc.x + 18, this.loc.y + 55, 40, 30)
        image(playerImages[0], this.loc.x, this.loc.y, 70, 70)
        let bowI = floor(this.aimCharge / 12)
        if (bowI <= 0) {
            image(bowImages[0], this.loc.x + 60, this.loc.y, 18, 80)
            if (this.arrow.onPlayer) {
                image(arrowImage, this.loc.x + 60, this.loc.y + 30, 63, 15)
            }
        }
        if (bowI === 1) {
            image(bowImages[1], this.loc.x + 56, this.loc.y, 22, 80)
            image(arrowImage, this.loc.x + 56, this.loc.y + 30, 63, 15)
        }
        if (bowI === 2) {
            image(bowImages[2], this.loc.x + 49, this.loc.y, 29, 80)
            image(arrowImage, this.loc.x + 49, this.loc.y + 30, 63, 15)
        }
        if (bowI === 3) {
            image(bowImages[3], this.loc.x + 40, this.loc.y, 38, 80)
            image(arrowImage, this.loc.x + 40, this.loc.y + 30, 63, 15)
        }
        if (bowI >= 4) {
            image(bowImages[4], this.loc.x + 29, this.loc.y, 49, 80)
            image(arrowImage, this.loc.x + 29, this.loc.y + 30, 63, 15)
        }

        // draw arrow
        if (!this.arrow.onPlayer) {
            this.arrow.update()
            this.arrow.draw()
        }

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
            rect(0, height - 20, this.aimCharge * (width / 60), this.w, this.w)
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
            this.arrow.loc = createVector(this.loc.x + 29, this.loc.y + 30)
            this.arrow.fire()
        }
        this.aimCharge = 0
    }

}