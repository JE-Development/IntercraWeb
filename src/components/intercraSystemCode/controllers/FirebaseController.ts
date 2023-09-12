import {initializeApp} from "firebase/app";
import {getDatabase, onValue, ref, set, remove, get} from "firebase/database";
import EventBus from "../classes/EventBusEvent";

export class FirebaseController{

    db: any = null

    constructor() {
        const firebaseConfig = {
            apiKey: import.meta.env.VITE_FIREBASE_KEY,
            authDomain: "intercra-firebase.firebaseapp.com",
            databaseURL: "https://intercra-firebase-default-rtdb.firebaseio.com",
            projectId: "intercra-firebase",
            storageBucket: "intercra-firebase.appspot.com",
            messagingSenderId: "1036289266838",
            appId: "1:1036289266838:web:6f21f4e592591d81df1eb7"
        };
        const fireApp = initializeApp(firebaseConfig);

        this.db = getDatabase()
    }

    writeImage(id: string, seed: string, prompt: string, checkpoint: string, artist: string, requestid: string){
        const reference = ref(this.db, "ai-images/" + id)
        set(reference, {
            seed: seed,
            prompt: prompt,
            checkpoint: checkpoint,
            artist: artist,
            requestid: requestid
        })
    }

    async getUsers(){
        const allUsers = ref(this.db, "users")
        let data = null

        try {
            const snapshot = await get(allUsers);
            data = snapshot.val();
        } catch (error) {
            console.error("Fehler beim Abrufen von Daten:", error);
        }

        return data
    }

    async getUser(email: string){
        const allUsers = ref(this.db, "users/" + email)
        let data = null

        try {
            const snapshot = await get(allUsers);
            data = snapshot.val();
        } catch (error) {
            console.error("Fehler beim Abrufen von Daten:", error);
        }

        return data
    }

    createUser(email: string, username: string, blocked: string){
        const reference = ref(this.db, "users/" + email)
        set(reference, {
            username: username,
            blocked: blocked,
        })
    }

    postFeedback(time: string, username: string, headline: string, content: string, status: string){
        const reference = ref(this.db, "feedback/" + time)
        set(reference, {
            username: username,
            headline: headline,
            content: content,
            status: status
        })
    }

    postImageRequest(time: string, username: string, prompt: string, seed: string, model: string, status: string){
        const reference = ref(this.db, "ai-requests/" + time)
        set(reference, {
            username: username,
            prompt: prompt,
            seed: seed,
            model: model,
            status: status
        })
    }

    async getImages(){
        const allUsers = ref(this.db, "ai-images")
        let data = null
        try {
            const snapshot = await get(allUsers);
            data = snapshot.val();
        } catch (error) {
            console.error("Fehler beim Abrufen von Daten:", error);
        }

        return data;
    }

    async getImageRequests(){
        const allUsers = ref(this.db, "ai-requests")
        let data = null
        try {
            const snapshot = await get(allUsers);
            data = snapshot.val();
        } catch (error) {
            console.error("Fehler beim Abrufen von Daten:", error);
        }

        return data;
    }

    async getFeedback(){
        const allUsers = ref(this.db, "feedback");
        let data = null
        try {
            const snapshot = await get(allUsers);
            data = snapshot.val();
        } catch (error) {
            console.error("Fehler beim Abrufen von Daten:", error);
        }

        return data;
    }

    deletePost(id: string){
        remove(ref(this.db, "feedback/" + id))
    }

    deleteImageRequest(id: string){
        remove(ref(this.db, "ai-requests/" + id))
    }
}