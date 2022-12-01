import type {PluginInterface} from "../interfaces/PluginInterface";
import {ViewController} from "../controllers/ViewController";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";

import type {InformationViewInterface} from "@/src/components/intercraSystemCode/interfaces/InformationViewInterface";
import {PluginController} from "../controllers/PluginController";

export class NonaWeb implements PluginInterface{
    finish = false;
    contentList: Map<string, string>[] = [];

    displayName = "Nona Web";
    id = "nona_web";

    addToPreset(): PresetController {
        return new PresetController();
    }

    async findContent(searchText: string, countryUrl: string): Promise<void> {
        let html = await fetch("https://intercra-backend.jason-apps.workers.dev/html/ltlegjk0a0sd5k0g5lcif1b7t3awg6qyzl7t7le7g777jk0a0sd5k0g5lcif1b7t3awg6qy/nona_web/" + searchText);
        let text = await html.text();
        const parser = new DOMParser();
        const document = parser.parseFromString(text, "text/html");
        this.startSearch(document);
        this.finish = true;

        let pc = new PluginController();
        pc.isFinished(this.contentList);
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

    getView(): ViewController[] {
        let vcArray = []

        for(let i = 0; i < this.contentList.length; i++){
            let vc = new ViewController();
            vc.setInformationView(new ViewContent(this.contentList[i], this.displayName));

            vcArray.push(vc);
        }

        return vcArray;
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

}

class ViewContent implements InformationViewInterface{

    map: Map<string, string> = {} as Map<string, string>;
    pluginName: string = "";

    constructor(cl: Map<string, string>, pn: string) {
        this.map = cl;
        this.pluginName = pn;
    }

    setHeadline(): string {
        return String(this.map.get("headline"));
    }

    setHiddenUrl(): string {
        return String(this.map.get("url"));
    }

    setImage(): string {
        return "null";
    }

    setPluginName(): string {
        return this.pluginName;
    }

    setSub(): string {
        return String(this.map.get("teaser"));;
    }

    setVisibleUrl(): string {
        return String(this.map.get("url"));
    }

}