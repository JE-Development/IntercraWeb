import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import type {PluginController} from "../controllers/PluginController";
import {PresetEnum} from "../enums/PresetEnum";
import type {FeedInterface} from "../interfaces/FeedInterface";

export class Engadget implements PluginInterface, FeedInterface{
    finish = false;
    contentList: Map<string, string>[] = [];
    contentListFeed: Map<string, string>[] = [];
    page: number = 1;

    feedError: boolean = false;

    displayName = "Engadget";
    id = "engadget";

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
            let teaser = JSON.stringify(items.teaser).replace(/"/g, '');
            let author = JSON.stringify(items.author).replace(/"/g, '');
            let time = JSON.stringify(items.time).replace(/"/g, '');


            let map = new Map<string, string>;

            map.set("url", url);
            map.set("headline", headline);
            map.set("imageUrl", image);
            map.set("teaser", teaser);
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
            //let pc = new PluginController();
            if(this.feedError){
                pc.gotFeedError(this.id)
            }else{
                pc.isFeedFinished(this.contentListFeed, this.id);
            }
        }catch (error){
            console.log(error)
            pc.gotFeedError(this.id);
        }
    }

    async findMoreFeedContent(pc: PluginController): Promise<void> {
        this.contentListFeed = [];
        pc.isFeedFinished(this.contentListFeed, this.id);
    }


    startFeedSearch(document: any): void{
        const article = document.getElementsByTagName("ul")
        for(let i = 0; i < article.length; i++){
            if(article[i].getAttribute("data-component") === "LatestStream"){
                let el = article[i].children
                for(let i = 0; i < el.length; i++){
                    try{
                        const e = el[i];
                        let map = new Map<string, string>;

                        let link = e.getElementsByTagName("a")[1];
                        map.set("url", link.getAttribute("href"));
                        map.set("headline", link.textContent);

                        let image = e.getElementsByTagName("img")[0];
                        map.set("imageUrl", image.getAttribute("src"));

                        /*let teaser = e.querySelector('[${data-component}="${PostInfo}"]')[0].children[1]
                        map.set("teaser", teaser.textContent)*/

                        let author = e.getElementsByTagName("span")[0].parentNode
                        map.set("author", author.textContent)

                        this.contentListFeed.push(map)
                    }catch (e){
                        //console.log(e)
                        //no article
                    }
                }
                if(this.contentListFeed.length == 0){
                    this.feedError = true;
                }
            }
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
                pluginName: this.displayName,
                teaser: contentMap.get("teaser"),
                image: contentMap.get("imageUrl"),
                author: contentMap.get("author"),
            })
        }

        return content;
    }

}