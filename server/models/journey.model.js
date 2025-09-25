import mongoose from "mongoose";

const journeySchema = new mongoose.Schema({
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required: true
    },
    rider: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'rider',
    },
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    moneyPayable: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted','ongoing', 'completed', 'cancelled'],
        default: 'pending'
    },
    duration: {
        type: Number,
    },
    distance: {
        type: Number,
    },
    paymentId: {
        type: String,
    },
    orderId: {
        type: String,
    },
    signature: {
        type: String,
    },
    otp: {
        type: String,
        select: false,
        required: true
    }
})

const journeyModel = mongoose.model('journey', journeySchema);

export default journeyModel;