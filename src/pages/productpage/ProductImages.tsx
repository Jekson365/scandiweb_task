import { CurrentProduct } from "../../types/types";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { useState } from "react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

function ProductImages({ product }: { product: CurrentProduct }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <>
      <div className="slider-container col col-1"
        style={{gap:"10px"}}
      >
        <div className="con con-1">
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={50}
            slidesPerView={8}
            watchSlidesProgress={true}
            direction="vertical"
            modules={[FreeMode, Navigation, Thumbs]}
            style={{
              width: "100%",
              height: "100%",
            }}
            className="mySwiper"
          >
            {product.gallery.map((path: string, index) => (
              <SwiperSlide key={index}
                style={{height:"120px !important"}}
              >
                <div className="cover-slider-image">
                  <img src={path} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="con con-2">
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            style={{ width: "100%" }}
            className="mySwiper2"
          >
            {product.gallery.map((path: string, index) => (
              <SwiperSlide
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img 
                style={{
                    width:"100%",
                    height:"100%",
                    objectFit:"cover"
                }}
                className="" src={path} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default ProductImages;
