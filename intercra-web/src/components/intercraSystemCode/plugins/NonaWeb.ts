import type {PluginInterface} from "../interfaces/PluginInterface";
import type {ViewController} from "../controllers/ViewController";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";

import https from 'https';
import * as Cheerio from "cheerio";

export class NonaWeb implements PluginInterface{
    addToPreset(): PresetController {
        return new PresetController();
    }

    findContent(searchText: string, countryUrl: string): void {
        let html = fetch("https://intercra-backend.jason-apps.workers.dev/html/ltlegjk0a0sd5k0g5lcif1b7t3awg6qyzl7t7le7g777jk0a0sd5k0g5lcif1b7t3awg6qy/nona_web/electronic");
        console.log("html: " + html);
    }

    findMoreContent(searchText: string, countryUrl: string): void {
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
        return false;
    }

    setFinishFalse(): void {
    }

}


const getHtml = async (hostname: string, path: string): Promise<string> =>
    new Promise((resolve, reject) => {
        https
            .get(
                {
                    hostname,
                    path,
                    method: "GET",
                },
                (res) => {
                    let html = "";
                    res.on("data", function (chunk) {
                        html += chunk;
                    });
                    res.on("end", function () {
                        resolve(html);
                    });
                }
            )
            .on("error", (error) => {
                console.error(error);
                reject(error);
            });
    });