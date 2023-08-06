import type {PluginInterface} from "../interfaces/PluginInterface";
import {NonaWeb} from "../plugins/NonaWeb";
import {NonaNews} from "../plugins/NonaNews";
import {NonaPodcast} from "../plugins/NonaPodcast";
import {NonaVideo} from "../plugins/NonaVideo";
import {Amazon} from "../plugins/Amazon";
import {BandcampAlbum} from "../plugins/BandcampAlbum";
import {BandcampArtistLabel} from "../plugins/BandcampArtistLabel";
import {ViewCollection} from "../classes/ViewCollection";
import {BandcampFan} from "../plugins/BandcampFan";
import {BandcampTracks} from "../plugins/BandcampTracks";
import {GooglePlayApps} from "../plugins/GooglePlayApps";
import {GooglePlayBooks} from "../plugins/GooglePlayBooks";
import {GooglePlayMovies} from "../plugins/GooglePlayMovies";
import {Ebay} from "../plugins/Ebay";
import {Fandom} from "../plugins/Fandom";
import {OscoboImage} from "../plugins/OscoboImage";
import {SpotifyTracks} from "../plugins/SpotifyTracks";
import EventBus from "../classes/EventBusEvent";
import {Reddit} from "../plugins/Reddit";
import {GitHubRepositories} from "../plugins/GitHubRepositories";
import {GitHubIssues} from "../plugins/GitHubIssues";
import {GitHubTopics} from "../plugins/GitHubTopics";
import {GoogleWeb} from "../plugins/GoogleWeb";
import {YoutubeVideo} from "../plugins/YoutubeVideo";
import {Stackoverflow} from "../plugins/Stackoverflow";
import {ITunesTracks} from "../plugins/ITunesTracks";
import {Flickr} from "../plugins/Flickr";
import {NewsApi} from "../plugins/NewsApi";
import {Giphy} from "../plugins/Giphy";
import {Sketchfab} from "../plugins/Sketchfab";
import {Free3D} from "../plugins/Free3D";
import {GoogleImage} from "../plugins/GoogleImage";
import {GNews} from "../plugins/GNews";
import {NewsCatcher} from "../plugins/NewsCatcher";
import {NewYorkTimes} from "../plugins/NewYorkTimes";
import {NewgroundsAudio} from "../plugins/NewgroundsAudio";
import {NewgroundsUsers} from "../plugins/NewgroundsUsers";
import {NewgroundsBlogs} from "../plugins/NewgroundsBlogs";
import {NewgroundsArt} from "../plugins/NewgroundsArt";
import {NewgroundsGames} from "../plugins/NewgroundsGames";
import {NewgroundsMovies} from "../plugins/NewgroundsMovies";
import {AppStore} from "../plugins/AppStore";
import {ITunesMovies} from "../plugins/ITunesMovies";
import {ITunesPodcast} from "../plugins/ITunesPodcast";
import {ITunesBooks} from "../plugins/ITunesBooks";
import {ITunesAudioBook} from "../plugins/ITunesAudioBook";
import {Tenor} from "../plugins/Tenor";
import {PNGWing} from "../plugins/PNGWing";
import {Forbes} from "../plugins/Forbes";
import {TheAtlantic} from "../plugins/TheAtlantic";
import {TechCrunch} from "../plugins/TechCrunch";
import {Wired} from "../plugins/Wired";
import {Arxiv} from "../plugins/Arxiv";
import {LosAngelesTimes} from "../plugins/LosAngelesTimes";
import {NewYorkPost} from "../plugins/NewYorkPost";
import {Engadget} from "../plugins/Engadget";
import {TED} from "../plugins/TED";
import {Nature} from "../plugins/Nature";
import {Quartz} from "../plugins/Quartz";
import {VentureBeat} from "../plugins/VentureBeat";
import {Mashabe} from "../plugins/Mashabe";
import {HarvardBusinessReview} from "../plugins/HarvardBusinessReview";
import {RT} from "../plugins/RT";
import {PewResearchCenter} from "../plugins/PewResearchCenter";
import {DigitalTrends} from "../plugins/DigitalTrends";
import {SearchEngineLand} from "../plugins/SearchEngineLand";
import {ProductHunt} from "../plugins/ProductHunt";
import {WebMD} from "../plugins/WebMD";
import {BoredPanda} from "../plugins/BoredPanda";
import {LiveScience} from "../plugins/LiveScience";
import {Unsplash} from "../plugins/Unsplash";
import {Iconfinder} from "../plugins/Iconfinder";
import {Flaticon} from "../plugins/Flaticon";
import type {FeedInterface} from "../interfaces/FeedInterface";
import {CFMinecraft} from "../plugins/CFMinecraft";
import {CFWoW} from "../plugins/CFWoW";
import {TurboSquid} from "../plugins/TurboSquid";
import {DownloadFree3D} from "../plugins/DownloadFree3D";
import {BlenderMarket} from "../plugins/BlenderMarket";
import {SocialMediaToday} from "../plugins/SocialMediaToday";
import {Politico} from "../plugins/Politico";
import {LaughingSquid} from "../plugins/LaughingSquid";
import {TheHill} from "../plugins/TheHill";
import {Kochplanet} from "../plugins/Kochplanet";
import {HttpRequestController} from "./HttpRequestController";

export class PluginController {

    feedPlugins: FeedInterface[] = [];
    anyPlugins: any[] = [];
    plugins: PluginInterface[] = [];
    special: string[] = [];
    finishedPlugins: string[] = [];
    activePlugins: string[] = [];
    errorNames: string[] = [];
    sorting = "repeat";
    all: string[] = []
    collected: any[] = []
    forRequest: any[] = []
    hrc = new HttpRequestController()
    searchText = ""
    page = 1


    constructor() {

        this.anyPlugins.push(new SpotifyTracks())
        this.anyPlugins.push(new YoutubeVideo())
        this.anyPlugins.push(new GoogleWeb())
        this.anyPlugins.push(new GoogleImage());
        this.anyPlugins.push(new ITunesTracks());
        this.anyPlugins.push(new ITunesMovies());
        this.anyPlugins.push(new ITunesPodcast());
        this.anyPlugins.push(new ITunesBooks());
        this.anyPlugins.push(new ITunesAudioBook());
        this.anyPlugins.push(new AppStore());
        //this.anyPlugins.push(new NewsApi()); not working in production
        this.anyPlugins.push(new GNews());
        //this.anyPlugins.push(new NewsCatcher()); only 50 calls per month
        this.anyPlugins.push(new NewYorkTimes());
        this.anyPlugins.push(new NonaWeb());
        this.anyPlugins.push(new NonaNews());
        this.anyPlugins.push(new NonaPodcast());
        this.anyPlugins.push(new NonaVideo());
        //this.anyPlugins.push(new Amazon()); blocked crawling
        this.anyPlugins.push(new Ebay());
        this.anyPlugins.push(new BandcampAlbum());
        this.anyPlugins.push(new BandcampArtistLabel());
        this.anyPlugins.push(new BandcampFan());
        this.anyPlugins.push(new BandcampTracks());
        //this.anyPlugins.push(new GooglePlayApps());
        //this.anyPlugins.push(new GooglePlayBooks());
        //this.anyPlugins.push(new GooglePlayMovies());
        this.anyPlugins.push(new Fandom());
        this.anyPlugins.push(new OscoboImage());
        this.anyPlugins.push(new Flickr());
        this.anyPlugins.push(new Giphy());
        this.anyPlugins.push(new Tenor());
        //this.anyPlugins.push(new Reddit()); required api | blocked content via crawling
        //this.anyPlugins.push(new GitHubRepositories());
        //this.anyPlugins.push(new GitHubIssues());
        //this.anyPlugins.push(new GitHubTopics());
        this.anyPlugins.push(new Stackoverflow());
        this.anyPlugins.push(new Sketchfab());
        this.anyPlugins.push(new Free3D());
        this.anyPlugins.push(new NewgroundsAudio());
        this.anyPlugins.push(new NewgroundsUsers());
        this.anyPlugins.push(new NewgroundsBlogs());
        this.anyPlugins.push(new NewgroundsArt());
        this.anyPlugins.push(new NewgroundsGames());
        this.anyPlugins.push(new NewgroundsMovies());
        this.anyPlugins.push(new PNGWing());
        this.anyPlugins.push(new Forbes());
        this.anyPlugins.push(new TheAtlantic());
        this.anyPlugins.push(new TechCrunch());
        this.anyPlugins.push(new Wired());
        this.anyPlugins.push(new Arxiv());
        this.anyPlugins.push(new LosAngelesTimes());
        this.anyPlugins.push(new NewYorkPost());
        this.anyPlugins.push(new Engadget());
        this.anyPlugins.push(new TED());
        this.anyPlugins.push(new Nature());
        //this.anyPlugins.push(new Quartz());  document selection not working
        this.anyPlugins.push(new VentureBeat());
        this.anyPlugins.push(new Mashabe());
        this.anyPlugins.push(new HarvardBusinessReview());
        this.anyPlugins.push(new RT());
        this.anyPlugins.push(new DigitalTrends());
        this.anyPlugins.push(new PewResearchCenter());
        //this.anyPlugins.push(new SearchEngineLand()); not allows crawling anymore
        //this.anyPlugins.push(new ProductHunt()); not working correctly. need a restore
        this.anyPlugins.push(new WebMD());
        this.anyPlugins.push(new BoredPanda());
        this.anyPlugins.push(new LiveScience());
        this.anyPlugins.push(new Unsplash());
        this.anyPlugins.push(new Iconfinder());
        this.anyPlugins.push(new Flaticon());
        this.anyPlugins.push(new CFMinecraft());
        this.anyPlugins.push(new CFWoW());
        this.anyPlugins.push(new TurboSquid());
        this.anyPlugins.push(new DownloadFree3D());
        this.anyPlugins.push(new BlenderMarket());
        this.anyPlugins.push(new SocialMediaToday());
        this.anyPlugins.push(new Politico());
        this.anyPlugins.push(new LaughingSquid());
        this.anyPlugins.push(new TheHill());
        this.anyPlugins.push(new Kochplanet());

        this.special.push(new SpotifyTracks().id);
        this.special.push(new YoutubeVideo().id);

        for(let i = 0; i < this.anyPlugins.length; i++){
            this.plugins.push(this.anyPlugins[i])
        }
        for(let i = 0; i < this.anyPlugins.length; i++){
            this.feedPlugins.push(this.anyPlugins[i])
        }
        //this.feedPlugins.push(new Engadget())


        this.plugins = this.sortPlugins(this.plugins);
    }

    sortPlugins(list: PluginInterface[]): PluginInterface[]{
        let nameList: string[] = []
        let newList: PluginInterface[] = []
        for(let i = 0; i < list.length; i++){
            nameList.push(list[i].getPluginDisplayName().toLowerCase())
        }
        nameList.sort();
        for(let i = 0; i < nameList.length; i++){
            let name = nameList[i]
            for(let j = 0; j < list.length; j++){
                if(name === list[j].getPluginDisplayName().toLowerCase()){
                    newList.push(list[j])
                }
            }
        }
        return newList;
    }

    async findContent(searchText: string, plugin: string[], token: string, ytToken: string) {
        this.activePlugins = plugin
        this.finishedPlugins = [];
        this.searchText = searchText

        for (let i = 0; i < this.plugins.length; i++) {
            if (this.activePlugins.includes(this.plugins[i].getId())) {
                if(this.special.includes(this.plugins[i].getId())) {
                    if(this.plugins[i].getId() === "spotify_tracks") {
                        let st = searchText + ";;;" + token;
                        if(plugin.includes("youtube_video")){
                            st = st + ";;;false";
                        }else{
                            st = st + ";;;true";
                        }
                        await this.plugins[i].findContent(st, "", this);
                    }
                    if(this.plugins[i].getId() === "youtube_video"){
                        let st = searchText + ";;;" + ytToken;
                        this.plugins[i].findContent(st, "", this);
                    }
                }else{
                    this.plugins[i].findContent(searchText, "", this);
                }
                EventBus.emit("not-finished", this.getNotFinished())
            }
        }
    }

    async findMoreContent(searchText: string, plugin: string[], token: string, ytToken: string) {
        this.activePlugins = plugin
        this.finishedPlugins = [];
        this.all = []
        this.page = this.page + 1
        this.searchText = searchText

        for (let i = 0; i < this.plugins.length; i++) {
            if (this.activePlugins.includes(this.plugins[i].getId())) {
                if(this.special.includes(this.plugins[i].getId())) {
                    if(this.plugins[i].getId() === "spotify_tracks") {
                        let st = searchText + ";;;" + token;
                        this.plugins[i].findMoreContent(st, "", this);
                    }
                    if(this.plugins[i].getId() === "youtube_video"){
                        let st = searchText + ";;;" + ytToken;
                        this.plugins[i].findMoreContent(st, "", this);
                    }
                }else{
                    this.plugins[i].findMoreContent(searchText, "", this);
                }
                EventBus.emit("not-finished", this.getNotFinished())
            }
        }
    }

    async findFeedContent(plugin: string[]) {
        this.activePlugins = plugin
        this.finishedPlugins = []
        for (let i = 0; i < this.feedPlugins.length; i++) {
            if (this.activePlugins.includes(this.feedPlugins[i].getId())) {
                this.feedPlugins[i].findFeedContent(this);
                EventBus.emit("feed-not-finished", this.getNotFinished())
            }
        }
    }

    async findMoreFeedContent(plugin: string[]) {
        this.activePlugins = plugin
        this.finishedPlugins = []
        for (let i = 0; i < this.feedPlugins.length; i++) {
            if (this.activePlugins.includes(this.feedPlugins[i].getId())) {
                this.feedPlugins[i].findMoreFeedContent(this);
                EventBus.emit("feed-not-finished", this.getNotFinished())
            }
        }
    }

    async collectRequests(self: any, skip: boolean, noMore: boolean){

        this.collected.push(self)
        if(!skip){
            this.forRequest.push(self)
        }
        if(noMore){
            this.isFinished([], self.getId())
        }
        if(this.collected.length === this.activePlugins.length){

            let plugs = ""
            for(let i = 0; i < this.forRequest.length; i++){
                if(i === 0){
                    plugs = this.forRequest[i].getId()
                }else{
                    plugs = plugs + "---" + this.forRequest[i].getId()
                }
            }

            let json

            await this.hrc.endpointRequest(
                "http://212.227.183.160:3002/api/search?plugin=" + plugs + "&searchtext=" + this.searchText + "&page=" + this.page).then(r =>
                json = r
            );

            console.log(this.forRequest.length)

            for(let i = 0; i < this.forRequest.length; i++){
                console.log("in for")
                this.forRequest[i].analyse(json, this)
            }
        }
    }

    isFinished(contentList: Map<string, string>[], id: string) {

        this.finishedPlugins.push(id);
        console.log(id)
        this.makeFinish()
    }

    makeFinish(){
        let check = this.checkAllFinished();

        EventBus.emit("not-finished", this.getNotFinished())


        if (check) {


            let box: string[][] = [];

            for (let i = 0; i < this.plugins.length; i++) {
                if (this.finishedPlugins.includes(this.plugins[i].getId())) {
                    let view = this.plugins[i].getView();
                    box.push(view);
                }
            }

            let maxSize: Number[] = [];

            for (let i = 0; i < this.plugins.length; i++) {
                if (this.finishedPlugins.includes(this.plugins[i].getId())) {
                    maxSize.push(this.plugins[i].getView().length);
                }
            }

            maxSize = maxSize.sort((n1: any, n2: any) => n1 - n2);

            try {
                let max = maxSize[maxSize.length - 1];
                for (let i = 0; i < max; i++) {
                    for (let j = 0; j < box.length; j++) {
                        if (box[j].length > i) {
                            this.all.push(box[j][i]);
                        }
                    }
                }
            } catch (e) {

            }

            if(this.sorting === "shuffle"){
                this.all = this.shuffleArray(this.all);
            }else if(this.sorting === "repeat"){
                //default
            }else if(this.sorting === "list"){
                this.all = []
                for (let i = 0; i < this.plugins.length; i++) {
                    if (this.finishedPlugins.includes(this.plugins[i].getId())) {
                        let view = this.plugins[i].getView();
                        for(let j = 0; j < view.length; j++){
                            this.all.push(view[j]);
                        }
                    }
                }
            }


            EventBus.emit('data-sender', this.all)


        }
    }

    isFeedFinished(contentLis: Map<string, string>[], id: string) {

        this.finishedPlugins.push(id);
        this.makeFeedFinish()
    }

    makeFeedFinish(){
        let check = this.checkAllFinished();

        EventBus.emit("feed-not-finished", this.getNotFinished())

        if (check) {
        //if (true) {

            let box: string[][] = [];

            for (let i = 0; i < this.feedPlugins.length; i++) {
                if (this.finishedPlugins.includes(this.feedPlugins[i].getId())) {
                    let view = this.feedPlugins[i].getFeedView();
                    box.push(view);
                }
            }

            let maxSize: Number[] = [];

            for (let i = 0; i < this.feedPlugins.length; i++) {
                if (this.finishedPlugins.includes(this.feedPlugins[i].getId())) {
                    maxSize.push(this.feedPlugins[i].getFeedView().length);
                }
            }

            maxSize = maxSize.sort((n1: any, n2: any) => n1 - n2);

            try {
                let max = maxSize[maxSize.length - 1];
                for (let i = 0; i < max; i++) {
                    for (let j = 0; j < box.length; j++) {
                        if (box[j].length > i) {
                            this.all.push(box[j][i]);
                        }
                    }
                }
            } catch (e) {

            }

            if(this.sorting === "shuffle"){
                this.all = this.shuffleArray(this.all);
            }else if(this.sorting === "repeat"){
                //default
            }else if(this.sorting === "list"){
                this.all = []
                for (let i = 0; i < this.feedPlugins.length; i++) {
                    if (this.finishedPlugins.includes(this.feedPlugins[i].getId())) {
                        let view = this.feedPlugins[i].getFeedView();
                        for(let j = 0; j < view.length; j++){
                            this.all.push(view[j]);
                        }
                    }
                }
            }


            EventBus.emit('feed-data-sender', this.all)


        }
    }

    addInFeed(content: any[]){
        EventBus.emit('feed-data-sender', content)
    }

    gotFeedError(id: string) {
        this.finishedPlugins.push(id);

        EventBus.emit("feed-not-finished", this.getNotFinished())


        for (let i = 0; i < this.feedPlugins.length; i++) {
            if (this.feedPlugins[i].getId() == id) {
                this.errorNames.push(this.feedPlugins[i].getPluginDisplayName());
            }
        }
        EventBus.emit('feed-error-sender', this.errorNames)
        this.makeFeedFinish()

    }

    gotError(id: string) {
        this.finishedPlugins.push(id);

        EventBus.emit("not-finished", this.getNotFinished())


        for (let i = 0; i < this.plugins.length; i++) {
            if (this.plugins[i].getId() == id) {
                this.errorNames.push(this.plugins[i].getPluginDisplayName());
            }
        }
        EventBus.emit('error-sender', this.errorNames)
        this.makeFinish()

    }

    gotErrorMessage(id: string, message: string) {
        this.finishedPlugins.push(id);

        EventBus.emit("not-finished", this.getNotFinished())


        for (let i = 0; i < this.plugins.length; i++) {
            if (this.plugins[i].getId() == id) {
                this.errorNames.push(this.plugins[i].getPluginDisplayName() + ": " + message);
            }
        }
        EventBus.emit('error-sender', this.errorNames)

    }

    checkAllFinished(): boolean {
        let fehlen: String[] = []

        for(let i = 0; i < this.activePlugins.length; i++){
            let active = this.activePlugins[i];
            let isIn = false;
            for(let j = 0; j < this.finishedPlugins.length; j++){
                if(active === this.finishedPlugins[j]){
                    isIn = true;
                }
            }
            if(!isIn){
                fehlen.push(active)
            }
        }
        console.log(fehlen)

        if (this.activePlugins.length != this.finishedPlugins.length) {
            return false;
        } else {
            for (let i = 0; i < this.activePlugins.length; i++) {
                if (!this.finishedPlugins.includes(this.activePlugins[i])) {
                    return false;
                }
            }
        }
        return true;
    }

    getNotFinished(): String[]{
        let list = []
        for(let i = 0; i < this.activePlugins.length; i++){
            if(!this.finishedPlugins.includes(this.activePlugins[i])){
                list.push(this.getNameFromId(this.activePlugins[i]));
            }
        }
        return list;
    }

    getPluginList(): PluginInterface[] {
        return this.plugins;
    }

    getIdFromName(name: string): string {
        for (let i = 0; i < this.plugins.length; i++) {
            if (this.plugins[i].getPluginDisplayName() == name) {
                return this.plugins[i].getId();
            }
        }
        return "";
    }

    getNameFromId(name: string): string {
        for (let i = 0; i < this.plugins.length; i++) {
            if (this.plugins[i].getId() == name) {
                return this.plugins[i].getPluginDisplayName();
            }
        }
        return "";
    }

    getPresetSettings(pluginId: string): string[]{
        for(let i = 0; i < this.plugins.length; i++){
            if(this.plugins[i].getId() === pluginId){
                return this.plugins[i].addToPreset().getPresetList();
            }
        }
        return [];
    }

    getPluginsByPresetValue(value: string): string[]{
        let val = value.replace(" ", "_")
        let modPresets = this.getCookie("modified-presets")
        if(modPresets !== null){
            let split = modPresets.split("---")
            for(let i = 0; i < split.length; i++){
                if(val === split[i]){
                    return this.getModdesPresets(val)
                }
            }
        }

        return this.getNormalPresets(value)


    }

    getModdesPresets(value: string): string[]{
        let plugins = this.getCookie("mod-preset-" + value).split("---")
        return plugins;
    }

    getNormalPresets(value: string): string[]{
        let matched: string[] = [];
        for(let i = 0; i < this.plugins.length; i++){
            // @ts-ignore
            let plug = this.plugins[i];
            let list = plug.addToPreset().getPresetList();
            for(let j = 0; j < list.length; j++){
                if(value === list[j]){
                    matched.push(plug.getId());
                }
            }
        }
        return matched;
    }

    getAllPluginsAsId(): string[]{
        let ids: string[] = [];
        for(let i = 0; i < this.plugins.length; i++){
            ids.push(this.plugins[i].getId());
        }
        return ids;
    }

    setSorting(sortType: string){
        this.sorting = sortType;

        if(this.sorting === "shuffle"){
            this.all = this.shuffleArray(this.all);
        }else if(this.sorting === "repeat"){
            //default
        }else if(this.sorting === "list"){
            this.all = []
            for (let i = 0; i < this.plugins.length; i++) {
                if (this.finishedPlugins.includes(this.plugins[i].getId())) {
                    let view = this.plugins[i].getView();
                    for(let j = 0; j < view.length; j++){
                        this.all.push(view[j]);
                    }
                }
            }
        }

        EventBus.emit('data-sender', this.all)
    }

    shuffleArray(array: string[]) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    setSortVar(sort: string){
        this.sorting = sort;
    }

    getCookie(name: string): string {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");

        if (parts.length == 2) {
            return String(String(parts.pop()).split(";").shift());
        }
        return "null";
    }
}