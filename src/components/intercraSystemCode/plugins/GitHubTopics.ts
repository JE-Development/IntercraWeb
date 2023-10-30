import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import type {PluginController} from "../controllers/PluginController";
import {PresetEnum} from "../enums/PresetEnum";
import type {FeedInterface} from "../interfaces/FeedInterface";

export class GitHubTopics implements PluginInterface, FeedInterface{
    finish = false;
    contentList: Map<string, string>[] = [];

    displayName = "GitHub Topics";
    id = "github_topics";
    page = 1;

    addToPreset(): PresetController {
        let pc = new PresetController();
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
        this.page = this.page + 1;
        this.contentList = [];
        let html = await fetch("https://intercra-backend.jason-apps.workers.dev/html/more/" + this.id + "/" + searchText + "/" + this.page);
        let text = await html.text();
        const parser = new DOMParser();
        const document: any = parser.parseFromString(text, "text/html");

        this.startSearch(document);
        this.finish = true;

        //let pc = new PluginController();
        pc.isFinished(this.contentList, this.id);
    }

    startSearch(document: any): void{

        const rawList = document.getElementsByClassName("topic-list-item");

        for(let j = 0; j < rawList.length; j++){
            let map = new Map<string, string>;
            let list = rawList[j];

            const headline = list.getElementsByClassName("d-flex")[0].getElementsByTagName("a")[0].textContent;
            map.set("headline", headline);

            const url = list.getElementsByTagName("a")[0].getAttribute("href");
            map.set("url", "https://github.com" + url);

            try {
                const sub = list.getElementsByClassName("mt-n1")[0].getElementsByTagName("p")[0].textContent;
                map.set("teaser", sub);
            }catch (e){
                map.set("teaser", "");
            }
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

            if(contentMap.get("headline") != null) {
                content.push({
                    choosenView: "githubView",
                    url: contentMap.get("url"),
                    headline: contentMap.get("headline"),
                    pluginName: this.displayName,
                    teaser: contentMap.get("teaser"),
                })
            }
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