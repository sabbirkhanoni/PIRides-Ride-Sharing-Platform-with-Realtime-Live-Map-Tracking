import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/route.jsx'
import UserContext from './Context/UserContext.jsx'
import RiderContext from './Context/RiderContext.jsx'
import SocketIOContext from './Context/SocketIOContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SocketIOContext>
      <RiderContext>
        <UserContext>
          <RouterProvider router={router} />
        </UserContext>
      </RiderContext>
    </SocketIOContext>
  </StrictMode>,
)
