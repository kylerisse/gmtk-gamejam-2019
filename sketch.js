
var zombieSpriteSheet;
var zombies;
var groundImage;
var playerSpriteSheet;
var player;

function preload() {
    zombieSpriteSheet = loadImage('images/zombie/zombie.png');
    groundImage = loadImage('images/ground/ground.png', 128, 128);
    playerSpriteSheet = loadImage('images/player/player.png');
}

function setup() {
    createCanvas(1024, 768);
    zombies = [];
    player = new Player(width / 2, height / 2);
}

function draw() {
    background(groundImage)
    for (let i = zombies.length - 1; i >= 0; i--) {
        zombies[i].update()
        zombies[i].draw()
        if (zombies[i].x < -100 || zombies[i].x > width + 100) {
            zombies.splice(i, 1);
            return
        }
        if (zombies[i].y < -100 || zombies[i].y > height + 100) {
            zombies.splice(i, 1);
            return
        }
    }
    player.update();
    player.draw();
}

function keyReleased() {
    // left
    if (keyCode === 65) {

    }
    // right
    if (keyCode === 68) {

    }
    // up
    if (keyCode === 87) {

    }
    // down
    if (keyCode === 83) {

    }
}

function keyPressed() {
    // left
    if (keyCode == 65) {

    }
    // right
    if (keyCode == 68) {

    }
    // up
    if (keyCode === 87) {

    }
    // down
    if (keyCode == 83) {

    }
}

function mouseReleased() {

}

function mousePressed() {
    zombies.push(new Zombie(mouseX, mouseY));
}
