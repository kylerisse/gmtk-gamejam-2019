class Player {
    constructor(x, y, arrow) {
        this.x = x;
        this.y = y;
        this.w = 64;

        // Arrow
        this.has_arrow = true;

        // how many pixel per move
        this.speed = 5;

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
            this.dir =
                (Math.atan2(this.x + 32 - mouseX, this.y + 32 - mouseY) * 180) /
                Math.PI;
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
            for (let i = 0; i < this.speed; i++) {
                if (!this.wallCollide(0, -1)) {
                    this.y -= 1;
                }
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
            for (let i = 0; i < this.speed; i++) {
                if (!this.wallCollide(0, 1)) {
                    this.y += 1;
                }
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
            for (let i = 0; i < this.speed; i++) {
                if (!this.wallCollide(1, 0)) {
                    this.x += 1;
                }
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
            for (let i = 0; i < this.speed; i++) {
                if (!this.wallCollide(-1, 0)) {
                    this.x -= 1;
                }
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
        if (this.aimCharge >= 50) {
            arrowSound.play();
            playerArrow = Arrow.Fire(
                this.center_x,
                this.center_y,
                this.w / 2,
                mouseX,
                mouseY
            );
        }
        this.aimCharge = 0;
    }

    wallCollide(x, y) {
        let newX = this.x + x;
        let newY = this.y + y;
        for (let wall of walls) {
            if (newX < wall.x + wall.w &&
                newX + this.w > wall.x &&
                newY < wall.y + wall.h &&
                newY + this.h > wall.y) {
                    return true;
                }
        }
        return false;
    }

    loadSprites(row, cols) {
        let animations = [];
        for (let i = 0; i < cols; i++) {
            animations.push(playerSpriteSheet.get(i * 64, row * 64, 64, 64));
        }
        return animations;
    }

    get center_x() {
        return this.x + this.w / 2;
    }

    get center_y() {
        return this.y + this.w / 2;
    }

    get h() {
        return this.w;
    }
}
