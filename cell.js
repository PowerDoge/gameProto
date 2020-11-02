let type = ['m', 'b', 'w']; //middle, black, white
// var curI;
// var curJ;

function Cell(x, y, a1, j, i) {
  this.x = x;
  this.y = y;
  this.a = a1;
  this.j = j;
  this.i = i;
  this.isFree = true;
  this.valid = 0;

  switch (i) {
    case 0:
      this.rowType = type[2];
      break;
    case 5:
      this.rowType = type[1];
      break;
    default:
      this.rowType = type[0];
  }

  this.collideCheck = function(x, y, t) {
    if (this.x == x && this.y == y) {
      for (let k = 0; k < 5; k++) {
        for (let l1 = 0; l1 < 5; l1++) {
          if (true) {
            // console.log('k: ', k, 'l1: ', l1);
            if ((this.i - 2 + l1 < 6 && this.i - 2 + l1 >= 0) && (this.j - 2 + k < 6 && this.j - 2 + k >= 0)) {
              cellGrid[this.i - 2 + l1][this.j - 2 + k].valid = tierList[t-1][l1][k];
              // cellGrid[this.i - 2 + k][this.j - 2 + l1].valid = tierList[0][k][l1];
              // console.log(cellGrid[this.j - 2 + k][this.i - 2 + l1].valid, tierList[0][k][l1]);
            }
          }
        }
      }
    }
  }
}

Cell.prototype.show = function() {
  fill(255-this.valid * 30);
  stroke(1);
  rect(this.x, this.y, this.a, this.a);
}

Cell.prototype.mouseCheck = function(x, y, c, w) {

  mod = c % 2;
  // console.log(x, y);
  if (x > this.x && x < this.x + this.a && y > this.y && y < this.y + this.a) {
    cursX = this.x + this.a / 2;
    cursY = this.y + this.a / 2;
    if (!active) {
      if (!moved) {
        if (this.isFree == false) {
          for (let t = 0; t < tiles.length; t++) {
            if (tiles[t].c == 0 && mod == 0) {
              if (cursX == tiles[t].x && cursY == tiles[t].y) {
                tiles[t].state = 'act';
                tiles[t].tierCheck()
                console.log
                this.isFree = true;
                active = !active;
                console.log('c: ', count, 'm: ', moved, 'p: ', placed, 'a: ', active);
              } else {
                tiles[t].state = 'wait';
              }
            } else if (tiles[t].c == 255 && mod == 1) {
              if (cursX == tiles[t].x && cursY == tiles[t].y) {
                tiles[t].state = 'act';
                tiles[t].tierCheck()
                this.isFree = true;
                active = !active;
                console.log('c: ', count, 'm: ', moved, 'p: ', placed, 'a: ', active);
              } else {
                tiles[t].state = 'wait';
              }
            }
          }
        } else if (!placed) {
          if (c < 12) {
            if (mod == 0 && this.rowType == type[1]) {
              curCol = 0;
              canPlace = !canPlace;
              this.isFree = false;
            } else if (mod == 1 && this.rowType == type[2]) {
              curCol = 255;
              canPlace = !canPlace;
              this.isFree = false;
            }
          }
        }
      } else if (!placed) {
        if (c < 12) {
          if (this.isFree) {
            if (mod == 0 && this.rowType == type[1]) {
              curCol = 0;
              canPlace = !canPlace;
              this.isFree = false;
            } else if (mod == 1 && this.rowType == type[2]) {
              curCol = 255;
              canPlace = !canPlace;
              this.isFree = false;
            }
          }
        }
      }
    } else {
      if (!moved) {
        if (this.isFree) {
          if (this.valid == 1 || this.valid == 3){
            for (let t1 = 0; t1 < tiles.length; t1++) {
              if (tiles[t1].state == 'act') {
                if (cursX == tiles[t1].x && cursY == tiles[t1].y) {

                } else {
                  canMove = !canMove;
                  this.isFree = false;
                }
              }
            }
          } else {
            canMove = false;
          }
        } else {
          if (this.valid == 2 || this.valid == 3){
            for (let t2 = 0; t2 < tiles.length; t2++) {
              if (tiles[t2].state == 'act') {
                for (let t3 = 0; t3 < tiles.length; t3++) {
                  if (cursX == tiles[t3].x && cursY == tiles[t3].y) {
                    if (tiles[t2].c != tiles[t3].c) {
                      canEat = !canEat;
                    }
                  }
                }
              }
            }
          } else {
            canEat = false;
          }
        }
      }
    }

    // console.log('cell: ', this.x + this.a / 2, this.y + this.a / 2, )

  }
  return cursX, cursY;
}
