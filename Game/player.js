/**
 * Created by Hamilton on 12/6/14.
 */




function Player (x, y, w, h) {

    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.drawX = 250;
    this.drawY = 150;
    this.speed = 2;
    this.moves = 0;
    this.holding = {};
    this.currentLevel = "testLevel1.json";

    this.move = function (value) { // accessor for user to create move
        this.moves += value;
    };

    this.update = function () { // called from game loop

        if (this.moves > 0) { // moving to the right
            this.drawX += this.speed;
            this.moves--;
           // this.holding.setPosition(this.drawX+=this.speed, this.height/2);
        }
        if (this.moves < 0) { // moving to the left
            this.drawX -= this.speed;
            this.moves++;
            //this.holding.setPosition(this.drawY-=this.speed, this.height/2);
        }

    };

    this.grab = function (object) {
        if (object.isMovable) {
            this.holding = object;
            if ( (this.x + this.width) < object.x ) { // player is left of object
                this.holding.setPosition(this.drawX + 10, this.height / 2);
            }
            else { // player is right of the object
                this.holding.setPosition(this.drawX - 10, this.height / 2);
            }
        }
    };

    this.getMoves =
        function () {
      return this.moves;
    };

    this.draw = function () {
        //console.log(spritesheet);
        //context.clearRect(this.x, this.y, this.width, this.height);
        //context.fillStyle = '#000000';
        //context.fillRect(this.drawX, this.drawY, this.width, this.height);
        context.drawImage(spritesheet, this.x, this.y, this.width, this.height, this.drawX, this.drawY ,this.width, this.height);
    };
}
