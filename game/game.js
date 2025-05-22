const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let car = { x: 125, y: 400, width: 50, height: 80 };
let keys = {};
let obstacles = [];
let score = 0;

document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

function drawCar() {
  ctx.fillStyle = "#a4c639";
  ctx.fillRect(car.x, car.y, car.width, car.height);
}

function drawObstacles() {
  ctx.fillStyle = "#333";
  obstacles.forEach(obs => {
    ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    obs.y += 5;
  });

  obstacles = obstacles.filter(obs => obs.y < canvas.height);
}

function spawnObstacle() {
  const x = Math.random() * (canvas.width - 50);
  obstacles.push({ x, y: -60, width: 50, height: 60 });
}

function detectCollision() {
  for (let obs of obstacles) {
    if (
      car.x < obs.x + obs.width &&
      car.x + car.width > obs.x &&
      car.y < obs.y + obs.height &&
      car.y + car.height > obs.y
    ) {
      alert("💥 Авария! Твой счёт: " + score);
      location.reload();
    }
  }
}

function update() {
  if (keys["ArrowLeft"] && car.x > 0) car.x -= 5;
  if (keys["ArrowRight"] && car.x < canvas.width - car.width) car.x += 5;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawCar();
  drawObstacles();
  detectCollision();

  score++;
  ctx.fillStyle = "#000";
  ctx.font = "16px sans-serif";
  ctx.fillText("Очки: " + score, 10, 20);

  requestAnimationFrame(update);
}

setInterval(spawnObstacle, 1500);
update();