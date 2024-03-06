import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { categoriesContext } from "../Context/CategoriesContext";
import Loading from "../Loading/Loading";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState('');
  let { getSubCategories } = useContext(categoriesContext);
  let [loading, setLoading] = useState(true);

  async function getCategories() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    setCategories(data.data);
    setLoading(false);

    // console.log(data.data);
  }
  useEffect(() => {
    getCategories();
  }, []);
  async function getSubCate(id,name) {
    let { data } = await getSubCategories(id);
    console.log(data);
    setSubCategories(data.data);
    setSelectedCategoryName(name); 
  }
  if (loading) return <Loading />;

  return (
    <>
      <div className="container">
        <h3 className="my-4">popular categories</h3>
        <div className="row g-4">
          {categories.map((item) => (
            <div
              onClick={() => getSubCate(item._id,item.name)}
              className="col-md-4 "
              key={item._id}
            >
              <div>
                <div className="border brands rounded-2">
                  <img
                    src={item.image}
                    height={420}
                    className="w-100 rounded-2"
                    alt=""
                  />
                  <h4 className="fs-5 text-center p-3 fw-bold text-main ">
                    {item.name}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="my-5 py-5 ">
        <h3 className="text-center text-main mb-4">{selectedCategoryName}</h3>
        <div className="row  g-4">
        {subCategories.map((item) => (
              
              <div className="col-md-4 " key={item._id}>
                 
                <div className="border brands rounded-2">
                  <h4 className="fs-5 text-center p-3 fw-bold ">{item.name}</h4>
                </div>
              </div>
            ))}
        </div>
         
       
        </div>
      </div>
    </>
  );
}
