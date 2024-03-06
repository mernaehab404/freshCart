import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { cartContext } from "../Context/CartContext";
import { toast } from "react-toastify";
import Slider from "react-slick";

export default function ProductDetails() {
  let { id } = useParams();
  let [product, setProduct] = useState({});
  let [btnLoading, setBtnLoading] = useState(false);
  let { counter, setCounter, addToCart } = useContext(cartContext);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  async function getProduct() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    setProduct(data.data);
  }

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
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-3">
          <Slider {...settings}>
            {product.images?.map((img) => {
              return (
                <div>
                  <img src={img} className="w-100" alt="" />
                </div>
              );
            })}
        </Slider>
          </div>
          <div className="col-md-9 d-flex justify-content-center flex-column">
            <div>
              <h3 className="fw-bold"> {product.title}</h3>
              <p>{product.description}</p>
            </div>

            <div className="d-flex justify-content-between mt-2 w-100">
              <p className="fw-bold">{product.price + "LE"}</p>
              <div className="fw-bold">
                <i className="fa-solid fa-star rating-color mx-2"></i>
                {product.ratingsAverage}
              </div>
            </div>
            <div className="d-flex justify-content-between my-3 ">
              <button
                disabled={btnLoading}
                onClick={() => addPrdToCart(product._id)}
                className="btn text-white bg-main w-75  "
              >
                {!btnLoading ? "+ Add" : "loading"}
              </button>
              <i className="fa-solid fa-heart fs-2 "></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
