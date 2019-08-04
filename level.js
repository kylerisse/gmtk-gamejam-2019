
class Level {

    constructor(img) {
        this.img = img
    }

    loadLevel() {
        zombies = [];
        walls = [];
        playerArrow = undefined;

        for (let x = 0; x <= 32; x++) {
            for (let y = 0; y <= 24; y++) {
                let p = this.img.get(x, y);

                // wall / black pixel
                if (p[0] < 64 && p[1] < 64 && p[2] < 64 && p[3] >= 200) {
                    walls.push(new Wall(x * 32, y * 32, 32, 32));
                } 
                // zombie
                if (p[1] >= 200) {
                    zombies.push(new Zombie(x * 32, y * 32));
                }
                // player
                if (p[0] >= 200) {
                    player.dir = 90;
                    player.aimCharge = 0;
                    player.aiming = false;
                    player.imgIndex = 0;
                    player.animationTimer = 1;
                    player.movingUp = false;
                    player.movingDown = false;
                    player.movingLeft = false;
                    player.movingRight = false;
                    player.x = x * 32;
                    player.y = y * 32;
                }
            }
        }
    }
}
