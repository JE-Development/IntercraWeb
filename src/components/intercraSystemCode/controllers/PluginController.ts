import type {PluginInterface} from "../interfaces/PluginInterface";
import {NonaWeb} from "../plugins/NonaWeb";

export class PluginController{

    plugins: PluginInterface[] = [];

    constructor() {
        this.plugins.push(new NonaWeb());
    }

    async findContent(searchText: string, plugin: string) {
        for(let i = 0; i < this.plugins.length; i++){
            if(this.plugins[i].getId() === plugin) {
                await this.plugins[i].findContent(searchText, "");
            }
        }
    }

    isFinished(contentList: Map<string, string>[]){
        for(let j = 0; j < contentList.length; j++){
            let contentMap = contentList[j];

            let append = document.createElement("div");
            append.innerHTML = "<div id=\"append\"><h1>" + String(contentMap.get("headline")) + "</h1></div>";
            let text = document.createElement("div");
            text.innerHTML = "<p>" + String(contentMap.get("teaser")) + "</p>"
            let doc =  document.getElementById("searchRoot");
            let view = document.createElement("div");
            let template: string = '<div class="center-horizontal">\n' +
                '    <div class="space"></div>\n' +
                '    <div class="view-border content-layout-color">\n' +
                '      <a href=";;;href;;;" class="visible-link-color">;;;url;;;</a>\n' +
                '      <h2><a href=";;;hrefHead;;;" class="headline-color">;;;headline;;;</a></h2>\n' +
                '      <p class="teaser-color">;;;teaser;;;</p>\n' +
                '    </div>\n' +
                '  </div>';
            template = template.replace(";;;href;;;", String(contentMap.get("url")))
                .replace(";;;hrefHead;;;", String(contentMap.get("url")))
                .replace(";;;url;;;", String(contentMap.get("url")))
                .replace(";;;headline;;;", String(contentMap.get("headline")))
                .replace(";;;teaser;;;", String(contentMap.get("teaser")))
            view.innerHTML = template;
            if(doc != null && append != null){
                doc.appendChild(view);
            }
        }
    }
}