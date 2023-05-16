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

export class Tenor implements PluginInterface, FeedInterface{
    finish = false;
    contentList: Map<string, string>[] = [];

    displayName = "Tenor";
    id = "tenor";
    nextid:string = "null"


    addToPreset(): PresetController {
        let pc = new PresetController();
        pc.addPreset(PresetEnum.IMAGES)
        return pc;
    }

    async findContent(searchText: string, countryUrl: string, pc: PluginController): Promise<void> {

        try{
            await this.startSearch(searchText, pc, false);
            this.finish = true;
            pc.isFinished(this.contentList, this.id);
        }catch (e){
            pc.gotError(this.id)
        }
    }

    async findMoreContent(searchText: string, countryUrl: string, pc: PluginController): Promise<void> {
        this.contentList = [];
        await this.startSearch(searchText, pc, true);
        this.finish = true;

        pc.isFinished(this.contentList, this.id);
    }

    async startSearch(searchText: string, pc: PluginController, isMore: boolean): Promise<void>{
        let hrc = new HttpRequestController()



        if(isMore){
            if(this.nextid === "null"){
                await hrc.httpRequest(
                    "https://tenor.googleapis.com/v2/search?q=" + searchText + "&key=AIzaSyAKnebvCHsKi6XM5AWUCzzgqXhKsx_SG64&limit=30&pos=" + this.nextid,
                    pc, this.id).then(r =>
                    this.analyse(r)
                );

                this.contentList = [];

                await hrc.httpRequest(
                    "https://tenor.googleapis.com/v2/search?q=" + searchText + "&key=AIzaSyAKnebvCHsKi6XM5AWUCzzgqXhKsx_SG64&limit=30&pos=" + this.nextid,
                    pc, this.id).then(r =>
                    this.analyse(r)
                );

            }else {
                await hrc.httpRequest(
                    "https://tenor.googleapis.com/v2/search?q=" + searchText + "&key=AIzaSyAKnebvCHsKi6XM5AWUCzzgqXhKsx_SG64&limit=30&pos=" + this.nextid,
                    pc, this.id).then(r =>
                    this.analyse(r)
                );
            }
        }else{
            await hrc.httpRequest(
                "https://tenor.googleapis.com/v2/search?q=" + searchText + "&key=AIzaSyAKnebvCHsKi6XM5AWUCzzgqXhKsx_SG64&limit=30&pos=" + this.nextid,
                pc, this.id).then(r =>
                this.analyse(r)
            );
        }

    }

    analyse(json: any){
        this.nextid = json.next;

        let array = json.results;
        for(let i = 0; i < array.length; i++){
            let items = array[i];

            let url = JSON.stringify(items.url).replace('"', "").replace('"', "");
            let image = JSON.stringify(items.media_formats.tinygif.url).replace('"', "").replace('"', "");

            let map = new Map<string, string>;

            map.set("url", url);
            map.set("imageUrl", image);
            map.set("scaleIndex", "400");

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
                scaleIndex: contentMap.get("scaleIndex"),
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