import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import type {PluginController} from "../controllers/PluginController";
import {ViewCollection} from "../classes/ViewCollection";
import {PresetEnum} from "../enums/PresetEnum";
import type {FeedInterface} from "../interfaces/FeedInterface";

export class Fandom implements PluginInterface, FeedInterface{
    finish = false;
    contentList: Map<string, string>[] = [];
    contentListFeed: Map<string, string>[] = [];

    displayName = "Fandom";
    id = "fandom";
    page = 1;

    addToPreset(): PresetController {
        let pc = new PresetController();
        pc.addPreset(PresetEnum.NEWS);
        pc.addPreset(PresetEnum.GAMES);
        pc.addPreset(PresetEnum.INFORMATION);
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
            pc.gotFeedError(this.id);
        }
    }

    async findMoreContent(searchText: string, countryUrl: string, pc: PluginController): Promise<void> {
        this.page = this.page + 1;
        this.contentList = [];
        let html = await fetch("https://intercra-backend.jason-apps.workers.dev/html/more/" + this.id + "/" + searchText + "/" + this.page);
        let text = await html.text();
        const parser = new DOMParser();
        const document = parser.parseFromString(text, "text/html");
        this.startSearch(document);
        this.finish = true;

        pc.isFinished(this.contentList, this.id);
    }

    startSearch(document: any): void{
        const rawList = document.getElementsByTagName("div");

        for(let j = 0; j < rawList.length; j++){
            if(rawList[j].getAttribute("data-tracking-type") === "fandomstories"){

                const list = rawList[j];
                let map = new Map<string, string>;

                const url = list.getElementsByClassName("clickable-anchor")[0];
                let linkString = url.getAttribute("href");
                let headline = url.textContent;
                map.set("url", linkString);
                map.set("headline", headline);

                let imageUrl = "";

                try{
                    const image = list.getElementsByClassName("wp-post-image")[0];
                    imageUrl = image.getAttribute("src")
                    map.set("imageUrl", imageUrl);
                }catch (error){
                    //no image
                }

                const time = list.getElementsByTagName("time")[0];
                map.set("time", time.textContent);

                const teaser = list.getElementsByClassName("excerpt")[0].getElementsByTagName("a")[0];
                map.set("teaser", teaser.textContent);


                this.contentList.push(map);
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
                image: contentMap.get("imageUrl"),
                teaser: contentMap.get("teaser"),
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
            //let pc = new PluginController();
            pc.isFeedFinished(this.contentListFeed, this.id);
        }catch (error){
            console.log(error)
            pc.gotError(this.id);
        }
    }

    async findMoreFeedContent(pc: PluginController): Promise<void> {
        let list: Map<string, string>[] = []
        pc.isFeedFinished(list, this.id)
    }



    startFeedSearch(document: any): void{
        const rawList = document.getElementsByClassName("feed-item")

        for(let j = 0; j < rawList.length; j++){
            const list = rawList[j];
            let map = new Map<string, string>;

            const url = list.getElementsByClassName("card__title-wrapper")[0];
            let linkString = url.getAttribute("href");
            let headline = url.textContent;
            map.set("url", linkString);
            map.set("headline", headline);

            let imageUrl = "";

            try{
                const image = list.getElementsByTagName("img")[0];
                imageUrl = image.getAttribute("src")
                map.set("imageUrl", imageUrl);
            }catch (error){
                console.log(error)
                //no image
            }

            const time = list.getElementsByTagName("time")[0];
            map.set("time", time.textContent);


            try{
                const author = list.getElementsByClassName("is-author")[0];
                map.set("author", author.textContent);
            }catch (e){
                //no author
            }


            try{
                const teaser = list.getElementsByClassName("card__summary")[0]
                map.set("teaser", teaser.textContent);
            }catch (e){
                //no teaser
            }


            this.contentListFeed.push(map);
        }


    }




    getFeedView(): string[] {
        let content: any[] = [];

        for(let i = 0; i < this.contentListFeed.length; i++){

            let contentMap = this.contentListFeed[i];



            content.push({
                choosenView: "articleView",
                url: contentMap.get("url"),
                headline: contentMap.get("headline"),
                pluginName: this.displayName + " (Games)",
                teaser: contentMap.get("teaser"),
                image: contentMap.get("imageUrl"),
                author: contentMap.get("author"),
                date: contentMap.get("time"),
            })
        }

        return content;
    }

}