import crypto from 'crypto';

function generateOTP(num) {
    const otp = crypto.randomInt(Math.pow(10, num-1), Math.pow(10, num)).toString();
    return otp;
}

export default generateOTP;