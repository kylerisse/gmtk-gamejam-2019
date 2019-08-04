class Zombie {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 64;

        this.exists = true;

        // load sprites from spriteSheet
        this.downImg = this.loadSprites(0);
        this.rightImg = this.loadSprites(1);
        this.upImg = this.loadSprites(2);
        this.leftImg = this.loadSprites(3);

        this.dir = 'UP';
        this.imgIndex = 0;
        this.moving = true;
        this.animationTimer = 1;

        // temporary random stuff timer
        this.doRandomStuffTimer = 199;
    }

    update(hit_by_arrow) {
        if (hit_by_arrow) {
            this.exists = false;
        }

        if (this.moving) {
            this.animationTimer++;
            if (this.animationTimer > 10) {
                this.animationTimer = 0;
                if (this.imgIndex > 1) {
                    this.imgIndex = 0;
                } else {
                    this.imgIndex++;
                }
            }
            if (this.dir == 'DOWN') {
                if (!this.wallCollides(0, 1)) {
                    this.y += 1;
                }
            }
            if (this.dir == 'RIGHT') {
                if (!this.wallCollides(1, 0)) {
                    this.x += 1;
                }
            }
            if (this.dir == 'UP') {
                if (!this.wallCollides(0, -1)) {
                    this.y -= 1;
                }
            }
            if (this.dir == 'LEFT') {
                if (!this.wallCollides(-1, 0)) {
                    this.x -= 1;
                }
            }
            if (this.playerCollides()) {
                gameState = 'DEAD';
            }
        }

        // do random stuff for now
        if (this.doRandomStuffTimer > 200) {
            let newMoving = random(1);
            if (newMoving > 0.5) {
                this.moving = true;
            } else {
                this.moving = false;
            }
            this.doRandomStuffTimer = 0;
            let newDir = floor(random(4));
            if (newDir == 0) {
                this.dir = 'DOWN';
            }
            if (newDir == 1) {
                this.dir = 'RIGHT';
            }
            if (newDir == 2) {
                this.dir = 'UP';
            }
            if (newDir == 3) {
                this.dir = 'LEFT';
            }
        }
        this.doRandomStuffTimer++;
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

    loadSprites(row) {
        let animations = [];
        for (let i = 0; i < 3; i++) {
            animations.push(zombieSpriteSheet.get(i * 64, row * 64, 64, 64));
        }
        return animations;
    }

    wallCollides(x, y) {
        for (let wall of walls) {
            if (this.x + x == wall.x || this.x + x == wall.x + wall.w) {
                return true;
            }
            if (this.y + y == wall.y || this.y + y == wall.y + wall.h) {
                return true;
            }
        }
        return false;
    }

    get h() {
        return this.w;
    }

    playerCollides() {}
    /***
    playerCollides() {
        if (this.x > player.x && this.x < player.x + player.w) {
            return true;
        }
        if (this.y > player.y && this.y < player.y + player.w) {
            return true;
        }
    }
    ***/
}
