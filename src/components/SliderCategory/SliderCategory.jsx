import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

export default function SliderCategory() {
    
  const [slider, setSlider] = useState([]);
    
  async function getSlider() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    setSlider(data.data);
    // console.log(data.data);
  }
  useEffect(() => {
    getSlider()
  }, []); 
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 10,
    slidesToScroll: 1
  };
  return (
    <>
      <div className="container">
<h3 className="my-4">Shop popular categories</h3>
  <Slider {...settings}>
{
    slider.map((item) => (
      <div key={item._id} >
      <img  src={item.image} height={200} className="w-100 p-2" alt="" />
      <h4 className="fs-5 fw-light text-muted">{item.name}</h4>
    </div>
    ))
}
</Slider>
</div>
    </>
  )
}
