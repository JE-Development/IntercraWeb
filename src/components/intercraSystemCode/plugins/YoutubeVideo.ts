import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import type {PluginController} from "../controllers/PluginController";
import {PresetEnum} from "../enums/PresetEnum";
import {GoogleController} from "../controllers/GoogleController";
import type {FeedInterface} from "@/src/components/intercraSystemCode/interfaces/FeedInterface";

export class YoutubeVideo implements PluginInterface, FeedInterface{
    finish = false;
    contentList: Map<string, string>[] = [];

    displayName = "YouTube Video";
    id = "youtube_video";

    addToPreset(): PresetController {
        let pc = new PresetController();
        pc.addPreset(PresetEnum.AUDIO);
        pc.addPreset(PresetEnum.VIDEOS);
        pc.addPreset(PresetEnum.PODCAST);
        return pc;
    }

    async findContent(searchText: string, countryUrl: string, pc: PluginController): Promise<void> {

        await this.startSearch(searchText, pc);
        this.finish = true;

        pc.isFinished(this.contentList, this.id);
    }

    async findMoreContent(searchText: string, countryUrl: string, pc: PluginController): Promise<void> {
        this.contentList = [];
        pc.isFinished(this.contentList, this.id);
    }

    async startSearch(searchText: String, pc: PluginController): Promise<void>{
        let gc = new GoogleController();
        let split = searchText.split(";;;");

        await gc.httpVideoRequest(split[0], split[1]).then(r =>
            this.analyse(r, pc)
        );
    }

    analyse(json: any, pc: PluginController){
        if(json != null) {
            let array = json.items;
            for (let i = 0; i < array.length; i++) {
                let items = array[i].snippet;


                if (array[i].id.videoId != null) {
                    let url = "https://www.youtube.com/watch?v=" + JSON.stringify(array[i].id.videoId).replace('"', "").replace('"', "");
                    let headline = JSON.stringify(items.title).replace('"', "").replace('"', "");
                    let channel = JSON.stringify(items.channelTitle).replace('"', "").replace('"', "");
                    let image = JSON.stringify(items.thumbnails.high.url).replace('"', "").replace('"', "");
                    let date = JSON.stringify(items.publishTime).replace('"', "").replace('"', "").split("T")[0];

                    let map = new Map<string, string>;

                    map.set("url", url);
                    map.set("headline", headline);
                    map.set("channel", channel);
                    map.set("date", date);
                    map.set("imageUrl", image);

                    this.contentList.push(map);
                }
            }
        }else{
            pc.gotError(this.id);
        }
    }

    parseToTime(timeStr: string): string{
        let milli: number = Number.parseInt(timeStr);
        let sec = Math.trunc(milli/1000);
        let m = Math.trunc(sec/60);
        let s = sec%60;
        let mStr = "" + m;
        let sStr = "" + s;
        if(m <= 9){
            mStr = "0" + m;
        }
        if(s <= 9){
            sStr = "0" + s;
        }
        let fin = mStr + ":" + sStr;
        return fin;
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
                choosenView: "articleView",
                url: contentMap.get("url"),
                headline: contentMap.get("headline"),
                pluginName: this.displayName,
                image: contentMap.get("imageUrl"),
                teaser: contentMap.get("channel"),
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