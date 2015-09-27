var states = {
    "off": "lol",
    "pomodoro": "lol"
};

var currentState = "off";

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.command === "startTimer" && currentState === "off") {
            startTimer();
            sendResponse({message: "Timer started."});
        }
});

function startTimer() {
    var start = moment(); //creates moment object set to the current time
     var timer = setInterval(function() {
        var diff = moment().diff(start, 'seconds'); //difference between current time and start time
        updateTime(diff);
        var length = localStorage["pomodoro-selection"] || 10;
        if (diff > length) {
            clearInterval(timer);
            notifyUser();
        }
    }, 1000); //1000 milliseconds
    currentState = "pomodoro";
}

function updateTime(diff) {
    chrome.runtime.sendMessage({ //send a message back to timer.js
        "command": "updateTime",
        "time": diff});
}

function notifyUser() {
    var options = {
        "type": "basic",
        "title": "Break Time!",
        "message": "Time for a break!",
        "iconUrl": "icon.png"
    };
    var idBase = "pomodoro";
    var id = idBase + (new Date()).getTime();
    chrome.notifications.create(id, options, function() {
        console.log(idBase + " created!");
    });
}
