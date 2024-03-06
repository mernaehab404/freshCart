import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import Loading from "../Loading/Loading";
import Search from "../Search/Search";

export default function Products() {
  const [products, setProducts] = useState([]);
  let [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');


  async function getProducts() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    setProducts(data.data);
    // console.log(data.data);
    setLoading(false);

  }

  useEffect(() => {
    getProducts();
  }, []);
  if (loading) return <Loading />;

  return (
    <>
      <div className="container">
<Search onSearch={setSearch}/>
      <div className="row">
        {products.filter((item)=>{
          return search.toLowerCase()==='' ? item : item.category.name.toLowerCase().includes(search)
        }).map((item) => {
          return <Product item={item}  key={item._id}/>

        })}
      </div>
      </div>
    </>
  );
}
