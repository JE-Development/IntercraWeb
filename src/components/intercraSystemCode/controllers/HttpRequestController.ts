import * as qs from 'querystring';
import axios from 'axios'
import EventBus from "../classes/EventBusEvent";
import type {PluginController} from "./PluginController";

export class HttpRequestController {


    async httpRequest(url: string, pc: PluginController, id: string): Promise<any>{

        let ok = true;

        let json;

        await axios.get(url)
            .then(response => {
                json = response.data;
            })
            .catch(error => {
                console.log(error)
                pc.gotError(id);
            });
        if(ok) {
            return json;
        }else{
            pc.gotError(id);
            return "error";
        }

    }
}