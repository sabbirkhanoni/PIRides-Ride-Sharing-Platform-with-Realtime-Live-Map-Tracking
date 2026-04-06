import { Server } from 'socket.io';
import userModel from "./models/user.model.js";
import riderModel from "./models/rider.model.js"

let io;

function initializeSocket(server){
    io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client is connected to Socket.io where socketID: ${socket.id}`);



        //event
        socket.on('join', async (data) => {
            const {userId, userType} = data;

            if(userType === 'user'){
                await userModel.findByIdAndUpdate(userId, 
                    {socketId: socket.id}
                );
            }else if(userType === 'rider'){
                await riderModel.findByIdAndUpdate(userId, 
                    {socketId : socket.id}
                );
            }
        })

        socket.on('disconnect', () => {
            console.log('Client disconnected from Socket.io');
        });
    });
}

function sendMessageToSocketId(socketId, message){
    if(io){ 
        io.to(socketId).emit('message', message);
    }else{
        console.log("Socket.io not initialized.");
    }
}

export {initializeSocket, sendMessageToSocketId};