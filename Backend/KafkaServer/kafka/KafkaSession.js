const { Kafka } = require("kafkajs");
const {
    kafka: {
        CLIENT_ID_PREFIX, BROKER_URL, CLIENT_GROUP_PREFIX
    },
    cookie: { USER_ID }
} = require('./../constants')

class KafkaSession {
    constructor(socket) {
        this.socket = socket
        const kafka = new Kafka({
            clientId: `${CLIENT_ID_PREFIX}${this.socket.user[USER_ID]}`,
            brokers: BROKER_URL
        })
        this.consumer = kafka.consumer({
            groupId: `${CLIENT_GROUP_PREFIX}${this.socket.user[USER_ID]}`,
            /* allowAutoTopicCreation: false */
        })
        this.producer = kafka.producer({
            /* allowAutoTopicCreation: false */
        })
    }

    async startConsume() {
        console.log('start consume', this.socket.id)
        await this.consumer.run({
            partitionsConsumedConcurrently: 3,
            autoCommit: false,
            eachMessage: async ({ topic, partition, message }) => {
                const parseMessage = JSON.parse(message.value.toString())
                /* console.log(message) */
                parseMessage.MessageId = message.offset
                const serializeMessage = JSON.stringify(parseMessage)
                /* console.log(serializeMessage) */
                this.socket.emit('chat:receive', serializeMessage)
                console.log({
                    annouce: this.socket.id,
                    message: serializeMessage
                })
                const topicPartitionOffsets = [
                    { topic: topic, partition: partition, offset: Number.parseInt(message.offset) + 1 }
                ]
                /* console.log(topicPartitionOffsets) */
                await this.consumer.commitOffsets(topicPartitionOffsets)
            }
        })
    }

    async subcribeTopics() {
        /* console.log(this.socket.id, this.socket.topic) */
        await this.consumer.subscribe({
            topics: this.socket.topic,
            fromBeginning: false
        })
    }

    async stopConsume() {
        await this.consumer.stop()
    }

    async produce(topicMessage/*  = {topic: '', messages: []} */) {
        await this.producer.send(topicMessage)
    }

    async consumerConnect() {
        await this.consumer.connect()
    }

    async producerConnect() {
        await this.producer.connect()
    }

    async consumerDisconnect() {
        await this.consumer.disconnect()
    }

    async producerDisconnect() {
        await this.producer.disconnect()
    }
}

module.exports = {
    KafkaSession
}