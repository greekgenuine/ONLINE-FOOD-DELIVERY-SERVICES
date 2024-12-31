import React, { useContext, useState, useEffect } from 'react';
import './navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/storecontext';

const Navbar = ({ setshowlogin }) => {
  const [menu, setMenu] = useState('home');
  const { gettotalcartamount, token, setToken } = useContext(StoreContext); // Ensure correct function name is used
  const navigate = useNavigate();

  useEffect(() => {
    checkTokenLocally();
  }, []);

  const checkTokenLocally = () => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(''); // Ensure correct function name is used
    navigate('/');
  };

  return (
    <div className='navbar'>
      <Link to='/'>
        <img src={assets.logo} alt='logo' />
      </Link>
      <ul className='navbar-menu'>
        <Link to='/' onClick={() => setMenu('home')} className={menu === 'home' ? 'active' : ''}>
          Home
        </Link>
        <a href='#explore-menu' onClick={() => setMenu('menu')} className={menu === 'menu' ? 'active' : ''}>
          Menu
        </a>
        <a href='#app_download' onClick={() => setMenu('mobile-app')} className={menu === 'mobile-app' ? 'active' : ''}>
          Mobile-app
        </a>
        <a href='#footer' onClick={() => setMenu('contact-us')} className={menu === 'contact-us' ? 'active' : ''}>
          Contact us
        </a>
      </ul>
      <div className='navbar-right'>
        <img src={assets.search_icon} alt='Search Icon' />
        <div className='navbar-search-icon'>
          <Link to='/cart'>
            <img src={assets.basket_icon} alt='Basket Icon' />
          </Link>
          <div className={gettotalcartamount() === 0 ? '' : 'dot'}></div>
        </div>
        {token ? (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt='Profile Icon' />
            <ul className='nav-profile-dropdown'>
              <li onClick={()=>navigate('/myorders')}>
                <img  src={assets.bag_icon} alt='Bag Icon' />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt='Logout Icon' />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        ) : (
          <button onClick={() => setshowlogin(true)}>Sign in</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
