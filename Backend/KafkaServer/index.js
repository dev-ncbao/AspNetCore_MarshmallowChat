const express = require("express");
const app = express();
const cors = require("cors");
const fs = require('fs');
const { Server } = require("socket.io");
const { createServer } = require("https");
const {
    registerChatHandler, 
    registerRoomHandler} = require('./events')
//const { Kafka } = require("kafkajs");\

const onConnection = (socket) => {
    registerChatHandler(io, socket);
    registerRoomHandler(io, socket);
    socket.on('echo', message => {
        console.log(message)
    })
}

const onAuthorization = (socket, next) => {
    console.log("Authorization trigger", socket.handshake.headers);
    console.log("Socket id: ", socket.id)
    next()
}

const httpsServer = createServer({
    key: fs.readFileSync('./cert/localhost-key.pem'),
    cert: fs.readFileSync('./cert/localhost.pem')
}, app);
app.use(cors());

const io = new Server(httpsServer, {
    cors: {
        origin: ['http://localhost:3000', 'https://localhost:3000'],
        credentials: true,
        allowedHeaders: [
            "Content-type",
            "Accept"
        ]
    }
});

io.use(onAuthorization)
io.on("connection", onConnection);

httpsServer.listen(3443, () => console.log('Server is listening on port 3443'));


// kafka
const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"],
    ssl: false
});
const consumer = kafka.consumer({ groupId: "my-group" });
await consumer.connect();
await consumer.subscribe({
    topic: 'room-1',
    fromBeginning: false
});
await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        console.log("consummed message: ", message.value.toString());
    }
})
setInterval(async () => {
    console.log("producer is producing ...");
    const producer = kafka.producer();
    await producer.connect();
    await producer.send({
        topic: "room-1",
        messages: [
            { value: "Hi Kafka user !" }
        ]
    });
    await producer.disconnect();
}, 2000);