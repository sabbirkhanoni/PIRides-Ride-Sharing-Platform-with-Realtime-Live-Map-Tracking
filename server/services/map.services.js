import axios from "axios";
import dotenv from "dotenv";
import riderModel from "../models/rider.model.js";
dotenv.config();

export const getAddressCoordinate = async (address) => {
  const apiKey = process.env.GEOAPIFY_API_KEY;
  if (!apiKey) {
    throw new Error("Geoapify API key is not set in environment variables");
  }

  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    // Ensure there are results
    if (data.features && data.features.length > 0) {
      const [lng, lat] = data.features[0].geometry.coordinates; // Geoapify uses [lng, lat]
      return { lat, lng };
    } else {
      throw new Error("No coordinates found for this address");
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    throw error;
  }
};

export const getDistanceAndTime = async (originAddress, destinationAddress) => {
  const apiKey = process.env.GEOAPIFY_API_KEY;
  if (!apiKey) {
    throw new Error("Geoapify API key is not set in environment variables");
  }

  try {
    // Step 1: Geocode origin and destination addresses
    console.log('Geocoding origin:', originAddress);
    console.log('Geocoding destination:', destinationAddress);
    
    const originCoords = await getAddressCoordinate(originAddress);
    const destinationCoords = await getAddressCoordinate(destinationAddress);
    
    console.log('Origin coordinates:', originCoords);
    console.log('Destination coordinates:', destinationCoords);

    // Step 2: Use coordinates for route matrix
    // Geoapify expects [lon, lat] format
    const originLocation = [originCoords.lng, originCoords.lat];
    const destLocation = [destinationCoords.lng, destinationCoords.lat];

    const url = `https://api.geoapify.com/v1/routematrix?apiKey=${apiKey}`;

    const body = {
      mode: "drive",
      sources: [
        { location: originLocation }
      ],
      targets: [
        { location: destLocation }
      ],
      units: "metric"  
    };

    console.log('Route matrix request body:', JSON.stringify(body, null, 2));

    const response = await axios.post(url, body, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = response.data;
    console.log('Route matrix response:', JSON.stringify(data, null, 2));
    
    // Parse the response correctly
    if (data.sources_to_targets
        && data.sources_to_targets.length > 0
        && data.sources_to_targets[0].length > 0) {
      const result = data.sources_to_targets[0][0];
      const distance = result.distance; // in meters
      const duration = result.time;     // in seconds

      

      const distanceInKm = distance / 1000; // Convert to kilometers
      const durationInMin = duration / 60;   // Convert to minutes

      console.log('Distance (kilometers):', distanceInKm);
      console.log('Duration (minutes):', durationInMin);

      return { distanceInKm, durationInMin };

    } else {
      throw new Error("No distance/time data returned from route matrix API");
    }
  } catch (error) {
    console.error("Error in getDistanceAndTime:", error.message);
    if (error.response) {
      console.error("API Error Response:", error.response.data);
    }
    throw error;
  }
};

export const getSuggestionsAddressService = async (input) => {
  const apiKey = process.env.GEOAPIFY_API_KEY;
  if (!apiKey) {
    throw new Error("Geoapify API key is not set in environment variables");
  }

  const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(input)}&limit=5&apiKey=${apiKey}`;
  
  try {
    console.log('Autocomplete URL:', url);
    const response = await axios.get(url);
    const data = response.data;
    
    console.log('Autocomplete response:', JSON.stringify(data, null, 2));

    // Extract and format suggestions
    if (data.features && data.features.length > 0) {
      const suggestions = data.features.map(feature => ({
        address: feature.properties.formatted,
        name: feature.properties.name || feature.properties.formatted,
        coordinates: {
          lat: feature.geometry.coordinates[1],
          lng: feature.geometry.coordinates[0]
        },
        type: feature.properties.result_type,
        country: feature.properties.country,
        state: feature.properties.state,
        city: feature.properties.city
      }));
      
      return suggestions;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error in Address Suggestion:", error.message);
    if (error.response) {
      console.error("API Error Response:", error.response.data);
    }
    throw error;
  }
}

export const getAllRiderInAreaRadiusService = async (lat, lng, radiusInKm) => {
  try {
    console.log(`🔍 Searching for riders with location query:`, {
      lat: lat,
      lng: lng,
      radiusInKm: radiusInKm
    });

    // Calculate the latitude and longitude range (approximate)
    // 1 degree of latitude ≈ 111 km
    // 1 degree of longitude ≈ 111 km * cos(latitude)
    
    const latRange = radiusInKm / 111;
    const lngRange = radiusInKm / (111 * Math.cos(lat * Math.PI / 180));

    console.log(`📐 Search range - latRange: ±${latRange.toFixed(4)}, lngRange: ±${lngRange.toFixed(4)}`);

    const riders = await riderModel.find({
      $and: [
        { 'location.ltd': { $gte: lat - latRange, $lte: lat + latRange } },
        { 'location.lng': { $gte: lng - lngRange, $lte: lng + lngRange } }
      ]
    });

    console.log(`✅ Found ${riders.length} riders within ${radiusInKm}km radius`);
    if (riders.length > 0) {
      riders.forEach(rider => {
        console.log(`  - Rider ID: ${rider._id}`);
        console.log(`    Location: lat=${rider.location.ltd}, lng=${rider.location.lng}`);
        console.log(`    SocketId: ${rider.socketId ? '✓ Present' : '✗ Missing'}`);
      });
    } else {
      console.warn(`⚠️  No riders found in the specified radius`);
    }
    return riders;
  } catch (error) {
    console.error('❌ Error finding riders in radius:', error.message);
    console.error('Stack trace:', error);
    return [];
  }
}


