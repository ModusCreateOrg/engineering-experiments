const { LocalStorage } = require('node-localstorage');

// logged in users
const membersDB = new LocalStorage('./members');
// messages
const messagesDB = new LocalStorage('./messages');

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

    loadMembers = () => {
        return JSON.parse(membersDB.getItem('members') || '[]');
    };

    saveMembers = (members) => {
        membersDB.setItem('members', JSON.stringify(members));
    };

    loadMessages = () => {
        return JSON.parse(messagesDB.getItem('messages') || '{}');
    };

    saveMessages = (messages) => {
        messagesDB.setItem('messages', JSON.stringify(messages));
    };

    // joining the chat
    join = (payload) => {
        const name = payload.name;
        let members = this.loadMembers();

        this.saveMembers([
            ...members,
            { id: this.socket.id, name: name }
        ]);

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
        const messages = this.loadMessages();
        console.log(messages);
        console.log(messages[room]);
        this.socket.emit(room, messages[room] || []);
    };

    // send message to room
    sendMessageToRoom = (payload) => {
        const room = payload.room;
        const message = payload.message;
        const messages = this.loadMessages();

        if (!messages[room]) {
            messages[room] = [message];
        } else {
            messages[room].push(message);
        }

        this.saveMessages(messages);

        // emit message to the room only
        this.io.to(room).emit(room, message);
    };

    // leaving the chat
    disconnect = () => {
        let members = this.loadMembers();
        const index = members.findIndex(m => m.id === this.socket.id);

        if (index !== -1) {
            console.log(`${members[index].name} left the chat`);

            this.socket.broadcast.emit('system.message', {
                message: members[index].name + ' left the chat',
                name: 'System Message'
            });

            members.splice(index, 1);
            this.saveMembers(members);

            // this.socket.off('join', this.join);
            // this.socket.off('room.join', this.joinRoom);
            // this.socket.off('room.leave', this.leaveRoom);
            // this.socket.off('room.getMessages', this.getRoomMessages);
            // this.socket.off('room.message', this.sendMessageToRoom);
            this.socket.removeAllListeners();
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
