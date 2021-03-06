let a; //Cell width
let tileW;
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
let rc = 0;

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
      rc=0;
      console.log('c: ', count, 'm: ', moved, 'p: ', placed, 'a: ', active);
    }
  } else if (count >= 12) {
    if (moved || eaten) {
      placed = true;
      count += 1;
      moved = false;
      eaten = false;
      rc=0;
      console.log('c: ', count, 'm: ', moved, 'p: ', placed, 'a: ', active);
    }
  }
}

function resetGame() {
  count = 0;
  rc = 0;
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

// '''FUNCTIONS'''
function gameCheck(c) {
  let temp = c % 2;
  switch (temp) {
    case 1:
      wTotal += 1;
      break;
    case 0:
      bTotal += 1;
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

// '''SETUP'''
function setup() {
  var mod = count % 2;
  createCanvas(windowWidth, windowHeight);
  board = new Board();
  a = floor(board.w / 6);
  tileW = floor(a * 0.9);
  cellGrid = make2dArray(gridCount);
  for (let i1 = 0; i1 < gridCount; i1++) {
    for (let j1 = 0; j1 < gridCount; j1++) {
      cellGrid[i1][j1] = new Cell(board.x + a * j1, board.y + a * i1, a, j1, i1);
    }
  }

  rb = new ResetButton(windowWidth / 2, board.y + board.w);
  topText = new PrintText(mod);
}

// '''DRAW'''
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
  rb.show();
}

// '''EVENTS'''
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
  rb.checkButton(mouseX, mouseY);
  return false;
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
  return false;
}
