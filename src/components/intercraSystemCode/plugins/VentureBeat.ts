import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import type {PluginController} from "../controllers/PluginController";
import {PresetEnum} from "../enums/PresetEnum";
import type {FeedInterface} from "../interfaces/FeedInterface";

export class VentureBeat implements PluginInterface, FeedInterface{
    finish = false;
    contentList: Map<string, string>[] = [];
    contentListFeed: Map<string, string>[] = [];
    page: number = 1;

    displayName = "VentureBeat";
    id = "venturebeat"

    addToPreset(): PresetController {
        let pc = new PresetController();
        pc.addPreset(PresetEnum.NEWS)
        pc.addPreset(PresetEnum.FEED_SUPPORTED)
        return pc;
    }

    async findContent(searchText: string, countryUrl: string, pc: PluginController): Promise<void> {

        try {
            let html = await fetch("https://intercra-backend.jason-apps.workers.dev/html/data/" + this.id + "/" + searchText);
            let text = await html.text();
            const parser = new DOMParser();
            const document: any = parser.parseFromString(text, "text/html");
            this.startSearch(document);
            this.finish = true;

            //let pc = new PluginController();
            pc.isFinished(this.contentList, this.id);
        }catch (error){
            console.log(error)
            pc.gotError(this.id);
        }
    }

    async findMoreContent(searchText: string, countryUrl: string, pc: PluginController): Promise<void> {
        this.contentList = [];
        this.page++

        try {
            let html = await fetch("https://intercra-backend.jason-apps.workers.dev/html/more/" + this.id + "/" + searchText + "/" + this.page);
            let text = await html.text();
            const parser = new DOMParser();
            const document: any = parser.parseFromString(text, "text/html");
            this.startSearch(document);
            this.finish = true;

            //let pc = new PluginController();
            pc.isFinished(this.contentList, this.id);
        }catch (error){
            pc.gotError(this.id);
        }
    }

    startSearch(document: any): void{
        const article = document.getElementsByTagName("article");
        for(let i = 0; i < article.length; i++){
            const e = article[i];
            let map = new Map<string, string>;

            let link = e.getElementsByTagName("h2")[0].children[0];
            map.set("url", link.getAttribute("href"));
            map.set("headline", link.textContent);

            try{
                let image = e.getElementsByTagName("img")[0];
                map.set("imageUrl", image.getAttribute("src"));
            }catch (e){
                //no image
            }

            try{
                let type = e.getElementsByClassName("article-type")[0]
                map.set("type", type.textContent)
            }catch (e){
                //no type
            }

            try{
                let author = e.getElementsByClassName("ArticleListing__author")[0]
                map.set("author", author.textContent)
            }catch (e){
                //no author
            }

            try{
                let time = e.getElementsByTagName("time")[0]
                map.set("time", time.textContent)
            }catch (e){
                //no time
            }

            this.contentList.push(map)
        }
    }

    getContentList(): Map<string, string>[] {
        return this.contentList;
    }

    getError(): boolean {
        return false;
    }

    getErrorText(): string {
        return "";
    }

    getId(): string {
        return this.id;
    }

    getPluginDisplayName(): string {
        return this.displayName;
    }

    getPluginLanguage(): PluginLanguageController {
        return new PluginLanguageController();
    }

    hasSettings(): boolean {
        return false;
    }

    isFinish(): boolean {
        return this.finish;
    }

    setFinishFalse(): void {
        this.finish = false;
    }

    getView(): any[] {

        let content: any[] = [];

        for(let i = 0; i < this.contentList.length; i++){

            let contentMap = this.contentList[i];

            content.push({
                choosenView: "articleView",
                url: contentMap.get("url"),
                headline: contentMap.get("headline"),
                pluginName: this.displayName,
                platform: contentMap.get("type"),
                image: contentMap.get("imageUrl"),
                author: contentMap.get("author"),
                date: contentMap.get("time"),
            })
        }

        return content;
    }

    async findFeedContent(pc: PluginController): Promise<void> {
        try {
            let html = await fetch("https://intercra-backend.jason-apps.workers.dev/html/feed/" + this.id);
            let text = await html.text();
            const parser = new DOMParser();
            const document: any = parser.parseFromString(text, "text/html");
            this.startFeedSearch(document);
            this.finish = true;

            //let pc = new PluginController();
            pc.isFeedFinished(this.contentList, this.id);
        }catch (error){
            console.log(error)
            pc.gotFeedError(this.id);
        }
    }

    async findMoreFeedContent(pc: PluginController): Promise<void> {
        let list: Map<string, string>[] = []
        pc.isFeedFinished(list, this.id)
    }


    startFeedSearch(document: any): void{
        const article = document.getElementsByTagName("article");
        for(let i = 0; i < article.length; i++){
            try{
                const e = article[i];
                let map = new Map<string, string>;

                let link = e.getElementsByClassName("ArticleListing__title-link")[0];
                map.set("url", link.getAttribute("href"));
                map.set("headline", link.textContent);

                try{
                    let image = e.getElementsByTagName("img")[0];
                    map.set("imageUrl", image.getAttribute("src"));
                }catch (e){
                    //no image
                }

                try{
                    let type = e.getElementsByClassName("article-type")[0]
                    map.set("type", type.textContent)
                }catch (e){
                    //no type
                }

                try{
                    let author = e.getElementsByClassName("ArticleListing__author")[0]
                    map.set("author", author.textContent)
                }catch (e){
                    //no author
                }

                try{
                    let time = e.getElementsByTagName("time")[0]
                    map.set("time", time.textContent)
                }catch (e){
                    //no time
                }

                this.contentListFeed.push(map)
            }catch (e){

            }
        }
    }

    getFeedView(): any[] {

        let content: any[] = [];

        for(let i = 0; i < this.contentListFeed.length; i++){

            let contentMap = this.contentListFeed[i];

            content.push({
                choosenView: "articleView",
                url: contentMap.get("url"),
                headline: contentMap.get("headline"),
                pluginName: this.displayName,
                platform: contentMap.get("type"),
                image: contentMap.get("imageUrl"),
                author: contentMap.get("author"),
                date: contentMap.get("time"),
            })
        }

        return content;
    }

}