import { useRef, useState } from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';

import Message from './Message';

const Chat = ({ messages, postMessage }) => {
    const [message, setMessage] = useState('');
    const messagesRef = useRef(null);

    const submit = (e) => {
        e.preventDefault();

        postMessage(message);
        setMessage('');

        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    };

    return (
        <Card sx={{
            width: 800,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '25px',
            margin: '0 auto'
        }}>
            <CardContent ref={messagesRef} sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                overflow: 'auto'
            }}>
                {messages.map((message, index) => {
                    return <Message message={message} key={index} />;
                })}
            </CardContent>
            <CardActions sx={{ marginTop: 'auto', width: '100%' }}>
                <form onSubmit={submit} style={{ width: '100%', display: 'flex' }}>
                    <TextField sx={{ width: '100%' }}
                               value={message}
                               onChange={(e) => setMessage(e.target.value)}
                               label="Message..."
                               variant="standard" />
                    <Button sx={{ marginLeft: '20px', width: '100px' }}
                            size="small"
                            type="submit"
                            disabled={message === ''}
                            variant="contained">Send</Button>
                </form>
            </CardActions>
        </Card>
    );
};

export default Chat;
