import React, { createContext } from 'react'



export const UserContextData = createContext();


const [user, setUser] = useState({
    email: "",
    fullname: {
      firstname: "",
      lastname: "",
    },
});

const UserContext = ({children}) => {
  return (
    <div>
        <UserContextData.Provider>
          {children}
        </UserContextData.Provider>
    </div>
  )
}

export default UserContext
