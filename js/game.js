const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;

let maze, player, goalImage;

function newGame() {
  maze = new Maze(25, 25);
  player = new Player();

  goalImage = new Image();
  goalImage.src = "assets/eggs.png"; // Ensure correct path

  goalImage.onload = () => {
    gameLoop();
  };
}

document.getElementById("newMazeBtn").addEventListener("click", newGame);

document.addEventListener("keydown", (event) => {
  const step = 20;
  if (event.key === "ArrowUp") player.move(0, -step, maze);
  if (event.key === "ArrowDown") player.move(0, step, maze);
  if (event.key === "ArrowLeft") player.move(-step, 0, maze);
  if (event.key === "ArrowRight") player.move(step, 0, maze);

  checkWin();
  gameLoop();
});

function checkWin() {
  if (player.x === maze.exit.x * 20 && player.y === maze.exit.y * 20) {
    setTimeout(() => alert("🎉 Congratulations! You won!"), 100);
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the maze
  for (let row = 0; row < maze.rows; row++) {
    for (let col = 0; col < maze.cols; col++) {
      if (maze.grid[row][col] === 1) {
        ctx.fillStyle = "black";
        ctx.fillRect(col * 20, row * 20, 20, 20);
      }
    }
  }

  // Draw goal (Eggs)
  ctx.drawImage(goalImage, maze.exit.x * 20, maze.exit.y * 20, 20, 20);

  // Draw player (Angry Bird)
  player.draw(ctx);

  requestAnimationFrame(gameLoop);
}

newGame();
