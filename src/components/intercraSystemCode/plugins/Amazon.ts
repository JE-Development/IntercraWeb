import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import {ViewCollection} from "../classes/ViewCollection";
import type {PluginController} from "../controllers/PluginController";

export class Amazon implements PluginInterface{
    finish = false;
    contentList: Map<string, string>[] = [];

    displayName = "Amazon";
    id = "amazon";

    addToPreset(): PresetController {
        return new PresetController();
    }

    async findContent(searchText: string, countryUrl: string, pc: PluginController): Promise<void> {
        let html = await fetch("https://intercra-backend.jason-apps.workers.dev/html/data/amazon/" + searchText);
        let text = await html.text();
        const parser = new DOMParser();
        const document: any = parser.parseFromString(text, "text/html");

        this.startSearch(document);
        this.finish = true;

        //let pc = new PluginController();
        pc.isFinished(this.contentList, this.id);
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
                headline: contentMap.get("headline"),
                pluginName: this.id,
                price: contentMap.get("price"),
                image: contentMap.get("imageUrl")
            })
        }

        return content;
    }

}