import { getDistanceAndTime } from "../../services/map.services.js";

const calculateMoneyPayable = async(origin, destination) => {

    if(!origin || !destination) {
        throw new Error("Origin and destination are required to calculate money payable");
    }

    const distanceTime = await getDistanceAndTime(origin, destination);
    console.log("Full distanceTime response:", distanceTime);
    
    // Use the correct property names and convert duration from seconds to minutes
    const distanceInKm = distanceTime.distanceInKm; // in km
    const durationInMin = Math.ceil(distanceTime.durationInMin); // convert seconds to minutes

    console.log("Distance (km chk): ", distanceInKm);
    console.log("Duration (min chk): ", durationInMin);

    const basePayable = {
        auto: 8,
        bike: 10,
        car: 18
    }
    const perKmRate = {
        auto: 5,
        bike: 7,
        car: 10
    }
    const perMinuteRate = {
        auto: 1,
        bike: 1,
        car: 2
    }

    const moneyPayable = {
        auto: Math.round(basePayable.auto + (perKmRate.auto * distanceInKm) + (perMinuteRate.auto * durationInMin)),
        bike: Math.round(basePayable.bike + (perKmRate.bike * distanceInKm) + (perMinuteRate.bike * durationInMin)),
        car: Math.round(basePayable.car + (perKmRate.car * distanceInKm) + (perMinuteRate.car * durationInMin))
    }

    console.log("Money Payable Calculation:", moneyPayable);

    return moneyPayable;
}

export default calculateMoneyPayable;