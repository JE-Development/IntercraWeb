import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import type {PluginController} from "../controllers/PluginController";
import {ViewCollection} from "../classes/ViewCollection";
import {PresetEnum} from "../enums/PresetEnum";
import type {FeedInterface} from "../interfaces/FeedInterface";

export class PNGWing implements PluginInterface, FeedInterface{
    finish = false;
    contentList: Map<string, string>[] = [];
    contentListFeed: Map<string, string>[] = [];

    displayName = "PNGWing";
    id = "pngwing";
    page = 1;

    addToPreset(): PresetController {
        let pc = new PresetController();
        pc.addPreset(PresetEnum.IMAGES);
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


        for(let i = 0; i < json.length; i++){
            let items = json[i]

            let url = JSON.stringify(items.url).replace(/"/g, '');
            let image = JSON.stringify(items.imageUrl).replace(/"/g, '');


            let map = new Map<string, string>;

            map.set("url", url);
            map.set("imageUrl", image);

            this.contentList.push(map);
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
                choosenView: "imageView",
                url: contentMap.get("url"),
                image: contentMap.get("imageUrl"),
                pluginName: this.displayName,
            })
        }

        return content;
    }

    async findFeedContent(pc: PluginController): Promise<void> {
        try {
            let html = await fetch("https://intercra-backend.jason-apps.workers.dev/html/feed/" + this.id);
            let text = await html.text();
            const parser = new DOMParser();
            const document: any = parser.parseFromString(text, "text/html");
            this.startFeedSearch(document);
            this.finish = true;

            //let pc = new PluginController();
            pc.isFeedFinished(this.contentList, this.id);
        }catch (error){
            console.log(error)
            pc.gotFeedError(this.id);
        }
    }

    async findMoreFeedContent(pc: PluginController): Promise<void> {
        let list: Map<string, string>[] = []
        pc.isFeedFinished(list, this.id)
    }


    startFeedSearch(document: any): void{
        const content = document.getElementsByTagName("li");

        for(let i = 0; i < content.length; i++){
            const elem = content[i];
            if(elem.getAttribute("itemprop") === "associatedMedia"){
                let map = new Map<string, string>;

                const url = elem.getElementsByTagName("a")[0];
                map.set("url", url.getAttribute("href"));

                const image = elem.getElementsByTagName("img")[0];
                map.set("imageUrl", image.getAttribute("data-src"));

                this.contentListFeed.push(map);
            }
        }
    }

    getFeedView(): any[] {

        let content: any[] = [];

        for(let i = 0; i < this.contentListFeed.length; i++){

            let contentMap = this.contentListFeed[i];

            content.push({
                choosenView: "imageView",
                url: contentMap.get("url"),
                image: contentMap.get("imageUrl"),
                pluginName: this.displayName,
            })
        }

        return content;
    }

}