class Player {
  constructor() {
    this.x = 20; // Start position
    this.y = 20;
    this.size = 20;
    this.image = new Image();
    this.image.src = "assets/angry-bird.png"; // Ensure correct path
  }

  move(dx, dy, maze) {
    let newX = this.x + dx;
    let newY = this.y + dy;

    let gridX = Math.floor(newX / this.size);
    let gridY = Math.floor(newY / this.size);

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
    ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
  }
}
