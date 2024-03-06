import axios from 'axios';
import React, { createContext, useState } from 'react'
export const wishContext=createContext(0);
async function getWishlist(){
  return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",
 {
  headers:{
      token: localStorage.getItem("token"),

  }
 } )
}

async function addToWishlist(productId) {
  return axios
    .post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
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

async function deleteWishlist(productId){
  return axios.delete("https://ecommerce.routemisr.com/api/v1/wishlist/" + productId,
 {
  headers:{
      token: localStorage.getItem("token"),

  }
 } )
}
export default function WishContextProvider({children}) {
    let [wishCounter, setWishCounter] = useState(0)

  return (
    <wishContext.Provider value={{wishCounter,setWishCounter,getWishlist,addToWishlist,deleteWishlist}}>
      {children}
      
    </wishContext.Provider>
  )
}
