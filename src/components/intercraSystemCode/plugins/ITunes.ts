import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import {ViewCollection} from "../classes/ViewCollection";
import type {PluginController} from "../controllers/PluginController";
import {SpotifyController} from "../controllers/SpotifyController";
import {PresetEnum} from "../enums/PresetEnum";
import {GoogleController} from "../controllers/GoogleController";
import {HttpRequestController} from "../controllers/HttpRequestController";

export class ITunes implements PluginInterface{
    finish = false;
    contentList: Map<string, string>[] = [];
    page: number = 1;

    displayName = "iTunes";
    id = "itunes";

    addToPreset(): PresetController {
        let pc = new PresetController();
        pc.addPreset(PresetEnum.INFORMATION)
        pc.addPreset(PresetEnum.PROGRAMMING)
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
            "https://itunes.apple.com/search?term=" + searchText + "&limit=50",
            pc, this.id).then(r =>
            this.analyse(r)
        );
    }

    analyse(json: any){
        let array = json.results;
        for(let i = 0; i < array.length; i++){
            let items = array[i];

            let url = JSON.stringify(items.collectionViewUrl).replace(/\"+/g, '');
            let type = JSON.stringify(items.wrapperType).replace(/\"+/g, '');
            let image = JSON.stringify(items.artworkUrl100).replace(/\"+/g, '');
            let artist = JSON.stringify(items.artistName).replace(/\"+/g, '');
            let headline = JSON.stringify(items.collectionName).replace(/\"+/g, '');
            let price = "$" + JSON.stringify(items.collectionPrice).replace(/\"+/g, '');

            let map = new Map<string, string>;

            map.set("url", url);
            map.set("headline", headline);
            map.set("type", type);
            map.set("imageUrl", image);
            map.set("artist", artist);
            map.set("price", price);

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
                choosenView: "itunesView",
                url: contentMap.get("url"),
                headline: contentMap.get("headline"),
                pluginName: this.displayName,
                price: contentMap.get("price"),
                image: contentMap.get("imageUrl"),
                type: contentMap.get("type"),
                artist: contentMap.get("artist"),
            })
        }

        return content;
    }

}