import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import type {PluginController} from "../controllers/PluginController";
import {PresetEnum} from "../enums/PresetEnum";
import type {FeedInterface} from "../interfaces/FeedInterface";


export class Amazon implements PluginInterface, FeedInterface{
    finish = false;
    contentList: Map<string, string>[] = [];

    displayName = "Amazon";
    id = "amazon";
    page = 1;

    addToPreset(): PresetController {
        let pc = new PresetController();
        pc.addPreset(PresetEnum.GAMES);
        pc.addPreset(PresetEnum.BOOKS);
        //pc.addPreset(PresetEnum.SHOPPING);
        //pc.addPreset(PresetEnum.VIDEOS);
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
        this.page = this.page + 1;
        this.contentList = [];
        let html = await fetch("https://intercra-backend.jason-apps.workers.dev/html/more/" + this.id + "/" + searchText + "/" + this.page);
        let text = await html.text();
        const parser = new DOMParser();
        const document: any = parser.parseFromString(text, "text/html");

        this.startSearch(document);
        this.finish = true;

        //let pc = new PluginController();
        pc.isFinished(this.contentList, this.id);
    }

    startSearch(document: any): void{
        const article = document.getElementsByTagName("div");
        for(let i = 0; i < article.length; i++){
            const e = article[i];
            if(e.getAttribute("data-component-type") === "s-search-result"){
                let map = new Map<string, string>;

                const productLink = e.getElementsByClassName("s-no-outline")[0];
                map.set("url", "https://www.amazon.com" + productLink.getAttribute("href"));

                const imageLink = e.getElementsByClassName("s-image")[0];
                map.set("imageUrl", imageLink.getAttribute("src"));
                map.set("headline", imageLink.getAttribute("alt"));

                const price = e.getElementsByClassName("a-offscreen")[0];
                if(price == null){
                    map.set("price", "");
                }else{
                    map.set("price", price.textContent);
                }

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
                choosenView: "shoppingView",
                url: contentMap.get("url"),
                headline: this.cutString(String(contentMap.get("headline"))),
                pluginName: this.displayName,
                price: contentMap.get("price"),
                image: contentMap.get("imageUrl")
            })
        }

        return content;
    }

    cutString(str: string): string{
        let index = 80;
        if(str.length > index) {
            let cut = str.substring(0, index) + "...";
            return cut;
        }else{
            return str;
        }
    }

    async findFeedContent(pc: PluginController): Promise<void> {
        let list: Map<string, string>[] = []
        pc.isFeedFinished(list, this.id)
    }

    async findMoreFeedContent(pc: PluginController): Promise<void> {
        let list: Map<string, string>[] = []
        pc.isFeedFinished(list, this.id)
    }

    getFeedView(): string[] {
        return [];
    }

}