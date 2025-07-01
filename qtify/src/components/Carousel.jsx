import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./Carousel.module.css";
import LeftNavButton from "./LeftNavButton";
import RightNavButton from "./RightNavButton";

const Carousel = ({ items = [], renderItem }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div style={{ position: "relative" }}>
      {/* Custom Left Navigation */}
      <div ref={prevRef} className={`${styles.navButton} ${styles.leftButton}`}>
        <LeftNavButton />
      </div>

      {/* Custom Right Navigation */}
      <div
        ref={nextRef}
        className={`${styles.navButton} ${styles.rightButton}`}
      >
        <RightNavButton />
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={7}
        slidesPerGroup={1}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>{renderItem(item)}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
