function Tile(x, y, c, w, t) {
  this.x = x;
  this.y = y;
  this.c = c;
  this.w = w;
  this.tier = t;
  this.state = '';

  switch (this.c){
    case 255:
      this.tc = 0;
      break;
    case 0:
      this.tc = 255;
      break;
  }

  this.show = function() {
    fill(this.c);
    // rectMode(CENTER)
    rect(this.x - this.w / 2, this.y - this.w / 2, this.w, this.w);
    fill(this.tc);
    textAlign(CENTER);
    textSize(20);
    text(this.tier, this.x, this.y+8);
  }

  this.tierCheck = function() {
    for (let i = 0; i < gridCount; i++) {
      for (let j = 0; j < gridCount; j++) {
        console.log();
        cellGrid[i][j].collideCheck(this.x - a / 2, this.y - a / 2, this.tier);

      }
    }
    // console.log(cellGrid);
  }


  this.moveTile = function(x, y) {
    this.x = x;
    this.y = y;
  }
}

let tierList = [
  [
    [0, 0, 0, 0, 0],
    [0, 2, 1, 2, 0],
    [0, 1, 4, 1, 0],
    [0, 2, 1, 2, 0],
    [0, 0, 0, 0, 0],
  ],
  [
    [0, 0, 3, 0, 0],
    [0, 0, 3, 0, 0],
    [3, 3, 4, 3, 3],
    [0, 0, 3, 0, 0],
    [0, 0, 3, 0, 0],
  ],
  [
    [0, 0, 0, 0, 0],
    [0, 3, 3, 3, 0],
    [0, 3, 4, 3, 0],
    [0, 3, 3, 3, 0],
    [0, 0, 0, 0, 0],
  ],
  [
    [0, 0, 3, 0, 0],
    [0, 3, 3, 3, 0],
    [3, 3, 4, 3, 3],
    [0, 3, 3, 3, 0],
    [0, 0, 3, 0, 0],
  ],
  [
    [3, 0, 3, 0, 3],
    [0, 3, 3, 3, 0],
    [3, 3, 4, 3, 3],
    [0, 3, 3, 3, 0],
    [3, 0, 3, 0, 3],
  ],
  [
    [3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3],
    [3, 3, 4, 3, 3],
    [3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3],
  ]
];
