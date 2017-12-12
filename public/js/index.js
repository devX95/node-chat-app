// CONNECT TO SOCKET
var socket = io();
// CONNECTION LISTENER
socket.on('connect', () => {
    console.log('Connected to server');

    // EMITTING A CUSTOM EVENT FROM THE CLIENT
    // socket.emit('createMessage', {
    //     to: "gibran",
    //     text: "No"
    // });
});
    socket.on('disconnect', () => {
        console.log('Disconnect from server');
});

// LISTENING TO A CUSTOM EVENT
socket.on('newMessage', function(message) {
    console.log("New message: ", message);
});