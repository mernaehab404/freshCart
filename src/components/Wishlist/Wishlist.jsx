import React, { useContext, useEffect, useState } from "react";
import { wishContext } from "../Context/WishContext";
import { toast } from "react-toastify";
import { cartContext } from "../Context/CartContext";
import Loading from "../Loading/Loading";

export default function Wishlist() {
  let [btnLoading, setBtnLoading] = useState(false);
  let { setCounter, addToCart } = useContext(cartContext);

  let { getWishlist, deleteWishlist } = useContext(wishContext);
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(true);

  async function getWish() {
    let { data } = await getWishlist();

    // console.log(data.data);
    setData(data.data);
    setLoading(false);

  }

  async function deleteWish(productId) {
    let { data } = await deleteWishlist(productId);
    // console.log(data);
    if (data.status == "success") {
      // toast.error("product deleted successfully");
      // setData(data);
    }
  }
  async function addPrdToCart(productId) {
    setBtnLoading(true);
    let data = await addToCart(productId);
    console.log(data);
    if (data.status == "success") {
      toast.success(data.message);
      setCounter(data.numOfCartItems);
      setBtnLoading(false);
      deleteWish(productId);
    }
  }

  useEffect(() => {
    getWish();
  }, [deleteWish]);
  if (loading) return <Loading />;

  if (data.length==0 )
    return (
      <div className="container px-5 mt-5 bg-main-light p-3 rounded-2">

        <h2>Your wishlist is empty</h2>
      </div>
    );
  return (
    <div className="container px-5 my-5 bg-main-light p-3 rounded-2">
      <h4 className="fw-bold  mb-5 mt-3">My Wish List</h4>

      {data?.map((item) => {
        return (
          <div className="row border-bottom">
            <div className="col-md-2">
              <img src={item.imageCover} className="w-100 my-3" alt="" />
            </div>
            <div className="col-md-10 d-flex justify-content-between align-items-center">
              <div>
                <p className="m-1 fw-bold">{item.title}</p>
                <p className="text-main p-0 m-0">Price: {item.price}EGP</p>
                <button
                  onClick={() => deleteWish(item._id)}
                  className="btn red p-0 m-0"
                >
                  <i className="fa-solid fa-trash-can mx-1"></i>
                  <span>remove</span>
                </button>
              </div>
              <button
                disabled={btnLoading}
                onClick={() => addPrdToCart(item._id)}
                className="btn brdr  "
              >
                {!btnLoading ? "+ Add to cart" : "loading"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
