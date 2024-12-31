import React, { useContext } from 'react';
import './food_display.css';
import { StoreContext } from '../../context/storecontext';
import Fooditem from '../fooditem/fooditem';

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);

    return (
        <div className='food_display' id='food_display'>
            <h2>Top Dishes Near you</h2>
            <div className='food-display-list'>
                {food_list.map((item, index) => {
                    // Helps to select the specific categories
                    if (category === "all" || category === item.category) {
                        return (
                            <Fooditem
                                key={index}
                                id={item._id}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                image={item.image}
                            />
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default FoodDisplay;
/*
Certainly! Here’s a systematic breakdown of the flow:

1. Data Fetching with Axios
Action: Fetch data from a server using axios.
Code Example:
javascript
Copy code
const response = await axios.get(`${url}/api/food/list`);
2. Storing Data in State
Component: StoreContextProvider
Action: Store the fetched data in a state variable using useState.
Code Example:
javascript
Copy code
const [food_list, setFoodList] = useState([]);
3. Updating State with Fetched Data
Component: StoreContextProvider
Action: Use useEffect to fetch data on component mount and update state.
Code Example:
javascript
Copy code
useEffect(() => {
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };
  fetchFoodList();
}, []);
4. Providing State via Context
Component: StoreContextProvider
Action: Provide state and functions via StoreContext.Provider to the rest of the app.
Code Example:
javascript
Copy code
const contextValue = {
  food_list,
  // other state and functions
};

return (
  <StoreContext.Provider value={contextValue}>
    {children}
  </StoreContext.Provider>
);
5. Accessing Context Data
Component: Any child component (e.g., FoodDisplay)
Action: Use useContext to access the context data.
Code Example:
javascript
Copy code
const { food_list } = useContext(StoreContext);
6. Rendering Data
Component: FoodDisplay
Action: Render UI based on the context data.
Code Example:
javascript
Copy code
return (
  <div className='food_display'>
    <h2>Top Dishes Near you</h2>
    <div className='food-display-list'>
      {food_list.map((item) => (
        <Fooditem
          key={item._id}
          id={item._id}
          name={item.name}
          description={item.description}
          price={item.price}
          image={item.image}
        />
      ))}
    </div>
  </div>
);
Systematic Flow Summary:
Axios: Fetches data from a specified URL.
StoreContextProvider:
Uses useEffect to fetch data when the component mounts.
Stores the fetched data in state using useState.
Provides this state and other functions via StoreContext.Provider.
Child Components:
Access the provided state using useContext.
Render the UI based on the data from the context.
This process ensures that data is fetched, managed, and shared efficiently within a React application, allowing components to access and display the data without prop drilling or manual DOM manipulation.
*/