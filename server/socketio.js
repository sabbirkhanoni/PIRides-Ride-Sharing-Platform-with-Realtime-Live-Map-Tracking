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

        //event
        socket.on('rider-location-update', async (data) => {
            const {userId, location} = data;

            if(!location || !location.ltd || !location.lng){
                return socket.emit('error', {
                    message: 'Invalid location data'
                })
            }

            await riderModel.findByIdAndUpdate(userId,{
                location: {
                    ltd: location.ltd,
                    lng: location.lng
                }
            })
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected from Socket.io');
        });
    });
}

    function sendMessageToSocketId(socketId, messageObject){
        if(io){ 
            io.to(socketId).emit(messageObject.event, messageObject.data);
        }else{
            console.log("Socket.io not initialized.");
        }
    }

export {initializeSocket, sendMessageToSocketId};