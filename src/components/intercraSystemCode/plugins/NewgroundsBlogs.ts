import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import type {PluginController} from "../controllers/PluginController";
import {ViewCollection} from "../classes/ViewCollection";
import {PresetEnum} from "../enums/PresetEnum";
import type {FeedInterface} from "../interfaces/FeedInterface";

export class NewgroundsBlogs implements PluginInterface, FeedInterface{
    finish = false;
    contentList: Map<string, string>[] = [];

    displayName = "Newgrounds Blogs";
    id = "newgrounds_blogs";
    page = 1;

    addToPreset(): PresetController {
        let pc = new PresetController();
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
                    let teaser = JSON.stringify(items.teaser).replace(/"/g, '');
                    let artist = JSON.stringify(items.artist).replace(/"/g, '');
                    let date = JSON.stringify(items.date).replace(/"/g, '');


                    let map = new Map<string, string>;

                    map.set("url", url);
                    map.set("headline", headline);
                    map.set("imageUrl", image);
                    map.set("teaser", teaser);
                    map.set("artist", artist);
                    map.set("data", date);

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
                choosenView: "newgroundsAudioView",
                url: contentMap.get("url"),
                headline: contentMap.get("headline"),
                pluginName: this.displayName,
                image: contentMap.get("imageUrl"),
                teaser: contentMap.get("teaser"),
                artist: contentMap.get("artist"),
                date: contentMap.get("date"),
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