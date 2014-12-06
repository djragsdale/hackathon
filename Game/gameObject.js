/**
 * Created by Hamilton on 12/6/14.
 */


function GameObject (x, y, w, h, type) {

    this.speed = 2;
    // spritesheet coords
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    // location to be drawn
    this.drawX = 0;
    this.drawY = 0;
    this.isMovable = false;

    this.draw = function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(spritesheet, this.x, this.y, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
    };

    this.setPosition = function (x, y) { // primarily used for player holding object
        this.drawX = x;
        this.drawY = y;
    };


}

