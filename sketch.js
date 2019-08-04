var zombieSpriteSheet;
var zombies;
var groundImage;
var playerSpriteSheet;
var player;
var playerArrow;
var walls;

var arrowSound;
var zombiegrunt;
var zombiehit;
var gameMusic;
var menuMusic;

var levels;
var currentLevel;

var walls;

var gameState;

const WINDOW_WIDTH = 1024;
const WINDOW_HEIGHT = 768;
const EDGE_WALL_THICKNESS = 32;

const topEdge = 30;
const bottomEdge = 688;
const rightEdge = 890;
const leftEdge = 30;


function preload() {
    // graphics
    zombieSpriteSheet = loadImage('images/zombie/zombie.png');
    groundImage = loadImage('images/ground/ground.png', 128, 128);
    playerSpriteSheet = loadImage('images/player/player.png');

    // levels
    level1 = loadImage('levels/level1.png');

    // sounds
    soundFormats('mp3');
    arrowSound = loadSound('sound/arrow.mp3');
    arrowSound.setVolume(0.4);
    zombieGruntSound = loadSound('sound/zombiegrunt.mp3');
    zombieGruntSound.setVolume(0.4);
    zombieHitSound = loadSound('sound/zombiehit.mp3');
    zombieHitSound.setVolume(0.5);
    menuMusic = loadSound('sound/jitters.mp3');
    menuMusic.setVolume(0.1);
    menuMusic.setLoop(true);
    gameMusic = loadSound('sound/gameMusic');
    gameMusic.setVolume(0.1);
    gameMusic.setLoop(true);
}

function setup() {
    createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
    frameRate(30);

    walls = [];

    levels = [];
    levels.push(new Level(level1));
    currentLevel = 1;

    zombies = [];
    gameState = "LOADING";

    player = new Player(width / 2, height / 2);
    gameMusic.play();
}

function draw() {

    if (gameState == "LOADING") {
        levels[currentLevel - 1].loadLevel();
        gameState = "LEVEL";
    }

    if (gameState == "LEVEL") {
        if (!gameMusic.isPlaying()) {
            gameMusic.play();
        }
        background(groundImage);
        for (let i = walls.length - 1; i >= 0; i--) {
            walls[i].draw();
        }
        if (zombies.length > 0 && random(10000) > 9995) {
            zombieGruntSound.play();
        }
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
    if (playerArrow === undefined) {
        player.aiming = true;
    }
}
