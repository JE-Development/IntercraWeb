import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import type {PluginController} from "../controllers/PluginController";
import {PresetEnum} from "../enums/PresetEnum";
import type {FeedInterface} from "../interfaces/FeedInterface";

export class Reddit implements PluginInterface, FeedInterface{
    finish = false;
    contentList: Map<string, string>[] = [];
    contentListFeed: Map<string, string>[] = [];

    displayName = "Reddit";
    id = "reddit";
    page = 1;

    addToPreset(): PresetController {
        let pc = new PresetController();
        pc.addPreset(PresetEnum.NEWS);
        pc.addPreset(PresetEnum.GAMES);
        pc.addPreset(PresetEnum.INFORMATION);
        //pc.addPreset(PresetEnum.PROGRAMMING);
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
            pc.gotError(this.id);
        }
    }

    async findMoreContent(searchText: string, countryUrl: string, pc: PluginController): Promise<void> {
        this.contentList = [];
        pc.isFinished(this.contentList, this.id);
    }

    startSearch(document: any): void{
        const rawList = document.getElementsByTagName("div");

        for(let j = 0; j < rawList.length; j++){

            if(rawList[j].getAttribute("data-testid") === "posts-list"){
                let children = rawList[j].firstChild.children;
                for(let k = 0; k < children.length; k++){
                    let divs = children[k].getElementsByTagName("div");
                    let map = new Map<string, string>;
                    for(let l = 0; l < divs.length; l++){
                        if(divs[l].getAttribute("data-adclicklocation") === "media"){
                            const list = divs[l];

                            let headline = list.getAttribute("aria-label");
                            map.set("headline", headline);

                            let image = list.getAttribute("style").split("url(")[1].split(");")[0];
                            map.set("imageUrl", image);



                        }
                    }
                    let a = children[k].getElementsByTagName("a")[0].getAttribute("href");
                    map.set("url", "https://www.reddit.com" + a);
                    this.contentList.push(map);

                }
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

            if(contentMap.get("headline") != null) {
                content.push({
                    choosenView: "articleView",
                    url: contentMap.get("url"),
                    headline: contentMap.get("headline"),
                    pluginName: this.displayName,
                    image: contentMap.get("imageUrl"),
                    teaser: contentMap.get("teaser"),
                    date: contentMap.get("time"),
                })
            }
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
            pc.gotFeedError(this.id);
        }
    }

    async findMoreFeedContent(pc: PluginController): Promise<void> {
        let list: Map<string, string>[] = []
        pc.isFeedFinished(list, this.id)
    }


    startFeedSearch(document: any): void{
        const rawList = document.getElementsByTagName("div");

        for(let j = 0; j < rawList.length; j++){

            if(rawList[j].getAttribute("data-testid") === "post-container"){
                let children = rawList[j].firstChild.children;
                for(let k = 0; k < children.length; k++){
                    let divs = children[k].getElementsByTagName("div");
                    let map = new Map<string, string>;
                    for(let l = 0; l < divs.length; l++){
                        if(divs[l].getAttribute("data-adclicklocation") === "media"){
                            const list = divs[l];

                            let headline = list.getAttribute("aria-label");
                            map.set("headline", headline);

                            try{
                                let image = list.getAttribute("style").split("url(")[1].split(");")[0];
                                map.set("imageUrl", image);
                            }catch (e){}



                        }
                    }
                    let a = children[k].getElementsByTagName("a")[0].getAttribute("href");
                    map.set("url", "https://www.reddit.com" + a);
                    this.contentListFeed.push(map);

                }
            }
        }


    }

    getFeedView(): any[] {

        let content: any[] = [];

        for(let i = 0; i < this.contentListFeed.length; i++){

            let contentMap = this.contentListFeed[i];

            if(contentMap.get("headline") != null) {
                content.push({
                    choosenView: "articleView",
                    url: contentMap.get("url"),
                    headline: contentMap.get("headline"),
                    pluginName: this.displayName,
                    image: contentMap.get("imageUrl"),
                    teaser: contentMap.get("teaser"),
                    date: contentMap.get("time"),
                })
            }
        }

        return content;
    }

}