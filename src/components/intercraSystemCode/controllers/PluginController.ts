import type {PluginInterface} from "../interfaces/PluginInterface";
import {NonaWeb} from "../plugins/NonaWeb";
import {Amazon} from "../plugins/Amazon";

export class PluginController{

    plugins: PluginInterface[] = [];
    finishedPlugins: string[] = [];
    templates = new Map<string, string>;
    contentMap = new Map<string, Map<string, string>[]>;
    activePlugins: string[] = [];


    constructor() {
        this.plugins.push(new NonaWeb());
        this.plugins.push(new Amazon());

        this.templates.set("information", '<div class="center-horizontal">\n' +
            '    <div class="view-border content-layout-color">\n' +
            '      <a href=";;;href;;;" class="visible-link-color">;;;url;;;</a>\n' +
            '      <h2><a href=";;;hrefHead;;;" class="headline-color">;;;headline;;;</a></h2>\n' +
            '      <p class="teaser-color">;;;teaser;;;</p>\n' +
            '      <p class="plugin-name-color view-plugin-name">Plugin: ;;;plugin-name;;;</p>\n' +
            '    </div>\n' +
            '  </div>')

        this.templates.set("shopping", '<div class="center-horizontal">\n' +
            '    <div class="view-border content-layout-color">\n' +
            '\n' +
            '      <div class="view-border content-layout-color center-horizontal">\n' +
            '        <img src="../assets/sample-product-image.png" class="center-horizontal view-image"/>\n' +
            '      </div>\n' +
            '      <h2><a href=";;;hrefHead;;;" class="headline-color">;;;headline;;;</a></h2>\n' +
            '      <p class="plugin-name-color  view-plugin-name">Plugin: ;;;plugin-name;;;</p>\n' +
            '    </div>\n' +
            '  </div>')


    }

    async findContent(searchText: string, plugin: string) {
        this.activePlugins = plugin.split("---");

        for(let i = 0; i < this.plugins.length; i++){
            if(this.activePlugins.includes(this.plugins[i].getId())){
                await this.plugins[i].findContent(searchText, "", this);
            }
        }
    }

    isFinished(contentList: Map<string, string>[], id: string){
        this.finishedPlugins.push(id);
        this.contentMap.set(id, contentList);
        let check = this.checkAllFinished();

        if(check){
            for(let i = 0; i < this.finishedPlugins.length; i++){
                let contentList: Map<string, string>[] = this.contentMap.get(this.finishedPlugins[i]) as Map<string, string>[];


                for(let j = 0; j < contentList.length; j++){
                    let contentMap = contentList[j];

                    let append = document.createElement("div");
                    append.innerHTML = "<div id=\"append\"><h1>" + String(contentMap.get("headline")) + "</h1></div>";
                    let text = document.createElement("div");
                    text.innerHTML = "<p>" + String(contentMap.get("teaser")) + "</p>"
                    let doc =  document.getElementById("searchRoot");
                    let view = document.createElement("div");


                    if(doc != null && append != null){
                        view.innerHTML = this.setContent(contentMap, this.finishedPlugins[i]);
                        doc.appendChild(view);
                    }
                }
            }
        }
    }

    checkAllFinished(): boolean{
        if(this.activePlugins.length != this.finishedPlugins.length){
            return false;
        }else{
            for(let i = 0; i < this.activePlugins.length; i++){
                if(!this.finishedPlugins.includes(this.activePlugins[i])){
                    return false;
                }
            }
        }
        return true;
    }

    setContent(contentMap: Map<string, string>, id: string): string{
        if(id == "nona_web"){
            let nona_web_template = this.templates.get("information");
            nona_web_template = String(nona_web_template).replace(";;;href;;;", String(contentMap.get("url")))
                .replace(";;;hrefHead;;;", String(contentMap.get("url")))
                .replace(";;;url;;;", String(contentMap.get("url")))
                .replace(";;;headline;;;", String(contentMap.get("headline")))
                .replace(";;;teaser;;;", String(contentMap.get("teaser")))
                .replace(";;;plugin-name;;;", this.getNameFromId(id))
            return nona_web_template;
        }else if(id == "amazon"){
            let nona_web_template = this.templates.get("shopping");
            nona_web_template = String(nona_web_template).replace(";;;hrefHead;;;", String(contentMap.get("url")))
                .replace(";;;headline;;;", String(contentMap.get("headline")))
                .replace("../assets/sample-product-image.png", String(contentMap.get("imageUrl")))
                .replace(";;;plugin-name;;;", this.getNameFromId(id))
            return nona_web_template;
        }
        return "";
    }

    getNameFromId(id: string): string{
        for(let i = 0; i < this.plugins.length; i++){
            if(this.plugins[i].getId() === id){
                return this.plugins[i].getPluginDisplayName();
            }
        }
        return id;
    }
}