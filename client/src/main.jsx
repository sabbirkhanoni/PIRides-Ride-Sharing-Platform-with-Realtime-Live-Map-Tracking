import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/route.jsx'
import UserContext from './Context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContext>
      <RouterProvider router={router} />
    </UserContext>
  </StrictMode>,
)
