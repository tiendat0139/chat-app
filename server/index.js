const express = require('express')
var cors = require('cors')
const app = express()
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET',"POST"],
    credentials: true
}))
const http = require('http');
const {Server} = require('socket.io')

const {users, addUsers, getUser, removeUsers, getUserInRoom} = require('./users.js')
const server = http.createServer(app);

const io = new Server(server,{
    cors: {
        origin: "http://localhost:3000",
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
})


app.get('/users',(req, res) => {
    res.send({users})
})

io.on('connection', (socket) => {
    console.log('A new user connection !');

    socket.on('join', ({name,roomId}, callback) => {
        const {error, user} =  addUsers({id : socket.id, name, roomId})
        if(error) return callback(error)
        socket.join(user.roomId)
        socket.emit('message',{user: 'admin', text: `${user.name}, Welcome to ${user.roomId}`})
        socket.broadcast.to(user.roomId).emit('message',{user: 'admin', text: `${user.name} has joined`})
    })

    socket.on('sendMessage',  (message, callback) => {
        try {
            const user = getUser(socket.id) 
            io.to(user.roomId).emit('message',{user: user.name, text: message}) 
            callback()
        } catch (error) {
            callback("Cannot send Message")
        }
    })

    socket.on('disconnect',() => { 
        const user = removeUsers(socket.id) 
        console.log(`${user.name} had left`);
    })
 
})

server.listen(3001, () => console.log("Server running on port 3001"));

