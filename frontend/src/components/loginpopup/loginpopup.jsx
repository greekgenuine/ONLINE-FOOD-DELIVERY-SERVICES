import React, { useContext, useState } from 'react';
import './loginpopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/storecontext';
import axios from "axios";

const Loginpopup = ({ setshowlogin }) => {
  const { url, setToken } = useContext(StoreContext); // Ensure the correct function name is used
  const [currstate, setcurrstate] = useState("Login");
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onchangehandler = (event) => {
    const { name, value } = event.target;
    setdata(prevData => ({ ...prevData, [name]: value }));
  };

  const onlogin = async (event) => {
    event.preventDefault();
    let newurl = url;

    if (currstate === "Login") {
      newurl += "/api/user/login";
    } else {
      newurl += "/api/user/register";
    }

    try {
      const response = await axios.post(newurl, data);
      if (response.data.success) {
        setToken(response.data.token); // Use the correct function name
        localStorage.setItem("token", response.data.token);
        setshowlogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className='login-pop-up'>
      <form onSubmit={onlogin} className='login-popup-container'>
        <div className='login-popup-title'>
          <h2>{currstate}</h2>
          <img onClick={() => setshowlogin(false)} src={assets.cross_icon} alt='Close' />
        </div>
        <div className='loginpopup-input'>
          {currstate === "Sign-up" && <input name='name' onChange={onchangehandler} value={data.name} className='a' type='text' placeholder='Your name' required />}
          <input className='a' name='email' onChange={onchangehandler} value={data.email} type='email' placeholder='Your email' required />
          <input className='a' name='password' onChange={onchangehandler} value={data.password} type='password' placeholder='Your password' required />
          <button type='submit' className='btn'>{currstate === "Sign-up" ? "Create account" : "Login"}</button>
          {currstate === "Sign-up" && (
            <div className='loginpopup-condition'>
              <input type='checkbox' required />
              <p>By continuing I agree to the terms of use & privacy policy</p>
            </div>
          )}
          {currstate === "Login" ? (
            <p>
              Create a new account? <span onClick={() => setcurrstate("Sign-up")}>Click here</span>
            </p>
          ) : (
            <p>
              Already have an account? <span onClick={() => setcurrstate("Login")}>Login here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Loginpopup;
