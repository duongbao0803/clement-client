import React from "react";
import { Carousel } from "antd";
import slide_1 from "@/assets/images/slides/slide_1.png";
import slide_2 from "@/assets/images/slides/slide_2.jpg";
import slide_3 from "@/assets/images/slides/slide_3.jpg";
import ImageSliderCustom from "./common/ImageSliderCustom";

const CarouselDemo: React.FC = () => (
  <Carousel autoplay className="m-5 select-none rounded-xl">
    <ImageSliderCustom src={slide_1} alt="slide1" />
    <ImageSliderCustom src={slide_2} alt="slide2" />
    <ImageSliderCustom src={slide_3} alt="slide3" />
  </Carousel>
);

export default CarouselDemo;
