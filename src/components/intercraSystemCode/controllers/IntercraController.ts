import {PluginController} from "./PluginController";
import {ViewCollection} from "../classes/ViewCollection";
import SearchResultPage from "../../SearchResultPage.vue";

export class IntercraController{
    pc: PluginController;
    constructor() {
        this.pc = new PluginController();
    }

    startSearch(searchText: string, plugin: string[], token: string, sorting: string, ytToken: string){
        this.pc.setSortVar(sorting);
        this.pc.findContent(searchText, plugin, token, ytToken);
    }
    startMoreSearch(searchText: string, plugin: string[], token: string, ytToken: string){
        this.pc.findMoreContent(searchText, plugin, token, ytToken);
    }
    startFeedSearch(plugin: string[]){
        this.pc.findFeedContent(plugin);
    }
    startMoreFeedSearch(plugin: string[]){
        this.pc.findMoreFeedContent(plugin);
    }
    setSorting(sort: string){
        this.pc.setSorting(sort);
    }

    /*setCookie(name: string, val: string) {
        if(this.getCookie(cookies, "cookiesAllowed") != "false") {
            const value = val;

            // Set it
            document.cookie = name + "=" + value;
        }else{
            console.log("cookies are declined");
        }
    }

    getCookie(cookies: any, name: string): string {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");

        if (parts.length == 2) {
            return String(String(parts.pop()).split(";").shift());
        }
        return "null";
    }*/

    changeShow(){
        if(SearchResultPage.methods != null) {
            SearchResultPage.methods.updateSearch();
        }
    }
}