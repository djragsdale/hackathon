/**
 * Created by drags on 12/6/2014.
 */
$(function() {
    var DEBUG = true;
    var FADE_TIME = 150; // ms
    var TYPING_TIMER_LENGTH = 400; // ms
    var COLORS = [
        '#e21400', '#91580f', '#f8a700', '#f78b00',
        '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
        '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
    ];

    // Initialize varibles
    var $window = $(window);
    var $inputMessage = $('.inputScript'); // Input message input box

    var $canvas = $('#sandboxCanvas'); // The canvas
    var $script = $('#jsSandbox'); // The script placeholder
    var $txtScript = $('#txtScript'); // The script text area
    var $submitButton = $('#submitButton'); // The submit button

    // Prompt for setting a username
    var username;
    var connected = false;
    var typing = false;
    var lastTypingTime;

    var socket = io();

    function initializeCanvas () {
        if (DEBUG) { console.log('initializeCanvas()') }
        $canvas.style("border", "1px solid #000000");
    }

    function submitScript () {
        if (DEBUG) { console.log('submitScript()') }
        var myScript = $txtScript.val();
        //myScript = cleanInput(message);
        if (myScript) {
            if (DEBUG) { console.log('myScript == true') }
            socket.emit('submit code', myScript);
            //addScript(myScript);
        }
    }

    // Inserts the script into the sandbox w/ the canvas
    function addScript (data) {
        if (DEBUG) { console.log('addScript()') }
        // Add script into page
        //var testScript = '<script>function runMain() { console.log(\'hello, world\'); }</script>';

        //$script.appendChild(testScript);
        //runMain();
    }

    // Changes canvas and stuff
    function drawSomethingOnCanvas () {
        if (DEBUG) { console.log('drawSomethingOnCanvas()') }
        // Draw a square on the page

        //Or just test with something else instead
        initializeCanvas();
    }

    // Can I use this????
    // Prevents input from having injected markup
    function cleanInput (input) {
        if (DEBUG) { console.log('cleanInput()') }
        return $('<div/>').text(input).text();
    }

    // Input events
    $submitButton.click(function () {
        if (DEBUG) { console.log('submitButton.click()') }
        submitScript();
    });
    

    // Socket events
    
    socket.emit('join');
    
    socket.on('joined', function (data) {
        alert('You have joined!');
        $('#sandbox').attr('src', 'sandbox/' + data.file);
        $txtScript = $('#txtScript');
    });

    // Whenever the server emits 'sandbox', add script to sandbox
    socket.on('sandboxed', function (data) {
        // insert code into sandbox
        //addScript(data);
        console.log("sandboxed message received");
        //$('#sandbox')[0].contentWindow.location.reload(true);
        document.getElementById('sandbox').src = document.getElementById('sandbox').src;
        //var myMessage = function (testText) {
        //    console.log(testText);
        //}
        //ensure({ js: "customjs.js?n=" + Math.random() }, function () {
        //    console.log('customjs ensured.');
        //});
        // Perform $.getScript call to app route
        //$.getScript("customjs.js", function (data, textStatus, jqxhr) {
        //    console.log('Script has been gat.');
        //    runMain();
        //});
        //$.ajax({
        //    type: "GET",
        //    url: "customjs.js",
        //    dataType: "script"
        //}).done(function (data) {
        //    console.log('Got the file!');
        //    console.log(data);
        //});
    });

});