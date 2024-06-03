const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const grid = 20;
let snake = [{ x: 10, y: 10 }], food, dir = 'right';
let score = 0, gameOver = false;

function newFood() {
  food = { x: Math.floor(Math.random() * (canvas.width / grid)), y: Math.floor(Math.random() * (canvas.height / grid)) };
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i ? 'lime' : 'green'; 
    ctx.fillRect(snake[i].x * grid, snake[i].y * grid, grid - 1, grid - 1); 
  }
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * grid, food.y * grid, grid - 1, grid - 1);
}

function update() {
  if (gameOver) return;
  let head = { x: snake[0].x, y: snake[0].y };
  switch (dir) {
    case 'up': head.y--; break;
    case 'down': head.y++; break;
    case 'left': head.x--; break;
    case 'right': head.x++; break;
  }
  if (head.x < 0 || head.x >= canvas.width / grid || head.y < 0 || head.y >= canvas.height / grid || checkCollision(head)) {
    gameOver = true;
    alert('Игра окончена! Счет: ' + score);
    return;
  }
  snake.unshift(head);
  if (head.x == food.x && head.y == food.y) {
    score++;
    newFood();
  } else {
    snake.pop();
  }
  draw();
}

function checkCollision(head) {
  for (let i = 1; i < snake.length; i++) {
    if (head.x == snake[i].x && head.y == snake[i].y) return true;
  }
}

document.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp': if (dir != 'down') dir = 'up'; break;
    case 'ArrowDown': if (dir != 'up') dir = 'down'; break;
    case 'ArrowLeft': if (dir != 'right') dir = 'left'; break;
    case 'ArrowRight': if (dir != 'left') dir = 'right'; break;
  }
});

newFood();
setInterval(update, 100); 