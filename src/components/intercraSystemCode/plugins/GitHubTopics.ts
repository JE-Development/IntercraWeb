import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import type {PluginController} from "../controllers/PluginController";
import {PresetEnum} from "../enums/PresetEnum";
import {HttpRequestController} from "../controllers/HttpRequestController";

export class GitHubTopics implements PluginInterface{
    finish = false;
    contentList: Map<string, string>[] = [];

    displayName = "GitHub Topics";
    id = "github_topics";
    page = 1;

    addToPreset(): PresetController {
        let pc = new PresetController();
        pc.addPreset(PresetEnum.PROGRAMMING);
        return pc;
    }

    async findContent(searchText: string, countryUrl: string, pc: PluginController): Promise<void> {
        try {
            await this.startSearch(searchText, pc);
            this.finish = true;

            pc.isFinished(this.contentList, this.id);
        }catch (error){
            console.log(String(error))
            pc.gotError(this.id);
        }
    }

    async findMoreContent(searchText: string, countryUrl: string, pc: PluginController): Promise<void> {
        this.page = this.page + 1;
        this.contentList = [];

        await this.startSearch(searchText, pc);
        this.finish = true;

        pc.isFinished(this.contentList, this.id);
    }

    async startSearch(searchText: string, pc: PluginController): Promise<void>{
        let hrc = new HttpRequestController()

        await hrc.intercraHttpRequest(this.id, searchText, this.page, pc).then(r => this.analyse(r));
    }

    analyse(json: any){
        let array = json.items;
        for(let i = 0; i < array.length; i++){
            let items = array[i];

            let url = JSON.stringify(items.url).replace(/\"+/g, '');
            let teaser = JSON.stringify(items.teaser).replace(/\"+/g, '');
            let headline = JSON.stringify(items.headline).replace(/\"+/g, '');

            let map = new Map<string, string>;

            map.set("url", url);
            map.set("teaser", teaser);
            map.set("headline", headline);

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
                })
            }
        }

        return content;
    }

}