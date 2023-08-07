import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import {ViewCollection} from "../classes/ViewCollection";
import type {PluginController} from "../controllers/PluginController";
import {SpotifyController} from "../controllers/SpotifyController";
import {PresetEnum} from "../enums/PresetEnum";
import {GoogleController} from "../controllers/GoogleController";
import {HttpRequestController} from "../controllers/HttpRequestController";
import type {FeedInterface} from "../interfaces/FeedInterface";

export class Flaticon implements PluginInterface, FeedInterface{
    finish = false;
    contentList: Map<string, string>[] = [];
    page: number = 1;

    displayName = "Flaticon";
    id = "flaticon";

    addToPreset(): PresetController {
        let pc = new PresetController();
        pc.addPreset(PresetEnum.IMAGES)
        return pc;
    }

    async findContent(searchText: string, countryUrl: string, pc: PluginController): Promise<void> {

        await pc.collectRequests(this, true, false)
        await this.startSearch(searchText, pc);
        this.finish = true;

        pc.isFinished(this.contentList, this.id);
    }

    async findMoreContent(searchText: string, countryUrl: string, pc: PluginController): Promise<void> {
        this.contentList = [];
        this.page++
        await pc.collectRequests(this, true, false)
        await this.startSearch(searchText, pc);
        this.finish = true;

        pc.isFinished(this.contentList, this.id);
    }

    async startSearch(searchText: string, pc: PluginController): Promise<void>{
        let hrc = new HttpRequestController()
        await this.makeRequest(hrc, pc, searchText)
    }

    async makeRequest(hrc: HttpRequestController, pc: PluginController, searchText: String){
        let token = this.getCookie("flaticon_token")
        await hrc.httpRequestHeaderNoError(
            "https://api.flaticon.com/v3/search/icons/priority?q=" + searchText + "&page=" + this.page + "&limit=30",
            "Authorization: Bearer " + token,
            pc, this.id).then(r =>
            this.checkData(r, hrc, pc, searchText)
        );
    }

    async checkData(data: any, hrc: HttpRequestController, pc: PluginController, searchText: String){
        if(data === "error"){
            await this.requestToken(hrc, pc, searchText)
        }else{
            this.analyse(data)
        }
    }

    async requestToken(hrc: HttpRequestController, pc: PluginController, searchText: String){
        await hrc.httpPost(
            "https://api.flaticon.com/v3/app/authentication", {"apikey":"A0dwnZMqdIdxbGadrnayNcJBRqrPQm8WmZlNLmmPQdKICMx7"},
            pc, this.id).then(r =>
            this.analyseToken(r, hrc, pc, searchText)
        );
    }

    async analyseToken(data: any, hrc: HttpRequestController, pc: PluginController, searchText: String){
        let token = data.data.token
        this.setCookie("flaticon_token", token)
        await this.makeRequest(hrc, pc, searchText)
    }

    setCookie(name: string, val: string) {
        document.cookie = name + "=" + val;
    }

    getCookie(name: string): string {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");

        if (parts.length == 2) {
            return String(String(parts.pop()).split(";").shift());
        }
        return "null";
    }

    analyse(json: any){
        let array = json.data;
        for(let i = 0; i < array.length; i++){
            let items = array[i];

            let image = JSON.stringify(items.images["256"]).replace('"', "").replace('"', "");

            let map = new Map<string, string>;

            map.set("url", image);
            map.set("imageUrl", image);

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

            content.push({
                choosenView: "imageView",
                url: contentMap.get("url"),
                image: contentMap.get("imageUrl"),
                pluginName: this.displayName,
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