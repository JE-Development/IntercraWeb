import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import type {PluginController} from "../controllers/PluginController";
import {ViewCollection} from "../classes/ViewCollection";
import {PresetEnum} from "../enums/PresetEnum";
import {HttpRequestController} from "../controllers/HttpRequestController";
import {apiKey} from "../classes/Var";

export class NonaWeb implements PluginInterface{
    finish = false;
    contentList: Map<string, string>[] = [];

    displayName = "Nona Web";
    id = "nona_web";
    page = 1;

    addToPreset(): PresetController {
        let pc = new PresetController();
        pc.addPreset(PresetEnum.INFORMATION);
        pc.addPreset(PresetEnum.NEWS);
        return pc;
    }

    async findContent(searchText: string, countryUrl: string, pc: PluginController): Promise<void> {
        try {
            await this.startSearch(searchText, pc);
            this.finish = true;

            pc.isFinished(this.contentList, this.id);
        }catch (error){
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

        await hrc.httpRequest(
            "https://intercra-backend.jason-apps.workers.dev/api/plugins/id=" + this.id + "&q=" + searchText + "&page=" + this.page + "&key=" + apiKey,
            pc, this.id).then(r =>
            this.analyse(r)
        );
    }

    analyse(json: any){
        let array = JSON.parse(json.replace("\{\"items\"\:\{\{", "\{\"items\"\:\[\{").replace("\}\}\}", "\}\]\}")).items;
        for(let i = 0; i < array.length; i++){
            let items = array[i];

            let url = JSON.stringify(items.url).replace('"', "").replace('"', "");
            let teaser = JSON.stringify(items.teaser).replace('"', "").replace('"', "").replace("\\n", "").replace("\\n", "");
            let headline = JSON.stringify(items.headline).replace('"', "").replace('"', "").replace("\\n", "").replace("\\n", "");


            let map = new Map<string, string>;

            map.set("url", url);
            map.set("teaser", teaser);
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