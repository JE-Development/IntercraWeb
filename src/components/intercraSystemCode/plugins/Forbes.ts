import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import {ViewCollection} from "../classes/ViewCollection";
import type {PluginController} from "../controllers/PluginController";
import {SpotifyController} from "../controllers/SpotifyController";
import {PresetEnum} from "../enums/PresetEnum";
import {GoogleController} from "../controllers/GoogleController";
import {HttpRequestController} from "../controllers/HttpRequestController";

export class Forbes implements PluginInterface{
    finish = false;
    contentList: Map<string, string>[] = [];
    page: number = 1;

    displayName = "Forbes";
    id = "forbes";

    addToPreset(): PresetController {
        let pc = new PresetController();
        pc.addPreset(PresetEnum.NEWS)
        return pc;
    }

    async findContent(searchText: string, countryUrl: string, pc: PluginController): Promise<void> {

        try {
            let html = await fetch("https://intercra-backend.jason-apps.workers.dev/html/data/forbes/" + searchText);
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
        const article = document.getElementsByTagName("search-results__items").children;
        for(let i = 0; i < article.length; i++){
            const e = article[i];
            let map = new Map<string, string>;

            let link = e.getElementsByClassName("stream-item__title")[0];
            map.set("url", "https://play.google.com" + link.getAttribute("href"));
            map.set("headline", link.textContent);

            let image = e.getElementsByClassName("stream-item__image")[0];
            let imgUrl = image.getAttribute("style").replace("background-image: url(\"", "").replace("\")", "")
            map.set("imageUrl", imgUrl);

            let teaser = e.getElementsByClassName("stream-item__description")[0];
            map.set("teaser", teaser.textContent)

            let author = e.getElementsByClassName("byline__author-name")[0]
            map.set("author", author.textContent)

            let time = e.getElementsByClassName("stream-item__date")
            map.set("time", time.textContent)
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

}