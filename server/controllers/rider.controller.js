import riderModel from "../models/rider.model.js";

export const riderRegisterController = async(request,response) => {
    const { fullname, email, password, vehicle , location } = request.body;
    const { firstname, lastname } = fullname;
    const { color, plate, capacity, vehicleType } = vehicle;

    if(!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
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
            vehicleType
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

