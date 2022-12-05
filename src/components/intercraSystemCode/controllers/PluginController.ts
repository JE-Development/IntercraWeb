import type {PluginInterface} from "../interfaces/PluginInterface";
import {NonaWeb} from "../plugins/NonaWeb";
import {Amazon} from "../plugins/Amazon";
import {BandcampAlbum} from "../plugins/BandcampAlbum";

export class PluginController{

    plugins: PluginInterface[] = [];
    finishedPlugins: string[] = [];
    templates = new Map<string, string>;
    activePlugins: string[] = [];


    constructor() {
        this.plugins.push(new NonaWeb());
        this.plugins.push(new Amazon());
        this.plugins.push(new BandcampAlbum());
    }

    getPlugins(): PluginInterface[]{
        return this.plugins;
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
}