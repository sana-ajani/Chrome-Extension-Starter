function init() {
    addClickHandlers();
}

function addClickHandlers() {
    var buttonsDiv = document.getElementById("pomodoro-selection");
    var buttons = buttonsDiv.children;
    Array.prototype.forEach.call(buttons, function(button) {
        button.onclick = function(event) {
            var thisButton = event.target;
            var timeSelected = thisButton.innerText;
            localStorage["pomodoro-selection"] = +timeSelected;
        }
    })
}

document.addEventListener('DOMContentLoaded', init)
