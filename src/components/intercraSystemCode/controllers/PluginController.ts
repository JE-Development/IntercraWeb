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

export class PluginController {

    plugins: PluginInterface[] = [];
    special: string[] = [];
    finishedPlugins: string[] = [];
    templates = new Map<string, string>;
    activePlugins: string[] = [];
    errorNames: string[] = [];


    constructor() {
        this.plugins.push(new SpotifyTracks());
        this.plugins.push(new NonaWeb());
        this.plugins.push(new NonaNews());
        this.plugins.push(new NonaPodcast());
        this.plugins.push(new NonaVideo());
        this.plugins.push(new Amazon());
        this.plugins.push(new Ebay());
        this.plugins.push(new BandcampAlbum());
        this.plugins.push(new BandcampArtistLabel());
        this.plugins.push(new BandcampFan());
        this.plugins.push(new BandcampTracks());
        this.plugins.push(new GooglePlayApps());
        this.plugins.push(new GooglePlayBooks());
        this.plugins.push(new GooglePlayMovies());
        this.plugins.push(new Fandom());
        this.plugins.push(new OscoboImage());
        this.plugins.push(new Reddit());
        this.plugins.push(new GitHubRepositories());
        this.plugins.push(new GitHubIssues());
        this.plugins.push(new GitHubTopics());

        this.special.push(new SpotifyTracks().id);
    }

    async findContent(searchText: string, plugin: string, token: string) {
        this.activePlugins = plugin.split("---");

        for (let i = 0; i < this.plugins.length; i++) {
            if (this.activePlugins.includes(this.plugins[i].getId())) {
                if(this.special.includes(this.plugins[i].getId())) {
                    let st = searchText + ";;;" + token;
                    this.plugins[i].findContent(st, "", this);
                }else{
                    this.plugins[i].findContent(searchText, "", this);
                }
            }
        }
    }

    async findMoreContent(searchText: string, plugin: string, token: string) {
        this.activePlugins = plugin.split("---");
        this.finishedPlugins = [];

        for (let i = 0; i < this.plugins.length; i++) {
            if (this.activePlugins.includes(this.plugins[i].getId())) {
                if(this.special.includes(this.plugins[i].getId())) {
                    let st = searchText + ";;;" + token;
                    this.plugins[i].findMoreContent(st, "", this);
                }else{
                    this.plugins[i].findMoreContent(searchText, "", this);
                }
            }
        }
    }

    isFinished(contentList: Map<string, string>[], id: string) {
        this.finishedPlugins.push(id);
        let check = this.checkAllFinished();
        let vc = new ViewCollection();

        EventBus.emit("not-finished", this.getNotFinished())

        if (check) {

            let box: string[][] = [];
            let all: string[] = [];

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
                            all.push(box[j][i]);
                        }
                    }
                }
            } catch (e) {

            }

            EventBus.emit('data-sender', all)


        }
    }

    gotError(id: string) {
        this.finishedPlugins.push(id);

        EventBus.emit("not-finished", this.getNotFinished())

        console.log("error: " + id)

        for (let i = 0; i < this.plugins.length; i++) {
            if (this.plugins[i].getId() == id) {
                this.errorNames.push(this.plugins[i].getPluginDisplayName());
            }
        }
        EventBus.emit('error-sender', this.errorNames)

    }

    checkAllFinished(): boolean {
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
}