import * as qs from 'querystring';
import axios from 'axios'
import type decodeFuncType from "querystring/decode";
import EventBus from "../classes/EventBusEvent";

export class SpotifyController{


    login(){
        let CLIENT_ID = '15d6a40e579740e8b8eab83339e01744';
        let REDIRECT_URI = document.baseURI.toString().split("search")[0] + 'redirect/callback/';
        console.log("redirect: " + REDIRECT_URI)

        let scope = ['user-read-private'];

        let url = this.getLoginURL(scope, CLIENT_ID, REDIRECT_URI);

        let width = 450,
            height = 730,
            left = (screen.width / 2) - (width / 2),
            top = (screen.height / 2) - (height / 2);

        let w = window.open(url, '_self');

        /*let w = window.open(url,
            'Spotify',
            'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
        );*/
    }
    getLoginURL(scopes: string[], client_id: string, redirect_uri: string): string {
        let request = 'https://accounts.spotify.com/authorize?client_id=' + client_id +
            '&redirect_uri=' + encodeURIComponent(redirect_uri) +
            '&scope=' + encodeURIComponent(scopes.join(' ')) +
            '&response_type=token';
        console.log("request: " + request);
        return request;
    }

    async httpLibraryRequest(token: string, q: string, type: string, limit: Number, offset: Number): Promise<any>{
        const data = {
            q: q,
            type: type,
            limit: limit,
            offset: offset
        };

        let json;



        console.log("stringify: " + token)

        await axios.get('https://api.spotify.com/v1/search?' + qs.stringify(data), {headers: {
            'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
        }})
            .then(response => {
                json = response.data;
                // response.data should contain your access token
            })
            .catch(error => {
                console.error(error);
                EventBus.emit("login-circle")
            });
        return json;

    }
}