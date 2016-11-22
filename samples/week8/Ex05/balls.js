var ballCanvas, ball1, ball2, ball3, box;
window.onload = init;

function init(){
    box = document.getElementById('barContainer');
    ballCanvas = document.getElementById("ballCanvas").getContext("2d");
    ball1 = initBall(5), ball2 = initBall(2), ball3 = initBall(7);
	
	ball2.radius = 40;
	ball3.radius = 20;
    drawBalls();
    
}

function randomize(max, offset){
    offset = offset || 0;
    return Math.floor(Math.random()*max+offset);
}

function initBall(velocityFactor) {
    return {
        radius: 30,
        x: randomize(550,10),
        y: randomize(250, 10),
        r: randomize(255),
        g: randomize(255),
        b: randomize(255),
        vx: randomize(velocityFactor,1),
        vy: randomize(velocityFactor,1)
    };
}

function drawBalls() {
    ballCanvas.fillStyle = "#000000";
    ballCanvas.fillRect(0,0,600, 300);
    drawBall(ball1);
    drawBall(ball2);
    drawBall(ball3);

    animate();
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

function moveBox() {
    var x = box.offsetLeft;
    if (x < 600) {
        box.style.left = box.offsetLeft + 1;
    } else {
        box.style.left = box.offsetLeft -1;
    }
}

function doAnimation() {
    drawBalls();
    //moveBox();
}

function animate() {
	console.log(Date.now());
    setTimeout(doAnimation, 17);
    //requestAnimationFrame(doAnimation);
}