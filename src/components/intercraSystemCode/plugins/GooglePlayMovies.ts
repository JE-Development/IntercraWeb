import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import {ViewCollection} from "../classes/ViewCollection";
import type {PluginController} from "../controllers/PluginController";
import {PresetEnum} from "../enums/PresetEnum";
import {HttpRequestController} from "../controllers/HttpRequestController";

export class GooglePlayMovies implements PluginInterface{
    finish = false;
    contentList: Map<string, string>[] = [];

    displayName = "Google Play Movies";
    id = "google_play_movies";

    addToPreset(): PresetController {
        let pc = new PresetController();
        pc.addPreset(PresetEnum.VIDEOS);
        pc.addPreset(PresetEnum.MOVIES);
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
        this.contentList = [];

        pc.isFinished(this.contentList, this.id);
    }

    async startSearch(searchText: string, pc: PluginController): Promise<void>{
        let hrc = new HttpRequestController()

        await hrc.intercraHttpRequest(this.id, searchText, 1, pc).then(r => this.analyse(r));
    }

    analyse(json: any){
        let array = json.items;
        for(let i = 0; i < array.length; i++){
            let items = array[i];

            let url = JSON.stringify(items.url).replace(/\"+/g, '');
            let image = JSON.stringify(items.imageUrl).replace(/\"+/g, '');
            let headline = JSON.stringify(items.headline).replace(/\"+/g, '');
            let price = JSON.stringify(items.price).replace(/\"+/g, '');


            let map = new Map<string, string>;

            map.set("url", url);
            map.set("imageUrl", image);
            map.set("headline", headline);
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
                choosenView: "playStoreNoIconView",
                url: contentMap.get("url"),
                headline: contentMap.get("headline"),
                pluginName: this.displayName,
                publisher: contentMap.get("publisher"),
                image: contentMap.get("imageUrl"),
                price: contentMap.get("price"),
            })


        }

        return content;
    }

}