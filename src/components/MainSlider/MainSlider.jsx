import React from "react";
import Slider from "react-slick";
import img1 from "../../assets/images/41nN4nvKaAL._AC_SY200_.jpg";
import img2 from "../../assets/images/61cSNgtEISL._AC_SY200_.jpg";
import img3 from "../../assets/images/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg";
import img4 from "../../assets/images/XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_.jpg";

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <>
      <div className="container w-50 m-auto my-5 d-flex">
        <Slider className="w-50 " {...settings}>
          <div>
            <img src={img1} className="w-100" alt="" />
          </div>
          <div>
            <img src={img2} className="w-100" alt="" />
          </div>
        </Slider>
        <div>
          <img src={img3} alt="" />
          <img src={img4} alt="" />
        </div>
      </div>
    </>
  );
}
