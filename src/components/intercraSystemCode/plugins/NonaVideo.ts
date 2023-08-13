import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import type {PluginController} from "../controllers/PluginController";
import {ViewCollection} from "../classes/ViewCollection";
import {PresetEnum} from "../enums/PresetEnum";
import type {FeedInterface} from "../interfaces/FeedInterface";

export class NonaVideo implements PluginInterface, FeedInterface{
    finish = false;
    contentList: Map<string, string>[] = [];

    displayName = "Nona Video";
    id = "nona_video";
    page = 1;

    addToPreset(): PresetController {
        let pc = new PresetController();
        //pc.addPreset(PresetEnum.VIDEOS);
        pc.addPreset(PresetEnum.PODCAST);
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
        const document = parser.parseFromString(text, "text/html");
        this.startSearch(document);
        this.finish = true;

        pc.isFinished(this.contentList, this.id);
    }

    startSearch(document: any): void{
        const content = document.getElementsByClassName("video-results__item");

        for(let i = 0; i < content.length; i++){
            const elem = content[i];
            let map = new Map<string, string>;

            const link = elem.getElementsByClassName("video-result-teaser__link")[0];
            const url = link.getAttribute("href");
            map.set("url", url);

            const headline = elem.getElementsByClassName("video-result-teaser__image")[0];
            map.set("headline", headline.getAttribute("alt"));

            const time = elem.getElementsByClassName("video-result-teaser__image-duration")[0];
            map.set("time", time.textContent);

            const platform = elem.getElementsByClassName("video-result-teaser__source")[0];
            map.set("topic", platform.textContent);

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
                choosenView: "articleView",
                url: contentMap.get("url"),
                headline: contentMap.get("headline"),
                pluginName: this.displayName,
                image: contentMap.get("imageUrl"),
                platform: contentMap.get("topic"),
                date: contentMap.get("time")
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