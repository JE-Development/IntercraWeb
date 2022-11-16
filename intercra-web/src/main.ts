import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'

const app = createApp(App)
app.mount("#app")

console.log("hello world")

import { Worker } from 'worker_threads';

const worker1 = new Worker('./controllers/workerOne.js', {
    workerData: {
        value: 15,
        path: './controllers/workerOne.js'
    }
});

const worker2 = new Worker('./controllers/workerTwo.js', {
    workerData: {
        value: 15,
        path: './controllers/workerTwo.js'
    }
});

worker1.on('message', (result: any) => {
    console.log(result);
});

worker2.on('message', (result: any) => {
    console.log(result);
});