import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import LoginPage from './pages/LoginPage';
import ChannelsPage from './pages/ChannelsPage';



function App() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (username === '') {
            navigate('/login');
        }
    }, [username, navigate]);

    return (
        <>
            <header>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                            >
                                <ChatBubbleOutlineIcon />
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                JS CoE WebSocket Experiment
                            </Typography>
                            <Typography>{username}</Typography>
                        </Toolbar>
                    </AppBar>
                </Box>
            </header>

            <main className="content">
                <Routes>
                    <Route exact path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<LoginPage setUsername={setUsername} />} />
                    <Route path="/channels/*" element={<ChannelsPage username={username} />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
        </>
    );
}

export default App;
