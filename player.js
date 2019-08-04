class Player {
    constructor(x, y, arrow) {
        this.x = x;
        this.y = y;
        this.w = 64;

        // Arrow
        this.has_arrow = true;

        // load sprites from spriteSheet
        this.downImg = this.loadSprites(10, 9);
        this.rightImg = this.loadSprites(11, 9);
        this.upImg = this.loadSprites(8, 9);
        this.leftImg = this.loadSprites(9, 9);

        this.downFiring = this.loadSprites(18, 13);
        this.rightFiring = this.loadSprites(19, 13);
        this.upFiring = this.loadSprites(16, 13);
        this.leftFiring = this.loadSprites(17, 13);

        this.dir = 90;
        this.imgIndex = 0;
        this.animationTimer = 1;

        // movement states
        this.movingUp = false;
        this.movingDown = false;
        this.movingLeft = false;
        this.movingRight = false;
    }

    update() {
        this.dir =
            (Math.atan2(this.x + 32 - mouseX, this.y + 32 - mouseY) * 180) /
            Math.PI;
        console.log(this.dir);
    }

    draw() {
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

    loadSprites(row, cols) {
        let animations = [];
        for (let i = 0; i < cols; i++) {
            animations.push(playerSpriteSheet.get(i * 64, row * 64, 64, 64));
        }
        return animations;
    }
}
