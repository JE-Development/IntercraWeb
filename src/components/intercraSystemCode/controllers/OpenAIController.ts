import { Configuration, OpenAIApi } from "openai";

export class OpenAIController{

    constructor() {

    }

    async setup(){
        const configuration = new Configuration({
            organization: "org-kmzuktjxjqOlqaDEZp2PTWD2",
            apiKey: "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",
        });
        const openai = new OpenAIApi(configuration);
        const response = await openai.listEngines();
        console.log("response::::::")
        console.log(response)
    }

}