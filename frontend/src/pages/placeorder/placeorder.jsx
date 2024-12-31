import React, { useContext, useEffect, useState } from 'react';
import './placeorder.css';
import { StoreContext } from '../../context/storecontext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Ensure you import useNavigate

const PlaceOrder = () => {
  const { gettotalcartamount, token, food_list, cartitems, url } = useContext(StoreContext);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    phone: "",
    country: ""
  });
  const navigate = useNavigate();  // Initialize useNavigate

  const onchangehandler = (event) => {
    const { name, value } = event.target;
    setData(data => ({ ...data, [name]: value }));
  };

  const place_order = async (event) => {
    event.preventDefault();
    let orderitems = food_list.filter(item => cartitems[item._id] > 0)
      .map(item => ({ ...item, quantity: cartitems[item._id] }));

    let address = `${data.firstname} ${data.lastname}, ${data.street}, ${data.city}, ${data.state}, ${data.zipcode}, ${data.country}`;

    // Log the address data
    console.log('Address:', address);

    let orderdata = {
      address,
      items: orderitems,
      amount: gettotalcartamount() + 2,
    };

    try {
      let response = await axios.post(`${url}/api/order/place`, orderdata, { headers: { token } });
      console.log('Response from backend:', response.data); // Log the response data

      if (response.data.success) {
        console.log('Session URL:', response.data.session_url); // Log the session URL
        if (response.data.session_url) {
          console.log('Redirecting to:', response.data.session_url);
          window.location.replace(response.data.session_url);
        } else {
          console.error('Session URL is undefined');
          alert("Order placed successfully.");
          window.location.replace("/"); // Redirect to home page if session URL is undefined
        }
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again later.");

      // Redirect to the home page
      window.location.replace("/");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (gettotalcartamount() === 0) {
      navigate('/cart');
    }
  }, [token, gettotalcartamount, navigate]);  // Add navigate to dependency array

  return (
    <form onSubmit={place_order} className='placeorder'>
      <div className='placorder-left'>
        <p className='title'>Delivery Information</p>
        <div className='multi-fields'>
          <input name='firstname' onChange={onchangehandler} value={data.firstname} type='text' placeholder='First Name' required />
          <input name='lastname' onChange={onchangehandler} value={data.lastname} type='text' placeholder='Last Name' required />
        </div>
        <input name='email' onChange={onchangehandler} value={data.email} type='email' placeholder='E-mail Address' required />
        <input name='street' onChange={onchangehandler} value={data.street} type='text' placeholder='Street' required />
        <div className='multi-fields'>
          <input name='city' onChange={onchangehandler} value={data.city} type='text' placeholder='City' required />
          <input name='state' onChange={onchangehandler} value={data.state} type='text' placeholder='State' required />
        </div>
        <div className='multi-fields'>
          <input name='zipcode' onChange={onchangehandler} value={data.zipcode} type='text' placeholder='Zip code' required />
          <input name='country' onChange={onchangehandler} value={data.country} type='text' placeholder='Country' required />
        </div>
        <input name='phone' required onChange={onchangehandler} value={data.phone} type='text' placeholder='Phone' />
      </div>

      <div className='placorder-right'>
        <div className='cart-total'>
          <h2>Cart total</h2>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>${gettotalcartamount()}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Delivery fee</p>
              <p>${gettotalcartamount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <b>Total</b>
              <b>${gettotalcartamount() === 0 ? 0 : gettotalcartamount() + 2}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO Payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
