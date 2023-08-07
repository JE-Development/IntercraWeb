import * as qs from 'querystring';
import axios from 'axios'
import EventBus from "../classes/EventBusEvent";
import type {PluginController} from "./PluginController";

export class HttpRequestController {


    async httpPost(url: string, data: any, pc: PluginController, id: string): Promise<any> {
        try {
            const response = await axios.post(url, data);
            return response.data;
        } catch (error) {
            console.log(error)
            pc.gotError(id);
        }
    }

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
            console.log("not ok")
            pc.gotError(id);
            return "error";
        }

    }

    async endpointRequest(url: string, pc: PluginController): Promise<any>{

        // SSE-Verbindung herstellen
        const eventSource = new EventSource(url);

        // SSE-Ereignisse abonnieren
        eventSource.onmessage = (event) => {
            const eventData = JSON.parse(event.data);
            pc.endpointCallback(eventData)
        };

    }

    async serverRequest(url: string, pc: PluginController, id: string): Promise<any>{

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

    async httpRequestHeader(url: string, header: any, pc: PluginController, id: string): Promise<any>{

        let ok = true;

        let json;

        await axios.get(url, {headers: header})
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

    async httpRequestHeaderNoError(url: string, header: any, pc: PluginController, id: string): Promise<any>{

        let json;
        let ok = false;

        await axios.get(url, {headers: header})
            .then(response => {
                json = response.data;
                ok = true;
                return json
            })
            .catch(error => {
                console.log(error)
                return "error"
            });

        if(ok){
            return json
        }else{
            return "error"
        }

    }

    async httpRequestIconApi(url: string): Promise<any>{

        try {
            let request = await fetch("https://intercra-backend.jason-apps.workers.dev/html/api/iconfinder_download/X0vjEUN6KRlxbp2DoUkyHeM0VOmxY91rA6BbU5j3Xu6wDodwS0McmilLPBWDUcJ1;;;" + url);
            let json = await request.json()
        }catch (error){
            console.log(error)
        }

    }
}