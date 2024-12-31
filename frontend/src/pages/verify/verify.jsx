import React, { useState, useEffect } from 'react'
import './verify.css'
import axios from 'axios'; // Import axios for making HTTP requests

const Verify = () => {
  const [orderData, setOrderData] = useState(null); // State to store order data

  useEffect(() => {
    // Define a function to fetch data from the backend
    const fetchOrderData = async () => {
      try {
        // Make an HTTP GET request to your backend API endpoint
        const response = await axios.get('/api/orders'); // Assuming you have an API endpoint to fetch order data

        // Set the received order data in component state
        setOrderData(response.data);
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };

    // Call the fetchOrderData function when the component mounts
    fetchOrderData();
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  return (
    <div>
      <h2>Order Details</h2>
      {orderData ? (
        <div>
          <p>Order ID: {orderData.orderId}</p>
          <p>Order Status: {orderData.status}</p>
          {/* Render other order details here */}
        </div>
      ) : (
        <p>Loading order data...</p>
      )}
    </div>
  );
};

export default Verify;
