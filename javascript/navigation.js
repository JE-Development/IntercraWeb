var button = document.getElementById("button");
var pluginButton = document.getElementById("open-screen");
var pluginButtonText = document.getElementById("plugin-menu-text");
var sw = pluginButton.firstChild;
var first = true;
button.onclick = function () {
    if (pluginButton.style.display === "none" || first) {
        pluginButton.style.display = "block";
        pluginButtonText.innerText = "hide plugins"
        first = false;
    } else {
        pluginButton.style.display = "none";
        pluginButtonText.innerText = "show plugins"
    }
}

pluginButton.appendChild(sw);