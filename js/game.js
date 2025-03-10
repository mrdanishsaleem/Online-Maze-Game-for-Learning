const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;

let maze, player;

function newGame() {
  maze = new Maze(25, 25);
  player = new Player();
  gameLoop(); // Start game loop after initializing maze and player
}

document.getElementById("newMazeBtn").addEventListener("click", newGame);

document.addEventListener("keydown", (event) => {
  const step = 20;
  if (event.key === "ArrowUp") player.move(0, -step, maze);
  if (event.key === "ArrowDown") player.move(0, step, maze);
  if (event.key === "ArrowLeft") player.move(-step, 0, maze);
  if (event.key === "ArrowRight") player.move(step, 0, maze);

  checkWin();
  gameLoop(); // Refresh screen after movement
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

  // Draw goal
  ctx.fillStyle = "green";
  ctx.fillRect(maze.exit.x * 20, maze.exit.y * 20, 20, 20);

  // Draw player
  player.draw(ctx);

  requestAnimationFrame(gameLoop);
}

// Start the game initially
newGame();
