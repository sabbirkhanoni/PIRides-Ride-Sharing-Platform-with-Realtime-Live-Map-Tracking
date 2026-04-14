import journeyModel from "../models/journey.model.js";
import calculateMoneyPayable from "../payment/utils/moneyCalculation.js";
import { journeyStartService, confirmJourneyService } from "../services/journey.services.js";
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
        const riderInRadius = await getAllRiderInAreaRadiusService(pickupCoordinates.lat, pickupCoordinates.lng, 10); // 10 km radius

        journey.otp = "";

        const journeyData = await journeyModel.findById(journey._id).populate('user');

        // Notify riders in radius about new journey request
        if (riderInRadius && riderInRadius.length > 0) {
            riderInRadius.forEach(rider => {
                if (rider.socketId) {
                    sendMessageToSocketId(rider.socketId, {
                        event: 'new-journey-request',
                        data: journeyData
                    });
                }
            });
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

export const confirmJourneyByRiderController = async (request,response) => {
    const { journeyId } = request.body;
    try {
        if(!journeyId) {
            return response.status(400).json({
                message: 'Journey ID is required',
                error: true,
                success: false
            });
        }
        const journey = await confirmJourneyService({journeyId, riderId: request.rider._id});

        if(!journey) {
            return response.status(400).json({
                message: 'Journey not found',
                error: true,
                success: false
            });
        }

        if(!journey.user) {
            console.warn('⚠️ Journey user not populated');
            return response.status(400).json({
                message: 'Journey user details not found',
                error: true,
                success: false
            });
        }

        if(journey.user.socketId) {
            sendMessageToSocketId(journey.user.socketId, {
                event: 'journey-confirmed',
                data: journey
            });
        }

        return response.status(200).json({
            message: 'Journey Confirmed By a Rider',
            error:false,
            success: true,
            data: journey
        });
        
    } catch (error) {
        return response.status(500).json({
            message: 'Internal Server Error',
            error: true,
            success: false,
            details: error.message
        });
    }
}








