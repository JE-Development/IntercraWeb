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

export class Giphy implements PluginInterface, FeedInterface{
    finish = false;
    contentList: Map<string, string>[] = [];
    contentListFeed: Map<string, string>[] = [];
    offset: number = 0;

    displayName = "Giphy";
    id = "giphy";

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
        this.offset = this.offset + 30;
        await this.startSearch(searchText, pc);
        this.finish = true;

        pc.isFinished(this.contentList, this.id);
    }

    async startSearch(searchText: string, pc: PluginController): Promise<void>{
        let hrc = new HttpRequestController()

        await hrc.httpRequest(
            "https://api.giphy.com/v1/gifs/search?q=" + searchText + "&limit=30&offset=" + this.offset + "&rating=g&lang=en&api_key=AgkLkrlId0VCrz3bcaA8sXmApqm2Y0AS",
            pc, this.id).then(r =>
            this.analyse(r)
        );
    }

    analyse(json: any){
        let array = json.data;
        for(let i = 0; i < array.length; i++){
            let items = array[i];

            let url = JSON.stringify(items.url).replace('"', "").replace('"', "");
            let image = JSON.stringify(items.images.original.url).replace('"', "").replace('"', "");

            let map = new Map<string, string>;

            map.set("url", url);
            map.set("imageUrl", image);

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
                choosenView: "imageView",
                url: contentMap.get("url"),
                image: contentMap.get("imageUrl"),
                pluginName: this.displayName,
            })
        }

        return content;
    }

    async findFeedContent(pc: PluginController): Promise<void> {
        await this.startFeedSearch(pc);
        this.finish = true;

        pc.isFeedFinished(this.contentList, this.id);
    }

    async findMoreFeedContent(pc: PluginController): Promise<void> {
        let list: Map<string, string>[] = []
        pc.isFeedFinished(list, this.id)
    }


    async startFeedSearch(pc: PluginController): Promise<void>{
        let hrc = new HttpRequestController()

        await hrc.httpRequest(
            "https://api.giphy.com/v1/gifs/trending?api_key=AgkLkrlId0VCrz3bcaA8sXmApqm2Y0AS&limit=30",
            pc, this.id).then(r =>
            this.analyseFeed(r)
        );
    }

    analyseFeed(json: any){
        let array = json.data;
        for(let i = 0; i < array.length; i++){
            let items = array[i];

            let url = JSON.stringify(items.url).replace('"', "").replace('"', "");
            let image = JSON.stringify(items.images.original.url).replace('"', "").replace('"', "");

            let map = new Map<string, string>;

            map.set("url", url);
            map.set("imageUrl", image);

            this.contentListFeed.push(map);
        }
    }

    getFeedView(): any[] {

        let content: any[] = [];

        for(let i = 0; i < this.contentListFeed.length; i++){

            let contentMap = this.contentListFeed[i];

            content.push({
                choosenView: "imageView",
                url: contentMap.get("url"),
                image: contentMap.get("imageUrl"),
                pluginName: this.displayName,
            })
        }

        return content;
    }

}