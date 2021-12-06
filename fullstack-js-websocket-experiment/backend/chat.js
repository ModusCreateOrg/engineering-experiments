// logged in users
const members = [];

// test messages
const messages = {
    general: [
        { message: 'This is a pre generated message', name: 'System Message' },
        { message: 'For the #general channel', name: 'System Message' },
        { message: 'To test', name: 'System Message' },
        { message: 'Fetching previous messages', name: 'System Message' },
        { message: 'Upon joining a channel', name: 'System Message' }
    ],
    random: [
        { message: 'This message', name: 'System Message' },
        { message: 'Will only show up', name: 'System Message' },
        { message: 'In the #random channel', name: 'System Message' },
        { message: 'But not in #general', name: 'System Message' }
    ]
};

// socket - connection from one browser to the server
// io - server object, knows about all open connections
// broadcasting - send everybody except me
//              - socket.broadcast.emit

// rooms - socket.join('room')
// emit to room - io.to('room').emit('event', 'To the room')
class Connection {
    constructor(io, socket) {
        this.io = io;
        this.socket = socket;

        this.socket.on('join', this.join);
        this.socket.on('room.join', this.joinRoom);
        this.socket.on('room.leave', this.leaveRoom);
        this.socket.on('room.getMessages', this.getRoomMessages);
        this.socket.on('room.message', this.sendMessageToRoom);
        this.socket.once('disconnect', this.disconnect);
    }

    // joining the chat
    join = (payload) => {
        const name = payload.name;

        members.push({
            id: this.socket.id,
            name: name
        });

        console.log(`${name}  has joined the chat`);
        this.socket.broadcast.emit('system.message', {
            message: name + ' has joined the chat',
            name: 'System Message'
        });
    };

    // joining a room
    joinRoom = (room) => {
        this.socket.join(room);
        console.log('rooms', this.socket.rooms);
    };

    // leaving a room
    leaveRoom = (room) => {
        this.socket.leave(room);
        console.log('rooms', this.socket.rooms);
    };

    // fetch messages for room
    getRoomMessages = (room) => {
        console.log('loading messages for ', room);
        this.socket.emit(room, messages[room] || []);
    };

    // send message to room
    sendMessageToRoom = (payload) => {
        const room = payload.room;
        const message = payload.message;

        if (!messages[room]) {
            messages[room] = [message];
        } else {
            messages[room].push(message);
        }

        // emit message to the room only
        this.io.to(room).emit(room, message);
    };

    // leaving the chat
    disconnect = () => {
        const index = members.findIndex(m => m.id === this.socket.id);

        if (index !== -1) {
            console.log(`${members[index].name} left the chat`);

            this.socket.broadcast.emit('system.message', {
                message: members[index].name + ' left the chat',
                name: 'System Message'
            });
            members.splice(index, 1);

            this.socket.off('join', this.join);
            this.socket.off('room.join', this.joinRoom);
            this.socket.off('room.leave', this.leaveRoom);
            this.socket.off('room.getMessages', this.getRoomMessages);
            this.socket.off('room.message', this.sendMessageToRoom);

            this.socket.disconnect();
        }
    };
}

function chatServer(io) {
    io.on('connection', (socket) => {
        console.log('process ID ', process.pid);
        new Connection(io, socket);
    });
}

module.exports = chatServer;
