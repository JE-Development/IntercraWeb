import express from 'express';
import * as qs from 'querystring';

export class SpotifyController{

    app = express();

    login(){
        let state: string = this.generateRandomString(16);
        this.app.get('/login', function(req, res) {

            let scope = 'user-read-private user-read-email';

            res.redirect('https://accounts.spotify.com/authorize?' +
                qs.stringify({
                    response_type: 'code',
                    client_id: '15d6a40e579740e8b8eab83339e01744',
                    scope: scope,
                    redirect_uri: 'http://localhost:8888/callback/',
                    state: state
                }));
        });
    }

    generateRandomString (length: Number): string{
        let text = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };
}