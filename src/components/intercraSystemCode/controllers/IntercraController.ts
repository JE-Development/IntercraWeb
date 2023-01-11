import {PluginController} from "./PluginController";
import {ViewCollection} from "../classes/ViewCollection";
import SearchResultPage from "../../SearchResultPage.vue";
import Vue from 'vue'

export class IntercraController{
    pc: PluginController;
    constructor() {
        this.pc = new PluginController();
    }

    startSearch(searchText: string, plugin: string){
        this.pc.findContent(searchText, plugin);
    }

    setCookie(name: string, val: string) {
        if(this.getCookie("cookiesAllowed") != "false") {
            const value = val;

            // Set it
            document.cookie = name + "=" + value;
        }else{
            console.log("cookies are declined");
        }
    }

    getCookie(name: string): string {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");

        if (parts.length == 2) {
            return String(String(parts.pop()).split(";").shift());
        }
        return "null";
    }

    changeShow(){
        if(SearchResultPage.methods != null) {
            SearchResultPage.methods.updateSearch();
        }
    }
}