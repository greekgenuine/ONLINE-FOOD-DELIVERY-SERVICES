import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Storecontextprovider from './context/storecontext.jsx'
import {BrowserRouter} from 'react-router-dom'
//</Storecontextprovider>
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
<Storecontextprovider>
    <App />
    </Storecontextprovider>
  </BrowserRouter>

 
)
