var ballCanvas, ball1, ball2, ball3, box,ballPositions;
window.onload = init;

function init(){
    box = document.getElementById('barContainer');
    ballPositions = document.getElementById('ballPositions');
    ballCanvas = document.getElementById("ballCanvas").getContext("2d");
    ball1 = initBall(), ball2 = initBall(), ball3 = initBall();
    drawBalls();
    
}

function randomize(max, offset){
    offset = offset || 0;
    return Math.floor(Math.random()*max+offset);
}

function initBall() {
    return {
        radius: 30,
        x: randomize(550,10),
        y: randomize(250, 10),
        r: randomize(255),
        g: randomize(255),
        b: randomize(255),
        vx: randomize(5),
        vy: randomize(5)
    };
}

function drawBalls() {
    ballCanvas.fillStyle = "#000000";
    ballCanvas.fillRect(0,0,600, 300);
    drawBall(ball1);
    drawBall(ball2);
    drawBall(ball3);
    displayPositions();
    animate();
}

function displayPositions() {
    ballPositions.innerHTML = `<strong>x: `+ball1.x+`, y : `+ball1.y+`</strong>
    <strong>x: `+ball2.x+`, y : `+ball2.y+`</strong>
    <strong>x: `+ball3.x+`, y : `+ball3.y+`</strong>
    `;
}

function drawBall(ball) {
    ballCanvas.fillStyle = 'rgb('+ball.r+','+ball.g+','+ball.b+')';
    ballCanvas.beginPath();
    ballCanvas.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2, true);
    ballCanvas.fill();

    if (ball.x - ball.radius + ball.vx < 0 || ball.x + ball.radius + ball.vx > 0 + 600) {
      ball.vx = -ball.vx;
    }   

    if (ball.y + ball.radius + ball.vy > 0 + 300 || ball.y - ball.radius + ball.vy < 0) {
      ball.vy = -ball.vy;
    }

    ball.x += ball.vx
    ball.y += ball.vy 
}

var reverse = false;
function moveBox() {
    var x = box.offsetLeft;
    if (x > 600 && !reverse) {
        reverse = true;
    } else if (x < 0) {
        reverse = false;
    }
    box.style.left = box.offsetLeft + (reverse ? -8 : 1)* 2;
}

function doAnimation() {
    drawBalls();
    moveBox();
}

function animate() {
    setTimeout(doAnimation, 17);
    //requestAnimationFrame(doAnimation);
}