class ResetButton {
  constructor(x, y) {
    this.x = x;
    this.y = windowHeight - floor((windowHeight - board.w)/4);
    this.a = 1.5 * a;
    this.b = floor(a * 0.4);

  }


  show = function() {
    fill(255);
    rect(this.x - this.a / 2, this.y - this.b / 2, this.a, this.b)
    textAlign(CENTER);
    textSize(this.b-3);
    stroke(0);
    fill(0);
    text('RESET', this.x, this.y + this.b / 2 - 3);
  }

  checkButton = function(x, y) {
    if (x > this.x - this.a / 2 && x < this.x + this.a / 2 && y > this.y - this.b / 2 && y < this.y + this.b / 2) {
      rc++
      if (rc >= 3) {
        resetGame();
      }
    }
  }

}
