
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
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = $('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);
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

    var messageTextBox = $('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function() {
        messageTextBox.val('');
    });
});

var locationButton = $('#send-location');

locationButton.on('click', function(e) {
    if (!navigator.geolocation){
        return alert('Geolocation not supported by your browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position);
        locationButton.removeAttr('disabled').text('Send Location');
    }, function(error){
        alert(`Unable to fetch location: ${error.message}`);
        locationButton.removeAttr('disabled').text('Send Location');
    });
});