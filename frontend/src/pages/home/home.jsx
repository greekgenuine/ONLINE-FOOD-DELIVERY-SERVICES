import React, { useState } from 'react'
import './home.css'
import Header from '../../components/header/header'
import Explore_menu from '../../components/expolre-menu/Menu'
import Food_display from '../../components/food_display/food_display'
import Footer from '../../components/footer/footer'
import App_download from '../../components/app_download/app_download'
const home = () => {
  const[ category,setcategory]=useState("All");
  return (
    <div>
   
    <Header/>
    <Explore_menu category={category} setcategory={setcategory} />
    <Food_display category={category}/>
    <App_download/>
    </div>
  )
}
//    
export default home
