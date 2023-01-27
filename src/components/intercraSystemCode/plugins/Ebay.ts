import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import {ViewCollection} from "../classes/ViewCollection";
import type {PluginController} from "../controllers/PluginController";
import {PresetEnum} from "@/src/components/intercraSystemCode/enums/PresetEnum";

export class Ebay implements PluginInterface{
    finish = false;
    contentList: Map<string, string>[] = [];

    displayName = "Ebay";
    id = "ebay";
    page = 1;

    addToPreset(): PresetController {
        let pc = new PresetController();
        pc.addPreset(PresetEnum.GAMES);
        pc.addPreset(PresetEnum.BOOKS);
        pc.addPreset(PresetEnum.SHOPPING);
        return pc;
    }

    async findContent(searchText: string, countryUrl: string, pc: PluginController): Promise<void> {
        try {
            let html = await fetch("https://intercra-backend.jason-apps.workers.dev/html/data/ebay/" + searchText);
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
        let html = await fetch("https://intercra-backend.jason-apps.workers.dev/html/more/ebay/" + searchText + "/" + this.page);
        let text = await html.text();
        const parser = new DOMParser();
        const document = parser.parseFromString(text, "text/html");
        this.startSearch(document);
        this.finish = true;

        pc.isFinished(this.contentList, this.id);
    }

    startSearch(document: any): void{
        const list = document.getElementsByClassName("s-item s-item__pl-on-bottom");
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

}