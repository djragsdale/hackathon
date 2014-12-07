
var canvasWidth = $('#GameArea').width();
var canvasHeight = $('#GameArea').height();
var fps = 30;
var level = {};
var levelObjectStore = [];
var player = {};
//Set canvas dimensions in dom
canvas.width = canvasWidth;
canvas.height = canvasHeight;

function init() {
    $.ajax({
        url: "Game/Levels/testLevel.json",
        type: "GET",
        dataType: 'json'
    }).done(function(data) {
        level = data;
        //var player = new Player(0,0,23,60);
        player = new Player(4,0,19,58);
        player.drawX = level.playerStart.x;
        player.drawY = 0;
        levelObjectStore.push(player);
        //initialize level objects into levelObjectsStore
        for(var i = 0; i < level.objects.length; i ++) {
            var go = level.objects[i];
            levelObjectStore.push(
                new GameObject(go.x, go.y, go.objectType, go.moveable)
            );
        }
        console.log(levelObjectStore);
    }).fail(function() {
        alert('Failed to load level!');
    });
}

init();

/*setTimeout(function() {
    console.log(levelObjectStore[1]);
    levelObjectStore[1].draw();

},5000);*/
var p = {}; // used in update to store player
setInterval(function() {
    update();
    drawObjects();
}, 1000 / fps);


function update() {
    levelObjectStore[0].update();
    gravity();
    //levelObjectStore[0].drawY = clamp(levelObjectStore[0].drawY, (canvasHeight - level.baseLine), (canvasHeight - level.height));
    levelObjectStore[0].drawX = clamp(levelObjectStore[0].drawX, 0, level.width);
    //p = levelObjectStore[0];
    if (p) {
        p = levelObjectStore[0];
    }
    for(var i = 1; i < levelObjectStore.length; i++) {
        var o = levelObjectStore[i]; // temp storage for game object

        if (o.held == false && p.drawX + p.width > o.drawX && p.drawX < o.drawX + o.width) { // player has passed left edge of object
            p.drawY = o.drawY - p.height;
        }

        if (o.isMovable && p.drawX + p.width > o.drawX - 5) {
            if ( p.grabbedObj ) {
                p.setHolding(levelObjectStore[i]);
                o.held = true;
                o.drawY = canvas.height - (p.height);
                o.drawX = p.drawX + 7;
            }
        }

        p = levelObjectStore[0];
    }
}

function gravity() {
    for(var i = 0; i < levelObjectStore.length; i++) {
        if(levelObjectStore[0].isGravity && levelObjectStore[i].drawY + levelObjectStore[i].height < canvas.height) {
            var fallDis = Math.pow((level.gravity * .45)/(canvas.height - levelObjectStore[i].drawY), 2);
            if(levelObjectStore[i].drawY + levelObjectStore[i].height + fallDis > canvas.height) {
                levelObjectStore[i].drawY = canvas.height - levelObjectStore[i].height;
            } else {
                levelObjectStore[i].drawY += fallDis;
            }
        }


    }
}

function drawObjects() {
    //levelObjectStore[0].draw();
    context.clearRect(0,0, canvas.width, canvas.height);
    for (var i = 0; i < levelObjectStore.length; i++) {
        levelObjectStore[i].draw();
    }
}
