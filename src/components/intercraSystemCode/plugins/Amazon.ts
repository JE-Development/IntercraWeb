import type {PluginInterface} from "../interfaces/PluginInterface";
import {ViewController} from "../controllers/ViewController";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";

import type {InformationViewInterface} from "@/src/components/intercraSystemCode/interfaces/InformationViewInterface";
import {PluginController} from "../controllers/PluginController";

export class Amazon implements PluginInterface{
    finish = false;
    contentList: Map<string, string>[] = [];

    displayName = "Amazon";
    id = "amazon";

    addToPreset(): PresetController {
        return new PresetController();
    }

    async findContent(searchText: string, countryUrl: string): Promise<void> {
        let html = await fetch("https://intercra-backend.jason-apps.workers.dev/html/data/amazon/" + searchText);
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
        const article = document.getElementsByTagName("div");
        for(let i = 0; i < article.length; i++){
            const e = article[i];
            if(e.getAttribute("data-component-type") === "s-search-result"){
                let map = new Map<string, string>;

                const productLink = e.getElementsByClassName("s-no-outline")[0];
                map.set("url", productLink.getAttribute("href"));

                const imageLink = e.getElementsByClassName("s-image")[0];
                map.set("imageUrl", imageLink.getAttribute("src"));
                map.set("headline", imageLink.getAttribute("alt"));

                const price = e.getElementsByClassName("a-offscreen")[0];
                map.set("price", price.textContent);

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