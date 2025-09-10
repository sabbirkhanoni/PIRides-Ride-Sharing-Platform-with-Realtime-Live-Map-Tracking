import userModel from "../models/user.model.js";
import BlacklistToken from "../utils/blacklistToken.utilsModel.js";


export const userRegisterController = async(request,response) => {
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

export const userLoginController = async(request,response) => {
    try {
        const { email, password } = request.body;

        if(!email || !password) {
            return response.status(400).json({
                message: 'Please provide all required fields',
                error: true,
                success: false
            })
        }

        //check if user exists or not
        const user = await userModel.findOne({ email }).select('+password');

        if(!user) {
            return response.status(400).json({
                message: 'Invalid email or password',
                error: true,
                success: false
            })
        }

        //that means user exists, now compare password
        const isPasswordMatch = await user.comparePassword(password);

        if(!isPasswordMatch) {
            return response.status(400).json({
                message: 'Invalid Password',
                error: true,
                success: false
            })
        }

        //password matched, generate token
        const token = user.generateAuthToken();

        response.cookie('token',token);

        return response.status(200).json({
            message: 'User logged in successfully',
            error: false,
            success: true,
            token,
            data: user
        });

    } catch (error) {
        return response.status(500).json({
            message: 'Internal server error',
            error: true,
            success: false
        });
    }
}

export const userProfileController = async(request,response) => {
    try {
        response.status(200).json({
            message : "User Profile Fetch Successfully",
            error : false,
            success : true,
            data : request.user
        })
    } catch (error) {
        return response.status(500).json({
            message: 'Internal server error',
            error: true,
            success: false
        });
    }
}

export const userLogoutController = async (request, response) => {
    response.clearCookie('token');

    const token = request.cookies.token || request?.header?.authorization;

    if(token && token.startsWith('Bearer ')) {
        token = token.split(' ')[1];
    }

    await BlacklistToken.create({ token });

    return response.status(200).json({
        message: 'User logged out successfully',
        error: false,
        success: true,
    });
}


