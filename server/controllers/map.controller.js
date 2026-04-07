import {getAddressCoordinate,getDistanceAndTime,getSuggestionsAddressService  } from "../services/map.services.js";
import riderModel from "../models/rider.model.js";

export const getCoordinatesController = async (request, response) => {
      const { address } = request.query;
    try {
        
        if (!address) {
            return response.status(400).json({
                message: 'Address query parameter is required',
                error: true,
                success: false
            });
        }

        const coordinates = await getAddressCoordinate(address);
        return response.status(200).json({
            message: 'Coordinates retrieved successfully',
            success: true,
            error: false,
            data: coordinates,
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

export const getDistanceTimeController = async (request, response) => {
    const { origin, destination } = request.query;
    try {
        if (!origin || !destination) {
            return response.status(400).json({
                message: 'Origin and destination query parameters are required',
                error: true,
                success: false
            });
        }

        const { distance, duration } = await getDistanceAndTime(origin, destination);
        return response.status(200).json({
            message: 'Distance and time retrieved successfully',
            success: true,
            error: false,
            data: { distance, duration }
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

export const getSuggestionsAddressController = async (request, response) => {
    try {
        const { input } = request.query;

        if (!input) {
            return response.status(400).json({
                message: 'Input query parameter is required',
                error: true,
                success: false
            });
        }

        const Suggestions = await getSuggestionsAddressService(input);
        
        console.log('Suggestions:', Suggestions);

        return response.status(200).json({
            message: 'Suggestions retrieved successfully',
            success: true,
            error: false,
            data: Suggestions,
        });

    } catch (error) {
        console.error('Suggestions error:', error);
        return response.status(500).json({
            message: 'Suggestions Internal server error',
            error: true,
            success: false,
            details: error.message
        });
    }
};



