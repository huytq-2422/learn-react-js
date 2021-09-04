// Add a new room to the list
function newRoom() {

    // Prompt the user for the name of the new room
    var roomName = prompt('Please enter a name for the new room');

    // As long as a name is entered, create the new room.
    if (roomName) {
        io.socket.post('/roomm', { name: roomName }, function (data) {

            // Add the new room to the rooms list
            addRoom(data);

            // Select it in the list
            $('#rooms-list').val(data.id);

            // Create the room HTML
            createPublicRoom({ id: data.id, name: data.name });

            // Join the room
            io.socket.post('/roomm/' + data.id + '/users', { id: window.me.id });

            // Set the room user count to 1
            increaseRoomCount(data.id);

        });
    }

}

// Add a room to the list of available rooms to join--this can happen
// via newRoom (if the user created the room themself) or after a notification
// from the server that another user added a room.
function addRoom(room) {

    // Get a handle to the room list <select> element
    var select = $('#rooms-list');

    // Create a new <option> for the <select> with the new room's information
    //var users = room.users || [];
    //var numUsers = users.length;
    var option = $('<option id="' + "room-" + room.id + '" data-name="' + room.Product.name + '" value="' + room.id + '" onClick="chooseRoom(' + room.id + ')">' + room.Product.name + ' (' + room.LastMessage.message + ')</option>');

    // Add the new <option> element
    select.append(option);
}

function chooseRoom(id) {

    var select = $('#users-list');

    Array.from(select.children()).forEach(function (el) {
        el.remove();
    })

    var room = rooms.find(function (room) {
        return room.id == id;
    })

    room.Members.forEach(function (user) {
        addUser(user)
    })


    var roomName = 'public-room-' + room.id;

    // If HTML for the room already exists, return.
    if ($('#' + roomName).length) {
        return;
    }

    io.socket.post("/api/get_conversation", {
        token: token,
        conversation_id: room.id
    }, function (data) {
        if (data.code == 1000) {
            rooms = data.data;

            for (var i = 0; i < rooms.length; ++i) {
                var room = rooms[i];
                var Members = room.Members;
                for (var j = 0; j < Members.length; ++j) {
                    var p = Members[j];
                    if (p.id == window.me.user_id) {
                        p.status = 'online';
                    }
                }
            }

            console.log(rooms)

            updateRoomList(rooms)
        }
    });






    // Create a new div to contain the room
    var roomDiv = $('<div id="' + roomName + '"></div>');

    // Create the HTML for the room
    var roomHTML = '<h2>Chat room &ldquo;' + room.Product.name + '&rdquo; </h2>\n' +
        '<div id="room-messages-' + room.id + '" style="width: 50%; height: 150px; overflow: auto; border: solid 1px #666; padding: 5px; margin: 5px"></div>' +
        '<input id="room-message-' + room.id + '"/> <button id="room-button-' + room.id + '" onClick="chooseRoom(' + room.id + ')">Send message</button">';

    roomDiv.html(roomHTML);

    // Add the room to the private conversation area
    Array.from($('#rooms').children()).forEach(function (el) {
        el.remove();
    })

    $('#rooms').append(roomDiv);

}

// Increase the "number of users in room" indicator label for a room
function increaseRoomCount(roomId) {
    var room = $('#room-' + roomId);
    var numUsers = parseInt(room.attr('data-users'), 10);
    numUsers++;
    room.attr('data-users', numUsers);
    room.html(room.attr('data-name') + ' (' + numUsers + ')');
}

// Decrease the "number of users in room" indicator label for a room
function decreaseRoomCount(roomId) {
    var room = $('#room-' + roomId);
    var numUsers = parseInt(room.attr('data-users'), 10);
    numUsers--;
    room.attr('data-users', numUsers);
    room.html(room.attr('data-name') + ' (' + numUsers + ')');
}

// Remove a user from the list of available rooms to join, by sending
// either a room object or a room ID.
function removeRoom(room) {

    // Get the room's ID
    var id = room.id || room;
    $('#room-' + id).remove();
}

// Add multiple rooms to the rooms list.
function updateRoomList(rooms) {
    rooms.forEach(function (room) {
        addRoom(room);
    });
}
