var player
var walls
var enemies

function setup() {
    createCanvas(800, 600)
    player = new Player(width / 2, height / 2)
    walls = []
    walls.push(new Wall(0, 0, 30, 500))
    walls.push(new Wall(width - 30, 0, 30, 500))
    walls.push(new Wall(0, height - 130, 800, 30))
    walls.push(new Wall(0, 0, 800, 30))
    enemies = []
}

function draw() {
    background(0)
    player.update()
    player.draw()
    for (let i = 0; i < walls.length; i++) {
        walls[i].draw()
    }
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].update()
    }
}

function keyReleased() {
    // left
    if (keyCode === 65) {
        player.movingLeft = false
    }
    // right
    if (keyCode === 68) {
        player.movingRight = false
    }
    // up
    if (keyCode === 87) {
        player.movingUp = false
    }
    // down
    if (keyCode === 83) {
        player.movingDown = false
    }
}

function keyPressed() {
    // left
    if (keyCode == 65) {
        player.movingLeft = true
    }
    // right
    if (keyCode == 68) {
        player.movingRight = true
    }
    // up
    if (keyCode === 87) {
        player.movingUp = true
    }
    // down
    if (keyCode == 83) {
        player.movingDown = true
    }
}

function mouseReleased() {
    player.aiming = false
    player.fire()
}

function mousePressed() {
    player.aiming = true
}
