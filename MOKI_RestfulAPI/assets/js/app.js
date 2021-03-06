/**
 * app.js
 *
 * Front-end code and event handling for sailsChat
 *
 */





//var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJfaWQiOjIxNzMsInVzZXJfY29kZSI6IlNQUjAwMjE3MyIsInR5cGUiOiJTSE9QUEVSIn0sImlhdCI6MTUxMDU0NDM4NCwiZXhwIjoxNTE1NzI4Mzg0fQ.Dp3nXENHY6itEuLv87g97hKi0dRza3jp1ENpNaMcBvk';
var userAgent = navigator.userAgent;
// Attach a listener which fires when a connection is established:
var connect = false;
var token;
var rooms;
//io.sails.url = 'http://localhost:1337'
function updateToken() {
    token = $('#my-token').val();
    if (!connect) {
        //io.socket.on('connect', function socketConnected(a,b,c) {
            
            connect = true;
            // Show the main UI
            $('#disconnect').hide();
            $('#main').show();

            // Announce that a new user is online--in this somewhat contrived example,
            // this also causes the CREATION of the user, so each window/tab is a new user.
            io.socket.post("/userm/announce", {
                token: token,
                'user-agent': userAgent
            }, function (data) {
                
                window.me = data;
                updateMyName(data);

                io.socket.post("/api/get_list_conversation", {
                    token: token
                }, function (data) {
                    if(data.code==1000) {
                        rooms = data.data;

                        for(var i = 0; i < rooms.length; ++i) {
                            var room = rooms[i];
                            var Partner = room.Partner;
                            for(var j = 0; j < Partner.length; ++j) {
                                var p = Partner[j];
                                if(p.id == window.me.user_id) {
                                    p.status = 'online';
                                }
                            }
                        }

                        console.log(rooms)

                        updateRoomList(rooms)
                    }
                });

                // Get the current list of users online.  This will also subscribe us to
                // update and destroy events for the individual users.
                //io.socket.get('/userm', updateUserList);

                // Get the current list of chat rooms. This will also subscribe us to
                // update and destroy events for the individual rooms.
                //io.socket.get('/roomm', updateRoomList);
            });

            

            // Listen for the "room" event, which will be broadcast when something
            // happens to a room we're subscribed to.  See the "autosubscribe" attribute
            // of the Room model to see which messages will be broadcast by default
            // to subscribed sockets.
            // io.socket.on('roomm', function messageReceived(message) {
            //     console.log(message)
            // })
            // io.socket.on('roomm', function messageReceived(message) {
            //     console.log(message)
            //     switch (message.verb) {

            //         // Handle room creation
            //         case 'created':
            //             addRoom(message.data);
            //             break;

            //         // Handle a user joining a room
            //         case 'addedTo':
            //             // Post a message in the room
            //             postStatusMessage('room-messages-' + message.id, $('#user-' + message.addedId).text() + ' has joined');
            //             // Update the room user count
            //             increaseRoomCount(message.id);
            //             break;

            //         // Handle a user leaving a room
            //         case 'removedFrom':
            //             // Post a message in the room
            //             postStatusMessage('room-messages-' + message.id, $('#user-' + message.removedId).text() + ' has left');
            //             // Update the room user count
            //             decreaseRoomCount(message.id);
            //             break;

            //         // Handle a room being destroyed
            //         case 'destroyed':
            //             removeRoom(message.id);
            //             break;

            //         // Handle a public message in a room.  Only sockets subscribed to the "message" context of a
            //         // Room instance will get this message--see the "join" and "leave" methods of RoomController.js
            //         // to see where a socket gets subscribed to a Room instance's "message" context.
            //         case 'messaged':
            //             receiveRoomMessage(message.data);
            //             break;

            //         default:
            //             break;

            //     }

            // });

            // Listen for the "user" event, which will be broadcast when something
            // happens to a user we're subscribed to.  See the "autosubscribe" attribute
            // of the User model to see which messages will be broadcast by default
            // to subscribed sockets.
            io.socket.on('message', function messageReceived(message) {
                console.log(message)
                switch (message.type) {
                    case 'join':
                        //addUser(message.data);
                        break;
                
                    default:
                        break;
                }
            })
            // io.socket.on('userm', function messageReceived(message) {
            //     console.log(message)
            //     switch (message.verb) {

            //         // Handle user creation
            //         case 'created':
            //             addUser(message.data);
            //             break;

            //         // Handle a user changing their name
            //         case 'updated':

            //             // Get the user's old name by finding the <option> in the list with their ID
            //             // and getting its text.
            //             var oldName = $('#user-' + message.id).text();

            //             // Update the name in the user select list
            //             $('#user-' + message.id).text(message.data.name);

            //             // If we have a private convo with them, update the name there and post a status message in the chat.
            //             if ($('#private-username-' + message.id).length) {
            //                 $('#private-username-' + message.id).html(message.data.name);
            //                 postStatusMessage('private-messages-' + message.id, oldName + ' has changed their name to ' + message.data.name);
            //             }

            //             break;

            //         // Handle user destruction
            //         case 'destroyed':
            //             removeUser(message.id);
            //             break;

            //         // Handle private messages.  Only sockets subscribed to the "message" context of a
            //         // User instance will get this message--see the onConnect logic in config/sockets.js
            //         // to see where a new user gets subscribed to their own "message" context
            //         case 'messaged':
            //             receivePrivateMessage(message.data);
            //             break;

            //         default:
            //             break;
            //     }

            // });

            // Add a click handler for the "Update name" button, allowing the user to update their name.
            // updateName() is defined in user.js.
            $('#update-name').click(updateName);

            // Add a click handler for the "Send private message" button
            // startPrivateConversation() is defined in private_message.js.
            $('#private-msg-button').click(startPrivateConversation);

            // Add a click handler for the "Join room" button
            // joinRoom() is defined in public_message.js.
            $('#join-room').click(joinRoom);

            // Add a click handler for the "New room" button
            // newRoom() is defined in room.js.
            $('#new-room').click(newRoom);

            console.log('Socket is now connected!');

            // When the socket disconnects, hide the UI until we reconnect.
            io.socket.on('disconnect', function () {
                // Hide the main UI
                $('#main').hide();
                $('#disconnect').show();
            });

       //});
    }
}


