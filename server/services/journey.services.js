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

    await riderModel.findOneAndUpdate({ _id: riderId },
         { 
            status: "accepted",
            rider: riderId
          } 
        );
    const journey = await journeyModel.findOne({
        _id: journeyId,
    }).populate('user');

    if(!journey) {
        throw new Error("Journey not found");
    }

    return journey;
}
