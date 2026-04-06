import http from 'http';
import app from './app.js';
import {initializeSocket} from './socketio.js';

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

initializeSocket(server);


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})