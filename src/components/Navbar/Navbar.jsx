import React, { useContext, useEffect } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import { Link } from "react-router-dom";
import { cartContext } from "../Context/CartContext";
import { wishContext } from "../Context/WishContext";
export default function Navbar() {
  let { counter, setCounter, getCart } = useContext(cartContext);
  let { wishCounter, setWishCounter, getWishlist } = useContext(wishContext);
  useEffect(() => {
    (async () => {
      let  data  = await getCart();
      let response = await getWishlist();
      // console.log(data);
      // console.log(response.data);
      setCounter(response.data.numOfCartItems);
      // setWishCounter(response.data.count);
      // console.log(response.data.count);
    })();
  }, []);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container ">
          <Link className="navbar-brand" to="/home">
            <img src={logo} alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/prds">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/categs">
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/brands">
                  Brands
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item position-relative">
                <Link className="nav-link " aria-current="page" to="/cart">
                  {/* Cart */}
                  <i className="fa-solid fa-cart-shopping px-2 fs-4"></i>
                  {counter ? (
                    <span className="position-absolute top-1  translate-middle badge rounded-pill bg-danger">
                      {counter}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  ) : (
                    ""
                  )}
                </Link>
              </li>
              <li className="nav-item position-relative">
                <Link className="nav-link " aria-current="page" to="/wishlist">
                  WishList
                  <i className="fa-solid red fa-heart px-2 fs-5"></i>
                  {/* <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {wishCounter}
                    <span className="visually-hidden">unread messages</span>
                  </span> */}
                </Link>
              </li>
              <li className="nav-item position-relative">
                <Link className="nav-link " aria-current="page" to="/logout">
                  logOut
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
