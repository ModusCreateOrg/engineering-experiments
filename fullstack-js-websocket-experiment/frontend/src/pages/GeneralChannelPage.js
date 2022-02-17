import { useState, useEffect, useContext } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chat from '../components/Chat';
import SocketContext from '../socket';

const GeneralChannelPage = ({ username }) => {
    const CHANNEL_NAME = 'general';
    const [messages, setMessages] = useState([{ message: 'You\'re at #general', name: 'System Message' }]);
    const socket = useContext(SocketContext);

    useEffect(() => {
        // joining the #general room
        socket.emit('room.join', CHANNEL_NAME);
        // fetching previous messages
        socket.emit('room.getMessages', CHANNEL_NAME);

        socket.on('system.message', newMessageHandler);
        socket.on(CHANNEL_NAME, newMessageHandler);

        return () => {
            // unregistering socket listeners
            socket.off('system.message', newMessageHandler);
            socket.off(CHANNEL_NAME, newMessageHandler);

            // leaving the room
            socket.emit('room.leave', CHANNEL_NAME);
        };
    }, [socket]);

    // receiving new message/messages
    const newMessageHandler = (message) => {
        if (Array.isArray(message)) {
            setMessages((oldMessages) => [...oldMessages, ...message]);
        } else {
            setMessages((oldMessages) => [...oldMessages, message]);
        }
    };

    // posting a new message
    const postMessage = (messageText) => {
        const message = { message: messageText, name: username };

        socket.emit('room.message', {
            room: CHANNEL_NAME,
            message: message
        });
    };

    return (
        <Box sx={{ width: '100%', height: '100%', padding: '20px' }}>
            <Typography variant="h6" gutterBottom component="div">
                Welcome to #general
            </Typography>

            <Chat messages={messages} postMessage={postMessage} />
        </Box>
    );
}

export default GeneralChannelPage;
