import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import type {PluginController} from "../controllers/PluginController";
import {ViewCollection} from "../classes/ViewCollection";
import {PresetEnum} from "../enums/PresetEnum";
import type {FeedInterface} from "../interfaces/FeedInterface";

export class NewgroundsAudio implements PluginInterface, FeedInterface{
    finish = false;
    contentList: Map<string, string>[] = [];
    contentListFeed: Map<string, string>[] = [];

    displayName = "Newgrounds Audio";
    id = "newgrounds_audio";
    page = 1;

    addToPreset(): PresetController {
        let pc = new PresetController();
        pc.addPreset(PresetEnum.AUDIO);
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
            let headline = JSON.stringify(items.headline).replace(/"/g, '');
            let image = JSON.stringify(items.imageUrl).replace(/"/g, '');
            let teaser = JSON.stringify(items.teaser).replace(/"/g, '');
            let artist = JSON.stringify(items.artist).replace(/"/g, '');
            let genre = JSON.stringify(items.genre).replace(/"/g, '');


            let map = new Map<string, string>;

            map.set("url", url);
            map.set("headline", headline);
            map.set("imageUrl", image);
            map.set("teaser", teaser);
            map.set("artist", artist);
            map.set("genre", genre);

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
                choosenView: "newgroundsAudioView",
                url: contentMap.get("url"),
                headline: contentMap.get("headline"),
                pluginName: this.displayName,
                teaser: contentMap.get("teaser"),
                image: contentMap.get("imageUrl"),
                artist: contentMap.get("artist"),
                genre: contentMap.get("genre")
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
            pc.gotFeedError(this.id);
        }
    }

    async findMoreFeedContent(pc: PluginController): Promise<void> {
        let list: Map<string, string>[] = []
        pc.isFeedFinished(list, this.id)
    }


    startFeedSearch(document: any): void{
        const content = document.getElementsByClassName("itemlist")[0].children;

        for(let i = 0; i < content.length; i++){
            const elem = content[i];
            let map = new Map<string, string>;

            const link = elem.getElementsByClassName("item-audiosubmission")[0];
            if(link != null) {
                map.set("url", link.getAttribute("href"));

                const image = elem.getElementsByClassName("item-icon")[0].firstElementChild.firstElementChild;
                map.set("imageUrl", image.getAttribute("src"));

                const headline = elem.getElementsByClassName("detail-title")[0].firstElementChild;
                map.set("headline", headline.textContent)

                const artist = elem.getElementsByClassName("detail-title")[0].getElementsByTagName("span")[0];
                map.set("artist", artist.textContent)

                try {
                    let genre = elem.getElementsByClassName("item-details-meta")[0].getElementsByTagName("dd")[1];
                    if(genre.textContent.includes("Views")){
                        genre = elem.getElementsByClassName("item-details-meta")[0].getElementsByTagName("dd")[0];
                    }
                    map.set("genre", genre.textContent)
                }catch (e){
                    //no genre
                }

                try {
                    const teaser = elem.getElementsByClassName("detail-description")[0];
                    map.set("teaser", teaser.textContent)
                } catch (e) {
                    // no teaser
                }


                this.contentListFeed.push(map);
            }
        }
    }

    getFeedView(): any[] {

        let content: any[] = [];

        for(let i = 0; i < this.contentListFeed.length; i++){

            let contentMap = this.contentListFeed[i];

            content.push({
                choosenView: "newgroundsAudioView",
                url: contentMap.get("url"),
                headline: contentMap.get("headline"),
                pluginName: this.displayName,
                teaser: contentMap.get("teaser"),
                image: contentMap.get("imageUrl"),
                artist: contentMap.get("artist"),
                genre: contentMap.get("genre")
            })
        }

        return content;
    }

}