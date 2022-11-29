import type {PluginInterface} from "../interfaces/PluginInterface";
import {NonaWeb} from "../plugins/NonaWeb";

export class PluginController{

    plugins: PluginInterface[] = [];

    constructor() {
        this.plugins.push(new NonaWeb());
    }

    async findContent(searchText: string) {
        for(let i = 0; i < this.plugins.length; i++){
            await this.plugins[i].findContent(searchText, "");
        }
    }

    isFinished(): boolean{
        for(let i = 0; i < this.plugins.length; i++){
            let finished: boolean = this.plugins[i].isFinish();
            if(!finished){
                return false;
            }
        }
        return true;
    }
}