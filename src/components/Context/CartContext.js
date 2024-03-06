import axios from "axios";
import React, { createContext, useState } from "react";

export const cartContext = createContext(0);

async function addToCart(productId) {
  return axios
    .post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { productId },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    )
    .then(({ data }) => data)
    .catch((err) => err);
}
async function getCart(){
  try {
    return axios.get("https://ecommerce.routemisr.com/api/v1/cart",
    {
     headers:{
         token: localStorage.getItem("token"),
     }
    } )
  } catch (error) {
    console.log(error);
  }
  
}
async function deleteItem(productId){
  return axios.delete("https://ecommerce.routemisr.com/api/v1/cart/" + productId,
 {
  headers:{
      token: localStorage.getItem("token"),

  }
 } )
}
async function clearAll(){
  return axios.delete("https://ecommerce.routemisr.com/api/v1/cart" ,
 {
  headers:{
      token: localStorage.getItem("token"),

  }
 } )
}
async function updateQuantity(productId,count){
  return axios.put("https://ecommerce.routemisr.com/api/v1/cart/" + productId,{count},
 {
  headers:{
      token: localStorage.getItem("token"),

  }
 } )
}
async function payment(cartId,shippingAddress){
  return axios.post("https://ecommerce.routemisr.com/api/v1/orders/checkout-session/" + cartId,{shippingAddress},
 {
  headers:{
      token: localStorage.getItem("token"),

  }
 } )
}
export default function CartContextProvider({ children }) {
  let [counter, setCounter] = useState(0);
  return (
    <cartContext.Provider value={{ counter, setCounter,addToCart,getCart,deleteItem,updateQuantity,payment,clearAll}}>
      {children}
    </cartContext.Provider>
  );
}
