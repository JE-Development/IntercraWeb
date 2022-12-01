import {PluginController} from "./PluginController";

export class IntercraController{
    pc = new PluginController();

    startSearch(searchText: string){
        this.pc.findContent(searchText);
    }
}