import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import type {PluginController} from "../controllers/PluginController";
import {PresetEnum} from "../enums/PresetEnum";

export class ProductHunt implements PluginInterface{
    finish = false;
    contentList: Map<string, string>[] = [];
    page: number = 1;

    displayName = "Product Hunt";
    id = "producthunt";

    addToPreset(): PresetController {
        let pc = new PresetController();
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
        pc.isFinished(this.contentList, this.id)
    }

    startSearch(document: any): void{
        const article = document.getElementsByClassName("layoutMain")[0].children[1].children;
        for(let i = 0; i < article.length; i++){
            const e = article[i];
            let map = new Map<string, string>;

            let link = e.getElementsByClassName("color-darker-grey")[0]
            map.set("url", "https://www.producthunt.com" + link.parentNode.getAttribute("href"));
            map.set("headline", link.textContent);

            console.log(link)

            try{
                map.set("teaser", link.parentNode.childNodes[1].textContent);
            }catch (e){}

            try{
                let image = e.getElementsByTagName("img")[0];
                map.set("imageUrl", image.getAttribute("src"));
                map.set("scaleIndex", "200")
            }catch (e){
                //no image
            }
            let theme = e.getElementsByTagName("a")
            let th = ""
            for(let j = 0; j < theme.length; j++){
                if(theme[j].getAttribute("href").includes("/topics/")){
                    if(th === ""){
                        th = theme[j].textContent
                    }else{
                        th = th + ", " + theme[j].textContent
                    }
                }
            }
            map.set("theme", th)

            this.contentList.push(map)
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
                choosenView: "articleView",
                url: contentMap.get("url"),
                headline: contentMap.get("headline"),
                pluginName: this.displayName,
                platform: contentMap.get("theme"),
                image: contentMap.get("imageUrl"),
                scaleIndex: contentMap.get("scaleIndex"),
                teaser: contentMap.get("teaser"),
            })
        }

        return content;
    }

}