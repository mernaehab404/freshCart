import React, { useContext, useState } from "react";
import { cartContext } from "../Context/CartContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { wishContext } from "../Context/WishContext";

export default function Product({ item }) {
  let { counter, setCounter, addToCart } = useContext(cartContext);
  let { addToWishlist, setWishCounter } = useContext(wishContext);

  let [btnLoading, setBtnLoading] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
 

  async function addPrdToCart(productId) {
    setBtnLoading(true);
    let data = await addToCart(productId);
    console.log(data);
    if (data.status == "success") {
      toast.success(data.message);
      setCounter(data.numOfCartItems);
      setBtnLoading(false);
    }
  }
  async function addWishToCart(productId) {
    let data = await addToWishlist(productId);
    console.log(data);
    if (data.status == "success") {
      toast.success(data.message);
      // setWishCounter(data.count);
      // console.log(data.data.count);
      setIsInWishlist(!isInWishlist);
    }
  }

  return (
    <>

      <div className="col-md-3">
        <div className="product p-2 rounded-3 cursor-pointer">
          <Link to={"/product-details/" + item._id}>
            <img
              src={item.imageCover}
              height={430}
              className="w-100 p-2"
              alt=""
            />
            <span className="text-main fw-semibold">{item.category.name}</span>
            <h4 className="fs-6 fw-bolder my-2">
              {item.title.split(" ").slice(0, 2).join(" ")}
            </h4>
            <div className="d-flex justify-content-between mt-2">
              <div className="text-muted"> {item.price + "LE"}</div>
              <div>
                <i className="fa-solid fa-star rating-color"></i>
                {item.ratingsAverage}
              </div>
            </div>
          </Link>
          <div className="d-flex justify-content-around my-3 ">
            <button
              disabled={btnLoading}
              onClick={() => addPrdToCart(item._id)}
              className="btn text-white bg-main w-75 "
            >
              {!btnLoading ? "+ Add" : "loading"}
            </button>
            <i
              onClick={() => addWishToCart(item._id)}
              className={`fa-heart ${
                isInWishlist ? "fa-solid" : "fa-regular"
              } fs-2`}
              style={{ color: isInWishlist ? "red" : "black" }}
            ></i>
          </div>
        </div>
      </div>
    </>
  );
}
