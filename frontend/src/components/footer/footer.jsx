import React from 'react'
import './footer.css'
import { assets } from '../../assets/assets'
const footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className='footer-content'>
      <div className='footer-content-left'>
    <img src={assets.logo} alt=''/>
    <p > Tomato: Where flavor meets ambiance. Experience culinary excellence in every bite, amidst a cozy yet vibrant setting. Savor the taste of perfection at Tomato, where every dish tells a story of passion and quality</p>
    <div className='footer-social-icons'>
        <img className='s1' src={assets.facebook_icon} alt=''/>
        <img className='s2'  src={assets.twitter_icon} alt=''/>
        <img className='s3' src={assets.linkedin_icon} alt=''/>
    </div>
      </div>
      <div className='footer-content-center'>
        <h2>Company</h2>
        <ul>
            <li>Home</li>
            <li>About-us</li>
            <li>Delivery</li>
            <li> Privacy policy</li>
        </ul>
        </div>
        <div className='footer-content-right'>
        <h2> GET IN TOUCH</h2>
        <ul>
            <li> +123-456-7890</li>
            <li> Contact@Tomato.com </li>
        </ul>
        </div>
        <div className='footer-content-center'>

</div>
      </div>
      <hr/>
      <p className='footer-copyright'> add copyright text</p>
    </div>
  )
}

export default footer
