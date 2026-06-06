import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PaymentOptions from './components/PaymentOptions.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PaymentOptions />
   
  </StrictMode>,
)
