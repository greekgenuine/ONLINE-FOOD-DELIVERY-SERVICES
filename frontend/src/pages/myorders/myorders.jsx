import React, { useContext, useEffect, useState } from 'react'
import './myorders.css'
import { StoreContext } from '../../context/storecontext';
import axios from 'axios';
import { assets } from '../../assets/assets';
const myorders = () => {

    const{url,token} =useContext(StoreContext);
const [data,setdata]=useState([]);
const fetchorder=async()=>{
    const response =await axios.post(url+"/api/order/userorders",{},{headers:{token}})
    setdata(response.data.data);
    console.log(response.data.data);
}
useEffect(()=>{
if (token){
fetchorder();
}
},[token])
  return (
    <div>
      <div className='my_orders'>
        <h2> My Orders</h2>
        <div className='container'>
        {data.map((order,index)=>{
            return(
                <div className='my_orders_order' key={index}>
                <img src={assets.parcel_icon} alt='' />
                <p>{order.items.map((item,index)=>{
                    if(index===order.items.length-1){
                    
                        return item.name+"x"+item.quantity
                    }
                    else{
                        return item.name+"x"+item.quantity+", "
                    }
                })}</p>
                <p>${order.amount}.00</p>
                <p>Items:{order.items.length}</p>
                <p><span> &#x25cf;</span><b> {order.status}</b></p>
                <button onClick={fetchorder} > Track Order</button>
               
                </div>
            )
        })}
        </div>
      </div>
    </div>
  )
}

export default myorders
