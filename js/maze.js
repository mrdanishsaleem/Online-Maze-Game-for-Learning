class Maze {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.grid = this.createGrid();
    this.generateMaze();
    this.exit = { x: cols - 2, y: rows - 2 };
  }

  createGrid() {
    return Array.from({ length: this.rows }, () => Array(this.cols).fill(1));
  }

  generateMaze() {
    let stack = [[1, 1]];
    this.grid[1][1] = 0;
    const directions = [
      [-2, 0],
      [2, 0],
      [0, -2],
      [0, 2],
    ];

    while (stack.length) {
      let [x, y] = stack.pop();
      directions.sort(() => Math.random() - 0.5);
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
          this.grid[x + dx / 2][y + dy / 2] = 0;
          this.grid[nx][ny] = 0;
          stack.push([nx, ny]);
        }
      }
    }
  }
}
