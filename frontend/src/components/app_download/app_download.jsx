import React from 'react'
import './app_download.css'
import { assets } from '../../assets/assets'
const app_download = () => {
  return (
    <div className='app_download' id='app_download'>
    <p> For Better experince Download.</p>
    <div className='app-download-platforms'>
    <img src={assets.play_store} alt=''/>
    <img src={assets.app_store} alt=''/>

    </div>
      
    </div>
  )
}

export default app_download
