import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const riderSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long'],
        },
        lastname: {
            type: String,
            minlength: [3, 'Last name must be at least 3 characters long'],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'Vehicle color must be at least 3 characters long'],
        },
        plate :{
            type: String,
            required: true,
            unique: true,
            minlength: [3, 'Vehicle plate must be at least 3 characters long'],
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Vehicle capacity must be at least 1']
        },
        type: {
            type: String,
            required: true,
            enum: ['Car', 'Bike', 'Auto']
        }
    },
    location: {
        ltd: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }
}, { timestamps: true })

// Create geospatial index for location-based queries
riderSchema.index({ 'location': '2dsphere' });

//Now Methods

// generate token
riderSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

//compare password
riderSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

//hashing password
riderSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
}


const riderModel = mongoose.model('rider', riderSchema);

export default riderModel;
