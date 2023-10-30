import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import {ViewCollection} from "../classes/ViewCollection";
import type {PluginController} from "../controllers/PluginController";
import {SpotifyController} from "../controllers/SpotifyController";
import {PresetEnum} from "../enums/PresetEnum";
import type {FeedInterface} from "../interfaces/FeedInterface";

export class Iconfinder implements PluginInterface, FeedInterface{
    finish = false;
    contentList: Map<string, string>[] = [];
    page: number = 0;

    displayName = "Iconfinder";
    id = "iconfinder";
    searchId = "iconfinder_search";
    downloadId = "iconfinder_download";

    addToPreset(): PresetController {
        let pc = new PresetController();
        pc.addPreset(PresetEnum.IMAGES)
        return pc;
    }

    async findContent(searchText: string, countryUrl: string, pc: PluginController): Promise<void> {

        try {
            let json = await fetch("https://intercra-backend.jason-apps.workers.dev/html/api/" + this.searchId + "/X0vjEUN6KRlxbp2DoUkyHeM0VOmxY91rA6BbU5j3Xu6wDodwS0McmilLPBWDUcJ1/" + searchText + "/0");
            let text = await json.json()
            this.analyse(text)

            //let pc = new PluginController();
            pc.isFinished(this.contentList, this.id);
        }catch (error){
            console.log(error)
            pc.gotError(this.id);
        }
    }

    async findMoreContent(searchText: string, countryUrl: string, pc: PluginController): Promise<void> {
        this.contentList = [];
        this.page = this.page + 30;
        try {
            let json = await fetch("https://intercra-backend.jason-apps.workers.dev/html/api/" + this.searchId + "/X0vjEUN6KRlxbp2DoUkyHeM0VOmxY91rA6BbU5j3Xu6wDodwS0McmilLPBWDUcJ1/" + searchText + "/" + this.page);
            let text = await json.json()
            this.analyse(text)

            //let pc = new PluginController();
            pc.isFinished(this.contentList, this.id);
        }catch (error){
            console.log(error)
            pc.gotError(this.id);
        }
    }

    analyse(json: any){
        let array = json.icons;
        for(let i = 0; i < array.length; i++){
            let items = array[i];

            let sizes: String[] = []


            let sizesArr = items.raster_sizes;
            for(let j = 0; j < sizesArr.length; j++){
                let size = sizesArr[j];
                sizes.push(size.size + ";;;" + size.formats[0].download_url)
            }

            let image = "";

            let found = false;
            for(let j = 0; j < sizes.length; j++){
                if(sizes[j] === "256"){
                    found = true;
                    image = JSON.stringify(items.raster_sizes[j].formats[0].preview_url).replace('"', "").replace('"', "");
                }
            }
            if(!found){
                image = JSON.stringify(items.raster_sizes[sizes.length-1].formats[0].preview_url).replace('"', "").replace('"', "");
            }

            let vector_url = JSON.stringify(items.vector_sizes[0].formats[0].download_url).replace('"', "").replace('"', "");




            let map = new Map<string, any>;

            map.set("imageUrl", image);
            map.set("url", image);
            map.set("sizes", sizes)
            map.set("vectorDownloadUrl", vector_url)

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

            /*content.push({
                choosenView: "iconDownloadView",
                url: contentMap.get("url"),
                image: contentMap.get("imageUrl"),
                pluginName: this.displayName,
                sizes: contentMap.get("sizes"),
                vectorDownloadUrl: contentMap.get("vectorDownloadUrl"),
            })*/

            content.push({
                choosenView: "imageView",
                url: contentMap.get("url"),
                image: contentMap.get("imageUrl"),
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