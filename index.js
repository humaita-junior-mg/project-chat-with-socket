const express = require('express')
const app = express()
const path = require('path')
const socketIO = require('socket.io')


app.use('/', express.static(path.join(__dirname, 'public')))

const messages = []

const server = app.listen(3000, ()=>{
    console.log('Server Running...')
})

const io = socketIO(server)

io.on('connection', (socket)=>{
    io.emit('all_messages', {docs: messages})

    socket.on('message_front_end', (doc)=>{
        messages.push(doc.msg)

        io.emit('all_messages', {docs: messages})
    })
})