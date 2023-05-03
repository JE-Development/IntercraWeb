import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import type {PluginController} from "../controllers/PluginController";
import {PresetEnum} from "../enums/PresetEnum";

export class RT implements PluginInterface{
    finish = false;
    contentList: Map<string, string>[] = [];
    page: number = 1;

    displayName = "RT";
    id = "rt";

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
            console.log(error)
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
        const article = document.getElementsByClassName("card-rows__item");
        for(let i = 0; i < article.length; i++){
            const e = article[i];
            let map = new Map<string, string>;

            let link = e.getElementsByClassName("list-card__content--title")[0].children[0];
            map.set("url", "https://www.rt.com" + link.getAttribute("href"));
            map.set("headline", link.textContent);

            try{
                let image = e.getElementsByTagName("picture")[0].firstElementChild;
                let img = image.getAttribute("data-srcset").split(",")
                map.set("imageUrl", img[img.length-1].includes(".png") ? img[img.length-1].split(".png")[0]+".png"
                    : img[img.length-1].split(".jpg")[0] + ".jpg");
                map.set("scaleIndex", "400")
            }catch (e){
                //no image
            }

            let teaser = e.getElementsByClassName("list-card__content--summary ")[0].children[0];
            map.set("teaser", teaser.textContent)

            let time = e.getElementsByClassName("card__date")[0].getElementsByTagName("span")[0]
            map.set("time", time.textContent)

            this.contentList.push(map)
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
                teaser: contentMap.get("teaser"),
                image: contentMap.get("imageUrl"),
                scaleIndex: contentMap.get("scaleIndex"),
                date: contentMap.get("time")
            })
        }

        return content;
    }

}