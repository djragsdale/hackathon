
var canvasWidth = 800;
var canvasHeight = 480;
var fps = 30;
var level = {};
var levelObjectStore = [];
var player = new Player();
console.log(player);

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
        for(var i; i < level.objects.length; i ++) {
            var go = level.objects[i];
            levelObjectStore.push({ id: i, obj: new gameObject(go.objectType, go.x, go.y, (go.image) ? go.image : ""), changed: true });
        }

        levelObjectStore.push(player);
    }).fail(function() {
        alert('Failed to load level!');
    });
}

init();


setInterval(function() {
    update();

    draw();
}, 1000 / fps);

function update() {
    if (player.getMoves() != 0) {
        player.update();
    }
}

function draw() {
    for (var i = 0; i < levelObjectStore.length; i ++) {
        if(levelObjectStore[i].changed) {
            levelObjectStore.clearObj();
            levelObjectStore.drawObj();
        }
    }
}


