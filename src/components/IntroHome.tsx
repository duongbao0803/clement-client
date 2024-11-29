"use client";
import Image from "next/image";
import React from "react";
import { TiTick } from "react-icons/ti";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import { introImages } from "@/constants";
import { useRouter } from "next/navigation";

const IntroHome = () => {
  const router = useRouter();
  return (
    <section className="container mx-auto my-32 transition-all duration-500">
      <div className="container mx-auto block transition-all duration-500 md:flex md:flex-1 md:items-center md:gap-32">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwiper mb-5 h-[280px] w-[200px] transition-all duration-500 sm:h-[500px] sm:w-[400px]"
        >
          {introImages.map((image, index) => (
            <SwiperSlide
              key={index}
              className="flex items-center justify-center rounded-2xl border-4 border-primary bg-[white] text-2xl font-bold text-white transition-all duration-500"
            >
              <Image
                alt={image.alt}
                src={image.src}
                height={1000}
                width={1000}
                quality={100}
                className="h-full w-full object-contain"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="leading-8 transition-all duration-500">
          <h1 className="text-3xl font-medium sm:text-4xl">
            Sản phẩm chất lượng
          </h1>
          <p className="my-5 text-black/50">
            Báo giá cập nhật nhanh chóng. Cung cấp màng bọc thực phẩm chất lượng
            cao, sản xuất tận tâm từ cơ sở của chúng tôi. Hỗ trợ giao hàng tận
            nơi.
          </p>
          <div className="leading-10">
            <div className="flex items-center">
              <TiTick size={30} color="#81B03F" />{" "}
              <span className="text-black/50">Cam kết chất lượng</span>
            </div>
            <div className="flex items-center">
              <TiTick size={30} color="#81B03F" />{" "}
              <span className="text-black/50">Nguồn gốc xuất xứ rõ ràng</span>
            </div>
            <div className="flex items-center">
              <TiTick size={30} color="#81B03F" />{" "}
              <span className="text-black/50">Đổi trả linh động</span>
            </div>
          </div>

          <button className="group relative my-5 flex h-[2.8em] cursor-pointer items-center overflow-hidden rounded-3xl border border-solid bg-primary p-[0.35em] pl-[1em] pr-[3.3em] text-[17px] font-medium tracking-wider text-black">
            <span className="text-sm text-white">Đặt hàng ngay</span>
            <div className="absolute right-[0.3em] ml-[1em] flex size-[2.2em] items-center justify-center overflow-hidden rounded-3xl bg-white transition-all duration-300 group-hover:w-[calc(100%-0.6em)] active:group-active:scale-95">
              <svg
                className="w-[1.1em] text-primary transition-transform duration-300 group-hover:translate-x-[0.1em] group-hover:scale-110 group-hover:transform group-hover:text-primary"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M21 5L19 12H7.37671M20 16H8L6 3H3M11 6L13 8L17 4M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
                    strokeWidth="2"
                    stroke="#81B03F"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{" "}
                </g>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default IntroHome;
