import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import type {PluginController} from "../controllers/PluginController";
import {PresetEnum} from "../enums/PresetEnum";

export class GitHubRepositories implements PluginInterface{
    finish = false;
    contentList: Map<string, string>[] = [];

    displayName = "GitHub Repositories";
    id = "github_repositories";
    page = 1;

    addToPreset(): PresetController {
        let pc = new PresetController();
        pc.addPreset(PresetEnum.PROGRAMMING);
        return pc;
    }

    async findContent(searchText: string, countryUrl: string, pc: PluginController): Promise<void> {
        try {
            let html = await fetch("https://intercra-backend.jason-apps.workers.dev/html/data/github_repositories/" + searchText);
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
        this.page = this.page + 1;
        this.contentList = [];
        let html = await fetch("https://intercra-backend.jason-apps.workers.dev/html/more/github_repositories/" + searchText + "/" + this.page);
        let text = await html.text();
        const parser = new DOMParser();
        const document: any = parser.parseFromString(text, "text/html");

        this.startSearch(document);
        this.finish = true;

        //let pc = new PluginController();
        pc.isFinished(this.contentList, this.id);
    }

    startSearch(document: any): void{

        const ul = document.getElementsByClassName("repo-list")[0];
        const rawList = ul.children;


        for(let j = 0; j < rawList.length; j++){
            let map = new Map<string, string>;
            let list = rawList[j];

            const headline = list.getElementsByTagName("a")[0].textContent;
            map.set("headline", headline);

            const url = list.getElementsByTagName("a")[0].getAttribute("href");
            map.set("url", "https://github.com" + url);

            try {
                const sub = list.getElementsByClassName("mb-1")[0].textContent;
                map.set("teaser", sub);
            }catch (e){
                map.set("teaser", "");
            }

            const lang = list.getElementsByTagName("span");
            for(let k = 0; k < lang.length; k++){
                if(lang[k].getAttribute("itemprop") === "programmingLanguage"){
                    map.set("lang", lang[k].textContent);
                }
            }

            this.contentList.push(map);

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

            if(contentMap.get("headline") != null) {
                content.push({
                    choosenView: "githubView",
                    url: contentMap.get("url"),
                    headline: contentMap.get("headline"),
                    pluginName: this.displayName,
                    teaser: contentMap.get("teaser"),
                    lang: contentMap.get("lang"),
                })
            }
        }

        return content;
    }

}