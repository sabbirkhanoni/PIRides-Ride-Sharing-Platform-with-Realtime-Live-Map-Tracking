import userModel from "../models/user.model.js";

export const userController = async(request,response) => {
    try {
        const { fullname, email, password } = request.body;

        const { firstname, lastname } = fullname;

        if(!firstname || !email || !password) {
            return response.status(400).json({
                message: 'Please provide all required fields',
                error: true,
                success: false
            })
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });

        if(existingUser) {
            return response.status(400).json({
                message: 'User already exists',
                error: true,
                success: false
            })
        }

        //if not existing user, create new user
        // Hash the password
        const hashedPassword = await userModel.hashPassword(password);

        const newUser = new userModel({
            fullname: {
                firstname,
                lastname
            },
            email,
            password: hashedPassword
        });

        // Save the new user
        await newUser.save();

        // Generate auth token
        const token = newUser.generateAuthToken();

        return response.status(201).json({
            message: 'User created successfully',
            error: false,
            success: true,
            token,
            data: newUser
        });
    }
    catch(error) {
        return response.status(500).json({
            message: 'Internal server error',
            error: true,
            success: false

        });
    }

}
