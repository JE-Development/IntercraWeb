import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import {ViewCollection} from "../classes/ViewCollection";
import type {PluginController} from "../controllers/PluginController";
import {SpotifyController} from "../controllers/SpotifyController";
import {PresetEnum} from "../enums/PresetEnum";
import {GoogleController} from "../controllers/GoogleController";
import {HttpRequestController} from "../controllers/HttpRequestController";
import type {FeedInterface} from "../interfaces/FeedInterface";

export class ITunesBooks implements PluginInterface, FeedInterface{
    finish = false;
    contentList: Map<string, string>[] = [];
    page: number = 1;

    displayName = "iTunes Books";
    id = "itunes_books";

    addToPreset(): PresetController {
        let pc = new PresetController();
        pc.addPreset(PresetEnum.BOOKS)
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
            "https://itunes.apple.com/search?term=" + searchText + "&limit=50&media=ebook",
            pc, this.id).then(r =>
            this.analyse(r)
        );
    }

    analyse(json: any){
        let array = json.results;
        for(let i = 0; i < array.length; i++){
            let items = array[i];

            if(items.trackViewUrl != null) {
                let url = JSON.stringify(items.trackViewUrl).replace('"', "").replace('"', "");
                let image = JSON.stringify(items.artworkUrl100).replace('"', "").replace('"', "");
                let artist = JSON.stringify(items.artistName).replace('"', "").replace('"', "");
                let headline = JSON.stringify(items.trackCensoredName).replace('"', "").replace('"', "");
                let price = JSON.stringify(items.formattedPrice).replace('"', "").replace('"', "");

                let map = new Map<string, string>;

                map.set("url", url);
                map.set("headline", headline);
                map.set("imageUrl", image);
                map.set("artist", artist);
                map.set("price", price);
                map.set("scaleIndex", "150");

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
                choosenView: "itunesView",
                url: contentMap.get("url"),
                headline: contentMap.get("headline"),
                pluginName: this.displayName,
                price: contentMap.get("price"),
                image: contentMap.get("imageUrl"),
                type: contentMap.get("type"),
                artist: contentMap.get("artist"),
                scaleIndex: contentMap.get("scaleIndex")
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