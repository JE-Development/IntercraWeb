import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import {ViewCollection} from "../classes/ViewCollection";
import type {PluginController} from "../controllers/PluginController";
import {PresetEnum} from "../enums/PresetEnum";
import type {FeedInterface} from "../interfaces/FeedInterface";

export class Kochplanet implements PluginInterface, FeedInterface{
    finish = false;
    contentList: Map<string, string>[] = [];

    displayName = "Kochplanet";
    id = "kochplanet";
    page = 1;

    addToPreset(): PresetController {
        let pc = new PresetController();
        pc.addPreset(PresetEnum.SHOPPING);
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
        pc.isFinished(this.contentList, this.id);
    }

    startSearch(document: any): void{
        const article = document.getElementsByClassName("grid__item");
        for(let i = 0; i < article.length; i++){
            try{
                const e = article[i];
                let map = new Map<string, string>;

                let link = e.getElementsByTagName("h3")[0].children[0];
                map.set("url", link.getAttribute("href"));
                map.set("headline", link.textContent);

                let image = e.getElementsByTagName("img")[0];
                map.set("imageUrl", "https:" + image.getAttribute("src"));

                let oldPrice = e.getElementsByClassName("price__sale")[0].getElementsByTagName("s")[0].textContent;
                let newPrice = e.getElementsByClassName("price-item--sale")[0].textContent;
                map.set("price", "<strike class='teaser-color'>" + oldPrice + "</strike> " + newPrice + "---html")

                this.contentList.push(map)
            }catch (e){}
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
                headline: contentMap.get("headline"),
                pluginName: this.displayName,
                image: contentMap.get("imageUrl"),
                price: contentMap.get("price"),
            })
        }

        return content;
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