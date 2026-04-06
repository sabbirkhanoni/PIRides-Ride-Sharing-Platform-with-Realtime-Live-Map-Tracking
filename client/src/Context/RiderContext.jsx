import React, { createContext } from 'react'
import { useState } from 'react'


export const RiderContextData = createContext();

const RiderContext = ({children}) => {

    const [rider, setRider] = useState({
        email: "",
        fullname: {
          firstname: "",
          lastname: "",
        },
    });

  return (
    <div>
        <RiderContextData.Provider value={{ rider, setRider }}>
          {children}
        </RiderContextData.Provider>
    </div>
  )
}

export default RiderContext
