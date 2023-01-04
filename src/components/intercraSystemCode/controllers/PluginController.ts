import type {PluginInterface} from "../interfaces/PluginInterface";
import {NonaWeb} from "../plugins/NonaWeb";
import {Amazon} from "../plugins/Amazon";
import {BandcampAlbum} from "../plugins/BandcampAlbum";
import {BandcampArtistLabel} from "../plugins/BandcampArtistLabel";
import {ViewCollection} from "../classes/ViewCollection";
import {BandcampFan} from "../plugins/BandcampFan";
import {BandcampTracks} from "../plugins/BandcampTracks";
import {GooglePlayApps} from "../plugins/GooglePlayApps";
import {Ebay} from "../plugins/Ebay";
import {Fandom} from "../plugins/Fandom";
import mitt from 'mitt'
import EventBus from "../classes/EventBusEvent";

export class PluginController{

    plugins: PluginInterface[] = [];
    finishedPlugins: string[] = [];
    templates = new Map<string, string>;
    activePlugins: string[] = [];



    constructor() {
        this.plugins.push(new NonaWeb());
        this.plugins.push(new Amazon());
        this.plugins.push(new Ebay());
        this.plugins.push(new BandcampAlbum());
        this.plugins.push(new BandcampArtistLabel());
        this.plugins.push(new BandcampFan());
        this.plugins.push(new BandcampTracks());
        this.plugins.push(new GooglePlayApps());
        this.plugins.push(new Fandom());
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
        let vc = new ViewCollection();

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

            let loading = document.getElementById("loading-result");
            if(loading != null){
                loading.innerHTML = "";
            }

            for(let i = 0; i < all.length; i++){
                let doc =  document.getElementById("searchRoot");
                let view = document.createElement("div");


                if(doc != null){
                    view.innerHTML = all[i];
                    //doc.appendChild(view);



                }
            }
            EventBus.emit('data-sender', all)


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

    getPluginList(): PluginInterface[]{
        return this.plugins;
    }

    getIdFromName(name: string): string{
        for(let i = 0; i < this.plugins.length; i++){
            if(this.plugins[i].getPluginDisplayName() == name){
                return this.plugins[i].getId();
            }
        }
        return "";
    }

    getNameFromId(name: string): string{
        for(let i = 0; i < this.plugins.length; i++){
            if(this.plugins[i].getId() == name){
                return this.plugins[i].getPluginDisplayName();
            }
        }
        return "";
    }
}