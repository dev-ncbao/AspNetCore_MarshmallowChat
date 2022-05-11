module.exports = (io, socket, session) => {
    const receive = async (message) => {

        const topicMessage = {
            topic: `MLC-Topic${message.RoomId}`,
            messages: [{ key: message.UserId + '', value: JSON.stringify(message) }]
        }
        await session.producerConnect()
        await session.produce(topicMessage)
        await session.producerDisconnect()
    }
    const disconnect = async (reason) => {
        console.error(socket.id, reason)
        await session.stopConsume()
        await session.consumerDisconnect()
        socket.disconnect(true)
    }

    socket.on('disconnect', disconnect)
    socket.on('chat:receive', receive)
}