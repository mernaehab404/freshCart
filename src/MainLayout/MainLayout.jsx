import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import CartContextProvider from "../components/Context/CartContext";
import CategoriesContextProvider from "../components/Context/CategoriesContext";
import WishContextProvider from "../components/Context/WishContext";

export default function MainLayout() {
  return (
    <>
      <CartContextProvider>
        <CategoriesContextProvider>
          <WishContextProvider>
            <Navbar />
            <Outlet />
          </WishContextProvider>
        </CategoriesContextProvider>
      </CartContextProvider>
    </>
  );
}
