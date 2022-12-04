import type {PluginInterface} from "../interfaces/PluginInterface";
import {NonaWeb} from "../plugins/NonaWeb";
import {Amazon} from "../plugins/Amazon";

export class PluginController{

    plugins: PluginInterface[] = [];
    finishedPlugins: string[] = [];
    templates = new Map<string, string>;
    activePlugins: string[] = [];


    constructor() {
        this.plugins.push(new NonaWeb());
        this.plugins.push(new Amazon());
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
        let check = this.checkAllFinished();

        if(check){

            let box: string[][] = [];
            let all: string[] = [];

            for(let i = 0; i < this.plugins.length; i++){
                if(this.finishedPlugins.includes(this.plugins[i].getId())){
                    let view = this.plugins[i].getView();
                    box.push(view);
                }
            }

            let maxSize: Number[] = [];

            for(let i = 0; i < this.plugins.length; i++){
                if(this.finishedPlugins.includes(this.plugins[i].getId())){
                    maxSize.push(this.plugins[i].getView().length);
                }
            }

            maxSize = maxSize.sort((n1: any,n2: any) => n1 - n2);

            try{
                let max = maxSize[maxSize.length - 1];
                for(let i = 0; i < max; i++){
                    for(let j = 0; j < box.length; j++){
                        if(box[j].length > i){
                            all.push(box[j][i]);
                        }
                    }
                }
            }catch (e){

            }

            for(let i = 0; i < all.length; i++){
                let doc =  document.getElementById("searchRoot");
                let view = document.createElement("div");


                if(doc != null){
                    view.innerHTML = all[i];
                    doc.appendChild(view);
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