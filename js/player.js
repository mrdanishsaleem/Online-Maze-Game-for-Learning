class Player {
  constructor() {
    this.x = 20; // Start position (aligned with grid)
    this.y = 20;
    this.size = 20; // Size of player matches grid cell size
  }

  move(dx, dy, maze) {
    let newX = this.x + dx;
    let newY = this.y + dy;

    let gridX = Math.floor(newX / this.size);
    let gridY = Math.floor(newY / this.size);

    // Ensure movement is within maze bounds and not into a wall
    if (
      gridY >= 0 &&
      gridY < maze.rows &&
      gridX >= 0 &&
      gridX < maze.cols &&
      maze.grid[gridY][gridX] === 0
    ) {
      this.x = newX;
      this.y = newY;
    }
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(
      this.x + this.size / 2,
      this.y + this.size / 2,
      this.size / 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
}
