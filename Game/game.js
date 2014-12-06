(function() {
    'use strict';

    var canvasWidth = 800;
    var canvasHeight = 480;
    var fps = 30;
    var level = {};
    var levelObjectStore = [];

    //Set canvas dimensions in dom
    $('#game').attr("height", canvasHeight);
    $('#game').attr("width", canvasWidth);

    var canvas = document.getElementById('game');
    var context = canvas.getContext('2d');

    function init() {
        $.ajax({
            url: "/Game/Levels/" + player.currentLevel,
            type: "GET",
            dataType: 'json'
        }).done(function(data) {
            level = data;
            //initialize level objects into levelObjectsStore
            for(var i; i < level.objects.length; i ++) {
                var go = level.objects[i];
                levelObjectStore.push({ id: i, obj: new gameObject(go.objectType, go.x, go.y, (go.image) ? go.image : ""), changed: true });
            }
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
        (player.moveDistance != 0) ? player.x += (player.moveDistance > 0) ? -1 : 1 : false ;
        if(player.moveDistance != 0) {
            player.x += player.speed;
            player.moveDistance += (player.moverDistance > 0) ? -1 : 1;
        }
        if (player.jumpHeight > 0) {
            player.y += 5;
            player.jumpHeight--;
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


})();