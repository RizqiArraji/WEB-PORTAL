import React from 'react'
import ReactDOM from 'react-dom/client'
import { ContextProvider } from './tools/ContextProvider'
import { RouterProvider } from 'react-router-dom'
import router from './tools/Router'
import '../bootstrap.bundle.js'
import '../bootstrap.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
        <RouterProvider router={router}/>
    </ContextProvider>
  </React.StrictMode>,
)
