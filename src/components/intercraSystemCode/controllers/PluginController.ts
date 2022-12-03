import type {PluginInterface} from "../interfaces/PluginInterface";
import {NonaWeb} from "../plugins/NonaWeb";
import {Amazon} from "../plugins/Amazon";

export class PluginController{

    plugins: PluginInterface[] = [];
    finishedPlugins: string[] = [];
    templates = new Map<string, string>;
    contentMap = new Map<string, Map<string, string>[]>;


    constructor() {
        this.plugins.push(new NonaWeb());
        this.plugins.push(new Amazon());

        this.templates.set("information", '<div class="center-horizontal">\n' +
            '    <div class="space"></div>\n' +
            '    <div class="view-border content-layout-color">\n' +
            '      <a href=";;;href;;;" class="visible-link-color">;;;url;;;</a>\n' +
            '      <h2><a href=";;;hrefHead;;;" class="headline-color">;;;headline;;;</a></h2>\n' +
            '      <p class="teaser-color">;;;teaser;;;</p>\n' +
            '    </div>\n' +
            '  </div>')

        this.templates.set("shopping", '<div class="center-horizontal">\n' +
            '    <div class="view-border content-layout-color">\n' +
            '\n' +
            '      <div class="view-border content-layout-color center-horizontal">\n' +
            '        <img src=";;;image-url;;;" class="center-horizontal view-image"/>\n' +
            '      </div>\n' +
            '      <h2><a href=";;;hrefHead;;;" class="headline-color">;;;headline;;;</a></h2>\n' +
            '    </div>\n' +
            '\n' +
            '  </div>')


    }

    async findContent(searchText: string, plugin: string) {
        for(let i = 0; i < this.plugins.length; i++){
            //if(this.plugins[i].getId() === plugin) {
                await this.plugins[i].findContent(searchText, "", this);
            //}
        }
    }

    isFinished(contentList: Map<string, string>[], id: string){
        this.finishedPlugins.push(id);
        this.contentMap.set(id, contentList);
        let check = this.checkAllFinished();

        if(check){
            for(let i = 0; i < this.finishedPlugins.length; i++){
                let contentList: Map<string, string>[] = this.contentMap.get(this.finishedPlugins[i]) as Map<string, string>[];

                //only amazon will be displayed

                let l = fooo;

                for(let j = 0; j < contentList.length; j++){
                    let contentMap = contentList[j];

                    let append = document.createElement("div");
                    append.innerHTML = "<div id=\"append\"><h1>" + String(contentMap.get("headline")) + "</h1></div>";
                    let text = document.createElement("div");
                    text.innerHTML = "<p>" + String(contentMap.get("teaser")) + "</p>"
                    let doc =  document.getElementById("searchRoot");
                    let view = document.createElement("div");

                    let temp = "";

                    if(id == "nona_web"){
                        temp = this.setNonaWeb(contentMap);
                    }
                    if(id == "amazon"){
                        temp = this.setAmazon(contentMap);
                    }


                    view.innerHTML = temp;

                    if(doc != null && append != null){
                        doc.appendChild(view);
                    }
                }
            }
        }
    }

    checkAllFinished(): boolean{
        if(this.plugins.length != this.finishedPlugins.length){
            return false;
        }else{
            for(let i = 0; i < this.plugins.length; i++){
                if(!this.finishedPlugins.includes(this.plugins[i].getId())){
                    return false;
                }
            }
        }
        return true;
    }

    setNonaWeb(contentMap: Map<string, string>): string{
        let nona_web_template = this.templates.get("information");
        nona_web_template = String(nona_web_template).replace(";;;href;;;", String(contentMap.get("url")))
            .replace(";;;hrefHead;;;", String(contentMap.get("url")))
            .replace(";;;url;;;", String(contentMap.get("url")))
            .replace(";;;headline;;;", String(contentMap.get("headline")))
            .replace(";;;teaser;;;", String(contentMap.get("teaser")))
        return nona_web_template;
    }

    setAmazon(contentMap: Map<string, string>): string{
        let nona_web_template = this.templates.get("shopping");
        nona_web_template = String(nona_web_template).replace(";;;hrefHead;;;", String(contentMap.get("url")))
            .replace(";;;headline;;;", String(contentMap.get("headline")))
            .replace(";;;image-url;;;", String(contentMap.get("imageUrl")))
        return nona_web_template;
    }
}