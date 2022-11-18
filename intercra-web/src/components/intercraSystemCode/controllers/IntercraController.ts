import {PluginController} from "../controllers/PluginController";

export class IntercraController{
    startSearch(){
        let pc = new PluginController();
        pc.findContent();
    }
}