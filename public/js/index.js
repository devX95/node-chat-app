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
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    $('#messages').append(li);
});

// socket.emit('createMessage', {
//     from: "gibran",
//     text: "Hi"
// }, /*ACKNOWLEDGEMENT*/ function(data){
//     console.log('Received message', data);
// });

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function() {

    });
})