import {PluginController} from "./PluginController";
import {ViewCollection} from "../classes/ViewCollection";

export class IntercraController{
    pc = new PluginController();

    startSearch(searchText: string, plugin: string){
        this.pc.findContent(searchText, plugin);
    }

    setCheckBox(doc: any){
        for(let i = 0; i < 5; i++){
            let root =  document.getElementById("check-box-list");
            let view = document.createElement("div");

            let vc = new ViewCollection();
            let cb = vc.getCheckBoxView();

            cb = String(cb).replace(";;;plugin-name;;;", "name " + i);

            if(root != null){
                view.innerHTML = cb;
                root.appendChild(view);
            }else{
                console.log("root is null")
            }
        }
    }
}