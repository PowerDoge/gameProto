var a = 90; //Cell width
var tileW = 80;
let button;
let topText;

var cellGrid;
var tiles = [];

var count = 0;
let bTotal = 0;
let wTotal = 0;
var mod;
var cursX;
var cursY;

var moved = false;
var placed = false;
var eaten = false;
var active = false;

var curCol;

var canPlace = false;
var canMove = false;
var canEat = false;

var collide = false;



function make2dArray(g) {
  var arr = new Array(g);
  for (let n = 0; n < arr.length; n++) {
    arr[n] = new Array(g);
  }
  // console.log(arr);
  return arr;
}

function kill(m) {
  tiles.splice(m, 1);
}

function counter() {
  if (count < 12) {
    if ((moved && placed) || (eaten && placed)) {
      count += 1;
      moved = false;
      placed = false;
      eaten = false;
      console.log('c: ', count, 'm: ', moved, 'p: ', placed, 'a: ', active);
    }
  } else if (count >= 12) {
    if (moved || eaten) {
      placed = true;
      count += 1;
      moved = false;
      eaten = false;
      console.log('c: ', count, 'm: ', moved, 'p: ', placed, 'a: ', active);
    }
  }
}

function resetGame() {
  count = 0;
  bTotal = 0;
  wTotal = 0;
  cursX = undefined;
  cursY = undefined;
  moved = false;
  placed = false;
  eaten = false;
  active = false;
  curCol = undefined;
  canPlace = false;
  canMove = false;
  canEat = false;
  collide = false;

  tiles.splice(0, tiles.length);


  for (let i1 = 0; i1 < gridCount; i1++) {
    for (let j1 = 0; j1 < gridCount; j1++) {
      cellGrid[i1][j1].isFree = true;
      cellGrid[i1][j1].valid = 0;
    }
  }

}

function gameCheck(c) {
  let temp = c%2;
  switch (temp) {
    case 1:
      wTotal+=1;
      break;
    case 0:
      bTotal+=1;
  }

  if (bTotal == 6) {
    alert('Black win!');
    resetGame();
  }
  if (wTotal == 6) {
    alert('White win!');
    resetGame();
  }
  return bTotal, wTotal;
}

function PrintText() {
  this.x = canvas.width / 2;
  this.y = 30;
  let temp2;
  let temp3;
  // console.log(temp3);

  this.update = function(b,w) {
    temp3 = count % 2;
    switch (temp3) {
      case 0:
        temp3 = `B: ${b}   Black\'s turn!   W: ${w}`;
        break;
      case 1:
        temp3 = `B: ${b}   White\'s turn!   W: ${w}`;
        break;
      default:
        temp3 = `B: ${b}   Black\'s turn!   W: ${w}`;
    }
  }


  this.show = function() {
    textAlign(CENTER);
    textSize(30);
    fill(0);
    text(temp3, this.x, this.y);
  }

}


function setup() {
  createCanvas(600, 650);
  board = new Board(a);
  cellGrid = make2dArray(gridCount);
  for (let i1 = 0; i1 < gridCount; i1++) {
    for (let j1 = 0; j1 < gridCount; j1++) {
      cellGrid[i1][j1] = new Cell(board.x + a * j1, board.y + a * i1, a, j1, i1);
    }
  }

  var mod = count % 2;
  print(mod);

  button = createButton('reset');
  button.position(canvas.width / 2 - 25, 610);
  button.mousePressed(resetGame);

  topText = new PrintText(mod);

}

function draw() {
  background(255);
  for (let i = 0; i < gridCount; i++) {
    for (let j = 0; j < gridCount; j++) {
      cellGrid[i][j].show();
    }
  }
  for (let tc = 0; tc < tiles.length; tc++) {
    tiles[tc].show();
  }

  topText.update(bTotal, wTotal);
  topText.show();
}

function mousePressed() {
  console.log(mouseX, mouseY);
  for (let i = 0; i < gridCount; i++) {
    for (let j = 0; j < gridCount; j++) {
      cellGrid[i][j].mouseCheck(mouseX, mouseY, count, tileW);
    }
  }
  // console.log('--------pressed--------');
  // console.log(grid);
  // console.log('--------pressed--------');
}

function mouseReleased() {
  if (canPlace) {
    var tile = new Tile(cursX, cursY, curCol, tileW, 1);
    tiles.push(tile);
    placed = !placed
    counter();
    canPlace = !canPlace;
  } else if (canMove) {
    for (let t1 = 0; t1 < tiles.length; t1++) {
      if (tiles[t1].state == 'act') {
        tiles[t1].moveTile(cursX, cursY);
        moved = !moved;
        active = !active;
        // console.log('c: ', count, 'm: ', moved, 'p: ', placed, 'a: ', active);
        counter();
        canMove = !canMove;
        tiles[t1].state = 'wait';
      }
    }
    for (let i = 0; i < gridCount; i++) {
      for (let j = 0; j < gridCount; j++) {
        cellGrid[i][j].valid = 0;
      }
    }
  } else if (canEat) {
    for (let t3 = 0; t3 < tiles.length; t3++) {
      if (cursX == tiles[t3].x && cursY == tiles[t3].y) {
        kill(t3);
        gameCheck(count)
      }
    }

    for (let t1 = 0; t1 < tiles.length; t1++) {
      if (tiles[t1].state == 'act') {
        tiles[t1].moveTile(cursX, cursY);
        tiles[t1].tier += 1;
        eaten = !eaten;
        moved = !moved;
        active = !active;
        console.log('c: ', count, 'm: ', moved, 'p: ', placed, 'a: ', active);
        counter();
        canEat = !canEat;
        tiles[t1].state = 'wait';
      }
    }
    for (let i = 0; i < gridCount; i++) {
      for (let j = 0; j < gridCount; j++) {
        cellGrid[i][j].valid = 0;
      }
    }
  }
}
//
// function windowResized() {
//   // console.log(windowWidth, windowHeight);
//   if (windowWidth > 650 && windowHeight > 650) {
//     resizeCanvas(windowWidth, windowHeight);
//   } else {
//     resizeCanvas(600, 650);
//     // console.log(canvas.width, canvas.height);
//   }
// }
