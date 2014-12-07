/**
 * Created by Hamilton on 12/6/14.
 */



function GameObject (x, y, type) {


    this.speed = 2;
    // spritesheet coords
    this.x = 65 * (type - 1);
    this.y = 65;
    this.width = 65;
    this.height = 70;
    // location to be drawn
    this.drawX = x;
    this.drawY = y;
    this.isMovable = false;

    this.draw = function() {
        //console.log(spritesheet);
        //context.clearRect(this.drawX, this.drawY, this.width, this.height);
        //context.fillStyle = '#000000';
        //context.fillRect(0,0,20,20);
        context.drawImage(spritesheet, this.x, this.y, this.width, this.height, this.drawX, this.drawY ,this.width, this.height);
    };

    this.setPosition = function (x, y) { // primarily used for player holding object
        this.drawX = x;
        this.drawY = y;
    };


}

