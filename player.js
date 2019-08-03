
class Player {

    constructor(x, y) {
        this.x = x
        this.y = y

        // load sprites from spriteSheet
        this.downImg = this.loadSprites(10, 9);
        this.rightImg = this.loadSprites(11, 9);
        this.upImg = this.loadSprites(8, 9);
        this.leftImg = this.loadSprites(9, 9);

        this.downFiring = this.loadSprites(18, 13);
        this.rightFiring = this.loadSprites(19, 13);
        this.upFiring = this.loadSprites(16, 13);
        this.leftFiring = this.loadSprites(17, 13);

        this.dir = "RIGHT";
        this.imgIndex = 0;
        this.animationTimer = 1;

    }

    update() {

    }

    draw() {
        if (this.dir == 'DOWN') {
            image(this.downImg[this.imgIndex], this.x, this.y);
            return;
        }
        if (this.dir == 'RIGHT') {
            image(this.rightImg[this.imgIndex], this.x, this.y);
            return;
        }
        if (this.dir == 'UP') {
            image(this.upImg[this.imgIndex], this.x, this.y);
            return;
        }
        if (this.dir == 'LEFT') {
            image(this.leftImg[this.imgIndex], this.x, this.y);
            return;
        }
    }

    loadSprites(row, cols) {
        let animations = []
        for (let i = 0; i < cols; i++) {
            animations.push(playerSpriteSheet.get(i * 64, row * 64, 64, 64));
        }
        return animations;
    }

}
