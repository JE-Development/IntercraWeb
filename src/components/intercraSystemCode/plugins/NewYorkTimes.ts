import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import {ViewCollection} from "../classes/ViewCollection";
import type {PluginController} from "../controllers/PluginController";
import {SpotifyController} from "../controllers/SpotifyController";
import {PresetEnum} from "../enums/PresetEnum";
import {GoogleController} from "../controllers/GoogleController";
import {HttpRequestController} from "../controllers/HttpRequestController";

export class NewYorkTimes implements PluginInterface{
    finish = false;
    contentList: Map<string, string>[] = [];
    page: number = 1;

    displayName = "New York Times";
    id = "new_york_times";

    addToPreset(): PresetController {
        let pc = new PresetController();
        pc.addPreset(PresetEnum.NEWS)
        return pc;
    }

    async findContent(searchText: string, countryUrl: string, pc: PluginController): Promise<void> {

        await this.startSearch(searchText, pc);
        this.finish = true;

        pc.isFinished(this.contentList, this.id);
    }

    async findMoreContent(searchText: string, countryUrl: string, pc: PluginController): Promise<void> {
        this.contentList = [];

        pc.isFinished(this.contentList, this.id);
    }

    async startSearch(searchText: string, pc: PluginController): Promise<void>{
        let hrc = new HttpRequestController()

        await hrc.httpRequest(
            "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchText + "&api-key=2AXSfKzse0JvqZEdarXKWedWuPcU2vmS",
            pc, this.id).then(r =>
            this.analyse(r)
        );
    }

    analyse(json: any){
        let array = json.response.docs;
        for(let i = 0; i < array.length; i++){
            try{
                let items = array[i];

                let url = JSON.stringify(items.web_url).replace('"', "").replace('"', "");
                let headline = JSON.stringify(items.headline.main).replace('"', "").replace('"', "");
                let image = "https://www.nytimes.com/" + JSON.stringify(items.multimedia[0].url).replace('"', "").replace('"', "");
                let teaser = JSON.stringify(items.snippet).replace('"', "").replace('"', "");
                let time = JSON.stringify(items.pub_date).replace('"', "").replace('"', "")
                    .split("T")[0];
                let source = JSON.stringify(items.source).replace('"', "").replace('"', "");

                let map = new Map<string, string>;

                map.set("url", url);
                map.set("imageUrl", image);
                map.set("headline", headline);
                map.set("teaser", teaser);
                map.set("time", time);
                map.set("source", source);

                this.contentList.push(map);
            }catch (e){
                //something went wrong
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
                platform: contentMap.get("source"),
                date: contentMap.get("time"),
                author: contentMap.get("author")
            })
        }

        return content;
    }

}