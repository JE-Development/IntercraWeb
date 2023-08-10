import type {PluginInterface} from "../interfaces/PluginInterface";
import {PresetController} from "../controllers/PresetController";
import {PluginLanguageController} from "../controllers/PluginLanguageController";
import {ViewCollection} from "../classes/ViewCollection";
import type {PluginController} from "../controllers/PluginController";
import {SpotifyController} from "../controllers/SpotifyController";
import {PresetEnum} from "../enums/PresetEnum";
import type {FeedInterface} from "../interfaces/FeedInterface";

export class SpotifyTracks implements PluginInterface, FeedInterface{
    finish = false;
    contentList: Map<string, string>[] = [];
    contentListFeed: Map<string, string>[] = [];
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

        await pc.collectRequests(this, true, false)
        await this.startSearch(searchText, pc);
        this.finish = true;

        pc.isFinished(this.contentList, this.id);
    }

    async findMoreContent(searchText: string, countryUrl: string, pc: PluginController): Promise<void> {
        this.contentList = [];
        this.offset = this.offset + this.limit;
        await pc.collectRequests(this, true, false)
        await this.startSearch(searchText, pc);
        this.finish = true;

        pc.isFinished(this.contentList, this.id);
    }

    async startSearch(searchText: String, pc: PluginController): Promise<void>{
        let sc = new SpotifyController();
        let split = searchText.split(";;;");

        let se = Boolean(split[2])


        await sc.httpLibraryRequest(split[1], split[0], "track", this.limit, this.offset, se).then(r =>
            this.analyse(r, pc)
        );
    }

    analyse(json: any, pc: PluginController){
        if(json.tracks != null) {
            let array = json.tracks.items;
            for (let i = 0; i < array.length; i++) {
                let items = array[i];

                let artist = JSON.stringify(items.artists[0].name).replace('"', "").replace('"', "");
                let time = this.parseToTime(JSON.stringify(items.duration_ms)).replace('"', "").replace('"', "");
                let url = "https://open.spotify.com/track/" + JSON.stringify(items.id).replace('"', "").replace('"', "");
                let uri = JSON.stringify(items.uri).replace('"', "").replace('"', "");
                let preview = JSON.stringify(items.preview_url).replace('"', "").replace('"', "");
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
                map.set("preview", preview);

                this.contentList.push(map);
            }
        }else{
            pc.gotError(this.id);
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
                preview: contentMap.get("preview"),
            })
        }

        return content;
    }

    async findFeedContent(pc: PluginController): Promise<void> {
        await this.startFeedSearch(pc);
        this.finish = true;

        pc.isFeedFinished(this.contentList, this.id);
    }

    async findMoreFeedContent(pc: PluginController): Promise<void> {
        let list: Map<string, string>[] = []
        pc.isFeedFinished(list, this.id)
    }

    async startFeedSearch(pc: PluginController): Promise<void>{
        let sc = new SpotifyController();

        sc.httpAlbumListRequest().then(r =>
            this.analyseFeed(r, pc)
        );
    }

    async startAlbumSearch(pc: PluginController, id: string): Promise<void>{
        let sc = new SpotifyController();

        sc.httpAlbumRequest(id).then(r =>
            this.analyseAlbumFeed(r, pc)
        );
    }

    async startTrackSearch(pc: PluginController, id: string): Promise<void>{
        let sc = new SpotifyController();

        sc.httpTrackRequest(id).then(r =>
            this.analyseTrackFeed(r, pc)
        );
    }

    async analyseFeed(json: any, pc: PluginController){

        if(json.albums != null) {
            console.log(json.albums.items.length)
            for(let i = 0; i < json.albums.items.length; i++){
                let items = json.albums.items[i]
                this.startAlbumSearch(pc, JSON.stringify(items.id).replace('"', "").replace('"', ""))
            }
        }else{
            pc.gotError(this.id);
        }
    }

    async analyseAlbumFeed(json: any, pc: PluginController){

        for(let i = 0; i < json.tracks.items.length; i++){
            let items = json.tracks.items[i]
            this.startTrackSearch(pc, JSON.stringify(items.id).replace('"', "").replace('"', ""))
        }
    }

    analyseTrackFeed(json: any, pc: PluginController){

        try{
            let artist = JSON.stringify(json.artists[0].name).replace('"', "").replace('"', "");
            let time = this.parseToTime(JSON.stringify(json.duration_ms)).replace('"', "").replace('"', "");
            let url = "https://open.spotify.com/track/" + JSON.stringify(json.id).replace('"', "").replace('"', "");
            let uri = JSON.stringify(json.uri).replace('"', "").replace('"', "");
            let preview = JSON.stringify(json.preview_url).replace('"', "").replace('"', "");
            let name = JSON.stringify(json.name).replace('"', "").replace('"', "");
            let album = JSON.stringify(json.album.name).replace('"', "").replace('"', "");
            let imageUrl = JSON.stringify(json.album.images[0].url).replace('"', "").replace('"', "");

            let map = new Map<string, string>;

            map.set("headline", name);
            map.set("artist", artist);
            map.set("url", url);
            map.set("uri", uri);
            map.set("time", time);
            map.set("album", album);
            map.set("imageUrl", imageUrl);
            map.set("preview", preview);

            let content: any[] = []
            content.push({
                choosenView: "spotifyView",
                url: map.get("url"),
                headline: map.get("headline"),
                pluginName: this.displayName,
                image: map.get("imageUrl"),
                artist: map.get("artist"),
                duration: map.get("time"),
                album: map.get("album"),
                preview: map.get("preview"),
            })
            pc.addInFeed(content)
        }catch (e){}
    }

    getFeedView(): any[] {

        let content: any[] = [];

        for(let i = 0; i < this.contentListFeed.length; i++){

            let contentMap = this.contentListFeed[i];

            content.push({
                choosenView: "spotifyView",
                url: contentMap.get("url"),
                headline: contentMap.get("headline"),
                pluginName: this.displayName,
                image: contentMap.get("imageUrl"),
                artist: contentMap.get("artist"),
                duration: contentMap.get("time"),
                album: contentMap.get("album"),
                preview: contentMap.get("preview"),
            })
        }

        return content;
    }

}