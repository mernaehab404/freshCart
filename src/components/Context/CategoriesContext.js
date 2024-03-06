import axios from "axios";
import React, { createContext, useState } from "react";

export const categoriesContext = createContext(0);

    
      
async function getSubCategories(categoryId){
    try {
        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`, {
            headers: {
                token: localStorage.getItem("token"),
            }
        });
        return response;
    } catch (error) {
        console.error("Failed to fetch subcategories:", error);
        return error;
    }
}

  


export default function CategoriesContextProvider({ children }) {
    return (
      <categoriesContext.Provider value={{ getSubCategories}}>
        {children}
      </categoriesContext.Provider>
    );
  }
  