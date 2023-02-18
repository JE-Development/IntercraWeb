import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import type {PluginController} from "../controllers/PluginController";
import {PresetEnum} from "../enums/PresetEnum";
import {HttpRequestController} from "../controllers/HttpRequestController";
import {apiKey} from '../classes/Var'

export class Amazon implements PluginInterface{
    finish = false;
    contentList: Map<string, string>[] = [];

    displayName = "Amazon";
    id = "amazon";
    page = 1;

    addToPreset(): PresetController {
        let pc = new PresetController();
        pc.addPreset(PresetEnum.GAMES);
        pc.addPreset(PresetEnum.BOOKS);
        pc.addPreset(PresetEnum.SHOPPING);
        pc.addPreset(PresetEnum.VIDEOS);
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

        await hrc.httpRequest(
            "https://intercra-backend.jason-apps.workers.dev/api/plugins/id=" + this.id + "&q=" + searchText + "&page=" + this.page + "&key=" + apiKey,
            pc, this.id).then(r =>
            this.analyse(r)
        );
    }

    analyse(json: any){
        console.log(json.replace("\{\"items\"\:\{\{", "\{\"items\"\:\[\{").replace("\}\}\}", "\}\]\}"))
        let array = JSON.parse(json.replace("\{\"items\"\:\{\{", "\{\"items\"\:\[\{").replace("\}\}\}", "\}\]\}")).items;
        for(let i = 0; i < array.length; i++){
            console.log("array: " + array.length)
            let items = array[i];

            let url = JSON.stringify(items.url).replace('"', "").replace('"', "");
            let image = JSON.stringify(items.imageUrl).replace('"', "").replace('"', "");
            let headline = JSON.stringify(items.headline).replace('"', "").replace('"', "");
            let price = JSON.stringify(items.price).replace('"', "").replace('"', "");


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
                choosenView: "shoppingView",
                url: contentMap.get("url"),
                headline: this.cutString(String(contentMap.get("headline"))),
                pluginName: this.displayName,
                price: contentMap.get("price"),
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