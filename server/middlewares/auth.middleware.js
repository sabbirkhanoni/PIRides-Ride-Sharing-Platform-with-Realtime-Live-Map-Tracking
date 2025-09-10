import dotenv from 'dotenv';
dotenv.config();

import userModel from "../models/user.model.js";
import riderModel from "../models/rider.model.js";

import jwt from 'jsonwebtoken';
import BlacklistToken from '../utils/blacklistToken.utilsModel.js';

export const authUserMiddleware = async (request, response, next) => {
    try {
        let token = request.cookies.token || request.headers.authorization;
        // Extract token from 'Bearer <token>' if present
        if (token && token.startsWith('Bearer ')) {
            token = token.split(' ')[1];
        }
        
        if (!token) {
            return response.status(401).json({
                message: 'Access denied from Auth Middleware. No token found.',
                error: true,
                success: false
            });
        }

        // Check if token is blacklisted (correct collection)
        const isBlacklisted = await BlacklistToken.findOne({ token: token });
        if(isBlacklisted) {
            return response.status(401).json({
                message: 'Unauthorized Access. Token is blacklisted.',
                error: true,
                success: false
            });
        }   


        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return response.status(401).json({
                message: 'Access denied from Auth Middleware. Invalid token.',
                error: true,
                success: false
            });
        }
        const validUser = await userModel.findById(decoded._id).select('-password');
        if (!validUser) {
            return response.status(401).json({
                message: 'Access denied from Auth Middleware. User not found.',
                error: true,
                success: false
            });
        }
        request.user = validUser;
        next();
    } catch (error) {
        return response.status(500).json({
            message: 'Internal server error from Auth Middleware',
            error: true,
            success: false
        });
    }
}

export const authRiderMiddleware = async (request, response, next) => {
    try {
        let token = request.cookies.token || request.headers.authorization;
        // Extract token from 'Bearer
        if (token && token.startsWith('Bearer ')) {
            token = token.split(' ')[1];
        }
        if (!token) {
            return response.status(401).json({
                message: 'Access denied from Rider Auth Middleware. No token found.',
                error: true,
                success: false
            });
        }

        // Check if token is blacklisted (correct collection)
        const isBlacklisted = await BlacklistToken.findOne({ token: token });
        if(isBlacklisted) {
            return response.status(401).json({
                message: 'Unauthorized Access in Rider. Token is blacklisted.',
                error: true,
                success: false
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return response.status(401).json({
                message: 'Access denied from Rider Auth Middleware. Invalid token.',
                error: true,
                success: false
            });
        }

        const validRider = await riderModel.findById(decoded._id).select('-password');
        if (!validRider) {
            return response.status(401).json({
                message: 'Access denied from Rider Auth Middleware. User not found.',
                error: true,
                success: false
            });
        }
        request.rider = validRider;
        
        next();
    } catch (error) {
        return response.status(500).json({
            message: 'Internal server error from Auth Middleware',
            error: true,
            success: false
        });
    }
}