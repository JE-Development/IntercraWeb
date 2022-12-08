import {PluginController} from "./PluginController";
import {ViewCollection} from "../classes/ViewCollection";

export class IntercraController{
    pc = new PluginController();

    startSearch(searchText: string, plugin: string){
        this.pc.findContent(searchText, plugin);
    }

    setCookie(name: string, val: string) {
        const date = new Date();
        const value = val;

        // Set it expire in 7 days
        date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));

        // Set it
        document.cookie = name + "=" + value;
    }

    getCookie(name: string): string {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");

        if (parts.length == 2) {
            return String(String(parts.pop()).split(";").shift());
        }
        return "null";
    }

    getCheckedPlugins(th: any): string{
        let checkBox = document.getElementsByClassName("check-box");
        let checkBoxLabel = document.getElementsByClassName("check-box-label");
        let ids = "";
        let pl = this.pc.getPlugins();

        for(let i = 0; i < pl.length; i++){
            console.log(" ");
            let cb = checkBox[i];
            let id = pl[i];
            if(th.$refs.id.checked){
                if(i == 0){
                    ids = ids + this.pc.getIdFromName(String(checkBoxLabel[i].textContent));
                }else{
                    ids = ids + "---" + this.pc.getIdFromName(String(checkBoxLabel[i].textContent));
                }

            }
        }

        return ids;
    }
}