var zombieSpriteSheet;
var zombies;
var groundImage;
var playerSpriteSheet;
var player;
var playerArrow;

const topEdge = 30;
const bottomEdge = 688;
const rightEdge = 890;
const leftEdge = 30;

function preload() {
    zombieSpriteSheet = loadImage('images/zombie/zombie.png');
    groundImage = loadImage('images/ground/ground.png', 128, 128);
    playerSpriteSheet = loadImage('images/player/player.png');
}

function setup() {
    createCanvas(1024, 768);
    frameRate(30);
    zombies = [];
    player = new Player(width / 2, height / 2);
}

function draw() {
    background(groundImage);
    for (let i = zombies.length - 1; i >= 0; i--) {
        zombies[i].update();
        zombies[i].draw();
        if (zombies[i].x < -100 || zombies[i].x > width + 100) {
            zombies.splice(i, 1);
            return;
        }
        if (zombies[i].y < -100 || zombies[i].y > height + 100) {
            zombies.splice(i, 1);
            return;
        }
    }
    player.update();
    player.draw();

    if (playerArrow !== undefined) {
        playerArrow.update();
        playerArrow.draw('white');
    }
}

function keyReleased() {
    // left
    if (keyCode === 65) {
        player.movingLeft = false;
    }
    // right
    if (keyCode === 68) {
        player.movingRight = false;
    }
    // up
    if (keyCode === 87) {
        player.movingUp = false;
    }
    // down
    if (keyCode === 83) {
        player.movingDown = false;
    }
}

function keyPressed() {
    // left
    if (keyCode === 65) {
        player.movingLeft = true;
    }
    // right
    if (keyCode === 68) {
        player.movingRight = true;
    }
    // up
    if (keyCode === 87) {
        player.movingUp = true;
    }
    // down
    if (keyCode === 83) {
        player.movingDown = true;
    }
}

function mouseReleased() {
    player.aiming = false;
    player.fire();
}

function mousePressed() {
    player.aiming = true;
}
