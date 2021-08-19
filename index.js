var canvas = document.getElementById('canvas');
var livesCount = document.querySelector('.livesCount');
var scoreCount = document.querySelector('.scoreCount');
var board = document.querySelector('.board').getBoundingClientRect();
var ctx = canvas.getContext('2d');
ctx.canvas.width = board.width;
ctx.canvas.height = board.height;

var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 5;
var dy = -5;

var ballRadius = 30;
var paddleHeight = 10;
var paddleWidth = 300;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;

var lives = 3;
let ballColor = '#FFBCBC';
let paddleColor = '#C490E4';
let hitCounts = 0;
let count = 0;
livesCount.innerHTML = lives;
scoreCount.innerHTML = hitCounts;

let user = 'Harry Potter';

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = ballColor;
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  checkSpeed();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
      hitCounts++;
      count++;
      scoreCount.innerHTML = hitCounts;
    } else {
      lives--;
      livesCount.innerHTML = lives;
      if (!lives) {
        alert('GAME OVER ✨. Your Score : ' + hitCounts);
        document.location.reload();
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 3;
        dy = -3;
        paddleX = (canvas.width - paddleWidth) / 2;
        count = 0;
      }
    }
  }

  x += dx;
  y += dy;

  if (rightPressed) {
    paddleX += 7;
    if (paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth;
    }
  } else if (leftPressed) {
    paddleX -= 7;
    if (paddleX < 0) {
      paddleX = 0;
    }
  }
  requestAnimationFrame(draw);
}
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = paddleColor;
  ctx.fill();
  ctx.closePath();
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

function keyDownHandler(e) {
  if (e.key == 'Right' || e.key == 'ArrowRight') {
    rightPressed = true;
  } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == 'Right' || e.key == 'ArrowRight') {
    rightPressed = false;
  } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
    leftPressed = false;
  }
}

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

function checkSpeed() {
  if (count < 3) {
    dx = dx > 0 ? 5 : -5;
    dy = dy > 0 ? 5 : -5;
    ballRadius = 25;
    ballColor = '#F6C6EA';
    paddleWidth = 350;
  } else if (count < 6) {
    dx = dx > 0 ? 7 : -7;
    dy = dy > 0 ? 7 : -7;
    ballRadius = 20;
    ballColor = '#ff7f50';
    paddleWidth = 300;
  } else if (count < 10) {
    dx = dx > 0 ? 9 : -9;
    dy = dy > 0 ? 9 : -9;
    ballRadius = 15;
    ballColor = '#ff6b81';
    paddleWidth = 275;
  } else if (count < 15) {
    dx = dx > 0 ? 10 : -10;
    dy = dy > 0 ? 10 : -10;
    ballRadius = 10;
    ballColor = '#7bed9f';
    paddleWidth = 240;
  } else if (count < 20) {
    dx = dx > 0 ? 11 : -11;
    dy = dy > 0 ? 11 : -11;
    ballColor = '#1e90ff';
    paddleWidth = 200;
  }
}

function getUserName() {
  let name = prompt('Please enter your name:', 'Harry Potter');
  if (name == null || name == '') {
    name = 'Harry Potter';
  }
  document.getElementById('username').innerHTML = name;
  draw();
}

document.getElementById('username').innerHTML = 'Harry potter';
getUserName();
// draw();
