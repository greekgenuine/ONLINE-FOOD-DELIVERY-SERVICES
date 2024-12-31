import React from 'react'
import './Menu.css'
import { menu_list } from '../../assets/assets'; // Assuming the assets folder is correctly structured
import { assets } from '../../assets/assets'; // Adjust the path if necessary

const Menu = ({ category, setcategory}) => {
  return (
    <div className='explore_menu' id='explore-menu'>
      <h1> Explore our menu </h1>
      <p className='explore-menu-text'>Indulge in an unforgettable stay at [Hotel Name], where every moment is crafted with elegance and tailored to exceed your expectations. Nestled in the heart of [Location], our hotel offers a sanctuary of refined hospitality, where luxury seamlessly intertwines with unparalleled comfort. </p>
      <div className='explore-menu-list'>
        {menu_list.map((item, index, image) => (
          <div onClick={()=> setcategory(prev=> prev ===item.menu_name?'all':item.menu_name)} key={index} className='explore-menu-list-item'>
          <img className={category===item.menu_name?"active":""} src={item.menu_image} alt={item.menu_name} />
                <p>{item.menu_name}</p> {/* Using assets object */}
          
          </div>
        ))}
      </div>
      <hr/>
    </div>
  );
};

export default Menu
