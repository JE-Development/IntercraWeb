import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import {ViewCollection} from "../classes/ViewCollection";
import type {PluginController} from "../controllers/PluginController";
import {SpotifyController} from "../controllers/SpotifyController";
import {PresetEnum} from "../enums/PresetEnum";
import {GoogleController} from "../controllers/GoogleController";
import {HttpRequestController} from "../controllers/HttpRequestController";

export class Flickr implements PluginInterface{
    finish = false;
    contentList: Map<string, string>[] = [];
    page: number = 1;

    displayName = "Flickr";
    id = "flickr";

    addToPreset(): PresetController {
        let pc = new PresetController();
        pc.addPreset(PresetEnum.IMAGES)
        return pc;
    }

    async findContent(searchText: string, countryUrl: string, pc: PluginController): Promise<void> {

        await this.startSearch(searchText, pc);
        this.finish = true;

        pc.isFinished(this.contentList, this.id);
    }

    async findMoreContent(searchText: string, countryUrl: string, pc: PluginController): Promise<void> {
        this.contentList = [];
        this.page = this.page + 1;
        await this.startSearch(searchText, pc);
        this.finish = true;

        pc.isFinished(this.contentList, this.id);
    }

    async startSearch(searchText: string, pc: PluginController): Promise<void>{
        let hrc = new HttpRequestController()

        await hrc.httpRequest(
            "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=4d7ad36ec7d127e1e48b5a3800277c70&text=" + searchText + "&format=json&nojsoncallback=1&page=" + this.page,
            pc, this.id).then(r =>
            this.analyse(r)
        );
    }

    analyse(json: any){
        let array = json.photos.photo;
        for(let i = 0; i < array.length; i++){
            let items = array[i];

            let url = "https://www.flickr.com/photos/" + JSON.stringify(items.owner).replace(/\"+/g, '');
            + "/" + JSON.stringify(items.id).replace('"', "").replace(/\"+/g, '');

            let image = "https://live.staticflickr.com/" + JSON.stringify(items.server).replace(/\"+/g, '');
                + "/" + JSON.stringify(items.id).replace(/\"+/g, '');
                + "_" + JSON.stringify(items.secret).replace(/\"+/g, '');
                + ".jpg";

            let headline = JSON.stringify(items.title).replace(/\"+/g, '');

            let map = new Map<string, string>;

            map.set("url", url);
            map.set("imageUrl", image);
            map.set("headline", headline);

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