import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import {ViewCollection} from "../classes/ViewCollection";
import type {PluginController} from "../controllers/PluginController";

export class Ebay implements PluginInterface{
    finish = false;
    contentList: Map<string, string>[] = [];

    displayName = "Ebay (not working yet)";
    id = "ebay";

    addToPreset(): PresetController {
        return new PresetController();
    }

    async findContent(searchText: string, countryUrl: string, pc: PluginController): Promise<void> {
        let html = await fetch("https://intercra-backend.jason-apps.workers.dev/html/data/ebay/" + searchText);
        let text = await html.text();
        const parser = new DOMParser();
        const document = parser.parseFromString(text, "text/html");
        this.startSearch(document);
        this.finish = true;

        console.log("test text");

        //let pc = new PluginController();
        pc.isFinished(this.contentList, this.id);
    }

    findMoreContent(searchText: string, countryUrl: string): void {
    }

    startSearch(document: any): void{
        const list = document.getElementsByTagName("s-item s-item__pl-on-bottom");
        for(let loop = 0; loop < list.length; loop++){
            const product = list[loop];
            let map = new Map<string, string>;
            let skip = false;

            const productLink = product.getElementsByTagName("a")
            for(let i = 0; i < productLink.length; i++){
                if(productLink[i].hasAttribute("tabindex")){
                    let url:string = productLink[i].getAttribute("href");
                    map.set("url", url);
                }
            }
            const img = product.getElementsByClassName("s-item__image-img");
            for(let i = 0; i < img.length; i++){
                let image = img[i];
                let imgUrl = image.getAttribute("src");
                let headline = image.getAttribute("alt");
                map.set("imageUrl", imgUrl);
                map.set("headline", headline);
                if(headline === "Shop on eBay"){
                    skip = true;
                }
            }

            const price = product.getElementsByClassName("s-item__price")[0];
            map.set("price", price.textContent);
            if(!skip){
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
            let view = vc.getShoppingView();

            let contentMap = this.contentList[i];

            view = String(view).replace(";;;hrefHead;;;", String(contentMap.get("url")))
                .replace(";;;headline;;;", String(contentMap.get("headline")))
                .replace("../assets/sample-product-image.png", String(contentMap.get("imageUrl")))
                .replace(";;;price;;;", String(contentMap.get("price")))
                .replace(";;;plugin-name;;;", this.displayName)


            content.push(view);
        }

        return content;
    }

}