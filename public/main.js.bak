/**
 * Created by drags on 12/6/2014.
 */
$(function() {
    var DEBUG = true;
    var COLORS = [
        '#e21400', '#91580f', '#f8a700', '#f78b00',
        '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
        '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
    ];

    // Initialize varibles
    var $window = $(window);
    var $inputMessage = $('.inputScript'); // Input message input box

    var $txtScript = $('#txtScript'); // The script text area
    var $submitButton = $('#submitButton'); // The submit button
    var $functionList = $('#functionList'); // The list of functions
    var $btnGrabFunctions = $('#btnGrabFunctions'); // grabs the list of functions

    // Prompt for setting a username
    var username;
    var connected = false;
    var typing = false;
    var lastTypingTime;

    var socket = io();

    function submitScript () {
        if (DEBUG) { console.log('submitScript()') }
        //var myScript = $txtScript.val();
        var myScript = document.getElementById('txtScript').value;
        
        var sampleCode = "\n";
        sampleCode += "var functions = [];";
        
        var functionList = document.getElementById("functionList");
        var functionItems = functionList.getElementsByTagName("li");
        for (var i = 0; i < functionItems.length; i++) {
            sampleCode += "\n";
            sampleCode += "functions.push(" + functionItems[i].innerText + ");";
        }
        
        sampleCode += "\n\n";
        sampleCode += "for (var i = 0; i < functions.length; i++) {\n";
        sampleCode += "    var functionItem = functions[i];\n";
        sampleCode += "    setTimeout(function() { functionItem(); }, 2000);\n";
        sampleCode += "}\n";
        
        myScript += sampleCode;
        
        console.log('Generating script for sandbox.');
        console.log(myScript);

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
    }

    // Can I use this????
    // Prevents input from having injected markup
    function cleanInput (input) {
        if (DEBUG) { console.log('cleanInput()') }
        return $('<div/>').text(input).text();
    }
    
    // We need to read through the textarea and find the outermost functions
    // so we need to find functions, grab their names, ignore parameters, ignore everything inside functions
    function grabFunctions () {
        //var text = $txtScript.val();
        var text = document.getElementById('txtScript').value;
        var functions = [];
        var wordToMatch = "function";
        var lettersMatched = 0;
        // If match the first letter, increment if currentLetter < wordToMatch.length else read function name following
        //   then do a while loop with override until I read the bottom of the braces stack I'll build
        //   I'll reset i at that point to match my true location, or even continue to increment i inside my while loop
        for (var i = 0; i < text.length; i++) {
            var debugLetter = text[i];
            if (text[i] == '\n') {
                i++;
            }
            if (text[i] == wordToMatch[lettersMatched]) {
                lettersMatched++;
            }
            if (lettersMatched == wordToMatch.length) {
                // grab name
                // override everything inside brackets
                // reset i
                // reset lettersMatched

                i++;
                // function ain't the keyword if it's not followed by a space
                var nextLetter = text[i];
                var isaspace = nextLetter == " ";
                if (text[i] == " ") {
                    i++;
                    // while override
                    // ignore if space
                    // if letter end override
                    // add letter to functionName
                    // increment i
                    // start new while loop
                    // while text[i] contained in validLetters
                    // if not, end override
                    // start new while loop
                    // while notBegun == true and braces stack (int) > 0
                    // if letter == {, notBegun = false (just do this a ton of times, doesn't really matter)
                    // braces stack ++
                    // else if letter == }, braces stack --
                    // end if
                    // i++
                    // return to regular for loop procedure :)
                    var validLetters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                    var functionName = "";
                    var override = true;
                    // Skip the spaces
                    while (override) {
                        if (text[i] != " ") {
                            override = false;
                        } else {
                            i++;
                        }
                        if (i > text.length) { override = true; }
                    }
                    override = true;
                    while (override) {
                        //console.log('character ' + text[i] + ' is + ' + validLetters.indexOf(text[i]) + ' a letter.');
                        if (validLetters.indexOf(text[i]) !== -1) {
                            functionName += text[i];
                            //console.log('function name letter' + text[i]);
                        } else {
                            override = false;
                        }
                        if (i > text.length) { override = true; }
                        i++;
                    }
                    functions.push(functionName);
                    var bracesLevel = 0;
                    var notBegun = true;
                    while (bracesLevel > 0 || notBegun) {
                        var currentLetter = text[i];
                        if (text[i] == "{") {
                            bracesLevel++;
                            notBegun = false;
                        } else if (text[i] == "}") {
                            bracesLevel--;
                        }
                        if (i > text.length) { notBegun = false; bracesLevel = -1 }
                        i++;
                    }
                }

                lettersMatched = 0;
            }
        }

        if (DEBUG) { console.log(functions) }
        $functionList.html('');
        for (var i = 0; i < functions.length; i++) {
            $functionList.append('<li>' + functions[i] + '()</li>');
        }
    }

    // Input events
    $submitButton.click(function () {
        if (DEBUG) { console.log('submitButton.click()') }
        submitScript();
    });
    
    $(function () {
        $functionList.sortable();
        $functionList.disableSelection();
    })
    
    $txtScript.bind('input propertychange', function () {
        grabFunctions();
    });
    

    // Socket events
    
    socket.emit('join');
    
    socket.on('joined', function (data) {
        alert('You have joined!');
        $('#sandbox').attr('src', 'sandbox/' + data.file);
        var sampleCode = "function drawBlackRect () {\n";
        sampleCode += "    var canvas = document.getElementById('game');";
        sampleCode += "    canvas.style.border = \"thick solid #000000\";\n";
        sampleCode += "}\n\n";
        sampleCode += "function drawRedRect () {\n";
        sampleCode += "    var canvas = document.getElementById('game');";
        sampleCode += "    canvas.style.border = \"thick solid #FF0000\";\n";
        sampleCode += "}\n\n";
        sampleCode += "function drawBlueRect () {\n";
        sampleCode += "    var canvas = document.getElementById('game');";
        sampleCode += "    canvas.style.border = \"thick solid #0000FF\";\n";
        sampleCode += "}\n\n";

        $txtScript.val(sampleCode);
        grabFunctions();
    });

    // Whenever the server emits 'sandbox', add script to sandbox
    socket.on('sandboxed', function (data) {
        // Reload sandbox now that page has been re-generated
        console.log("sandboxed message received");
        document.getElementById('sandbox').src = document.getElementById('sandbox').src;
    });

});