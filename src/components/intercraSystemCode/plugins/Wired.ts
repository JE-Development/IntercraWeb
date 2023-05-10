import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import type {PluginController} from "../controllers/PluginController";
import {PresetEnum} from "../enums/PresetEnum";

export class Wired implements PluginInterface{
    finish = false;
    contentList: Map<string, string>[] = [];
    page: number = 1;

    displayName = "WIRED";
    id = "wired";

    addToPreset(): PresetController {
        let pc = new PresetController();
        pc.addPreset(PresetEnum.NEWS)
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
            pc.gotError(this.id);
        }
    }

    async findMoreContent(searchText: string, countryUrl: string, pc: PluginController): Promise<void> {
        this.contentList = [];
        this.page++

        try {
            let html = await fetch("https://intercra-backend.jason-apps.workers.dev/html/more/" + this.id + "/" + searchText + "/" + this.page);
            let text = await html.text();
            const parser = new DOMParser();
            const document: any = parser.parseFromString(text, "text/html");
            this.startSearch(document);
            this.finish = true;

            //let pc = new PluginController();
            pc.isFinished(this.contentList, this.id);
        }catch (error){
            pc.gotError(this.id);
        }
    }

    startSearch(document: any): void{
        let section = document.getElementsByTagName("section")
        for(let k = 0; k < section.length; k++){
            const article = section[k].getElementsByClassName("summary-list__items")[0].children;
            for(let i = 0; i < article.length; i++){
                try{
                    const e = article[i];
                    let map = new Map<string, string>;

                    let link = e.getElementsByTagName("a")[0];
                    map.set("url", link.getAttribute("href"));

                    let headline = e.getElementsByTagName("h3")[0];
                    map.set("headline", headline.textContent);

                    try{
                        let image = e.getElementsByTagName("picture")[0];
                        let script = image.firstChild.innerHTML;
                        let split = script.split("srcset=\"")[1].split(" ")[0];
                        map.set("imageUrl", split);
                        map.set("scaleIndex", "300")
                    }catch (e){
                        //console.log(e)
                    }

                    let author = e.getElementsByClassName("byline__name")[0]
                    map.set("author", author.textContent)

                    let time = e.getElementsByClassName("summary-item__publish-date")[0]
                    map.set("time", time.lastChild.textContent)

                    this.contentList.push(map)
                }catch (e){
                    //probably ad found
                }
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
                choosenView: "articleView",
                url: contentMap.get("url"),
                headline: contentMap.get("headline"),
                pluginName: this.displayName,
                image: contentMap.get("imageUrl"),
                date: contentMap.get("time"),
                author: contentMap.get("author"),
                scaleIndex: contentMap.get("scaleIndex")
            })
        }

        return content;
    }

}