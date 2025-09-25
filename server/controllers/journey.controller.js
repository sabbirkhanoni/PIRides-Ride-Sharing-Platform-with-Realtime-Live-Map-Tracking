import { journeyStartService } from "../services/journey.services.js";

export const journeyStartController = async(request, response) => {
    const { origin, destination, vehicleType } = request.body;

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

        return response.status(201).json({
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


