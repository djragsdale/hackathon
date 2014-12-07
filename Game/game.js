
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
                new GameObject(go.x, go.y, go.objectType)
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

setInterval(function() {
    update();
    drawObjects();
    //collision();
}, 1000 / fps);


function update() {
    levelObjectStore[0].update();
    gravity();
    //levelObjectStore[0].drawY = clamp(levelObjectStore[0].drawY, (canvasHeight - level.baseLine), (canvasHeight - level.height));
    levelObjectStore[0].drawX = clamp(levelObjectStore[0].drawX, 0, level.width);
    for(var i = 0; i < levelObjectStore.length; i++) {
            var result = checkCollisions(i);
            if(result) {
                if(levelObjectStore[i].drawX > levelObjectStore[result.idx].drawX) {
                    levelObjectStore[i].drawX = levelObjectStore[result.idx].drawX + levelObjectStore[result.idx].width + 1;
                } else {
                    levelObjectStore[i].drawX = levelObjectStore[result.idx].drawX - levelObjectStore[i].width - 1;
                }
            }
    }
}

function checkCollisions(i) {
    for(j = i + 1; j < levelObjectStore.length; j++) {
        if((levelObjectStore[i].drawX < levelObjectStore[j].drawX) && (levelObjectStore[i].drawX + levelObjectStore[i].width >= levelObjectStore[j].drawX)) {
            return { idx: j, axis: 'x' };
        } else if ((levelObjectStore[i].drawX > levelObjectStore[j].drawX) && (levelObjectStore[i].drawX <= levelObjectStore[j].drawX + levelObjectStore[j].width)) {
            return { idx: j, axis: 'x' };
        }
    }
    return false;
}

function gravity() {
    for(var i = 0; i < levelObjectStore.length; i++) {
        if(levelObjectStore[i].drawY + levelObjectStore[i].height < canvasHeight) {
            levelObjectStore[i].drawY += (level.gravity * .01);
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
