let gridCount = 6;

function Board() {
  if (windowWidth <= windowHeight) {
    this.w = floor(windowWidth - windowWidth / 5);
  } else {
    this.w = floor(windowHeight - windowHeight / 5);
  }
  this.x = floor(windowWidth / 2 - this.w / 2);
  this.y = floor(windowHeight / 2 - this.w / 2);

  this.show = function() {
    stroke(1);
    fill(225);
    rect(this.x, this.y, this.w, this.w);
  }

}
