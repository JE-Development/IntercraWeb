import * as qs from 'querystring';
import axios from 'axios'
import type decodeFuncType from "querystring/decode";
import EventBus from "../classes/EventBusEvent";

export class SpotifyController{


    login(){
        let CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
        let REDIRECT_URI = 'https://intercra.com/';

        let scope = ['user-read-private'];

        let url = this.getLoginURL(scope, CLIENT_ID, REDIRECT_URI);

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
    getLoginURL(scopes: string[], client_id: string, redirect_uri: string): string {
        console.log("in spotify login")
        let request = 'https://accounts.spotify.com/authorize?client_id=' + client_id +
            '&redirect_uri=' + encodeURIComponent(redirect_uri) +
            '&scope=' + encodeURIComponent(scopes.join(' ')) +
            '&response_type=token';
        return request;
    }

    async httpLibraryRequest(token: string, q: string, type: string, limit: number, offset: number, doSearchEmit: boolean): Promise<any>{
        const data = {
            q: q,
            type: type,
            limit: limit,
            offset: offset
        };

        let json;

        let ok = true;

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
                if(doSearchEmit) {
                    this.login()
                }else{
                    ok = false;
                }
            });
        if(ok) {
            return json;
        }else{
            return "error";
        }

    }

    getCookie(name: string): string {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");

        if (parts.length == 2) {
            return String(String(parts.pop()).split(";").shift());
        }
        return "null";
    }

    async httpAlbumListRequest(): Promise<any>{
        let token = this.getCookie("token")

        const data = {
            limit: 30,
        };

        let json;

        let ok = true;

        await axios.get('https://api.spotify.com/v1/browse/new-releases?' + qs.stringify(data), {headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }})
            .then(response => {
                json = response.data;
                // response.data should contain your access token
            })
            .catch(error => {
                this.login()
                ok = false
            });
        if(ok) {
            return json;
        }else{
            return "error";
        }

    }

    async httpAlbumRequest(album_id: string): Promise<any>{
        let token = this.getCookie("token")


        let json;

        let ok = true;

        await axios.get('https://api.spotify.com/v1/albums/' + album_id, {headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }})
            .then(response => {
                json = response.data;
                // response.data should contain your access token
            })
            .catch(error => {
                ok = false
            });
        if(ok) {
            return json;
        }else{
            return "error";
        }

    }

    async httpTrackRequest(track_id: string): Promise<any>{
        let token = this.getCookie("token")


        let json;

        let ok = true;

        await axios.get('https://api.spotify.com/v1/tracks/' + track_id, {headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }})
            .then(response => {
                json = response.data;
                // response.data should contain your access token
            })
            .catch(error => {
                ok = false
            });
        if(ok) {
            return json;
        }else{
            return "error";
        }

    }


}