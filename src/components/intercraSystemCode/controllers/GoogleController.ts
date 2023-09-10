import * as qs from 'querystring';
import axios from 'axios'
import EventBus from "../classes/EventBusEvent";
import type {PluginController} from "./PluginController";

export class GoogleController{

    login(){
        let CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
        let REDIRECT_URI = 'https://intercra.com/';

        let url = this.getLoginURL(CLIENT_ID, REDIRECT_URI);

        let width = 450,
            height = 730,
            left = (screen.width / 2) - (width / 2),
            top = (screen.height / 2) - (height / 2);
        window.open(url, '_self');

        /*let w = window.open(url,
            'Spotify',
            'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
        );*/
    }
    getLoginURL(client_id: string, redirect_uri: string): string {
        console.log("in google login")
        let request = 'https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/youtubepartner&include_granted_scopes=true&response_type=token&state=state_parameter_passthrough_value&redirect_uri=' + redirect_uri + '&client_id=' + client_id;
        return request;
    }


    async httpSearchRequest(q: string, offset: number, pc: PluginController, id:string): Promise<any>{
        const data = {
            q: q,
            key: import.meta.env.VITE_GOGOLE_KEY,
            cx: "c2a9783feea9c40f5",
            start: String(offset)
        };

        let json;




        let ok = true;

        await axios.get('https://www.googleapis.com/customsearch/v1?' + qs.stringify(data))
            .then(response => {
                json = response.data;
            })
            .catch(error => {
                pc.gotErrorMessage(id, "" + error);
            });
        if(ok) {
            return json;
        }else{
            return "error";
        }

    }

    async httpImageRequest(q: string, offset: number, pc: PluginController, id: string): Promise<any>{
        const data = {
            q: q,
            key: import.meta.env.VITE_GOGOLE_KEY,
            cx: "c2a9783feea9c40f5",
            start: String(offset),
            searchType: "image"
        };

        let json;




        let ok = true;

        await axios.get('https://www.googleapis.com/customsearch/v1?' + qs.stringify(data))
            .then(response => {
                json = response.data;
            })
            .catch(error => {
                pc.gotErrorMessage(id, "" + error);
            });
        if(ok) {
            return json;
        }else{
            return "error";
        }

    }

    async httpVideoRequest(q: string, token: string): Promise<any>{
        const data = {
            q: q,
            key: import.meta.env.VITE_YOUTUBE_KEY,
            part: "snippet",
            maxResults: 30,
        };

        let json;

        let ok = true;

        await axios.get('https://youtube.googleapis.com/youtube/v3/search?' + qs.stringify(data), {headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }})
            .then(response => {
                json = response.data;
                // response.data should contain your access token
            })
            .catch(error => {
                EventBus.emit("youtube-login-circle")
            });
        if(ok) {
            return json;
        }else{
            return "error";
        }

    }
}