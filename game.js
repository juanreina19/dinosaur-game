document.addEventListener('keydown', function (event) {
    if (event.keyCode == 32) {
        console.log('jump');
        if (level.dead == false) {
            jump();
        }
        else {
            level.speed = 9;
            level.dead = false;
            cloud.speed = 1;
            cactus.x = ancho + 100;
            cloud.x = ancho + 100;
            level.score = 0;
        }
    }
});

var imgRex, imgCloud, imgCactus, imgFloor;

function loadImages() {
    imgRex = new Image();
    imgCloud = new Image();
    imgCactus = new Image();
    imgFloor = new Image();

    imgRex.src = 'img/rex.png';
    imgCloud.src = 'img/cloud.png';
    imgCactus.src = 'img/cactus.png';
    imgFloor.src = 'img/floor.png';
}


var ancho = 700;
var alto = 300;
var canvas, ctx;

function initialize() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    loadImages();
}

function removeCanvas() {
    canvas.width = ancho;
    canvas.height = alto;
}
var floor = 150
var trex = { y: floor, vy: 0, gravity: 2, jump: 28, vymax: 9, jumping: false };
var level = { speed: 9, score: 0, dead: false };
var cactus = { x: ancho + 100, y: floor + 40 };
var cloud = { x: 400, y: 70, speed: 1 };
var floorg = { x: 0, y: floor }

function drawRex() {
    ctx.drawImage(imgRex, 0, 0, 500, 500, 100, trex.y, 180, 180)
}


function drawCloud() {
    ctx.drawImage(imgCloud, 0, 0, 512, 512, cloud.x, cloud.y, 60, 60)
}

function logicCloud() {
    if (cloud.x < -100) {
        cloud.x = ancho + 100;
    }
    else {
        cloud.x -= cloud.speed;
    }
}

function drawCactus() {
    ctx.drawImage(imgCactus, 0, 0, 670, 373, cactus.x, cactus.y, 110, 70)
}

function logicCactus() {
    if (cactus.x < -100) {
        cactus.x = ancho + 100;
        level.score++;
    }
    else {
        cactus.x -= level.speed;
    }
}

function drawFloor() {
    ctx.drawImage(imgFloor, floorg.x, 0, 1024, 768, 0, floorg.y, 1024, 125)
}

function logicFloor() {
    if (floorg.x > 300) {
        floorg.x = 0;
    }
    else {
        floorg.x += level.speed;
    }
}

function jump() {
    trex.jumping = true;
    trex.vy = trex.jump;

}

function gravity() {
    if (trex.jumping == true) {
        if (trex.y - trex.vy - trex.gravity > floor) {
            trex.jumping = false;
            trex.vy = 0;
            trex.y = floor;
        }
        else {
            trex.vy -= trex.gravity;
            trex.y -= trex.vy;
        }
    }
}

function crash() {
    if (cactus.x >= 100 && cactus.x <= 175) {
        if (trex.y >= floor - 25) {
            level.dead = true;
            level.speed = 0;
            cloud.speed = 0;
        }
    }
}


function Score() {
    ctx.font = "30px impact";
    ctx.fillStyle = '#555555';
    ctx.fillText(`${level.score}`, 600, 50);

    if (level.dead == true) {
        ctx.font = "60px impact";
        ctx.fillText(`GAME OVER`, 240, 150);
    }
}


var FPS = 60;
setInterval(function () {
    main();
}, 1000 / FPS);

function main() {
    removeCanvas();
    gravity();
    crash();
    logicFloor();
    logicCactus();
    logicCloud();
    drawFloor();
    drawCloud();
    drawCactus();
    drawRex();
    Score();
}
