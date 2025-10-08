import React from 'react'
import { IoLocationSharp } from "react-icons/io5";

const LocationSuggestionPanel = ({ setLocationPanelOpen, setAllVehiclesInAreaPanel,setPickupDestinationData, suggestions, activeField }) => {

  
  
  const handleSuggestionClick = (suggestion) => {
        const addressText = suggestion.address || suggestion.name || suggestion;
        
        if (activeField === 'origin') {
            setPickupDestinationData((prev) => ({
                ...prev,
                origin: addressText
            }));
        } else if (activeField === 'destination') {
            setPickupDestinationData((prev) => ({
                ...prev,
                destination: addressText
            }));
        }
        
        // Close the panel after selection
        // setAllVehiclesInAreaPanel(true);
        // setLocationPanelOpen(false);
    }

  return (
     
    <div className='space-y-2 overflow-y-auto h-full border-gray-400'>
      {suggestions && suggestions.length > 0 ? (
        suggestions.map((location, idx) => (
          <div key={idx} onClick={() => handleSuggestionClick(location)} className='flex cursor-pointer py-3 items-center gap-3 border-b-1 border-gray-400 rounded-lg'>
            <h2 className='bg-gray-200 rounded-full py-2 px-2'><IoLocationSharp /></h2>
            <div>
              <h4 className='font-medium'>{location.address || location.name || location}</h4>
              {location.city && location.country && (
                <p className='text-sm text-gray-600'>{location.city}, {location.country}</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className='py-3 text-center text-gray-500'>
          {activeField ? 'Type to search locations...' : 'No suggestions available'}
        </div>
      )}
    </div>
  )
}

export default LocationSuggestionPanel
