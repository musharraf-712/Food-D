import { createContext, useState } from "react";
// import { food_list } from "../assets/assets";
import { useEffect } from "react";
import axios from 'axios'


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token,setToken] = useState("")
  const [food_list,setFoodList] = useState([])
    //backend localhost
  const url = "https://food-d-890e.onrender.com"


  const fetchFoodList = async ()=>{
    const response = await axios.get(url+'/api/food/list')
    setFoodList(response.data.data)
  }
  const fetchCartData = async(token)=>{
    const response = await axios.post(url+'/api/cart/get',{},{headers:{token}})
    setCartItems(response.data.cartData)
  }
  
  //setToken again from localstorage after refresh page
  useEffect(()=>{
    async function loadData(){
      await fetchFoodList()
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        const storedToken = localStorage.getItem("token")
        if(storedToken){
          await fetchCartData(storedToken)
        }
        
      }

    }
    loadData()
    
  },[])


  //addToCart
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((pre) => ({ ...pre, [itemId]: 1 }));
    } else {
      setCartItems((pre) => ({ ...pre, [itemId]: pre[itemId] + 1 }));
    }
    if(token){
     await axios.post(url+'/api/cart/add',{itemId},{headers:{token}})
    }
  };

  //removeFromCart
  const removeFromCart = async (itemId) => {
    setCartItems((pre) => ({ ...pre, [itemId]: pre[itemId] - 1 }));
    if(token){
     await axios.post(url+'/api/cart/remove',{itemId},{headers:{token}})
    }
  };

  //getTotalCartAmount
  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
    url
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
