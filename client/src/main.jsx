import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AxiosContextProvider } from './context/AxiosContext'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AxiosContextProvider>
        <App />
      </AxiosContextProvider>
  </React.StrictMode>
)