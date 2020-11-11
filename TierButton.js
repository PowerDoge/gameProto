function TierButton(x, y, t, c, textcol) {
  this.x = x;
  this.y = y;
  this.a = a / 2;
  this.t = t;
  this.c = c;
  this.textcol = textcol;
  this.id = this.c[0] + this.t;
  this.count = 0;
  this.act = true;


  this.show = function() {
    fill(this.c);
    rect(this.x - this.a / 2, this.y - this.a / 2, this.a, this.a);
    textAlign(CENTER);
    fill(this.textcol);
    text(this.t, this.x, this.y + 10);
  }

  this.dots = function() {
    let temp = 3 - this.count;
    let temp1 = this.y - this.a / 2;
    fill(0);
    for (let i = 0; i < 3-this.count; i++) {
      ellipse(this.x - this.a, temp1, 10, 10);
      temp1 += 15;
    }
  }

  this.checkButton = function(x, y, c) {
    if (this.act) {
      if (x > this.x - this.a / 2 && x < this.x + this.a / 2 && y > this.y - this.a / 2 && y < this.y + this.a / 2) {
        if (c % 2 == 0 && this.c[0] == 'b') {
          curTier = this.t;
          print("bbooom")
        } else if (c % 2 == 1 && this.c[0] == 'w') {
          curTier = this.t;
          print("bbooom")
        }
      }

    }
  }

  this.tierCount = function(t, c) {
    let temp;

    switch (c) {
      case 255:
        temp = 'w';
        break;
      case 0:
        temp = 'b';
        break;
    }
    temp += t;

    if (temp == this.id) {
      this.count++;
    }
    if (this.count >= 3) {
      this.act = false;
    }
  }

}
