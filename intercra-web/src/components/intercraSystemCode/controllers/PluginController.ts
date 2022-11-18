import type {PluginInterface} from "../interfaces/PluginInterface";
import {NonaWeb} from "../plugins/NonaWeb";

export class PluginController{

    plugins: PluginInterface[] = [];

    constructor() {
        this.plugins.push(new NonaWeb());
    }

    async findContent() {
        for(let i = 0; i < this.plugins.length; i++){
            await this.plugins[i].findContent("electronic", "");
        }
    }
}