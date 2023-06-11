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

export class CFMinecraft implements PluginInterface, FeedInterface{
    finish = false;
    contentList: Map<string, string>[] = [];
    offset: number = 0;

    displayName = "CurseForge Minecraft Mods";
    id = "curseforge_minecraft";

    addToPreset(): PresetController {
        let pc = new PresetController();
        pc.addPreset(PresetEnum.GAMES)
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

        await hrc.httpRequestHeader(
            "https://api.curseforge.com/v1/mods/search?gameId=432&pageSize=30&searchFilter=" + searchText + "&index=" + this.offset,
            "x-api-key: $2a$10$3yOCnyF9OckgqqzAJEiK6eaLmBbvb8iDUx5WIHDdyOJgw83QYLXgC",
            pc, this.id).then(r =>
            this.analyse(r)
        );
    }

    analyse(json: any){
        let array = json.data;
        for(let i = 0; i < array.length; i++){
            let items = array[i];

            let url = JSON.stringify(items.links.websiteUrl).replace('"', "").replace('"', "");
            let headline = JSON.stringify(items.name).replace('"', "").replace('"', "");
            let image = JSON.stringify(items.logo.thumbnailUrl).replace('"', "").replace('"', "");
            let teaser = JSON.stringify(items.summary).replace('"', "").replace('"', "");
            let author = JSON.stringify(items.authors[0].name).replace('"', "").replace('"', "");
            let downloads = JSON.stringify(items.downloadCount).replace('"', "").replace('"', "");

            let categories = ""
            for(let j = 0; j < items.categories.length; j++){
                if(j == 0){
                    categories = JSON.stringify(items.categories[j].name).replace('"', "").replace('"', "")
                }else{
                    categories = categories + ", " + JSON.stringify(items.categories[j].name).replace('"', "").replace('"', "")
                }
            }

            let map = new Map<string, string>;

            map.set("url", url);
            map.set("imageUrl", image);
            map.set("headline", headline);
            map.set("author", author);
            map.set("teaser", teaser);
            map.set("categories", categories);
            map.set("downloads", downloads);

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
                choosenView: "modView",
                url: contentMap.get("url"),
                headline: contentMap.get("headline"),
                image: contentMap.get("imageUrl"),
                teaser: contentMap.get("teaser"),
                author: contentMap.get("author"),
                downloads: contentMap.get("downloads"),
                categories: contentMap.get("categories"),
                pluginName: this.displayName,
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