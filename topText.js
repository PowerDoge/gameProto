function PrintText() {
  let temp2;
  let temp3;
  let wideScr = upperUIy;
  let slimScr = floor(windowWidth / 12);
  let fontSize = wideScr > slimScr ? slimScr : wideScr;

  this.x = windowWidth / 2;
  this.y = board.y - fontSize / 2;
  // console.log(temp3);

  this.update = function(b, w) {
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
    textSize(fontSize);
    fill(0);
    text(temp3, this.x, this.y);
  }

}
