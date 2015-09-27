chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.command === "startTimer") {
            startTimer();
            sendResponse({message: "Timer started."});
        }
});

function startTimer() {
    var start = moment(); //creates moment object set to the current time
    setInterval(function() {
        var diff = moment().diff(start, 'seconds'); //difference between current time and start time
        updateTime(diff);
    }, 1000); //1000 milliseconds
}

function updateTime(diff) {
    chrome.runtime.sendMessage({ //send a message back to timer.js
        "command": "updateTime",
        "time": diff});
}
