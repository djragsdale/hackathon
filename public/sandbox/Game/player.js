/**
 * Created by Hamilton on 12/6/14.
 */




function Player (x, y, w, h) {

    this.condition = {};
    this.type = 0;
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.drawX = 250;
    this.drawY = 150;
    this.speed = 2;
    this.moves = 0;
    this.holding = {};
    this.grabbedObj = false;
    this.hasGravity = true;
    this.currentLevel = "testLevel1.json";
    this.jumpTicks = 0;

    this.steps = 0;
    this.walking = false;
    this.forward = true;

    this.move = function (value) { // accessor for user to create move
        this.moves += value;
        this.forward = (value > 0);
    };

    this.jump = function () { // accessor for user to create jump
        this.jumpTicks = 7;
        this.hasGravity = false;
    };


    this.update = function () { // called from game loop

        if (this.moves != 0) {
            this.walking = true;
            
        } else {
            this.steps = 0;
            this.walking = false;
            $(document).trigger('nextFunction');
        }

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

        if (this.jumpTicks > 0 ) {
            var jumpDis = Math.pow((level.gravity * .3)/(canvas.height - this.drawY), 2);
            this.drawY -= jumpDis;
            this.jumpTicks--;
        }
        else {
            this.hasGravity = true;
        }

    };

    this.grab = function () {
        this.grabbedObj = true;
    };

    this.drop = function () {
        this.grabbedObj = false;
    };

    this.setHolding = function(obj) {
        this.holding = obj;
    };

    this.getMoves =
        function () {
            return this.moves;
        };

    this.draw = function () {
        context.fillStyle = "#000";
        context.fillRect(this.drawX, this.drawY, this.width, this.height);
        if ( this.forward ) {
            if (this.steps % 10 == 0 && this.walking) {
                context.drawImage(spritesheet, 52, this.y, this.width + 4, this.height, this.drawX, this.drawY, this.width + 4, this.height);
                this.steps++;
            }
            else {
                context.drawImage(spritesheet, this.x, this.y, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
                this.steps++;
            }
        }
        else {
            if (this.steps % 10 == 0 && this.walking) {
                context.drawImage(spritesheet, 80, this.y, this.width + 4, this.height, this.drawX, this.drawY, this.width + 4, this.height);
                this.steps++;
            }
            else {
                context.drawImage(spritesheet, 24, this.y, this.width + 4, this.height, this.drawX, this.drawY, this.width + 4, this.height);
                this.steps++;
            }
        }
    };
}
