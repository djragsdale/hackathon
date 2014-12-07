
var canvasWidth = 800;
var canvasHeight = 480;
var fps = 30;
var level = {};
var levelObjectStore = [];
var player = new Player(0,0,23,60);

player.move(50);
levelObjectStore.push(player); // this needs to be removed

//Set canvas dimensions in dom
$('#game').attr("height", canvasHeight);
$('#game').attr("width", canvasWidth);

function init() {
    $.ajax({
        url: "Game/Levels/testLevel.json",
        type: "GET",
        dataType: 'json'
    }).done(function(data) {
        level = data;
        //initialize level objects into levelObjectsStore
        for(var i = 0; i < level.objects.length; i ++) {
            var go = level.objects[i];
            levelObjectStore.push(
                new GameObject(go.x, go.y, go.objectType)
            );
        }
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
    player.update();
    console.log(player.getMoves());

}

function drawObjects() {
    player.draw();
    for (var i = 1; i < levelObjectStore.length; i++) {
        levelObjectStore[i].draw();
    }
}


