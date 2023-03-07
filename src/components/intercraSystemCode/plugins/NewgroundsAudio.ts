import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import type {PluginController} from "../controllers/PluginController";
import {ViewCollection} from "../classes/ViewCollection";
import {PresetEnum} from "../enums/PresetEnum";

export class NewgroundsAudio implements PluginInterface{
    finish = false;
    contentList: Map<string, string>[] = [];

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
            let html = await fetch("https://intercra-backend.jason-apps.workers.dev/html/data/" + this.id + "/" + searchText);
            let text = await html.text();
            const parser = new DOMParser();
            const document: any = parser.parseFromString(text, "text/html");
            this.startSearch(document);
            this.finish = true;

            //let pc = new PluginController();
            pc.isFinished(this.contentList, this.id);
        }catch (error){
            console.log(error)
            pc.gotError(this.id);
        }
    }

    async findMoreContent(searchText: string, countryUrl: string, pc: PluginController): Promise<void> {
        try {
            this.page = this.page + 1;
            this.contentList = [];
            let html = await fetch("https://intercra-backend.jason-apps.workers.dev/html/more/" + this.id + "/" + searchText + "/" + this.page);
            let text = await html.text();
            const parser = new DOMParser();
            const document = parser.parseFromString(text, "text/html");
            this.startSearch(document);
            this.finish = true;

            pc.isFinished(this.contentList, this.id);
        }catch (e){
            //no more content
        }
    }

    startSearch(document: any): void{
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


                this.contentList.push(map);
            }
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