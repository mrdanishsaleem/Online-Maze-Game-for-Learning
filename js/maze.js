class Maze {
  constructor(rows, cols, cellSize) {
    this.rows = rows;
    this.cols = cols;
    this.cellSize = cellSize;
    this.grid = this.createGrid();
    this.generateMaze();
    this.exit = { x: cols - 2, y: rows - 2 }; // Exit position
  }

  createGrid() {
    return Array.from({ length: this.rows }, () => Array(this.cols).fill(1));
  }

  generateMaze() {
    let stack = [[1, 1]];
    this.grid[1][1] = 0; // Start at (1,1)
    const directions = [
      [-2, 0],
      [2, 0],
      [0, -2],
      [0, 2],
    ];

    while (stack.length) {
      let [x, y] = stack.pop();
      directions.sort(() => Math.random() - 0.5); // Randomize directions

      for (let [dx, dy] of directions) {
        let nx = x + dx,
          ny = y + dy;
        if (
          nx > 0 &&
          ny > 0 &&
          nx < this.rows - 1 &&
          ny < this.cols - 1 &&
          this.grid[nx][ny] === 1
        ) {
          this.grid[x + dx / 2][y + dy / 2] = 0; // Open path
          this.grid[nx][ny] = 0;
          stack.push([nx, ny]);
        }
      }
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (this.grid[row][col] === 1) {
          ctx.fillStyle = "black";
          ctx.fillRect(
            col * this.cellSize + 1, // Adjusted for thin walls
            row * this.cellSize + 1,
            this.cellSize - 2, // Reduce wall thickness
            this.cellSize - 2
          );
        }
      }
    }

    // Draw exit (goal)
    ctx.fillStyle = "green";
    ctx.fillRect(
      this.exit.x * this.cellSize + 2,
      this.exit.y * this.cellSize + 2,
      this.cellSize - 4,
      this.cellSize - 4
    );
  }
}
