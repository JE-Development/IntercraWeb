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
        return pc;
    }

    async findContent(searchText: string, countryUrl: string, pc: PluginController): Promise<void> {

        try {
            await pc.collectRequests(this, false, false)

        }catch (error){
            console.log(error)
            pc.gotError(this.id);
        }
    }

    async findMoreContent(searchText: string, countryUrl: string, pc: PluginController): Promise<void> {
        try {
            await pc.collectRequests(this, true, true)

        }catch (error){
            pc.gotError(this.id);
        }
    }


    analyse(json: any, pc: PluginController){


        for(let i = 0; i < json.length; i++){
            let items = json[i]

            let url = JSON.stringify(items.url).replace(/"/g, '');
            let headline = JSON.stringify(items.headline).replace(/"/g, '');
            let image = JSON.stringify(items.imageUrl).replace(/"/g, '');
            let type = JSON.stringify(items.type).replace(/"/g, '');
            let author = JSON.stringify(items.author).replace(/"/g, '');
            let time = JSON.stringify(items.time).replace(/"/g, '');


            let map = new Map<string, string>;

            map.set("url", url);
            map.set("headline", headline);
            map.set("imageUrl", image);
            map.set("type", type);
            map.set("author", author);
            map.set("time", time);

            this.contentList.push(map);
        }
        pc.isFinished(this.contentList, this.id)
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