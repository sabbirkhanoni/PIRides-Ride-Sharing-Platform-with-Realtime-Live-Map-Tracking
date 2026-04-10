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
            console.log(`Join event - userId: ${userId}, userType: ${userType}`);

            try {
                if(userType === 'user'){
                    const updated = await userModel.findByIdAndUpdate(userId, 
                        {socketId: socket.id},
                        { new: true }
                    );
                    console.log(`✓ User ${userId} joined with socketId: ${socket.id}`, updated ? 'SUCCESS' : 'FAILED');
                }else if(userType === 'rider'){
                    const updated = await riderModel.findByIdAndUpdate(userId, 
                        {socketId: socket.id},
                        { new: true }
                    );
                    console.log(`✓ Rider ${userId} joined with socketId: ${socket.id}`, updated ? 'SUCCESS' : 'FAILED');
                    if(updated) {
                        console.log(`Rider location:`, updated.location);
                    }
                }
            } catch (error) {
                console.error(`Error in join event:`, error.message);
            }
        })

        //event
        socket.on('rider-location-update', async (data) => {
            const {userId, location} = data;

            if(!location || location.ltd === undefined || location.lng === undefined){
                console.error('Invalid location data:', location);
                return socket.emit('error', {
                    message: 'Invalid location data'
                })
            }

            try {
                console.log(`Updating rider ${userId} location:`, location);
                const updated = await riderModel.findByIdAndUpdate(
                    userId,
                    {
                        location: {
                            ltd: location.ltd,
                            lng: location.lng
                        }
                    },
                    { new: true }
                );
                
                if (updated) {
                    console.log(`✓ Rider ${userId} location updated successfully:`, updated.location);
                } else {
                    console.warn(`Rider ${userId} not found in database`);
                }
            } catch (error) {
                console.error(`Error updating rider location:`, error.message);
                socket.emit('error', {
                    message: 'Failed to update location'
                });
            }
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected from Socket.io');
        });
    });
}

    function sendMessageToSocketId(socketId, messageObject){
        if(!io){ 
            console.error("❌ Socket.io not initialized, cannot send message");
            return false;
        }

        if(!socketId){
            console.error("❌ No socketId provided to send message to");
            return false;
        }

        if(!messageObject || !messageObject.event){
            console.error("❌ Invalid message object:", messageObject);
            return false;
        }

        try {
            console.log('MessageObject' + JSON.stringify(messageObject));
            console.log(`📤 Sending event '${messageObject.event}' to socketId: ${socketId}`);
            console.log(`📦 Message data:`, messageObject.data);
            
            
            io.to(socketId).emit(messageObject.event, messageObject.data);
            
            console.log(`✅ Event '${messageObject.event}' emitted successfully to ${socketId}`);
            return true;
        } catch (error) {
            console.error(`❌ Error sending message to ${socketId}:`, error);
            return false;
        }
    }

export {initializeSocket, sendMessageToSocketId};