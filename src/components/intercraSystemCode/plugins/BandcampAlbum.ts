import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import type {PluginController} from "../controllers/PluginController";
import {ViewCollection} from "../classes/ViewCollection";

export class BandcampAlbum implements PluginInterface{
    finish = false;
    contentList: Map<string, string>[] = [];

    displayName = "Bandcamp Album";
    id = "bandcamp_album";

    addToPreset(): PresetController {
        return new PresetController();
    }

    async findContent(searchText: string, countryUrl: string, pc: PluginController): Promise<void> {
        let html = await fetch("https://intercra-backend.jason-apps.workers.dev/html/data/bandcamp_album/" + searchText);
        let text = await html.text();
        const parser = new DOMParser();
        const document = parser.parseFromString(text, "text/html");
        this.startSearch(document);
        this.finish = true;

        pc.isFinished(this.contentList, this.id);
    }

    findMoreContent(searchText: string, countryUrl: string): void {
    }

    startSearch(document: any): void{
        const rawList = document.getElementsByClassName("searchresult");

        for(let i = 0; i < rawList.length; i++){
            const e = rawList[i];
            let map = new Map<string, string>;

            const link = e.getElementsByClassName("artcont")[0];
            map.set("url", link.getAttribute("href"));

            const img = e.getElementsByTagName("img")[0];
            map.set("imageUrl", img.getAttribute("src"));

            const type = e.getElementsByClassName("itemtype")[0];
            map.set("type", type.textContent);

            const headline = e.getElementsByClassName("heading")[0].getElementsByTagName("a")[0];
            map.set("headline", headline.textContent);
            let headString = link.getAttribute("href");

            const sub = e.getElementsByClassName("subhead")[0];
            map.set("artist", sub.textContent);

            const release = e.getElementsByClassName("released")[0];
            if(release == null){
                map.set("release", "");
            }else{
                map.set("release", release.textContent);
            }

            const tags = e.getElementsByClassName("tags")[0];
            if(tags == null){
                map.set("tags", "");
            }else{
                map.set("tags", tags.textContent);
            }

            const genre = e.getElementsByClassName("genre")[0];
            if(genre == null){
                map.set("genre", "");
            }else{
                map.set("genre", genre.textContent);
            }

            let duplicate = false;
            for(let j = 0; j < this.contentList.length; j++){
                let h = new Map<string, string>;
                if(h.has("headline") && h.get("headline") === headString){
                    duplicate = true;
                }
            }
            if(!duplicate){
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
                choosenView: "bandcampView",
                url: contentMap.get("url"),
                headline: contentMap.get("headline"),
                pluginName: this.displayName,
                image: contentMap.get("imageUrl"),
                artist: contentMap.get("artist"),
                release: contentMap.get("release"),
                tags: contentMap.get("tags"),
                genre: contentMap.get("genre"),
                type: contentMap.get("type"),
            })
        }

        return content;
    }

}