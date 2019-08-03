
class Player {

    constructor(x, y) {
        this.x = x
        this.y = y
        this.w = 64
        // how many pixel per move
        this.speed = 5

        // load sprites from spriteSheet
        this.downImg = this.loadSprites(10, 9);
        this.rightImg = this.loadSprites(11, 9);
        this.upImg = this.loadSprites(8, 9);
        this.leftImg = this.loadSprites(9, 9);

        this.downFiring = this.loadSprites(18, 9);
        this.rightFiring = this.loadSprites(19, 9);
        this.upFiring = this.loadSprites(16, 9);
        this.leftFiring = this.loadSprites(17, 9);

        // aiming states
        this.dir = 90;
        this.aimCharge = 0;
        this.aiming = false;

        // sprite animation
        this.imgIndex = 0;
        this.animationTimer = 1;

        // movement states
        this.movingUp = false;
        this.movingDown = false;
        this.movingLeft = false;
        this.movingRight = false;

    }

    update() {
        if (this.aiming) {
            // get current direction based on mouse if aiming
            this.dir = Math.atan2(this.x + 32 - mouseX, this.y + 32 - mouseY) * 180 / Math.PI;
            if (this.aimCharge < 60) {
                this.aimCharge++;
            }
            return;
        }

        // move player
        if (this.movingUp) {
            this.aimCharge = 0;
            this.dir = 0;
            this.animationTimer++;
            if (this.animationTimer > 5) {
                this.imgIndex = (this.imgIndex + 1) % this.upImg.length;
                this.animationTimer = 1;
            }
            if (this.y + this.speed > topEdge) {
                this.y -= this.speed;
            }
        } 
        if (this.movingDown) {
            this.aimCharge = 0;
            this.dir = -180;
            this.animationTimer++;
            if (this.animationTimer > 5) {
                this.imgIndex = (this.imgIndex + 1) % this.downImg.length;
                this.animationTimer = 1;
            }
            if (this.y + this.speed < bottomEdge) {
                this.y += this.speed;
            }
        }
        if (this.movingRight) {
            this.aimCharge = 0;
            this.dir = -90;
            this.animationTimer++;
            if (this.animationTimer > 5) {
                this.imgIndex = (this.imgIndex + 1) % this.rightImg.length;
                this.animationTimer = 1;
            }
            if (this.x + this.speed < rightEdge) {
                this.x += this.speed;
            }
        }
        if (this.movingLeft) {
            this.aimCharge = 0;
            this.dir = 90;
            this.animationTimer++;
            if (this.animationTimer > 5) {
                this.imgIndex = (this.imgIndex + 1) % this.leftImg.length;
                this.animationTimer = 1;
            }
            if (this.x + this.speed > leftEdge) {
                this.x -= this.speed;
            }
        }
    }

    draw() {
        if (!this.aiming) {
            // dir down
            if (this.dir < -135 || this.dir >= 135) {
                image(this.downImg[this.imgIndex], this.x, this.y);
                return;
            }
            // dir right
            if (this.dir < -45 && this.dir >= -135) {
                image(this.rightImg[this.imgIndex], this.x, this.y);
                return;
            }
            // dir up
            if (this.dir < 45 && this.dir >= -45) {
                image(this.upImg[this.imgIndex], this.x, this.y);
                return;
            }
            // dir left
            if (this.dir < 135 && this.dir >= 45) {
                image(this.leftImg[this.imgIndex], this.x, this.y);
                return;
            }
        }
        // aiming animations
        let bowI = floor(this.aimCharge / 6.7);
        // down
        if (this.dir < -135 || this.dir >= 135) {
            image(this.downFiring[bowI], this.x, this.y);
        }
        // right
        if (this.dir < -45 && this.dir >= -135) {
            image(this.rightFiring[bowI], this.x, this.y);
        }
        if (this.dir < 45 && this.dir >= -45) {
            image(this.upFiring[bowI], this.x, this.y);
        }
        if (this.dir < 135 && this.dir >= 45) {
            image(this.leftFiring[bowI], this.x, this.y);
        }
    }

    fire() {
        this.aimCharge = 0;
        // call arrow fire
    }

    loadSprites(row, cols) {
        let animations = []
        for (let i = 0; i < cols; i++) {
            animations.push(playerSpriteSheet.get(i * 64, row * 64, 64, 64));
        }
        return animations;
    }

}
