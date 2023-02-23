import * as qs from 'querystring';
import axios from 'axios'
import EventBus from "../classes/EventBusEvent";
import type {PluginController} from "./PluginController";
import {apiKey} from "../classes/Var";

export class HttpRequestController {


    async httpRequest(url: string, pc: PluginController, id: string): Promise<any>{

        let ok = true;

        let json;

        await axios.get(url)
            .then(response => {
                json = response.data;
            })
            .catch(error => {
                pc.gotError(id);
            });
        if(ok) {
            return json;
        }else{
            pc.gotError(id);
            return "error";
        }

    }

    async intercraHttpRequest(id: string, q: string, page: number, pc: PluginController): Promise<any>{

        let ok = true;

        let json;

        await axios.get("http://localhost:8787/api/plugins/?id=" + id + "&q=" + q + "&page=" + page + "&key=" + apiKey)
            .then(response => {
                json = response.data;
            })
            .catch(error => {
                //pc.gotError(id);
            });
        if(ok) {
            return json;
        }else{
            //pc.gotError(id);
            return "error";
        }

    }
}