import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import type {PluginController} from "../controllers/PluginController";
import {ViewCollection} from "../classes/ViewCollection";

export class Fandom implements PluginInterface{
    finish = false;
    contentList: Map<string, string>[] = [];

    displayName = "Fandom (not working yet)";
    id = "fandom";

    addToPreset(): PresetController {
        return new PresetController();
    }

    async findContent(searchText: string, countryUrl: string, pc: PluginController): Promise<void> {
        let html = await fetch("https://intercra-backend.jason-apps.workers.dev/html/data/fandom/" + searchText);
        let text = await html.text();
        const parser = new DOMParser();
        const document = parser.parseFromString(text, "text/html");
        this.startSearch(document);
        this.finish = true;

        //let pc = new PluginController();
        pc.isFinished(this.contentList, this.id);
    }

    findMoreContent(searchText: string, countryUrl: string): void {
    }

    startSearch(document: any): void{
        const rawList = document.getElementsByTagName("article");

        for(let loop = 0; loop < rawList.length; loop++){
            const fullList = rawList[loop].children;
            for(let lo = 0; lo < fullList.length; lo++){
                const list = fullList[lo];
                let map = new Map<string, string>;

                const url = list.getElementsByClassName("clickable-anchor")[0];
                let linkString = url.getAttribute("href");
                let headline = url.textContent;
                map.set("url", linkString);
                map.set("headline", headline);

                const image = list.getElementsByClassName("wp-post-image")[0];
                map.set("imageUrl", image.getAttribute("src"));

                const time = list.getElementsByTagName("time")[0];
                map.set("time", time.textContent);

                const teaser = list.getElementsByClassName("excerpt");
                map.set("teaser", teaser.textContent);


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

    getView(): string[] {
        let vc = new ViewCollection();

        let content: string[] = [];

        for(let i = 0; i < this.contentList.length; i++){
            let view = vc.getArticleView();

            let contentMap = this.contentList[i];

            view = String(view).replace(";;;href;;;", String(contentMap.get("url")))
                .replace(";;;hrefHead;;;", String(contentMap.get("url")))
                .replace("../assets/sample-product-image.png", String(contentMap.get("imageUrl")))
                .replace(";;;teaser;;;", String(contentMap.get("teaser")))
                .replace(";;;date;;;", String(contentMap.get("time")))
                .replace(";;;plugin-name;;;", this.displayName)

            content.push(view);
        }

        return content;
    }

}