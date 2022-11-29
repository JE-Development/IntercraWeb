import type {PluginInterface} from "../interfaces/PluginInterface";
import type {ViewController} from "../controllers/ViewController";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";

import https from 'https';
import * as Cheerio from "cheerio";

export class NonaWeb implements PluginInterface{
    finish = false;

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
                map.set("headline", headline.innerHTML);

                const teaser = elem.getElementsByClassName("teaser__text")[0];
                map.set("teaser", teaser.innerHTML)

                console.log(url);
                console.log(headline.innerHTML);
                console.log(teaser.innerHTML);
                console.log("-----------------------------------");
            }
        }
    }

    getContentList(): Map<string, string> {
        return new Map<string, string>();
    }

    getError(): boolean {
        return false;
    }

    getErrorText(): string {
        return "";
    }

    getId(): string {
        return "";
    }

    getPluginDisplayName(): string {
        return "";
    }

    getPluginLanguage(): PluginLanguageController {
        return new PluginLanguageController();
    }

    getView(): ViewController[] {
        return [];
    }

    hasSettings(): boolean {
        return false;
    }

    isFinish(): boolean {
        return this.finish;
    }

    setFinishFalse(): void {
    }

}