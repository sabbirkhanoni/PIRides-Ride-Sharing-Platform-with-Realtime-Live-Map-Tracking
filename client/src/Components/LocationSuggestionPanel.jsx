import React from 'react'
import { IoLocationSharp } from "react-icons/io5";

const LocationSuggestionPanel = ({ setLocationPanelOpen, setAllVehiclesInAreaPanel }) => {
  const locations = [
    "123 Main St, Springfield, A-101, San Francisco, IL New York, USA",
    "456 Elm St, Springfield, A-102, San Francisco, IL New York, USA",
    "789 Oak St, Springfield, A-103, San Francisco, IL New York, USA",
    "101 Pine St, Springfield, A-104, San Francisco, IL New York, USA",
    "202 Maple St, Springfield, A-105, San Francisco, IL New York, USA",
    "303 Cedar St, Springfield, A-106, San Francisco, IL New York, USA",
    "404 Birch St, Springfield, A-107, San Francisco, IL New York, USA",
  ]

  return (
     
    <div className='space-y-2 overflow-y-auto h-full border-gray-400'>
      {locations.map((location, idx) => (
        <div key={idx} onClick={() => { setAllVehiclesInAreaPanel(true); setLocationPanelOpen(false); }} className='flex cursor-pointer py-3 items-center gap-3 border-b-1 border-gray-400 rounded-lg'>
          <h2 className='bg-gray-200 rounded-full py-2 px-2'><IoLocationSharp /></h2>
          <h4 className='font-medium'>{location}</h4>
        </div>
      ))}
    </div>
  )
}

export default LocationSuggestionPanel
