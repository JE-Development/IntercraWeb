import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import {ViewCollection} from "../classes/ViewCollection";
import type {PluginController} from "../controllers/PluginController";
import {SpotifyController} from "../controllers/SpotifyController";
import {PresetEnum} from "../enums/PresetEnum";
import {GoogleController} from "../controllers/GoogleController";

export class GoogleWeb implements PluginInterface{
    finish = false;
    contentList: Map<string, string>[] = [];
    offset: number = 1;

    displayName = "Google Web";
    id = "google_web";

    addToPreset(): PresetController {
        let pc = new PresetController();
        pc.addPreset(PresetEnum.NEWS);
        pc.addPreset(PresetEnum.INFORMATION);
        return pc;
    }

    async findContent(searchText: string, countryUrl: string, pc: PluginController): Promise<void> {

        await this.startSearch(searchText);
        this.finish = true;

        pc.isFinished(this.contentList, this.id);
    }

    async findMoreContent(searchText: string, countryUrl: string, pc: PluginController): Promise<void> {
        this.contentList = [];
        this.offset = this.offset + 10;
        await this.startSearch(searchText);
        this.finish = true;

        pc.isFinished(this.contentList, this.id);
    }

    async startSearch(searchText: string): Promise<void>{
        let gc = new GoogleController();

        await gc.httpSearchRequest(searchText, this.offset).then(r =>
            this.analyse(r)
        );
    }

    analyse(json: any){
        let array = json.items;
        for(let i = 0; i < array.length; i++){
            let items = array[i];

            let url = JSON.stringify(items.link).replace(/\"+/g, '');
            let headline = JSON.stringify(items.title).replace(/\"+/g, '');
            let teaser = JSON.stringify(items.snippet).replace(/\"+/g, '');

            let map = new Map<string, string>;

            map.set("url", url);
            map.set("headline", headline);
            map.set("teaser", teaser);

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
                choosenView: "informationView",
                url: contentMap.get("url"),
                headline: contentMap.get("headline"),
                pluginName: this.displayName,
                teaser: contentMap.get("teaser"),
            })
        }

        return content;
    }

}