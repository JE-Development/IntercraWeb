import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import {ViewCollection} from "../classes/ViewCollection";
import type {PluginController} from "../controllers/PluginController";
import {PresetEnum} from "../enums/PresetEnum";
import type {FeedInterface} from "../interfaces/FeedInterface";

export class GooglePlayMovies implements PluginInterface, FeedInterface{
    finish = false;
    contentList: Map<string, string>[] = [];

    displayName = "Google Play Movies";
    id = "google_play_movies";

    addToPreset(): PresetController {
        let pc = new PresetController();
        //pc.addPreset(PresetEnum.VIDEOS);
        //pc.addPreset(PresetEnum.MOVIES);
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
        const article = document.getElementsByTagName("div");
        for(let i = 0; i < article.length; i++){
            if(article[i].getAttribute("role") === "listitem") {
                const e = article[i];
                //if (e.getAttribute("data-component-type") === "s-search-result") {
                    let map = new Map<string, string>;

                    let appLink = e.getElementsByTagName("a")[0];
                    map.set("url", "https://play.google.com" + appLink.getAttribute("href"));


                    let parent = e.getElementsByTagName("a")[0];
                    let title = parent.children[1];
                    let image = parent.children[0].children[0];
                    if(title != null && image != null) {
                        map.set("headline", title.children[0].getAttribute("title"));
                        map.set("imageUrl", image.getAttribute("src"));
                    }

                    let names = e.getElementsByTagName("span");
                    if(names.length >= 3){
                        let appName = names[0].textContent;
                        let publisher = names[1].textContent;

                        if(appName === ""){
                            appName = names[1].textContent;
                            publisher = names[2].textContent;
                        }

                        //map.set("headline", appName);
                        map.set("publisher", publisher);
                    }

                    let price = e.getElementsByTagName("span")[0];
                    map.set("price", price.textContent);

                    let bool = true;
                    for(let j = 0; j < this.contentList.length; j++){
                        let s = this.contentList[j].get("url");
                        if(s === map.get("url")){
                            bool = false;
                        }
                    }
                    let checkUrl = String(map.get("url"));
                    if(bool && !checkUrl.includes("https://play.google.com/store/search?q=")){
                        this.contentList.push(map);
                    }
                //}
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
                choosenView: "playStoreNoIconView",
                url: contentMap.get("url"),
                headline: contentMap.get("headline"),
                pluginName: this.displayName,
                publisher: contentMap.get("publisher"),
                image: contentMap.get("imageUrl"),
            })


        }

        return content;
    }

    async findFeedContent(pc: PluginController): Promise<void> {
        let list: Map<string, string>[] = []
        pc.isFeedFinished(list, this.id)
    }

    async findMoreFeedContent(pc: PluginController): Promise<void> {
        let list: Map<string, string>[] = []
        pc.isFeedFinished(list, this.id)
    }

    getFeedView(): string[] {
        return [];
    }

}