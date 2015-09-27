function init() { //start the timer
    addMessageListeners();
    startTimer();
}

function startTimer() {
    chrome.runtime.sendMessage({"command": "startTimer"}, //send message to background.js to start timer
        function(response) {
            console.log(response.message);
        });
}

function addMessageListeners() {
    chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse)  {
        if (request.command === "updateTime") {
            var time = request.time;
            document.getElementById("time").innerText = time;
        }
    });
}

document.addEventListener('DOMContentLoaded', init);
