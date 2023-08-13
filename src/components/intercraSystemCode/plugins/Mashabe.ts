import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import type {PluginController} from "../controllers/PluginController";
import {PresetEnum} from "../enums/PresetEnum";
import type {FeedInterface} from "../interfaces/FeedInterface";

export class Mashabe implements PluginInterface, FeedInterface{
    finish = false;
    contentList: Map<string, string>[] = [];
    contentListFeed: Map<string, string>[] = [];
    page: number = 1;

    displayName = "Mashable";
    id = "mashable";

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
        const article = document.getElementsByClassName("w-full");
        for(let i = 0; i < article.length; i++){
            const e = article[i];
            if(e.hasAttribute("data-ga-position")) {
                let map = new Map<string, string>;

                let link = e.getElementsByTagName("a")[0];
                map.set("url", "https://mashable.com" + link.getAttribute("href"));
                map.set("headline", link.textContent);

                try {
                    let image = e.getElementsByTagName("img")[0];
                    map.set("imageUrl", image.getAttribute("src"));
                } catch (e) {
                    //no image
                }

                let teaser = e.getElementsByTagName("a")[0].parentNode.children[1];
                map.set("teaser", teaser.textContent)

                let author = e.getElementsByTagName("a")
                for (let j = 0; j < author.length; j++) {
                    if (author[j].getAttribute("href").includes("/author/")) {
                        map.set("author", author[j].textContent)
                    }
                }

                let time = e.getElementsByTagName("time")[0]
                map.set("time", time.textContent)

                this.contentList.push(map)
            }
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
                teaser: contentMap.get("teaser"),
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
        const article = document.getElementsByClassName("flex-1");
        for(let i = 0; i < article.length; i++){
            const e = article[i];
            if(e.hasAttribute("data-ga-position")) {
                let map = new Map<string, string>;

                let link = e.getElementsByTagName("a");
                for(let j = 0; j < link.length; j++){
                    if(link[j].getAttribute("data-ga-item") === "title"){
                        map.set("url", "https://mashable.com" + link[j].getAttribute("href"));
                        map.set("headline", link[j].textContent);
                    }
                }

                try {
                    let image = e.getElementsByTagName("img")[0];
                    map.set("imageUrl", image.getAttribute("src"));
                } catch (e) {
                    //no image
                }

                try{
                    let topic = e.getElementsByTagName("a")
                    for(let j = 0; j < topic.length; j++){
                        if(topic[j].getAttribute("data-ga-item") === "category_title"){
                            map.set("topic", topic[j].textContent)
                        }
                    }
                }catch (e){}

                this.contentListFeed.push(map)
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
                image: contentMap.get("imageUrl"),
                platform: contentMap.get("topic"),
            })
        }

        return content;
    }

}