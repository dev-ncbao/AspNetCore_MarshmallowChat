const express = require("express");
const app = express();
const cors = require("cors");
const { Server } = require("socket.io");
const { createServer } = require("http");
const { Kafka } = require("kafkajs");
//
const server = createServer(app);
const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"],
    ssl: false
});
app.use(cors());
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

server.listen(3443, () => console.log('Node server is listen on port 3443'));

io.on("connection", async (socket) => {
    console.log("Has a connection at: " + socket.id);
    // kafka
    const consumer = kafka.consumer({groupId: "my-group"});
    await consumer.connect();
    await consumer.subscribe({
        topic: 'room-1',
        fromBeginning: false
    });
    await consumer.run({
        eachMessage: async ({topic, partition, message}) => {
            console.log("consummed message: ",message.value.toString());
        }
    })
    setInterval(async () => {
        console.log("producer is producing ...");
        const producer = kafka.producer();
        await producer.connect();
        await producer.send({
            topic: "room-1",
            messages: [
                {value: "Hi Kafka user !"}
            ]
        });
        await producer.disconnect();
    }, 2000);
});
