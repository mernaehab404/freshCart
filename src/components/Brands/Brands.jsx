import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  let [loading, setLoading] = useState(true);


  async function getBrands() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/brands"
    );
    setBrands(data.data);
    // console.log(data.data);
    setLoading(false);

  }
  useEffect(() => {
    getBrands();
  }, []);
  if (loading) return <Loading />;

  return (
    <>
      <div className="container mt-5 text-center">
        <div className="row g-4">
          <h3 className="text-main text-center fw-bold mb-5">All Brands</h3>
          {brands.map((item) => (
            <div className="col-md-3" key={item._id}>
              <div className="border brands p-2 rounded-3 cursor-pointer">
                <button
                  type="button"
                  className="btn"
                  data-bs-toggle="modal"
                  data-bs-target={`#exampleModal-${item._id}`} // Use unique ID
                >
                  <img src={item.image} alt="" />
                  <span>{item.name}</span>
                </button>
                <br />
                <div
                  className="modal fade"
                  id={`exampleModal-${item._id}`}
                  tabIndex={-1}
                  aria-labelledby={`exampleModal-${item._id}`} 
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        {/* <h1 className="modal-title fs-5">{item.name}</h1> */}
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        />
                      </div>
                      <div className="modal-body d-flex justify-content-between">
                        <div className="d-flex justify-content-center flex-column">
                          <h1 className="modal-title fs-5  text-main fw-bold fs-2">
                            {item.name}
                          </h1>
                          <span>{item.slug}</span>
                        </div>

                        <img src={item.image} alt="" />
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
