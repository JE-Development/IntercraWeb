import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import type {PluginController} from "../controllers/PluginController";
import {PresetEnum} from "../enums/PresetEnum";
import {HttpRequestController} from "../controllers/HttpRequestController";

export class Sketchfab implements PluginInterface{
    finish = false;
    contentList: Map<string, string>[] = [];

    displayName = "Sketchfab";
    id = "sketchfab";
    page = 1;

    addToPreset(): PresetController {
        let pc = new PresetController();
        pc.addPreset(PresetEnum.MODELS3D);
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

        this.contentList = [];

        pc.isFinished(this.contentList, this.id);
    }

    async startSearch(searchText: string, pc: PluginController): Promise<void>{
        let hrc = new HttpRequestController()

        await hrc.httpRequest(
            "https://sketchfab.com/v3/search?type=models&q=" + searchText,
            pc, this.id).then(r =>
            this.analyse(r)
        );
    }

    analyse(json: any){
        let array = json.results;
        for(let i = 0; i < array.length; i++){
            let items = array[i];

            let url = JSON.stringify(items.viewerUrl).replace(/\"+/g, '');
            let image = JSON.stringify(items.thumbnails.images[0].url).replace(/\"+/g, '');
            let headline = JSON.stringify(items.name).replace(/\"+/g, '');
            let creator = JSON.stringify(items.user.displayName).replace(/\"+/g, '');


            let map = new Map<string, string>;

            map.set("url", url);
            map.set("imageUrl", image);
            map.set("headline", headline);
            map.set("creator", creator);

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
                choosenView: "modelsView",
                url: contentMap.get("url"),
                headline: this.cutString(String(contentMap.get("headline"))),
                pluginName: this.displayName,
                artist: contentMap.get("creator"),
                image: contentMap.get("imageUrl")
            })
        }

        return content;
    }

    cutString(str: string): string{
        let index = 80;
        if(str.length > index) {
            let cut = str.substring(0, index) + "...";
            return cut;
        }else{
            return str;
        }
    }

}