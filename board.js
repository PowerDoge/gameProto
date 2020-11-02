let gridCount = 6;

function Board(a) {
  this.x = windowWidth / 2 - ((a * gridCount) / 2);
  this.y = 50;

  this.show = function() {
    stroke(1);
    fill(255);
    rect(this.x, this.y, a * gridCount, a * gridCount);
  }

}
