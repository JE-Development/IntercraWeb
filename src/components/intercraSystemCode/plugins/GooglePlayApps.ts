import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import {ViewCollection} from "../classes/ViewCollection";
import type {PluginController} from "../controllers/PluginController";
import {PresetEnum} from "../enums/PresetEnum";
import type {FeedInterface} from "../interfaces/FeedInterface";

export class GooglePlayApps implements PluginInterface, FeedInterface{
    finish = false;
    contentList: Map<string, string>[] = [];

    displayName = "Google Play Apps";
    id = "google_play_apps";

    addToPreset(): PresetController {
        let pc = new PresetController();
        pc.addPreset(PresetEnum.GAMES);
        pc.addPreset(PresetEnum.SOFTWARE);
        return pc;
    }

    async findContent(searchText: string, countryUrl: string, pc: PluginController): Promise<void> {

        try {
            await pc.collectRequests(this, false, false)

        }catch (error){
            console.log(error)
            pc.gotError(this.id);
        }
    }

    async findMoreContent(searchText: string, countryUrl: string, pc: PluginController): Promise<void> {
        try {
            await pc.collectRequests(this, true, true)

        }catch (error){
            pc.gotError(this.id);
        }
    }


    analyse(json: any, pc: PluginController){
        let array = json.data;

        for(let i = 0; i < array.length; i++){
            if(array[i].pluginContent.name === this.id){
                for(let j = 0; j < array[i].pluginContent.content.length; j++){
                    let items = array[i].pluginContent.content[j]


                    let url = JSON.stringify(items.url).replace(/"/g, '');
                    let headline = JSON.stringify(items.headline).replace(/"/g, '');
                    let image = JSON.stringify(items.imageUrl).replace(/"/g, '');
                    let appIconUrl = JSON.stringify(items.appIconUrl).replace(/"/g, '');
                    let publisher = JSON.stringify(items.publisher).replace(/"/g, '');


                    let map = new Map<string, string>;

                    map.set("url", url);
                    map.set("headline", headline);
                    map.set("imageUrl", image);
                    map.set("appIconUrl", appIconUrl);
                    map.set("publisher", publisher);

                    this.contentList.push(map);
                }
            }
        }
        pc.isFinished(this.contentList, this.id)
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
                choosenView: "playStoreView",
                url: contentMap.get("url"),
                headline: contentMap.get("headline"),
                pluginName: this.displayName,
                publisher: contentMap.get("publisher"),
                image: contentMap.get("imageUrl"),
                appIcon: contentMap.get("appIconUrl")
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