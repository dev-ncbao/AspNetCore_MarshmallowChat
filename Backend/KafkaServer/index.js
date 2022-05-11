const express = require("express");
const app = express();
const cors = require("cors");
const fs = require('fs');
const { Server } = require("socket.io");
const { createServer } = require("https");
const {common} = require('./constants')
const { authorization: { onAuthorization } } = require('./middlewares')
const {
    registerChatHandler,
    registerRoomHandler
} = require('./events')
const { KafkaSession } = require('./kafka')

if (app.get(common.ENV) == common.DEVELOPMENT) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}


const onConnection = async (socket) => {
    console.warn(`connection from ${socket.id}`)
    const session = new KafkaSession(socket)
    await session.consumerConnect()
    await session.subcribeTopics()
    session.startConsume()
    
    registerChatHandler(io, socket, session)
    //registerRoomHandler(io, socket, session);
}

const httpsServer = createServer({
    key: fs.readFileSync(common.CERT.KEY),
    cert: fs.readFileSync(common.CERT.CERT)
}, app);
app.use(cors());

const io = new Server(httpsServer, {
    cors: {
        origin: common.ALLOW_ORIGINS,
        credentials: true,
        allowedHeaders: common.ALLOW_HEADERS
    }
});

io.use(onAuthorization)
io.on("connection", onConnection);

httpsServer.listen(common.SELF_PORT, () => console.log('Server is listening on port 3443'));


// kafka
/* const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"],
    ssl: false
});

async function consumer() {
    const consumer = kafka.consumer({ groupId: "MLC-ClientConsumer" });
    await consumer.connect();
    await consumer.subscribe({ topics: ['MLC-Topic1', 'MLC-Topic2'] });
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log("consummed message: ", message.value.toString());
        }
    })
}

consumer(); */
/* setInterval(async () => {
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
}, 2000); */