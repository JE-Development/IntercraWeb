var button = document.getElementById("button");
var pluginButton = document.getElementById("open-screen");
var pluginButtonText = document.getElementById("plugin-menu-text");

var first = true;
var pluginCounter = 0;

function pluginButtonOnClick(){
    if (pluginButton.style.display === "none" || first) {
        pluginCounter++;
        document.getElementById("plugin-list").innerHTML +=
            "<div>\n" +
            "  <input\n" +
            "          type=\"checkbox\"\n" +
            "          id=\"plugin-checkbox" + pluginCounter + "\" />\n" +
            "  <label for=\"plugin-checkbox" + pluginCounter + "\">hello there</label>\n" +
            "</div>";

        pluginButton.style.display = "block";
        pluginButtonText.innerText = "hide plugins"
        first = false;

        var elem = document.createElement("<div>\n" +
            "  <input\n" +
            "          type=\"checkbox\"\n" +
            "          id=\"plugin-checkbox\" />\n" +
            "  <label for=\"plugin-checkbox\">hello there</label>\n" +
            "</div>");

    } else {
        pluginButton.style.display = "none";
        pluginButtonText.innerText = "show plugin"
    }

    //document.getElementById("add_to_me").innerHTML +=
    //    "<h3>This is the text which has been inserted by JS lol</h3>";
}