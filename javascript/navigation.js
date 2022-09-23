var button = document.getElementById("button");
var pluginButton = document.getElementById("open-screen");
var pluginButtonText = document.getElementById("plugin-menu-text");
var pluginList = document.getElementById("sb");

var sw = pluginButton.firstChild;
var first = true;
button.onclick = function () {
    if (pluginButton.style.display === "none" || first) {
        pluginButton.style.display = "block";
        pluginButtonText.innerText = "hide plugins"
        first = false;

        var elem = document.createElement("<div>\n" +
            "  <input\n" +
            "          type=\"checkbox\"\n" +
            "          id=\"plugin-checkbox\" />\n" +
            "  <label for=\"plugin-checkbox\">hello there</label>\n" +
            "</div>");

        var e = document.createElement("div");

        pluginList.appendChild(e);
    } else {
        pluginButton.style.display = "none";
        pluginButtonText.innerText = "show plugin"
    }
}

pluginButton.appendChild(sw);