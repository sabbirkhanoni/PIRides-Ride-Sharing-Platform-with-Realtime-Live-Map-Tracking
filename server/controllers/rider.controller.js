import riderModel from "../models/rider.model.js";
import BlacklistToken from "../utils/blacklistToken.utilsModel.js";

export const riderRegisterController = async(request,response) => {
    const { fullname, email, password, vehicle , location } = request.body;
    const { firstname, lastname } = fullname;
    const { color, plate, capacity, type } = vehicle;

    if(!firstname || !email || !password || !color || !plate || !capacity || !type) {
        return response.status(400).json({
            message: 'Please provide all required fields',
            error: true,
            success: false
        })
    }

    // Check if rider already exists
    const existingRider = await riderModel.findOne({ email });
    if (existingRider) {
        return response.status(400).json({
            message: 'Rider already exists',
            error: true,
            success: false
        })
    }

    //if not existing rider, create new rider
    // Hash the password
    const hashedPassword = await riderModel.hashPassword(password);

    const newRider = new riderModel({
        fullname: {
            firstname,
            lastname
        },
        email,
        password: hashedPassword,
        vehicle: {
            color,
            plate,
            capacity,
            type
        }
    });

    await newRider.save();

    // Generate auth token
    const token = newRider.generateAuthToken();

    return response.status(201).json({
        message: 'Rider registered successfully',
        error: false,
        success: true,
        token,
        data: newRider
    });
}

export const riderLoginController = async(request,response) => {
    const { email, password } = request.body;

    if (!email || !password) {
        return response.status(400).json({
            message: 'Please provide email and password',
            error: true,
            success: false
        });
    }

    // Check if rider exists
    const existingRider = await riderModel.findOne({ email }).select('+password');
    if (!existingRider) {
        return response.status(404).json({
            message: 'Invalid email or password or Rider does not exist',
            error: true,
            success: false
        });
    }

    // Check password
    const isMatch = await existingRider.comparePassword(password);
    if (!isMatch) {
        return response.status(401).json({
            message: 'Invalid password',
            error: true,
            success: false
        });
    }

    // Generate auth token
    const token = existingRider.generateAuthToken();

    response.cookie('token', token);

    return response.status(200).json({
        message: 'Rider logged in successfully',
        error: false,
        success: true,
        token,
        data: existingRider
    });
}

export const riderProfileController = async(request,response) => {
    try {
        return response.status(200).json({
            message: 'Rider profile fetched successfully',
            error: false,
            success: true,
            data: request.rider
        });

    } catch (error) {
        return response.status(500).json({
            message: 'Internal server error',
            error: true,
            success: false
        });
    }
}

export const riderLogoutController = async(request,response) => {
    try {
        const token = request.cookies.token || request.headers.authorization;
        // Extract token from 'Bearer
        if (token && token.startsWith('Bearer ')) {
            token = token.split(' ')[1];
        }

        if (!token) {
            return response.status(400).json({
                message: 'Unauthorized Access in Rider. No token found.',
                error: true,
                success: false
            });
        }

        // Blacklist the token
        await BlacklistToken.create({ token });

        return response.status(200).json({
            message: 'Rider logged out successfully',
            error: false,
            success: true
        });
    } catch (error) {
        return response.status(500).json({
            message: 'Internal server error',
            error: true,
            success: false
        });
    }
}



