module.exports = (io, socket) => {
    const chatTo = ({roomId, message}) => {
        console.log(`${socket.id} has sent ${message} to ${roomId}`)
        socket.to(roomId).emit('chat:receive', {roomId, message})
    }

    socket.on('chat:to-room', chatTo)
}