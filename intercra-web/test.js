
export function StartWorker(){


    const worker1 = new Worker('controllers/workerOne.js', {
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

    worker1.on('message', (result) => {
        console.log(result);
    });

    worker2.on('message', (result) => {
        console.log(result);
    });
}