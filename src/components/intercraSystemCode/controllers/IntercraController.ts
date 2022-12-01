import {PluginController} from "./PluginController";

export class IntercraController{
    pc = new PluginController();

    startSearch(searchText: string, plugin: string){
        this.pc.findContent(searchText, plugin);
    }
}