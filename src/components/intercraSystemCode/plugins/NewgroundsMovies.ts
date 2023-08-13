import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import type {PluginController} from "../controllers/PluginController";
import {ViewCollection} from "../classes/ViewCollection";
import {PresetEnum} from "../enums/PresetEnum";
import type {FeedInterface} from "../interfaces/FeedInterface";

export class NewgroundsMovies implements PluginInterface, FeedInterface{
    finish = false;
    contentList: Map<string, string>[] = [];
    contentListFeed: Map<string, string>[] = [];

    displayName = "Newgrounds Movies";
    id = "newgrounds_movies";
    page = 1;

    addToPreset(): PresetController {
        let pc = new PresetController();
        //pc.addPreset(PresetEnum.MOVIES)
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
        try {
            this.page = this.page + 1;
            this.contentList = [];
            let html = await fetch("https://intercra-backend.jason-apps.workers.dev/html/more/" + this.id + "/" + searchText + "/" + this.page);
            let text = await html.text();
            const parser = new DOMParser();
            const document = parser.parseFromString(text, "text/html");
            this.startSearch(document);
            this.finish = true;

            pc.isFinished(this.contentList, this.id);
        }catch (e){
            //no more content
        }
    }

    startSearch(document: any): void{
        const content = document.getElementsByClassName("item-portalsubmission");

        for(let i = 0; i < content.length; i++){
            const elem = content[i];
            let map = new Map<string, string>;

            map.set("url", elem.getAttribute("href"));

            const image = elem.getElementsByTagName("img")[0];
            map.set("imageUrl", image.getAttribute("src"));

            const headline = elem.getElementsByTagName("h4")[0];
            map.set("headline", headline.textContent)

            const artist = elem.getElementsByClassName("detail-title")[0].getElementsByTagName("span")[0];
            map.set("artist", artist.textContent)

            const genre = elem.getElementsByClassName("detail-description")[0];
            map.set("teaser", genre.textContent)


            this.contentList.push(map);

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
                choosenView: "newgroundsAudioView",
                url: contentMap.get("url"),
                headline: contentMap.get("headline"),
                pluginName: this.displayName,
                image: contentMap.get("imageUrl"),
                artist: contentMap.get("artist"),
                teaser: contentMap.get("teaser")
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
        const content = document.getElementsByClassName("portalsubmission-cell");

        for(let i = 0; i < content.length; i++){
            const elem = content[i];
            let map = new Map<string, string>;

            let link = elem.getElementsByTagName("a")[0]
            map.set("url", link.getAttribute("href"));

            const image = elem.getElementsByTagName("img")[0];
            map.set("imageUrl", image.getAttribute("src"));

            const headline = elem.getElementsByTagName("h4")[0];
            map.set("headline", headline.textContent)

            const artist = elem.getElementsByClassName("card-title")[0].getElementsByTagName("span")[0];
            map.set("artist", artist.textContent)


            this.contentListFeed.push(map);

        }
    }


    getFeedView(): any[] {

        let content: any[] = [];

        for(let i = 0; i < this.contentListFeed.length; i++){

            let contentMap = this.contentListFeed[i];

            content.push({
                choosenView: "newgroundsAudioView",
                url: contentMap.get("url"),
                headline: contentMap.get("headline"),
                pluginName: this.displayName,
                image: contentMap.get("imageUrl"),
                artist: contentMap.get("artist"),
            })
        }

        return content;
    }



}