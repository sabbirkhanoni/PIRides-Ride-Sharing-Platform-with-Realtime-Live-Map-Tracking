import journeyModel from "../models/journey.model.js";
import { getDistanceAndTime } from "./map.services.js";
import calculateMoneyPayable from "../payment/utils/moneyCalculation.js";
import generateOTP from "../utils/journeyOTP.js";

export const journeyStartService = async (
    {user, origin, destination, vehicleType}) => {

    if(!user || !origin || !destination || !vehicleType) {
        throw new Error("All fields are required to start a journey Services");
    }

    const moneyPayable = await calculateMoneyPayable(origin, destination);

    console.log("Money Payable: ", moneyPayable);

    
    const journey = journeyModel({
        user,
        origin,
        destination,
        otp: generateOTP(6),
        moneyPayable: moneyPayable[vehicleType]
    });

    await journey.save();

    return journey;
};

export const confirmJourneyService = async ({journeyId, riderId}) => {
    if(!journeyId || !riderId) {
        throw new Error("Journey ID and Rider ID are required to confirm a journey");
    }
    const updateResult = await journeyModel.findByIdAndUpdate(
        journeyId,
        { 
            status: "accepted",
            rider: riderId
        },
        { new: true }
    ).populate({
        path: 'user',
        select: 'fullname email socketId' 
    });


    if(!updateResult) {
        throw new Error(`Journey with ID ${journeyId} not found for update`);
    }

    console.log('Journey populated with user:', { 
        journeyId: updateResult._id, 
        userId: updateResult.user?._id, 
        userSocketId: updateResult.user?.socketId,
        status: updateResult.status,
        rider: updateResult.rider
    });

    if(!updateResult.user) {
        throw new Error("Journey user not found or not populated");
    }

    if(!updateResult.user.socketId) {
        console.warn('User has no socketId - user may not be connected to socket.io');
    }

    return updateResult;
}
