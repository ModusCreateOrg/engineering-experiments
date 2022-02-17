import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import SocketContext from '../socket';


const LoginPage = ({ setUsername }) => {
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const socket = useContext(SocketContext);

    const submit = (e) => {
        e.preventDefault();
        setUsername(name);

        // emitting a join event
        socket.emit('join', { name: name });
        navigate('/channels/general');
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%'
        }}>
            <form onSubmit={submit}>
                <Card sx={{ width: 345, padding: '20px' }}>
                    <CardContent>
                        <Typography sx={{ marginBottom: '10px' }}
                                    variant="h5"
                                    component="div">
                            Join the Chat
                        </Typography>
                        <TextField label="Username"
                                   sx={{ width: '100%', marginBottom: '10px' }}
                                   value={name}
                                   onChange={(e) => setName(e.target.value)}
                                   variant="standard" />
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'center' }}>
                        <Button size="medium"
                                type="submit"
                                disabled={name === ''}
                                variant="contained">Login</Button>
                    </CardActions>
                </Card>
            </form>
        </div>
    );
};

export default LoginPage;
