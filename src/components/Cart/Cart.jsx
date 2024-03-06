import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../Context/CartContext";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { clear } from "@testing-library/user-event/dist/clear";

export default function Cart() {
  let { getCart, deleteItem, setCounter, updateQuantity, clearAll } =
    useContext(cartContext);
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { data } = await getCart();
      if (data?.response?.data.statusMsg == "fail") {
        setData(null);
      } else {
        setData(data);
      }
      // console.log(data);
      setLoading(false);
    })();
  }, []);

  async function deleteProd(id) {
    let { data } = await deleteItem(id);
    // console.log(data);
    if (data.status == "success") {
      toast.error("product deleted successfully");
      setCounter(data.numOfCartItems);
      setData(data);
    }
  }

  // async function clearCart() {
  //   let { data } = await clearAll();
  //   // console.log(data);
  //   if (data.status == "success") {
  //     toast.error("Cart deleted successfully");
  //     // setCounter(data.numOfCartItems);
  //     // setData(data);
  //   }
  // }
  async function updateProdQuantity(id, count) {
    let { data } = await updateQuantity(id, count);
    console.log(data);
    if (data.status == "success") {
      toast.success("product updated successfully");
      setCounter(data.numOfCartItems);
      setData(data);
    }
  }
  if (loading) return <Loading />;
  if (data == null || data.numOfCartItems == 0)
    return (
      <div className="container px-5 mt-5 bg-main-light p-3 rounded-2">
        <p className="fw-bold ">Shop Cart</p>

        <h2>Your cart is empty</h2>
      </div>
    );
  return (
    <div className="container px-5 my-2 bg-main-light p-3 rounded-2">
      <div className="d-flex justify-content-between mb-5 mt-3">
        <h4 className="fw-bold ">Shop Cart</h4>

        <Link to={`/address/${data.data._id}`} className="btn btn-primary">
          check out{" "}
        </Link>
      </div>
      <div className="d-flex justify-content-between">
        <p className="fw-bold">
          Total Price:
          <span className="text-main mx-2">
            {data?.data.totalCartPrice} EGP
          </span>
        </p>
        <p className="fw-bold">
          total number of items:
          <span className="text-main mx-2">{data?.numOfCartItems}</span>
        </p>
      </div>

      {data?.data.products.map((item) => {
        return (
          <div key={item._id} className="row border-bottom">
            <div className="col-md-2">
              <img
                src={item.product.imageCover}
                className="w-100 my-3"
                alt=""
              />
            </div>
            <div className="col-md-10 d-flex justify-content-between align-items-center">
              <div>
                <p className="m-1 fw-bold">{item.product.title}</p>
                <p className="text-main p-0 m-0">Price: {item.price}EGP</p>
                <button
                  onClick={() => deleteProd(item.product._id)}
                  className="btn red p-0 m-0"
                >
                  <i className="fa-solid fa-trash-can mx-1"></i>
                  <span>remove</span>
                </button>
              </div>
              <div className="py-2">
                <button
                  onClick={() =>
                    updateProdQuantity(item.product._id, item.count + 1)
                  }
                  className="btn brdr"
                >
                  +
                </button>
                <span className="px-2">{item.count}</span>
                <button
                  disabled={item.count <= 1}
                  onClick={() =>
                    updateProdQuantity(item.product._id, item.count - 1)
                  }
                  className="btn brdr "
                >
                  -
                </button>
              </div>
            </div>
          </div>
        );
      })}
      {/* <div className="text-center my-3">
      <button onClick={()=>clearCart()} className="btn brdr px-5 fw-bold py-2">
              Clear Your Cart
            </button>
      </div> */}
    </div>
  );
}
