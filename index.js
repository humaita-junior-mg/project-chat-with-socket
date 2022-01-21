const express = require('express')
const app = express()
const path = require('path')
const socketIO = require('socket.io')

app.use('/grupo1', express.static(path.join(__dirname, 'public')))
app.use('/grupo2', express.static(path.join(__dirname, 'public')))

const server = app.listen(3000, ()=>{
    console.log('Server Running...')
})

const io = socketIO(server)

const messages = {grupo1: [], grupo2: []}

const grupo1 = io.of('/grupo1').on('connection', (socket)=>{

    socket.emit('array_msgs', {array: messages.grupo1})
    
    socket.on('send_msg', (msg)=>{
    
        messages.grupo1.push(msg)

        grupo1.emit('array_msgs', {array: messages.grupo1})

    })

})

const grupo2 = io.of('/grupo2').on('connection', (socket)=>{

    socket.emit('array_msgs', {array: messages.grupo2})
    
    socket.on('send_msg', (msg)=>{
    
        messages.grupo2.push(msg)

        grupo2.emit('array_msgs', {array: messages.grupo2})
        
    })

})

