import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

// Create the context
export const StoreContext = createContext(null);

// Create the context provider component
const StoreContextProvider = ({ children }) => {
  const [cartitems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const url = "http://localhost:4000";

  const addtocart = async (itemid) => {
    try {
      setCartItems((prev) => ({ ...prev, [itemid]: (prev[itemid] || 0) + 1 }));
      if (token) {
        await axios.post(`${url}/api/cart/add`, { itemid }, { headers: { token } });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removefromcart = async (itemid) => {
    try {
      setCartItems((prev) => {
        const newCartItems = { ...prev, [itemid]: prev[itemid] - 1 };
        if (newCartItems[itemid] <= 0) delete newCartItems[itemid];
        return newCartItems;
      });
      if (token) {
        await axios.post(`${url}/api/cart/remove`, { itemid }, { headers: { token } });
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const gettotalcartamount = () => {
    return Object.entries(cartitems).reduce((total, [itemid, quantity]) => {
      const item = food_list.find((product) => product._id === itemid);
      return total + (item ? item.price * quantity : 0);
    }, 0);
  };

  const fetchfoodlist = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  const loadcartdata = async (token) => {
    try {
      const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { token } });
      setCartItems(response.data.cartdata);
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };

  useEffect(() => {
    const loaddata = async () => {
      try {
        await fetchfoodlist();
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
          setToken(savedToken);
          await loadcartdata(savedToken);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    loaddata();
  }, []);

  const contextValue = {
    food_list,
    cartitems,
    setCartItems,
    addtocart,
    removefromcart,
    gettotalcartamount,
    url,
    token,
    setToken, // Ensure setToken is provided in the context
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
