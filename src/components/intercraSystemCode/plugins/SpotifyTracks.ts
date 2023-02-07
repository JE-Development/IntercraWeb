import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import {ViewCollection} from "../classes/ViewCollection";
import type {PluginController} from "../controllers/PluginController";
import {SpotifyController} from "../controllers/SpotifyController";
import {PresetEnum} from "../enums/PresetEnum";

export class SpotifyTracks implements PluginInterface{
    finish = false;
    contentList: Map<string, string>[] = [];
    limit = 30;
    offset = 0;

    displayName = "Spotify Tracks";
    id = "spotify_tracks";

    addToPreset(): PresetController {
        let pc = new PresetController();
        pc.addPreset(PresetEnum.AUDIO);
        return pc;
    }

    async findContent(searchText: string, countryUrl: string, pc: PluginController): Promise<void> {

        await this.startSearch(searchText);
        this.finish = true;

        pc.isFinished(this.contentList, this.id);
    }

    async findMoreContent(searchText: string, countryUrl: string, pc: PluginController): Promise<void> {
        this.contentList = [];
        this.offset = this.offset + this.limit;
        await this.startSearch(searchText);
        this.finish = true;

        pc.isFinished(this.contentList, this.id);
    }

    async startSearch(searchText: String): Promise<void>{
        let sc = new SpotifyController();
        let split = searchText.split(";;;");

        await sc.httpLibraryRequest(split[1], split[0], "track", this.limit, this.offset, true).then(r =>
            this.analyse(r)
        );
    }

    analyse(json: any){
        let array = json.tracks.items;
        for(let i = 0; i < array.length; i++){
            let items = array[i];

            let artist = JSON.stringify(items.artists[0].name).replace('"', "").replace('"', "");
            let time = this.parseToTime(JSON.stringify(items.duration_ms)).replace('"', "").replace('"', "");
            let url = "https://open.spotify.com/track/" + JSON.stringify(items.id).replace('"', "").replace('"', "");
            let uri = JSON.stringify(items.uri).replace('"', "").replace('"', "");
            let prevLink = JSON.stringify(items.preview_url).replace('"', "").replace('"', "");
            let name = JSON.stringify(items.name).replace('"', "").replace('"', "");
            let album = JSON.stringify(items.album.name).replace('"', "").replace('"', "");
            let imageUrl = JSON.stringify(items.album.images[0].url).replace('"', "").replace('"', "");

            let map = new Map<string, string>;

            map.set("headline", name);
            map.set("artist", artist);
            map.set("url", url);
            map.set("uri", uri);
            map.set("time", time);
            map.set("album", album);
            map.set("imageUrl", imageUrl);
            map.set("prevLink", prevLink);

            this.contentList.push(map);
        }
    }

    parseToTime(timeStr: string): string{
        let milli: number = Number.parseInt(timeStr);
        let sec = Math.trunc(milli/1000);
        let m = Math.trunc(sec/60);
        let s = sec%60;
        let mStr = "" + m;
        let sStr = "" + s;
        if(m <= 9){
            mStr = "0" + m;
        }
        if(s <= 9){
            sStr = "0" + s;
        }
        let fin = mStr + ":" + sStr;
        return fin;
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
                choosenView: "spotifyView",
                url: contentMap.get("url"),
                headline: contentMap.get("headline"),
                pluginName: this.displayName,
                image: contentMap.get("imageUrl"),
                artist: contentMap.get("artist"),
                duration: contentMap.get("time"),
                album: contentMap.get("album"),
            })
        }

        return content;
    }

}