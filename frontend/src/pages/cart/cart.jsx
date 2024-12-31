import React, { useContext } from 'react';
import './cart.css';
import { StoreContext } from '../../context/storecontext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartitems, food_list, removefromcart, gettotalcartamount,url} = useContext(StoreContext);
  const navigate = useNavigate(); // Call useNavigate as a function to get navigate

  return (
    <div className='cart'>
      <div className='cart-items'>
        <div className='cart-items-title'>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartitems[item._id] > 0) {
            return (
              <div key={index}>
                <div className='cart-items-title cart-items-item'>
                  <img src={url+"/images/"+item.image} alt='' />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartitems[item._id]}</p>
                  <p>${item.price * cartitems[item._id]}</p> {/* Correct total calculation */}
                  <p className='cross' onClick={() => removefromcart(item._id)}>x</p>
                </div>
                <hr />
              </div>
            );
          }
          return null; // Ensure no warnings for no return
        })}
      </div>
      <div className='cart-bottom'>
        <div className='cart-total'>
          <h2>Cart total</h2>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>${gettotalcartamount()}</p> {/* Correctly display subtotal */}
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Delivery fee</p>
              <p>${gettotalcartamount()===0?0:2}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <b>Total</b>
              <b>${gettotalcartamount()===0?0: gettotalcartamount() + 2}</b> {/* Display overall total */}
            </div>
          </div>
          <button onClick={() => navigate('/order')}>PROCEED TO CHECK OUT</button>
        </div>
        <div className='cart-promocode'>
          <div>
            <p>If you have promocode, enter it here</p>
            <div className='cart-promocode-input'>
              <input type='text' placeholder='Enter promocode here' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
