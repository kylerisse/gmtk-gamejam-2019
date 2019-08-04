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

var menuImage;
var aboutImage;

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
    level2 = loadImage('levels/level2.png');

    // menus
    menuImage = loadImage('images/menu.png');
    aboutImage = loadImage('images/about.png');

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
    levels.push(new Level(level2));
    currentLevel = 1;

    zombies = [];
    gameState = 'MENU';

    player = new Player(width / 2, height / 2);
}

function draw() {
    if (gameState == 'MENU') {
        background(menuImage);
        if (gameMusic.isPlaying()) {
            gameMusic.stop();
        }
        if (!menuMusic.isPlaying()) {
            menuMusic.play();
        }
    }

    if (gameState == 'ABOUT') {
        background(aboutImage);
    }

    if (gameState == "DEAD") {
        fill(255, 0, 0, 25);
        rect(0, 0, 1024, 768);
    }

    if (gameState == 'LOADING') {
        levels[currentLevel - 1].loadLevel();
        gameState = 'LEVEL';
    }

    if (gameState == 'LEVEL') {
        if (menuMusic.isPlaying()) {
            menuMusic.stop();
        }
        if (!gameMusic.isPlaying()) {
            gameMusic.play();
        }
        background(groundImage);
        for (let i = walls.length - 1; i >= 0; i--) {
            walls[i].draw();
        }
        if (zombies.length <= 0) {
            if (currentLevel + 1 > levels.length) {
                currentLevel = 1;
            } else {
                currentLevel++;
            }
            gameState = 'LOADING';
        }
        if (random(10000) > 9995) {
            zombieGruntSound.play();
        }
        for (let i = zombies.length - 1; i >= 0; i--) {
            zombies[i].update();
            zombies[i].draw();
            if (!zombies[i].exists) {
                zombies.splice(i, 1);
            }
        }
        player.update();
        player.draw();

        if (playerArrow !== undefined) {
            playerArrow.update();
            playerArrow.draw('white');
        }

        if (playerArrow !== undefined) {
            let wall_hit = null;
            walls.forEach(wall => {
                if (playerArrow.check_collision(wall)) {
                    wall_hit = wall;
                }
            });
    
            playerArrow.update(wall_hit);
            playerArrow.draw('white');
        }
    }
}

function keyReleased() {
    if (gameState === 'LEVEL') {
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
}

function keyPressed() {
    if (gameState === 'LEVEL') {
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
}

function mouseReleased() {
    if (gameState == 'LEVEL') {
        player.aiming = false;
        player.fire();
    }
}

function mousePressed() {
    if (gameState === 'LEVEL') {
        if (playerArrow === undefined) {
            player.aiming = true;
        }
    }
    if (gameState == 'MENU') {
        if (mouseX > 450 && mouseX < 650 && mouseY > 530 && mouseY < 600) {
            gameState = 'LOADING';
        }
        if (mouseX > 710 && mouseX < 975 && mouseY > 530 && mouseY < 600) {
            gameState = 'ABOUT';
        }
    }
    if (gameState == 'ABOUT') {
        if (mouseX > 120 && mouseX < 240 && mouseY > 640 && mouseY < 700) {
            gameState = 'MENU';
        }
    }
    if (gameState == 'DEAD') {
        gameState = 'MENU';
    }
}
