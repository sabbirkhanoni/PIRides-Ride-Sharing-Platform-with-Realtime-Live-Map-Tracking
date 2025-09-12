import React from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (

    <>
    <div>
      <Outlet />
    </div>


      <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerStyle={{}}
          containerClassName=""
          toastOptions={{
            duration: 5000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />

      </>

  )
}

export default App
