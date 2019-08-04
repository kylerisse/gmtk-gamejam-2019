
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
                if (p[0] == 0 && p[1] == 0 && p[2] == 0 && p[3] == 255) {
                    walls.push(new Wall(x * 32, y * 32, 32, 32));
                } 
                // zombie
                if (p[1] == 255) {
                    zombies.push(new Zombie(x * 32, y * 32));
                }
                // player
                if (p[0] == 255) {
                    player.x = x * 32;
                    player.y = y * 32;
                }
            }
        }
    }
}
