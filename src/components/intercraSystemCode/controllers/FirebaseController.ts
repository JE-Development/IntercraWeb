import {initializeApp} from "firebase/app";
import {getDatabase, onValue, ref, set} from "firebase/database";
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

    writeImage(id: string, seed: string, prompt: string, checkpoint: string, artist: string){
        const reference = ref(this.db, "ai-images/" + id)
        set(reference, {
            seed: seed,
            prompt: prompt,
            checkpoint: checkpoint,
            artist: artist
        })
    }

    getUsers(){
        const allUsers = ref(this.db, "users")
        onValue(allUsers, (snapshot) => {
            let data = snapshot.val()
            EventBus.emit("firebase-users", data)
        })
    }

    getUsersForUsername(){
        const allUsers = ref(this.db, "users")
        onValue(allUsers, (snapshot) => {
            let data = snapshot.val()
            EventBus.emit("firebase-users-username", data)
        })
    }

    getUser(email: string){
        const allUsers = ref(this.db, "users/" + email)
        onValue(allUsers, (snapshot) => {
            let data = snapshot.val()
            EventBus.emit("firebase-single-user", data)
        })
    }

    createUser(email: string, username: string, blocked: string){
        const reference = ref(this.db, "users/" + email)
        set(reference, {
            username: username,
            blocked: blocked,
        })
    }

    getImages(){
        const allUsers = ref(this.db, "ai-images")
        onValue(allUsers, (snapshot) => {
            const data = snapshot.val()
            EventBus.emit("firebase-image", data)
        })
    }
}