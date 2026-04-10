import calculateMoneyPayable from "../payment/utils/moneyCalculation.js";
import { journeyStartService } from "../services/journey.services.js";
import { getAddressCoordinate, getAllRiderInAreaRadiusService } from "../services/map.services.js";
import { sendMessageToSocketId } from "../socketio.js";

export const journeyStartController = async(request, response) => {
    const {userId, origin, destination, vehicleType } = request.body;

    try {

        if (!origin || !destination || !vehicleType) {
            return response.status(400).json({
                message: 'Origin, destination, and vehicleType are required',
                error: true,
                success: false
            });
        }

        if (!request.user || !request.user._id) {
            return response.status(401).json({
                message: 'User authentication required',
                error: true,
                success: false
            });
        }

        //services
        const journey = await journeyStartService({
            user: request.user._id, 
            origin, 
            destination, 
            vehicleType
        });
        
        const pickupCoordinates = await getAddressCoordinate(origin);
        console.log('📍 Pickup coordinates:', pickupCoordinates);
        
        const riderInRadius = await getAllRiderInAreaRadiusService(pickupCoordinates.lat, pickupCoordinates.lng, 10); // 10 km radius
        console.log(`\n🔍 Journey ${journey._id} - Found ${riderInRadius.length} riders in radius\n`);

        journey.otp = "";

        // Notify riders in radius about new journey request
        if (riderInRadius && riderInRadius.length > 0) {
            riderInRadius.forEach(rider => {
                console.log(`📤 Sending journey request to rider ${rider._id} with socketId: ${rider.socketId}`);
                if (rider.socketId) {
                    sendMessageToSocketId(rider.socketId, {
                        event: 'new-journey-request',
                        data: {
                            journeyId: journey._id,
                            userId: request.user._id,
                            origin: journey.origin,
                            destination: journey.destination,
                            moneyPayable: journey.moneyPayable,
                            vehicleType: vehicleType,
                            otp: journey.otp
                        }
                    });
                } else {
                    console.warn(`⚠️  Rider ${rider._id} has no socketId`);
                }
            });
        } else {
            console.warn('⚠️  No riders found in radius to notify');
        }

        return response.status(200).json({
            message: 'Journey started successfully',
            error: false,
            success: true,
            data: journey
        });


    } catch (error) {
        return response.status(500).json({
            message: 'Internal server error',
            error: true,
            success: false,
            details: error.message
        });
    }
};

export const getJourneyDetailsController = async (request, response) => {
    const { origin, destination } = request.query;
    try {

        if (!origin || !destination) {
            return response.status(400).json({
                message: 'Origin and destination query parameters are required',
                error: true,
                success: false
            });
        }
        if (!request.user || !request.user._id) {
            return response.status(401).json({
                message: 'User authentication required',
                error: true,
                success: false
            });
        }

        const journeyDetails = await calculateMoneyPayable(origin, destination);
        
        return response.status(200).json({
            message: 'Journey details fetched successfully',
            error: false,
            success: true,
            data: journeyDetails
        });

    } catch (error) {
        return response.status(500).json({
            message: 'Internal server error',
            error: true,
            success: false,
            details: error.message
        });
    }
};








