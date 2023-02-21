import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import type {PluginController} from "../controllers/PluginController";
import {ViewCollection} from "../classes/ViewCollection";
import {PresetEnum} from "../enums/PresetEnum";
import {HttpRequestController} from "../controllers/HttpRequestController";

export class BandcampArtistLabel implements PluginInterface{
    finish = false;
    contentList: Map<string, string>[] = [];

    displayName = "Bandcamp Artist & Label";
    id = "bandcamp_artist_label";
    page = 1;

    addToPreset(): PresetController {
        let pc = new PresetController();
        pc.addPreset(PresetEnum.AUDIO);
        return pc;
    }

    async findContent(searchText: string, countryUrl: string, pc: PluginController): Promise<void> {
        try {
            await this.startSearch(searchText, pc);
            this.finish = true;

            pc.isFinished(this.contentList, this.id);
        }catch (error){
            console.log(String(error))
            pc.gotError(this.id);
        }
    }

    async findMoreContent(searchText: string, countryUrl: string, pc: PluginController): Promise<void> {
        this.page = this.page + 1;
        this.contentList = [];

        await this.startSearch(searchText, pc);
        this.finish = true;

        pc.isFinished(this.contentList, this.id);
    }

    async startSearch(searchText: string, pc: PluginController): Promise<void>{
        let hrc = new HttpRequestController()

        await hrc.intercraHttpRequest(this.id, searchText, this.page, pc).then(r => this.analyse(r));
    }

    analyse(json: any){
        let array = json.items;
        for(let i = 0; i < array.length; i++){
            console.log("array: " + array.length)
            let items = array[i];

            let url = JSON.stringify(items.url).replace(/\"+/g, '');
            let image = JSON.stringify(items.imageUrl).replace(/\"+/g, '');
            let headline = JSON.stringify(items.headline).replace(/\"+/g, '');
            let type = JSON.stringify(items.type).replace(/\"+/g, '');
            let artist = JSON.stringify(items.artist).replace(/\"+/g, '');
            let release = JSON.stringify(items.release).replace(/\"+/g, '');
            let tags = JSON.stringify(items.tags).replace(/\"+/g, '');
            let genre = JSON.stringify(items.genre).replace(/\"+/g, '');


            let map = new Map<string, string>;

            map.set("url", url);
            map.set("imageUrl", image);
            map.set("headline", headline);
            map.set("type", type);
            map.set("artist", artist);
            map.set("release", release);
            map.set("tags", tags);
            map.set("genre", genre);

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
                choosenView: "bandcampView",
                url: contentMap.get("url"),
                headline: contentMap.get("headline"),
                pluginName: this.displayName,
                image: contentMap.get("imageUrl"),
                artist: contentMap.get("artist"),
                release: contentMap.get("release"),
                tags: contentMap.get("tags"),
                genre: contentMap.get("genre"),
                type: contentMap.get("type"),
            })
        }

        return content;
    }

}