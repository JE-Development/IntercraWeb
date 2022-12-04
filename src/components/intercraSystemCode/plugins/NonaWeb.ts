import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import type {PluginController} from "../controllers/PluginController";
import {ViewCollection} from "../classes/ViewCollection";

export class NonaWeb implements PluginInterface{
    finish = false;
    contentList: Map<string, string>[] = [];

    displayName = "Nona Web";
    id = "nona_web";

    addToPreset(): PresetController {
        return new PresetController();
    }

    async findContent(searchText: string, countryUrl: string, pc: PluginController): Promise<void> {
        let html = await fetch("https://intercra-backend.jason-apps.workers.dev/html/data/nona_web/" + searchText);
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
        const content = document.getElementsByTagName("article");

        for(let i = 0; i < content.length; i++){
            const elem = content[i];
            if(elem.hasAttribute("id")){
                let map = new Map<string, string>;

                const link = elem.getElementsByClassName("teaser__link")[0];
                const url = link.getAttribute("href");
                map.set("url", url);

                const headline = link.firstElementChild;
                map.set("headline", headline.textContent);

                const teaser = elem.getElementsByClassName("teaser__text")[0];
                map.set("teaser", teaser.innerHTML)

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
            let view = vc.getInformationView();

            let contentMap = this.contentList[i];

            view = String(view).replace(";;;href;;;", String(contentMap.get("url")))
                .replace(";;;hrefHead;;;", String(contentMap.get("url")))
                .replace(";;;url;;;", String(contentMap.get("url")))
                .replace(";;;headline;;;", String(contentMap.get("headline")))
                .replace(";;;teaser;;;", String(contentMap.get("teaser")))
                .replace(";;;plugin-name;;;", this.displayName)

            content.push(view);
        }

        return content;
    }

}