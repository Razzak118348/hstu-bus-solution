import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ContextApi from './Context/ContextApi'
import { RouterProvider } from 'react-router-dom'
import Routes from './Routes/Routes'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextApi children={<RouterProvider router={Routes}
    fallbackElement={<div>Loading...</div>}
    ></RouterProvider>} ></ContextApi>

  </StrictMode>,
)
