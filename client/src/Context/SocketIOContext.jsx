import React from 'react'
import { useEffect } from 'react';
import { createContext } from 'react'
import { io } from 'socket.io-client';

export const SocketIOContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`)

const SocketProvider = ({children}) => {

  useEffect(() => {
    socket.on('connect', () => {
        console.log('Connected to server with socket.io');
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });
  }, []);

  return (
    <SocketIOContext.Provider value={{ socket }}>
        {children}
    </SocketIOContext.Provider>
  )
}

export default SocketProvider;
