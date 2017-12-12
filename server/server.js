const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;
var app = express();
//CREATE A SERVER FROM THE APP TO USE SOCKET IO
var server = http.createServer(app);
// CREATE A NEW SOCKET
var io = socketIO(server);

app.use(express.static(publicPath));

// EVENT LISTENER TO LISTEN TO CONNECTION
io.on('connection', (socket) => {
    console.log('New user connected');
    
    // // EMITTING A CUSTOM EVENT FROM THE SERVER
    // socket.emit('newMessage', {
    //     from: 'gibran',
    //     text: "Hey lets meet at 6",
    //     createAt: new Date().toDateString()
    // });

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage',generateMessage('Admin', 'New User Joined'));

    // LISTENING TO A CUSTOM EVENT
    socket.on('createMessage', (newMessage) => {
        console.log(newMessage);
        // GOES TO EVERYONE
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));

        //client doesnt recive the message
        // socket.broadcast.emit('newMessage', {
        //     from: newMessage.from,
        //     text: newMessage.text,
        //     createdAt: new Date().getTime()
        // });
    });

    // EVENT LISTENER TO CHECK FOR DISCONNECTION
    socket.on('disconnect', (socket) => {
        console.log('User Disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on port: ${port}`);
});