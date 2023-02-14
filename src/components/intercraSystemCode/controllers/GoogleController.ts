import * as qs from 'querystring';
import axios from 'axios'
import type decodeFuncType from "querystring/decode";
import EventBus from "../classes/EventBusEvent";

export class GoogleController{


    async httpSearchRequest(q: string, offset: number): Promise<any>{
        const data = {
            q: q,
            key: "AIzaSyBsIIXPf7H7s9ctuwQAimiAbvueJnRS-IA",
            cx: "c2a9783feea9c40f5",
            start: String(offset)
        };

        let json;




        let ok = true;

        await axios.get('https://www.googleapis.com/customsearch/v1?' + qs.stringify(data))
            .then(response => {
                json = response.data;
                console.log("google success")
            })
            .catch(error => {
                console.log("google error")
            });
        if(ok) {
            return json;
        }else{
            return "error";
        }

    }
}