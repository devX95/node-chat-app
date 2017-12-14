const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;
var app = express();
//CREATE A SERVER FROM THE APP TO USE SOCKET IO
var server = http.createServer(app);
// CREATE A NEW SOCKET
var io = socketIO(server);
var users = new Users();

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

    socket.on('join', (params, callback)=> {
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room name are required');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUsersList', users.getUserList(params.room));
        //Goes to specific user
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        //Goes to every connected user
        socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin', `${params.name} has Joined`));

        callback();
    });

    // LISTENING TO A CUSTOM EVENT
    socket.on('createMessage', (newMessage, callback) => {
        // console.log(newMessage);
        // GOES TO EVERYONE
        // io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));

        var user = users.getUser(socket.id);
        if(user && isRealString(newMessage.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, newMessage.text));
        }
        
        callback();

        //client doesnt recive the message
        // socket.broadcast.emit('newMessage', {
        //     from: newMessage.from,
        //     text: newMessage.text,
        //     createdAt: new Date().getTime()
        // });
    });

    // EVENT LISTENER TO CHECK FOR DISCONNECTION
    socket.on('disconnect', () => {
        console.log('User Disconnected');
        var user = users.removeUser(socket.id);
        if(user) {
            io.to(user.room).emit('updateUsersList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
        }
    });
});

server.listen(port, () => {
    console.log(`Server is up on port: ${port}`);
});