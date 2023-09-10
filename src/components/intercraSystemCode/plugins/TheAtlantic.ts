import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import type {PluginController} from "../controllers/PluginController";
import {PresetEnum} from "../enums/PresetEnum";
import type {FeedInterface} from "../interfaces/FeedInterface";

export class TheAtlantic implements PluginInterface, FeedInterface{
    finish = false;
    contentList: Map<string, string>[] = [];
    contentListFeed: Map<string, string>[] = [];
    page: number = 1;

    displayName = "The Atlantic";
    id = "the_atlantic";

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
            pc.gotError(this.id);
        }
    }

    async findMoreContent(searchText: string, countryUrl: string, pc: PluginController): Promise<void> {
        this.contentList = [];

        pc.isFinished(this.contentList, this.id);
    }

    startSearch(document: any): void{
        const article = document.getElementsByTagName("ul");

        for(let k = 0; k < article.length; k++){
            if(article[k].hasAttribute("class") && article[k].getAttribute("class").includes("SharedResults_searchResultsList")){
                const elem = article[k].children;
                for(let i = 0; i < elem.length; i++){
                    try{
                        let e = elem[i]

                        let map = new Map<string, string>;


                        let link = e.getElementsByTagName("a")[0];
                        map.set("url", link.getAttribute("href"));

                        let head = "";
                        let headline = e.getElementsByTagName("div");
                        for(let j = 0; j < headline.length; j++){
                            if(headline[j].hasAttribute("class") && headline[j].getAttribute("class").includes("SharedResults_title")){
                                head = headline[j].textContent;
                            }
                        }
                        map.set("headline", head)

                        try{
                            let image = e.getElementsByTagName("img")[0];
                            let imgUrl = image.getAttribute("src")
                            map.set("imageUrl", imgUrl);

                            let teaser = e.getElementsByTagName("p")[0];
                            map.set("teaser", teaser.textContent)
                        }catch (e){
                            //no image and teaser available
                        }

                        let auth = "";
                        let author = e.getElementsByTagName("span");
                        for(let j = 0; j < author.length; j++){
                            if(author[j].hasAttribute("class") && author[j].getAttribute("class").includes("ArticleResults_byline")){
                                auth = author[j].textContent;
                            }
                        }
                        map.set("author", auth)

                        let time = "";
                        let date = e.getElementsByTagName("span");
                        for(let j = 0; j < date.length; j++){
                            if(date[j].hasAttribute("class") && date[j].getAttribute("class").includes("ArticleResults_publishDate")){
                                time = date[j].textContent;
                            }
                        }
                        map.set("time", time)

                        this.contentList.push(map)
                    }catch (e){
                        console.log("err: " + e)
                        //probably ad found
                    }
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

            content.push({
                choosenView: "articleView",
                url: contentMap.get("url"),
                headline: contentMap.get("headline"),
                pluginName: this.displayName,
                teaser: contentMap.get("teaser"),
                image: contentMap.get("imageUrl"),
                date: contentMap.get("time"),
                author: contentMap.get("author")
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

        for(let k = 0; k < article.length; k++){
            try{
                let e = article[k]

                let map = new Map<string, string>;


                let link = e.getElementsByTagName("h3")[0].firstElementChild;
                map.set("url", link.getAttribute("href"));
                map.set("headline", link.textContent);

                try{
                    let image = e.getElementsByTagName("img")[0];
                    let imgUrl = image.getAttribute("data-srcset").split(", ")[0]
                    map.set("imageUrl", imgUrl);
                }catch (e){
                    //no image
                }


                try{
                    let author = e.getElementsByClassName("o-meta__author")[0]
                    map.set("author", author.textContent)
                }catch (e){}

                try{
                    let time = e.getElementsByTagName("time")[0]
                    map.set("time", time.textContent)
                }catch (e){}

                this.contentListFeed.push(map)
            }catch (e){}
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
                date: contentMap.get("time"),
                author: contentMap.get("author")
            })
        }

        return content;
    }

}