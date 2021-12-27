import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { io } from 'socket.io-client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import SocketContext from './socket';

const WEBSOCKET_URL = 'http://localhost:8080';

const socket = io(WEBSOCKET_URL,{
   "transports": ['websocket']
});

ReactDOM.render(
    <React.StrictMode>
        <SocketContext.Provider value={socket}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </SocketContext.Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
